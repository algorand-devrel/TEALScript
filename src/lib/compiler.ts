/* eslint-disable no-unused-vars */
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree';
import * as parser from '@typescript-eslint/typescript-estree';
import fetch from 'node-fetch';
import * as vlq from 'vlq';

import * as langspec from '../langspec.json';

function capitalizeFirstChar(str: string) {
  return `${str.charAt(0).toUpperCase() + str.slice(1)}`;
}

// Represents the stack types available in the AVM
// eslint-disable-next-line no-shadow
enum StackType {
  none = 'void',
  uint64 = 'uint64',
  bytes = 'bytes',
  any = 'any',
}

// TODO: add VirtualType for things like tuple/array but distinct from ABI types?

// Represents the type_enum for a transaction
// eslint-disable-next-line no-shadow
enum TransactionType {
  PaymentTx = 'pay',
  KeyRegistrationTx = 'keyreg',
  AssetConfigTx = 'acfg',
  AssetTransferTx = 'axfer',
  AssetFreezeTx = 'afrz',
  ApplicationCallTx = 'appl',
  StateProofTx = 'stpf',
}

// eslint-disable-next-line no-shadow
enum ForeignType {
  Asset = 'Asset',
  Account = 'Account',
  Application = 'Application',
}

// The possible node types that are to be
// interpreted as integers
const numberTypes = [
  AST_NODE_TYPES.LogicalExpression,
  AST_NODE_TYPES.BinaryExpression,
];

const TXN_METHODS = [
  'sendPayment',
  'sendAppCall',
  'sendMethodCall',
  'sendAssetTransfer',
];

const CONTRACT_SUBCLASS = 'Contract';

const PARAM_TYPES: { [param: string]: string } = {
  // Account
  AcctAuthAddr: ForeignType.Account,
  // Application
  AppCreator: ForeignType.Account,
  AppAddress: ForeignType.Account,
  AssetManager: ForeignType.Account,
  AssetReserve: ForeignType.Account,
  AssetFreeze: ForeignType.Account,
  AssetClawback: ForeignType.Account,
  AssetCreator: ForeignType.Account,
  // Global
  ZeroAddress: ForeignType.Account,
  CurrentApplicationID: ForeignType.Application,
  CreatorAddress: ForeignType.Account,
  CurrentApplicationAddress: ForeignType.Account,
  CallerApplicationID: ForeignType.Application,
  CallerApplicationAddress: ForeignType.Account,
  // Txn
  Sender: ForeignType.Account,
  Receiver: ForeignType.Account,
  CloseRemainderTo: ForeignType.Account,
  XferAsset: ForeignType.Asset,
  AssetSender: ForeignType.Account,
  AssetReceiver: ForeignType.Account,
  AssetCloseTo: ForeignType.Account,
  ApplicationID: ForeignType.Application,
  RekeyTo: ForeignType.Account,
  ConfigAsset: ForeignType.Asset,
  ConfigAssetManager: ForeignType.Account,
  ConfigAssetReserve: ForeignType.Account,
  ConfigAssetFreeze: ForeignType.Account,
  ConfigAssetClawback: ForeignType.Account,
  FreezeAsset: ForeignType.Asset,
  FreezeAssetAccount: ForeignType.Account,
  CreatedAssetID: ForeignType.Asset,
  CreatedApplicationID: ForeignType.Application,
  ApplicationArgs: `${StackType.bytes}[]`,
  Applications: `${ForeignType.Application}[]`,
  Assets: `${ForeignType.Asset}[]`,
  Accounts: `${ForeignType.Account}[]`,
};

interface OpSpec {
  Opcode: number;
  Name: string;
  Size: number;
  Doc: string;
  Groups: string[];
  Args: string;
  Returns: string;
  DocExtra: string;
  ImmediateNote: string;
  ArgEnum: string[];
  ArgEnumTypes: string;
}

interface StorageProp {
  type: string;
  key?: string;
  defaultSize?: number;
  keyType: string;
  valueType: string;
}

interface Subroutine {
  name: string;
  returnType: string;
  decorators?: string[];
}

// These should probably be types rather than strings?
function isNumeric(t: string): boolean {
  return ['uint64', 'Asset', 'Application'].includes(t);
}

function isRefType(t: string): boolean {
  return ['Account', 'Asset', 'Application'].includes(t);
}

export default class Compiler {
  teal: string[];

  private scratch: any;

  private scratchIndex: number;

  private ifCount: number;

  filename?: string;

  content: string;

  private nodeProcessingErrors: any[];

  private frame: any;

  private currentSubroutine: Subroutine;

  abi: any;

  private storageProps: { [key: string]: StorageProp };

  private lastType: string | undefined;

  private contractClasses: string[];

  name: string;

  pcToLine: { [key: number]: number };

  lineToPc: { [key: number]: number[] };

  private lastSourceCommentRange: [number, number];

  private comments: TSESTree.Comment[];

  private readonly OP_PARAMS: { [type: string]: any[] } = {
    Account: [
      ...this.getOpParamObjects('acct_params_get'),
      ...this.getOpParamObjects('asset_holding_get'),
    ],
    Application: [
      ...this.getOpParamObjects('app_params_get'),
      {
        name: 'Global',
        type: 'any',
        args: 2,
        fn: () => {
          this.maybeValue('app_global_get_ex', StackType.bytes);
        },
      },
    ],
    txn: this.getOpParamObjects('txn'),
    global: this.getOpParamObjects('global'),
    itxn: this.getOpParamObjects('itxn'),
    gtxns: this.getOpParamObjects('gtxns'),
  };

  private storageFunctions: {[type: string]: {[f: string]: Function}} = {
    global: {
      get: (node: any) => {
        const {
          valueType, keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.push('app_global_get', valueType);
      },
      put: (node: any) => {
        const {
          valueType, keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.processNode(node.arguments[key ? 0 : 1]);

        this.push('app_global_put', valueType);
      },
      delete: (node: any) => {
        const {
          keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.pushVoid('app_global_del');
      },
      exists: (node: any) => {
        const {
          keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        this.pushVoid('txna Applications 0');

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.hasMaybeValue('app_global_get_ex');
      },
    },
    local: {
      get: (node: any) => {
        const {
          valueType, keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        this.processNode(node.arguments[0]);

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[1]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.push('app_local_get', valueType);
      },
      put: (node: any) => {
        const {
          valueType, keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        this.processNode(node.arguments[0]);

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[1]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.processNode(node.arguments[key ? 1 : 2]);

        this.push('app_local_put', valueType);
      },
      delete: (node: any) => {
        const {
          keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        this.processNode(node.arguments[0]);

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[1]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.pushVoid('app_local_del');
      },
      exists: (node: any) => {
        const {
          keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;
        this.processNode(node.arguments[0]);
        this.pushVoid('txna Applications 0');

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[1]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.hasMaybeValue('app_local_get_ex');
      },
    },
    box: {
      get: (node: any) => {
        const {
          valueType, keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.maybeValue('box_get', valueType);
        if (isNumeric(valueType)) this.pushVoid('btoi');
      },
      put: (node: any) => {
        const {
          valueType, keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.processNode(node.arguments[key ? 0 : 1]);
        if (isNumeric(valueType)) this.pushVoid('itob');

        this.push('box_put', valueType);
      },
      delete: (node: any) => {
        const {
          keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.pushVoid('box_del');
      },
      exists: (node: any) => {
        const {
          keyType, key,
        } = this.storageProps[node.callee.object.property.name] as StorageProp;

        if (key) {
          this.pushVoid(`byte "${key}"`);
        } else {
          this.processNode(node.arguments[0]);
          if (isNumeric(keyType)) this.pushVoid('itob');
        }

        this.hasMaybeValue('box_get');
      },
    },
  };

  private andCount: number = 0;

  private orCount: number = 0;

  constructor(content: string, className: string, filename?: string) {
    this.filename = filename;
    this.content = content;
    this.teal = ['#pragma version 8', 'b main'];
    this.scratch = {};
    this.scratchIndex = 0;
    this.ifCount = 0;
    this.nodeProcessingErrors = [];
    this.frame = {};
    this.currentSubroutine = { name: '', returnType: '' };
    this.storageProps = {};
    this.contractClasses = [];
    this.name = className;
    this.pcToLine = {};
    this.lineToPc = {};
    this.lastSourceCommentRange = [0, 0];
    this.comments = [];
  }

  getOpParamObjects(op: string) {
    const opSpec = langspec.Ops.find((o) => o.Name === op);
    if (opSpec === undefined) {
      throw new Error(`Unknown op ${op}`);
    }

    return opSpec.ArgEnum!.map((arg, i) => {
      let fn;
      const type = PARAM_TYPES[arg]
        || opSpec.ArgEnumTypes![i].replace('B', StackType.bytes).replace('U', StackType.uint64);

      if (['txn', 'global', 'itxn', 'gtxns'].includes(op)) {
        fn = () => this.push(`${op} ${arg}`, type);
      } else {
        fn = () => this.maybeValue(`${op} ${arg}`, type);
      }
      return {
        name: arg,
        args: opSpec.Args?.length || 0,
        fn,
      };
    });
  }

  async compile() {
    const tree = parser.parse(this.content, {
      range: true,
      loc: true,
      comment: true,
    });

    tree.body.forEach((body: TSESTree.ProgramStatement) => {
      if (body.type !== AST_NODE_TYPES.ClassDeclaration) return;
      if (body.superClass === null || body.superClass.type !== AST_NODE_TYPES.Identifier) return;

      if (body.superClass.name === CONTRACT_SUBCLASS) {
        this.contractClasses.push(body.id.name);

        if (body.id.name === this.name) {
          this.comments = tree.comments
            .filter(
              (c) => c.loc.start.line >= body.loc.start.line
                && c.loc.end.line <= body.loc.end.line
                && c.value.startsWith('/'),
            )
            .reverse();

          this.abi = { name: body.id.name, desc: '', methods: [] };

          this.processNode(body);
        }
      }
    });

    if (!this.teal.includes('main:')) {
      this.pushVoid('main:');
      this.routeAbiMethods();
    }

    this.teal = await Promise.all(
      this.teal.map(async (t) => {
        if (t.includes('PENDING_COMPILE: ')) {
          const c = new Compiler(this.content, t.split(' ')[1], this.filename);
          await c.compile();
          const program = await c.algodCompile();
          return `byte b64 ${program}`;
        }
        return t;
      }),
    );
  }

  private push(teal: string, type: string) {
    this.teal.push(teal);
    if (type !== 'void') this.lastType = type;
  }

  private pushVoid(teal: string) {
    this.push(teal, 'void');
  }

  private pushMethod(name: string, args: string[], returns: string) {
    const abiArgs = args.map((a) => a.toLowerCase());

    let abiReturns = returns.toLowerCase();

    switch (abiReturns) {
      case 'application':
        abiReturns = 'uint64';
        break;
      case 'account':
        abiReturns = 'address';
        break;
      default:
        break;
    }

    const sig = `${name}(${abiArgs.join(',')})${abiReturns}`;
    this.pushVoid(`method "${sig}"`);
  }

  private routeAbiMethods() {
    this.abi.methods.forEach((m: any) => {
      this.pushMethod(
        m.name,
        m.args.map((a: any) => a.type),
        m.returns.type,
      );
    });
    this.pushVoid('txna ApplicationArgs 0');
    this.pushVoid(
      `match ${this.abi.methods
        .map((m: any) => `abi_route_${m.name}`)
        .join(' ')}`,
    );
  }

  private maybeValue(opcode: string, type: string) {
    this.pushVoid(opcode);
    this.push('assert', type);
  }

  private hasMaybeValue(opcode: string) {
    this.pushVoid(opcode);
    this.pushVoid('swap');
    this.push('pop', StackType.uint64);
  }

  // eslint-disable-next-line class-methods-use-this
  private getTypeFromAnnotation(typeAnnotation: any): StackType | string {
    let type = StackType.any;

    switch (typeAnnotation.type) {
      case AST_NODE_TYPES.TSNumberKeyword:
        type = StackType.uint64;
        break;
      case AST_NODE_TYPES.TSStringKeyword:
        type = StackType.bytes;
        break;
      case AST_NODE_TYPES.TSVoidKeyword:
        type = StackType.none;
        break;
      default:
        type = typeAnnotation.typeName.name;
        break;
    }

    return type;
  }

  private popComments(line: number): void {
    if (this.comments.at(-1) && this.comments.at(-1)!.loc.start.line <= line) {
      this.teal.push(`/${this.comments.pop()!.value}`);
      return this.popComments(line);
    }

    return undefined;
  }

  private processNode(node: TSESTree.Node) {
    this.popComments(node.loc.start.line);

    try {
      switch (node.type) {
        // Contract organizational
        case AST_NODE_TYPES.ClassBody:
          this.processClassBody(node);
          break;
        case AST_NODE_TYPES.ClassDeclaration:
          this.processClassDeclaration(node);
          break;
        case AST_NODE_TYPES.PropertyDefinition:
          this.processPropertyDefinition(node);
          break;
        case AST_NODE_TYPES.MethodDefinition:
          this.processMethodDefinition(node);
          break;
        case AST_NODE_TYPES.MemberExpression:
          this.processMemberExpression(node);
          break;
        case AST_NODE_TYPES.TSAsExpression:
          this.processTSAsExpression(node);
          break;
        case AST_NODE_TYPES.NewExpression:
          this.processNewExpression(node);
          break;

        // Vars/Consts
        case AST_NODE_TYPES.Identifier:
          this.processIdentifier(node);
          break;
        case AST_NODE_TYPES.VariableDeclaration:
          this.processVariableDeclaration(node);
          break;
        case AST_NODE_TYPES.VariableDeclarator:
          this.processVariableDeclarator(node);
          break;
        case AST_NODE_TYPES.Literal:
          this.processLiteral(node);
          break;

        // Logical
        case AST_NODE_TYPES.BlockStatement:
          this.processBlockStatement(node);
          break;
        case AST_NODE_TYPES.IfStatement:
          this.processIfStatement(node);
          break;
        case AST_NODE_TYPES.UnaryExpression:
          this.processUnaryExpression(node);
          break;
        case AST_NODE_TYPES.BinaryExpression:
          this.processBinaryExpression(node);
          break;
        case AST_NODE_TYPES.LogicalExpression:
          this.processLogicalExpression(node);
          break;
        case AST_NODE_TYPES.CallExpression:
          this.processCallExpression(node);
          break;
        case AST_NODE_TYPES.ExpressionStatement:
          this.processExpressionStatement(node);
          break;
        case AST_NODE_TYPES.ReturnStatement:
          this.processReturnStatement(node);
          break;

        // unhandled
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    } catch (e: any) {
      if (
        e instanceof TypeError
        && e.message.includes('this[node.type] is not a function')
      ) {
        // @ts-ignore
        this.processErrorNodes.push(node);
        // @ts-ignore
        const errNode = this.processErrorNodes[0];
        e.message = `TEALScript can not process ${errNode.type} at ${
          this.filename
        }:${errNode.loc.start.line}:${
          errNode.loc.start.column
        }\n ${this.content.substring(errNode.range[0], errNode.range[1])}`;
      }
      throw e;
    }
  }

  private processMethodDefinition(node: TSESTree.MethodDefinition) {
    // TODO: raise exception?
    if (node.key.type !== AST_NODE_TYPES.Identifier) return;
    this.currentSubroutine.name = node.key.name;

    // TODO: raise exception for no return val?
    const { returnType } = node.value;
    if (returnType === undefined) return;
    this.currentSubroutine.returnType = this.getTypeFromAnnotation(
      returnType.typeAnnotation,
    );

    if (node.accessibility === 'private') {
      // TODO: error
      if (node.value.type !== AST_NODE_TYPES.FunctionExpression) return;
      this.processSubroutine(node.value);
      return;
    }

    this.currentSubroutine.decorators = node.decorators?.map(
      (d: any) => d.expression.name,
    );

    // TODO: error
    if (node.value.type !== AST_NODE_TYPES.FunctionExpression) return;
    this.processAbiMethod(node.value);
  }

  private processClassBody(node: TSESTree.ClassBody) {
    node.body.forEach((b: TSESTree.ClassElement) => {
      this.processNode(b);
    });
  }

  private processClassDeclaration(node: TSESTree.ClassDeclaration) {
    this.processNode(node.body);
  }

  private processBlockStatement(node: TSESTree.BlockStatement) {
    node.body.forEach((b: any) => {
      this.processNode(b);
    });
  }

  private processReturnStatement(node: TSESTree.ReturnStatement) {
    this.addSourceComment(node);
    if (node.argument !== null) this.processNode(node.argument);

    if (isNumeric(this.currentSubroutine.returnType)) { this.pushVoid('itob'); }

    this.pushVoid('byte 0x151f7c75');
    this.pushVoid('swap');
    this.pushVoid('concat');
    this.pushVoid('log');
  }

  private processBinaryExpression(node: TSESTree.BinaryExpression) {
    this.processNode(node.left);
    const leftType = this.lastType!;
    this.processNode(node.right);

    if (leftType !== this.lastType) throw new Error(`Type mismatch (${leftType} !== ${this.lastType})`);

    const operator = node.operator.replace('===', '==').replace('!==', '!=');
    if (this.lastType === StackType.uint64) {
      this.push(operator, StackType.uint64);
    } else if (this.lastType.startsWith('uint') || this.lastType.startsWith('uifxed')) {
      this.push(`b${operator}`, leftType);
    } else {
      this.push(operator, StackType.uint64);
    }
  }

  private processLogicalExpression(node: TSESTree.LogicalExpression) {
    this.processNode(node.left);

    let label: string;

    if (node.operator === '&&') {
      label = `skip_and${this.andCount}`;
      this.andCount += 1;

      this.pushVoid('dup');
      this.pushVoid(`bz ${label}`);
    } else if (node.operator === '||') {
      label = `skip_or${this.orCount}`;
      this.orCount += 1;

      this.pushVoid('dup');
      this.pushVoid(`bnz ${label}`);
    }

    this.processNode(node.right);
    this.push(node.operator, StackType.uint64);
    this.pushVoid(`${label!}:`);
  }

  private processIdentifier(node: TSESTree.Identifier) {
    if (this.contractClasses.includes(node.name)) {
      this.pushVoid(`PENDING_COMPILE: ${node.name}`);
      return;
    }
    const target = this.frame[node.name] || this.scratch[node.name];
    const opcode = this.frame[node.name] ? 'frame_dig' : 'load';

    this.push(
      `${opcode} ${target.index} // ${node.name}: ${target.type}`,
      target.type,
    );
  }

  private processNewExpression(node: TSESTree.NewExpression) {
    node.arguments.forEach((a: TSESTree.CallExpressionArgument) => {
      this.processNode(a);
    });

    // TODO: error?
    if (node.callee.type !== AST_NODE_TYPES.Identifier) return;

    this.lastType = node.callee.name;
  }

  private processTSAsExpression(node: TSESTree.TSAsExpression) {
    this.processNode(node.expression);

    const type = this.getTypeFromAnnotation(node.typeAnnotation);
    if (type.startsWith('uint') && type !== this.lastType) {
      const typeBitWidth = parseInt(type.replace('uint', ''), 10);
      const lastBitWidth = parseInt(this.lastType!.replace('uint', ''), 10);

      // eslint-disable-next-line no-console
      if (lastBitWidth > typeBitWidth) console.warn('WARNING: Converting value from ', this.lastType, 'to ', type, 'may result in loss of precision');

      if (this.lastType === 'uint64') this.pushVoid('itob');
      this.pushVoid(`byte 0x${'FF'.repeat(typeBitWidth / 8)}`);
      this.pushVoid('b&');
    }

    this.lastType = type;
  }

  private processVariableDeclaration(node: TSESTree.VariableDeclaration) {
    node.declarations.forEach((d: any) => {
      this.processNode(d);
    });
  }

  private processVariableDeclarator(node: TSESTree.VariableDeclarator) {
    this.addSourceComment(node);

    // TODO: error
    if (node.id.type !== AST_NODE_TYPES.Identifier) return;
    const { name } = node.id;

    // TODO: error
    if (node.init === null) return;

    this.processNode(node.init);

    // TODO: only a subset of Expression union types have a `value` prop
    // @ts-ignore
    let varType: string = typeof node.init.value;
    if (varType === 'undefined' && this.lastType) varType = this.lastType;

    if (numberTypes.includes(node.init.type)) {
      varType = 'uint64';
    } else if (
      node.init.type === AST_NODE_TYPES.NewExpression
      && node.init.callee.type === AST_NODE_TYPES.Identifier) {
      varType = node.init.callee.name;
    } else if (node.init.type === AST_NODE_TYPES.TSAsExpression) {
      varType = this.getTypeFromAnnotation(node.init.typeAnnotation);
    }

    varType = varType.replace('number', 'uint64');

    this.scratch[name] = {
      index: this.scratchIndex,
      type: varType,
    };

    this.pushVoid(`store ${this.scratchIndex} // ${name}: ${varType}`);
    this.scratchIndex += 1;
  }

  private processExpressionStatement(node: TSESTree.ExpressionStatement) {
    this.processNode(node.expression);
  }

  private processCallExpression(node: TSESTree.CallExpression) {
    this.addSourceComment(node);
    const opcodeNames = langspec.Ops.map((o) => o.Name);
    // @ts-ignore
    const methodName = node.callee?.property?.name || node.callee.name;

    // @ts-ignore
    if (node.callee.object === undefined) {
      if (opcodeNames.includes(methodName)) {
        this.processOpcode(node);
      } else if (TXN_METHODS.includes(methodName)) {
        this.processTransaction(node);
      } else if (['addr'].includes(methodName)) {
        // @ts-ignore
        this.push(`addr ${node.arguments[0].value}`, ForeignType.Account);
      } else if (['method'].includes(methodName)) {
        // @ts-ignore
        this.push(`method "${node.arguments[0].value}"`, StackType.bytes);
      }
      // @ts-ignore
    } else if (node.callee.object.type === AST_NODE_TYPES.ThisExpression) {
      const preArgsType = this.lastType;
      node.arguments.forEach((a: any) => this.processNode(a));
      this.lastType = preArgsType;
      this.pushVoid(`callsub ${methodName}`);
    } else if (
      // @ts-ignore
      Object.keys(this.storageProps).includes(node.callee.object.property?.name)
    ) {
      this.processStorageCall(node);
    } else {
      // @ts-ignore
      if (node.callee.object.type === AST_NODE_TYPES.Identifier) {
        this.processNode(node.callee);
      } else {
        // @ts-ignore
        this.processNode(node.callee.object);
      }
      const preArgsType = this.lastType;
      node.arguments.forEach((a: any) => this.processNode(a));
      this.lastType = preArgsType;

      // @ts-ignore
      this.tealFunction(this.lastType!, node.callee.property.name);
    }
  }

  private processIfStatement(node: TSESTree.IfStatement, elseIfCount: number = 0) {
    let labelPrefix: string;

    if (elseIfCount === 0) {
      labelPrefix = `if${this.ifCount}`;
      this.pushVoid(`// ${labelPrefix}_condition`);
    } else {
      labelPrefix = `if${this.ifCount}_elseif${elseIfCount}`;
      this.pushVoid(`${labelPrefix}_condition:`);
    }

    this.addSourceComment(node.test);
    this.processNode(node.test);

    if (node.alternate == null) {
      this.pushVoid(`bz if${this.ifCount}_end`);
      this.pushVoid(`// ${labelPrefix}_consequent`);
      this.processNode(node.consequent);
    } else if (node.alternate.type === AST_NODE_TYPES.IfStatement) {
      this.pushVoid(`bz if${this.ifCount}_elseif${elseIfCount + 1}_condition`);
      this.pushVoid(`// ${labelPrefix}_consequent`);
      this.processNode(node.consequent);
      this.pushVoid(`b if${this.ifCount}_end`);
      this.processIfStatement(node.alternate, elseIfCount + 1);
    } else if (node.alternate.type === AST_NODE_TYPES.BlockStatement) {
      this.pushVoid(`bz if${this.ifCount}_else`);
      this.pushVoid(`// ${labelPrefix}_consequent`);
      this.processNode(node.consequent);
      this.pushVoid(`b if${this.ifCount}_end`);
      this.pushVoid(`if${this.ifCount}_else:`);
      this.processNode(node.alternate);
    } else {
      this.pushVoid(`bz if${this.ifCount}_end`);
      this.processNode(node.alternate);
    }

    if (elseIfCount === 0) {
      this.pushVoid(`if${this.ifCount}_end:`);
      this.ifCount += 1;
    }
  }

  private processUnaryExpression(node: TSESTree.UnaryExpression) {
    this.processNode(node.argument);
    this.push(node.operator, 'uint64');
  }

  private processPropertyDefinition(node: TSESTree.PropertyDefinition) {
    // @ts-ignore
    const klass = node.value.callee.name as string;

    if (['BoxMap', 'GlobalMap', 'LocalMap'].includes(klass)) {
      const props: StorageProp = {
        type: klass.toLocaleLowerCase().replace('map', ''),
        keyType: this.getTypeFromAnnotation(
          // @ts-ignore
          node.value.typeParameters.params[0],
        ),
        valueType: this.getTypeFromAnnotation(
          // @ts-ignore
          node.value.typeParameters.params[1],
        ),
      };

      // @ts-ignore
      if (node.value.arguments[0]) {
        // @ts-ignore
        const sizeProp = node.value.arguments[0].properties.find(
          (p: any) => p.key.name === 'defaultSize',
        );
        if (sizeProp) props.defaultSize = sizeProp.value.value;
      }

      // @ts-ignore
      this.storageProps[node.key.name] = props;
    } else if (['BoxReference', 'GlobalReference', 'LocalReference'].includes(klass)) {
      // @ts-ignore
      const keyProp = node.value.arguments[0].properties.find((p: any) => p.key.name === 'key');

      const props: StorageProp = {
        type: klass.toLowerCase().replace('reference', ''),
        key: keyProp.value.value,
        keyType: 'string',
        valueType: this.getTypeFromAnnotation(
          // @ts-ignore
          node.value.typeParameters.params[0],
        ),
      };

      // @ts-ignore
      const sizeProp = node.value.arguments[0].properties.find(
        (p: any) => p.key.name === 'defaultSize',
      );
      if (sizeProp) props.defaultSize = sizeProp.value.value;

      // @ts-ignore
      this.storageProps[node.key.name] = props;
    } else {
      throw new Error();
    }
  }

  private processLiteral(node: TSESTree.Literal) {
    const litType = typeof node.value;
    if (litType === 'string') {
      this.push(`byte "${node.value}"`, StackType.bytes);
    } else {
      this.push(`int ${node.value}`, StackType.uint64);
    }
  }

  private processMemberExpression(node: TSESTree.MemberExpression) {
    const chain = this.getChain(node).reverse();

    chain.push(node);

    chain.forEach((n: any) => {
      if (this.lastType?.endsWith('[]')) {
        this.push(`${this.teal.pop()} ${n.property.value}`, this.lastType.replace('[]', ''));
        return;
      }

      if (n.type === AST_NODE_TYPES.CallExpression) {
        this.processNode(n);
        return;
      }

      if (n.object?.name === 'globals') {
        this.tealFunction('global', n.property.name);
        return;
      }

      if (this.frame[n.object?.name] || this.scratch[n.object?.name]) {
        this.processStorageExpression(n);
        return;
      }

      if (n.object?.type === AST_NODE_TYPES.ThisExpression) {
        switch (n.property.name) {
          case 'txnGroup':
            this.lastType = 'GroupTxn';
            break;
          case 'app':
            this.lastType = 'Application';
            this.pushVoid('txna Applications 0');
            break;
          default:
            this.lastType = n.property.name;
            break;
        }

        return;
      }

      if (n.property.type !== AST_NODE_TYPES.Identifier) {
        const prevType = this.lastType;
        this.processNode(n.property);
        this.lastType = prevType;
        return;
      }

      const { name } = n.property;

      this.tealFunction(this.lastType!, name);
    });
  }

  private processSubroutine(fn: TSESTree.FunctionExpression, abi: boolean = false) {
    this.pushVoid(`${this.currentSubroutine.name}:`);
    const lastFrame = JSON.parse(JSON.stringify(this.frame));
    this.frame = {};

    this.pushVoid(
      `proto ${fn.params.length} ${
        this.currentSubroutine.returnType === 'void' || abi ? 0 : 1
      }`,
    );
    let frameIndex = 0;
    fn.params.reverse().forEach((p: any) => {
      const type = this.getTypeFromAnnotation(p.typeAnnotation.typeAnnotation);

      frameIndex -= 1;
      this.frame[p.name] = {};
      this.frame[p.name].index = frameIndex;
      this.frame[p.name].type = type;
    });

    this.processNode(fn.body);
    this.pushVoid('retsub');
    this.frame = lastFrame;
  }

  private processAbiMethod(fn: TSESTree.FunctionExpression) {
    let argCount = 0;
    this.pushVoid(`abi_route_${this.currentSubroutine.name}:`);
    const args: any[] = [];

    if (this.currentSubroutine.decorators) {
      this.currentSubroutine.decorators.forEach((d, i) => {
        switch (d) {
          case 'createApplication':
            this.pushVoid('txn ApplicationID');
            this.pushVoid('int 0');
            break;
          case 'noOp':
            this.pushVoid('int NoOp');
            this.pushVoid('txn OnCompletion');
            break;
          case 'optIn':
            this.pushVoid('int OptIn');
            this.pushVoid('txn OnCompletion');
            break;
          case 'closeOut':
            this.pushVoid('int CloseOut');
            this.pushVoid('txn OnCompletion');
            break;
          case 'updateApplication':
            this.pushVoid('int UpdateApplication');
            this.pushVoid('txn OnCompletion');
            break;
          case 'deleteApplication':
            this.pushVoid('int DeleteApplication');
            this.pushVoid('txn OnCompletion');
            break;
          default:
            throw new Error(`Unknown decorator: ${d}`);
        }

        this.pushVoid('==');
        if (i > 0) this.pushVoid('||');
      });

      this.pushVoid('assert');
    } else {
      this.pushVoid('txn OnCompletion');
      this.pushVoid('int NoOp');
      this.pushVoid('==');
      this.pushVoid('assert');
    }

    let gtxnIndex = fn.params.filter((p: any) => this.getTypeFromAnnotation(
      p.typeAnnotation.typeAnnotation,
    ).includes('Txn')).length;

    gtxnIndex += 1;

    fn.params.forEach((p: TSESTree.Parameter) => {
      // @ts-ignore
      const type = this.getTypeFromAnnotation(p.typeAnnotation.typeAnnotation);
      let abiType = type;

      if (type.includes('Txn')) {
        switch (type) {
          case 'PayTxn':
            abiType = TransactionType.PaymentTx;
            break;
          case 'AssetTransferTxn':
            abiType = TransactionType.AssetTransferTx;
            break;
          default:
            break;
        }
      } else {
        this.pushVoid(`txna ApplicationArgs ${(argCount += 1)}`);
      }

      if (type === StackType.uint64) {
        this.pushVoid('btoi');
      } else if (isRefType(type)) {
        this.pushVoid('btoi');
        this.pushVoid(`txnas ${type}s`);
      } else if (type.includes('Txn')) {
        this.pushVoid('txn GroupIndex');
        this.pushVoid(`int ${(gtxnIndex -= 1)}`);
        this.pushVoid('-');
      }

      // @ts-ignore
      args.push({ name: p.name, type: abiType.toLocaleLowerCase(), desc: '' });
    });

    const returnType = this.currentSubroutine.returnType
      .toLocaleLowerCase()
      .replace(/asset|application/, 'uint64')
      .replace('account', 'address');

    this.abi.methods.push({
      name: this.currentSubroutine.name,
      args,
      desc: '',
      returns: { type: returnType, desc: '' },
    });

    this.pushVoid(`callsub ${this.currentSubroutine.name}`);
    this.pushVoid('int 1');
    this.pushVoid('return');
    this.processSubroutine(fn, true);
  }

  private processOpcode(node: any) {
    const opSpec = langspec.Ops.find(
      (o) => o.Name === node.callee.name,
    ) as OpSpec;
    let line: string[] = [node.callee.name];

    if (opSpec.Size === 1) {
      const preArgsType = this.lastType;
      node.arguments.forEach((a: any) => this.processNode(a));
      this.lastType = preArgsType;
    } else if (opSpec.Size === 0) {
      line = line.concat(node.arguments.map((a: any) => a.value));
    } else {
      line = line.concat(
        node.arguments.slice(0, opSpec.Size - 1).map((a: any) => a.value),
      );
    }

    this.pushVoid(line.join(' '));
  }

  private processStorageCall(node: any) {
    const op = node.callee.property.name;
    const { type } = this.storageProps[node.callee.object.property.name] as StorageProp;
    this.storageFunctions[type][op](node);
  }

  private processTransaction(node: any) {
    let txnType = '';

    switch (node.callee.name) {
      case 'sendPayment':
        txnType = TransactionType.PaymentTx;
        break;
      case 'sendAssetTransfer':
        txnType = TransactionType.AssetTransferTx;
        break;
      case 'sendMethodCall':
      case 'sendAppCall':
        txnType = TransactionType.ApplicationCallTx;
        break;
      default:
        break;
    }

    this.pushVoid('itxn_begin');
    this.pushVoid(`int ${txnType}`);
    this.pushVoid('itxn_field TypeEnum');

    const nameProp = node.arguments[0].properties.find(
      (p: any) => p.key.name === 'name',
    );

    if (nameProp) {
      const argTypes = node.typeParameters.params[0].elementTypes.map(
        (t: any) => this.getTypeFromAnnotation(t),
      );
      const returnType = this.getTypeFromAnnotation(
        node.typeParameters.params[1],
      );
      this.pushVoid(
        `method "${nameProp.value.value}(${argTypes
          .join(',')
          .toLowerCase()})${returnType.toLowerCase()}"`,
      );
      this.pushVoid('itxn_field ApplicationArgs');
    }

    node.arguments[0].properties.forEach((p: any) => {
      const key = p.key.name;
      if (key !== 'name') this.addSourceComment(p);

      if (key === 'name') {
        // do nothing
      } else if (key === 'OnCompletion') {
        this.pushVoid(`int ${p.value.value}`);
        this.pushVoid('itxn_field OnCompletion');
      } else if (key === 'methodArgs') {
        const argTypes = node.typeParameters.params[0].elementTypes.map(
          (t: any) => this.getTypeFromAnnotation(t),
        );
        let accountIndex = 1;
        let appIndex = 1;
        let assetIndex = 0;

        p.value.elements.forEach((e: any, i: number) => {
          if (argTypes[i] === ForeignType.Account) {
            this.processNode(e);
            this.pushVoid('itxn_field Accounts');
            this.pushVoid(`int ${accountIndex}`);
            this.pushVoid('itob');
            accountIndex += 1;
          } else if (argTypes[i] === ForeignType.Asset) {
            this.processNode(e);
            this.pushVoid('itxn_field Assets');
            this.pushVoid(`int ${assetIndex}`);
            this.pushVoid('itob');
            assetIndex += 1;
          } else if (argTypes[i] === ForeignType.Application) {
            this.processNode(e);
            this.pushVoid('itxn_field Applications');
            this.pushVoid(`int ${appIndex}`);
            this.pushVoid('itob');
            appIndex += 1;
          } else if (argTypes[i] === StackType.uint64) {
            this.processNode(e);
            this.pushVoid('itob');
          } else {
            this.processNode(e);
          }
          this.pushVoid('itxn_field ApplicationArgs');
        });
      } else if (p.value.type === AST_NODE_TYPES.ArrayExpression) {
        p.value.elements.forEach((e: any) => {
          this.processNode(e);
          this.pushVoid(`itxn_field ${capitalizeFirstChar(key)}`);
        });
      } else {
        this.processNode(p.value);
        this.pushVoid(`itxn_field ${capitalizeFirstChar(key)}`);
      }
    });

    this.pushVoid('itxn_submit');
  }

  private processStorageExpression(node: any) {
    const target = this.frame[node.object.name] || this.scratch[node.object.name];
    const opcode = this.frame[node.object.name] ? 'frame_dig' : 'load';

    this.push(
      `${opcode} ${target.index} // ${node.object.name}: ${target.type}`,
      target.type,
    );

    this.tealFunction(target.type, node.property.name, true);
  }

  private getChain(node: any, chain: any[] = []): any[] {
    if (node.object.type === AST_NODE_TYPES.MemberExpression) {
      chain.push(node.object);
      return this.getChain(node.object, chain);
    }
    if (node.object.type === AST_NODE_TYPES.CallExpression) {
      chain.push(node.object);
      return this.getChain(node.object.callee, chain);
    }
    return chain;
  }

  private tealFunction(calleeType: string, name: string, checkArgs: boolean = false): void {
    let type = calleeType;
    if (type.includes('Txn')) {
      type = 'gtxns';
    }

    if (!name.startsWith('has')) {
      const paramObj = this.OP_PARAMS[type].find((p) => {
        let paramName = p.name.replace(/^Acct/, '');

        if (type === ForeignType.Application) paramName = paramName.replace(/^App/, '');
        if (type === ForeignType.Asset) paramName = paramName.replace(/^Asset/, '');
        return paramName === capitalizeFirstChar(name);
      });

      if (!paramObj) throw new Error(`Unknown method: ${type}.${name}`);

      if (!checkArgs || paramObj.args === 1) {
        paramObj.fn();
      }
      return;
    }

    switch (name) {
      case 'hasBalance':
        this.hasMaybeValue('acct_params_get AcctBalance');
        return;
      case 'hasAsset':
        if (!checkArgs) {
          this.hasMaybeValue('asset_holding_get AssetBalance');
        }
        return;
      default:
        throw new Error(`Unknown method: ${type}.${name}`);
    }
  }

  async algodCompile(): Promise<string> {
    const response = await fetch(
      'https://mainnet-api.algonode.cloud/v2/teal/compile?sourcemap=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'X-API-Key': 'a'.repeat(64),
        },
        body: this.prettyTeal(),
      },
    );

    const json = await response.json();

    if (response.status !== 200) {
      throw new Error(`${response.statusText}: ${json.message}`);
    }

    const pcList = json.sourcemap.mappings.split(';').map((m: string) => {
      const decoded = vlq.decode(m);
      if (decoded.length > 2) return decoded[2];
      return undefined;
    });

    let lastLine = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const [pc, lineDelta] of pcList.entries()) {
      // If the delta is not undefined, the lastLine should be updated with
      // lastLine + the delta
      if (lineDelta !== undefined) {
        lastLine += lineDelta;
      }

      if (!(lastLine in this.lineToPc)) this.lineToPc[lastLine] = [];

      this.lineToPc[lastLine].push(pc);
      this.pcToLine[pc] = lastLine;
    }

    return json.result;
  }

  addSourceComment(node: any) {
    if (
      node.range[0] >= this.lastSourceCommentRange[0]
      && node.range[0] <= this.lastSourceCommentRange[1]
    ) { return; }

    const methodName = node.callee?.property?.name || node.callee?.name;
    let content = this.content
      .substring(node.range[0], node.range[1])
      .replace(/\n/g, '\n//');

    if (TXN_METHODS.includes(methodName)) {
      [content] = content.split('\n');
    } else {
      this.lastSourceCommentRange = node.range;
    }

    if (this.filename) { this.pushVoid(`// ${this.filename}:${node.loc.start.line}`); }
    this.pushVoid(`// ${content}`);
  }

  prettyTeal() {
    const output: string[] = [];
    let comments: string[] = [];

    let lastIsLabel: boolean = false;

    this.teal.forEach((t) => {
      if (t.startsWith('//')) {
        comments.push(t);
        return;
      }

      const isLabel = t.split('//')[0].endsWith(':');

      if ((!lastIsLabel && comments.length !== 0) || isLabel) output.push('');

      if (isLabel || t.startsWith('#')) {
        comments.forEach((c) => output.push(c));
        comments = [];
        output.push(t);
        lastIsLabel = true;
      } else {
        comments.forEach((c) => output.push(`\t${c.replace(/\n/g, '\n\t')}`));
        comments = [];
        output.push(`\t${t}`);
        lastIsLabel = false;
      }
    });

    return output.join('\n');
  }
}
