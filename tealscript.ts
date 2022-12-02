/* eslint-disable max-classes-per-file */
import * as fs from 'fs';
import * as parser from '@typescript-eslint/typescript-estree';
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree';
import * as langspec from './langspec.json';

export interface OpSpec {
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

export class Account {
  // @ts-ignore
  balance: number;

  // @ts-ignore
  hasBalance: number;
}

export class Contract {
  // @ts-ignore
  box: {[key: string]: string};

  // @ts-ignore
  btoi(bytes: string | Account): number {}

  // @ts-ignore
  itob(int: number): string {}

  // @ts-ignore
  log(bytes: string | Account): void {}

  // @ts-ignore
  dig(n: number): string | number {}

  // @ts-ignore
  match(...labels: string[]) {}
}

export class Compiler {
  teal: any[];

  scratch: any;

  scratchIndex: number;

  unprocessedNodes: any[];

  functionReturnType: string;

  ifCount: number;

  filename: string;

  content: string;

  processErrorNodes: any[];

  constructor(filename: string) {
    this.filename = filename;
    this.content = fs.readFileSync(this.filename, 'utf-8');
    this.teal = [];
    this.scratch = {};
    this.scratchIndex = 0;
    this.functionReturnType = 'string';
    this.ifCount = 0;
    this.unprocessedNodes = [];
    this.processErrorNodes = [];

    const tree = parser.parse(this.content, { range: true, loc: true });

    tree.body.forEach((body: any) => {
      if (body.type === AST_NODE_TYPES.ClassDeclaration && body.superClass.name === 'Contract') {
        this.processNode(body);
      }
    });
  }

  private maybeValue(opcode: string) {
    this.teal.push(opcode);
    this.teal.push('assert');
  }

  private hasMaybeValue(opcode: string) {
    this.teal.push(opcode);
    this.teal.push('swap');
    this.teal.push('pop');
  }

  private readonly TYPE_FUNCTIONS = {
    Account: {
      balance: () => {
        this.maybeValue('acct_params_get AcctBalance');
      },
      hasBalance: () => {
        this.hasMaybeValue('acct_params_get AcctBalance');
      },
    },
  };

  private processIfStatement(node: any, elseIfCount: number = 0) {
    if (elseIfCount === 0) {
      this.teal.push(`if${this.ifCount}_condition:`);
    } else {
      this.teal.push(`if${this.ifCount}_elseif${elseIfCount}_condition:`);
    }

    this.processNode(node.test);

    if (node.alternate == null) {
      this.teal.push(`bz if${this.ifCount}_end`);
      this.processNode(node.consequent);
    } else if (node.alternate.type === AST_NODE_TYPES.IfStatement) {
      this.teal.push(`bz if${this.ifCount}_elseif${elseIfCount + 1}_condition`);
      this.processNode(node.consequent);
      this.teal.push(`b if${this.ifCount}_end`);
      this.processIfStatement(node.alternate, elseIfCount + 1);
    } else {
      this.teal.push(`bz if${this.ifCount}_end`);
      this.processNode(node.alternate);
    }

    if (elseIfCount === 0) {
      this.teal.push(`if${this.ifCount}_end:`);
      this.ifCount += 1;
    }
  }

  private processFunctionExpression(fn: any) {
    let argCount = -1;
    fn.params.forEach((p: any) => {
      this.teal.push(`txna ApplicationArgs ${argCount += 1}`);
      let type = 'any';

      switch (p.typeAnnotation.typeAnnotation.type) {
        case 'TSNumberKeyword':
          type = 'uint64';
          this.teal.push('btoi');
          break;
        default:
          type = p.typeAnnotation.typeAnnotation.typeName.name;
          if (['Account', 'Asset', 'App'].includes(type)) this.teal.push(`txnas ${type}s`);
          break;
      }

      this.teal.push(`store ${this.scratchIndex} // ${p.name}: ${type}`);
      this.scratch[p.name] = {};
      this.scratch[p.name].index = this.scratchIndex;
      this.scratch[p.name].type = type;
      this.scratchIndex += 1;
    });

    this.functionReturnType = fn.returnType.typeAnnotation.type;
    this.processNode(fn.body);
    this.functionReturnType = 'string';
  }

  private processMethodDefinition(node: any) {
    this.teal.push(`${node.key.name}:`);
    this.processNode(node.value);
  }

  private processClassBody(node: any) {
    node.body.forEach((b: any) => { this.processNode(b); });
  }

  private processClassDeclaration(node: any) {
    this.processNode(node.body);
  }

  private processNode(node: any) {
    try {
      // @ts-ignore
      (this[`process${node.type}`])(node);
    } catch (e) {
      if (!(e instanceof TypeError)) throw e;

      this.processErrorNodes.push(node);
      const errNode = this.processErrorNodes[0];
      e.message = `TEALScript can not process ${errNode.type} at ${this.filename}:${errNode.loc.start.line}:${errNode.loc.start.column}\n ${this.content.substring(errNode.range[0], errNode.range[1])}`;
      throw e;
    }
  }

  private processBlockStatement(node: any) {
    node.body.forEach((b: any) => { this.processNode(b); });
  }

  private processReturnStatement(node: any) {
    this.processNode(node.argument);
    if (['TSNumberKeyword', 'Asset', 'App'].includes(this.functionReturnType)) this.teal.push('itob');

    this.teal.push('byte 0x151f7c75');
    this.teal.push('swap');
    this.teal.push('concat');
  }

  private processBinaryExpression(node: any) {
    this.processNode(node.left);
    this.processNode(node.right);
    this.teal.push(node.operator.replace('===', '=='));
  }

  private processLogicalExpression(node: any) {
    this.processNode(node.left);
    this.processNode(node.right);
    this.teal.push(node.operator);
  }

  private processIdentifier(node: any) {
    const { type, index } = this.scratch[node.name];
    this.teal.push(`load ${index} // ${node.name}: ${type}`);
  }

  private processVariableDeclaration(node: any) {
    node.declarations.forEach((d: any) => { this.processNode(d); });
  }

  private processVariableDeclarator(node: any) {
    const { name } = node.id;

    let varType: string = typeof node.init.value;
    this.processNode(node.init);

    const numberTypes = [AST_NODE_TYPES.LogicalExpression, AST_NODE_TYPES.BinaryExpression];
    if (numberTypes.includes(node.init.type)) {
      varType = 'uint64';
    }

    varType = varType.replace('string', 'bytes').replace('number', 'uint64');

    this.scratch[name] = {
      index: this.scratchIndex,
      type: varType,
    };

    this.teal.push(`store ${this.scratchIndex} // ${name}: ${varType}`);
  }

  private processExpressionStatement(node: any) {
    this.processNode(node.expression);
  }

  private processOpcode(node: any) {
    const opSpec = langspec.Ops.find((o) => o.Name === node.callee.property.name) as OpSpec;
    let line: string[] = [node.callee.property.name];

    if (opSpec.Size === 1) {
      node.arguments.forEach((a: any) => this.processNode(a));
    } else if (opSpec.Size === 0) {
      line = line.concat(node.arguments.map((a: any) => a.value));
    } else {
      line = line.concat(node.arguments.slice(0, opSpec.Size - 1).map((a: any) => a.value));
    }

    this.teal.push(line.join(' '));
  }

  private processCallExpression(node: any) {
    const opcodeNames = langspec.Ops.map((o) => o.Name);

    if (node.callee.object.type === AST_NODE_TYPES.ThisExpression) {
      if (opcodeNames.includes(node.callee.property.name)) {
        this.processOpcode(node);
      } else {
        this.unprocessedNodes.push(node);
      }
    } else {
      this.unprocessedNodes.push(node);
    }
  }

  private processMemberExpression(node: any) {
    const s = this.scratch[node.object.name];
    this.teal.push(`load ${s.index} // ${node.object.name}: ${s.type}`);
    // @ts-ignore
    this.TYPE_FUNCTIONS[this.scratch[node.object.name].type][node.property.name]();
  }

  private processLiteral(node: any) {
    const litType = typeof node.value;
    if (litType === 'string') {
      this.teal.push(`byte "${node.value}"`);
    } else {
      this.teal.push(`int ${node.value}`);
    }
  }
}
