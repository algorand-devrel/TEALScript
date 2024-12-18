/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */

// https://stackoverflow.com/a/69288824
type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

declare type widths =
  | 8
  | 16
  | 24
  | 32
  | 40
  | 48
  | 56
  | 64
  | 72
  | 80
  | 88
  | 96
  | 104
  | 112
  | 120
  | 128
  | 136
  | 144
  | 152
  | 160
  | 168
  | 176
  | 184
  | 192
  | 200
  | 208
  | 216
  | 224
  | 232
  | 240
  | 248
  | 256
  | 264
  | 272
  | 280
  | 288
  | 296
  | 304
  | 312
  | 320
  | 328
  | 336
  | 344
  | 352
  | 360
  | 368
  | 376
  | 384
  | 392
  | 400
  | 408
  | 416
  | 424
  | 432
  | 440
  | 448
  | 456
  | 464
  | 472
  | 480
  | 488
  | 496
  | 504
  | 512;

declare type precisions =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100
  | 101
  | 102
  | 103
  | 104
  | 105
  | 106
  | 107
  | 108
  | 109
  | 110
  | 111
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117
  | 118
  | 119
  | 120
  | 121
  | 122
  | 123
  | 124
  | 125
  | 126
  | 127
  | 128
  | 129
  | 130
  | 131
  | 132
  | 133
  | 134
  | 135
  | 136
  | 137
  | 138
  | 139
  | 140
  | 141
  | 142
  | 143
  | 144
  | 145
  | 146
  | 147
  | 148
  | 149
  | 150
  | 151
  | 152
  | 153
  | 154
  | 155
  | 156
  | 157
  | 158
  | 159
  | 160;

// See https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-branding-and-type-tagging-6cf6e516523d
type Brand<K, T> = K & { __brand?: T };

declare type uint<N extends widths> = Brand<number, `uint${N}`>;
declare type uint8 = uint<8>;
declare type uint16 = uint<16>;
declare type uint32 = uint<32>;
declare type uint64 = uint<64>;
declare type uint128 = uint<128>;
declare type uint256 = uint<256>;

declare function Uint<N extends widths>(value: number | string): uint<N>;

declare type ufixed<N extends widths, M extends precisions> = Brand<number, `ufixed${N}x${M}`>;

declare type byte = { __byte: true };
declare type bytes<N = void> = N extends void ? Brand<string, 'bytes'> : StaticBytes<N>;
declare type bytes32 = StaticArray<byte, 32>;
declare type bytes64 = StaticArray<byte, 64>;

declare type TxnVerificationTests = {
  /** assert that the value is less than the given value */
  lessThan?: IntLike;
  /** assert that the value is less than or equal to the given value */
  lessThanEqualTo?: IntLike;
  /** assert that the value is greater than the given value */
  greaterThan?: IntLike;
  /** assert that the value is greater than or equal to the given value */
  greaterThanEqualTo?: IntLike;
  /** assert that the value is equal to the given value */
  not?: IntLike | BytesLike;
  /** assert that the value is included in the given array. **MUST** be an array literal */
  includedIn?: (IntLike | BytesLike)[];
  /** assert that the value is not included in the given array. **MUST** be an array literal */
  notIncludedIn?: (IntLike | BytesLike)[];
};

declare type CommonTxnVerificationFields = {
  /** The sender of the transaction. This is the account that pays the fee (if non-zero) */
  sender?: Address | TxnVerificationTests;
  /** The fee to pay for the transaction */
  fee?: IntLike | TxnVerificationTests;
  /** The first round that the transaction is valid */
  firstValid?: IntLike | TxnVerificationTests;
  firstValidTime?: IntLike | TxnVerificationTests;
  /** The last round that the transaction is valid */
  lastValid?: IntLike | TxnVerificationTests;
  /** The note field of the transaction */
  note?: BytesLike | TxnVerificationTests;
  lease?: bytes32 | TxnVerificationTests;
  rekeyTo?: Address | TxnVerificationTests;
  groupIndex?: IntLike | TxnVerificationTests;
  txID?: bytes32 | TxnVerificationTests;
};

declare type PayTxnVerificationFields = CommonTxnVerificationFields & {
  receiver?: Address | TxnVerificationTests;
  amount?: IntLike | TxnVerificationTests;
  closeRemainderTo?: Address | TxnVerificationTests;
};

declare type KeyRegTxnVerificationFields = CommonTxnVerificationFields & {
  votePK?: bytes32 | TxnVerificationTests;
  selectionPK?: bytes32 | TxnVerificationTests;
  voteFirst?: IntLike | TxnVerificationTests;
  voteLast?: IntLike | TxnVerificationTests;
  voteKeyDilution?: IntLike | TxnVerificationTests;
  nonparticipation?: boolean | TxnVerificationTests;
};

declare type AssetTransferTxnVerificationFields = CommonTxnVerificationFields & {
  xferAsset?: AssetID | TxnVerificationTests;
  assetAmount?: IntLike | TxnVerificationTests;
  assetSender?: Address | TxnVerificationTests;
  assetReceiver?: Address | TxnVerificationTests;
  assetCloseTo?: Address | TxnVerificationTests;
};

declare type AssetConfigTxnVerificationFields = CommonTxnVerificationFields & {
  configAsset?: IntLike | TxnVerificationTests;
  configAssetTotal?: IntLike | TxnVerificationTests;
  configAssetDecimals?: IntLike | TxnVerificationTests;
  configAssetDefaultFrozen?: boolean | TxnVerificationTests;
  configAssetUnitName?: BytesLike | TxnVerificationTests;
  configAssetName?: BytesLike | TxnVerificationTests;
  configAssetURL?: BytesLike | TxnVerificationTests;
  configAssetMetadataHash?: bytes32 | TxnVerificationTests;
  configAssetManager?: Address | TxnVerificationTests;
  configAssetReserve?: Address | TxnVerificationTests;
  configAssetFreeze?: Address | TxnVerificationTests;
  configAssetClawback?: Address | TxnVerificationTests;
  freezeAsset?: IntLike | TxnVerificationTests;
  freezeAssetAccount?: Address | TxnVerificationTests;
  freezeAssetFrozen?: boolean | TxnVerificationTests;
};

declare type TxnArrayVerificationField<K, T> = { [P in K]?: T };

declare type AppCallTxnVerificationFields = CommonTxnVerificationFields & {
  logs?: TxnArrayVerificationField<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15,
    BytesLike | TxnVerificationTests
  >;
  applicationArgs?: TxnArrayVerificationField<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15,
    BytesLike | TxnVerificationTests
  >;
  accounts?: TxnArrayVerificationField<0 | 1 | 2 | 3, Address | TxnVerificationTests>;
  assets?: TxnArrayVerificationField<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, IntLike | TxnVerificationTests>;
  applications?: TxnArrayVerificationField<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, IntLike | TxnVerificationTests>;
  applicationID?: AppID | TxnVerificationTests;
  onCompletion?: IntLike | TxnVerificationTests;
  numAppArgs?: IntLike | TxnVerificationTests;
  numAccounts?: IntLike | TxnVerificationTests;
  approvalProgram?: BytesLike | TxnVerificationTests;
  clearStateProgram?: BytesLike | TxnVerificationTests;
  numAssets?: IntLike | TxnVerificationTests;
  numApplications?: IntLike | TxnVerificationTests;
  globalNumUint?: IntLike | TxnVerificationTests;
  globalNumByteSlice?: IntLike | TxnVerificationTests;
  localNumUint?: IntLike | TxnVerificationTests;
  localNumByteSlice?: IntLike | TxnVerificationTests;
  extraProgramPages?: IntLike | TxnVerificationTests;
  numLogs?: IntLike | TxnVerificationTests;
  lastLog?: BytesLike | TxnVerificationTests;
  approvalProgramPages?: BytesLike | TxnVerificationTests;
  numApprovalProgramPages?: IntLike | TxnVerificationTests;
  clearStateProgramPages?: BytesLike | TxnVerificationTests;
  numClearStateProgramPages?: IntLike | TxnVerificationTests;
};

declare type TxnVerificationFields = PayTxnVerificationFields &
  KeyRegTxnVerificationFields &
  AssetTransferTxnVerificationFields &
  AssetConfigTxnVerificationFields &
  AppCallTxnVerificationFields & {
    type?: BytesLike | TxnVerificationTests;
    typeEnum?: IntLike | TxnVerificationTests;
  };

/**
 * An Algorand Standard Asset (ASA). `asset` ABI type when used as an argument or return type in a method, `uint64` when in an array or state.
 */
declare class AssetID {
  /** Get an `Asset` instance for the ASA with the given asset index */
  static fromUint64(index: uint64): AssetID;

  /** Asset index 0. Only useful for input validation. */
  static readonly zeroIndex: AssetID;

  /** The asset index */
  readonly id: uint64;

  /** The total number of units of the asset */
  readonly total: uint64;

  /** The number of decimal places to use when displaying the asset */
  readonly decimals: uint64;

  /** Whether the asset is frozen by default when created */
  readonly defaultFrozen: boolean;

  /** The name of the asset. Must be 32 bytes or less. */
  readonly name: string;

  /** The short (ticker) name of the asset (ie. USDC) */
  readonly unitName: string;

  /** The URL of the assets metadata */
  readonly url: string;

  /** The hash of the assets metadata */
  readonly metadataHash: bytes32;

  /** The manager that can update the maanger, freeze, and reserve accounts */
  readonly manager: Address;

  /** The reserve account that holds the assets that are not in circulation */
  readonly reserve: Address;

  /** The freeze account that can freeze or unfreeze other accounts holdings the asset */
  readonly freeze: Address;

  /** The clawback account that can take assets from any account */
  readonly clawback: Address;

  /** The creator of the asset */
  readonly creator: Address;
}

declare class AssetReference extends AssetID {}

/** An Algorand address */
declare class Address {
  /** Create an `Address` instance from the given public key */
  static fromBytes(pubKey: BytesLike): Address;

  /** Create an `Address` instance from a literal base32 Algorand address */
  static fromAddress(address: string): Address;

  /** The zero address: `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ` */
  static readonly zeroAddress: Address;

  /** The accounts current balance (in µALGO) */
  readonly balance: uint64;

  /** Whether the account is in the ledger or not */
  readonly isInLedger: uint64;

  /** The account's current minimum balance require (MBR) (in µALGO) */
  readonly minBalance: uint64;

  /** The number of assets this address is opted in to */
  readonly totalAssets: uint64;

  // eslint-disable-next-line no-use-before-define
  /** Signifies the public key for the keypair that has authority over this address */
  readonly authAddr: Address;

  /** The total number of uint64 values reserved in global and local state across all apps */
  readonly totalNumUint: uint64;

  /** The total number of byte slices reserved in global and local state across all apps */
  readonly totalNumByteSlice: uint64;

  /** The total number of extra application pages reserved across all apps */
  readonly totalExtraAppPages: uint64;

  /** The total number of apps created by this address */
  readonly totalAppsCreated: uint64;

  /** The total number of apps opted in to by this address */
  readonly totalAppsOptedIn: uint64;

  /** The total number of assets created by this address */
  readonly totalAssetsCreated: uint64;

  /** The total number of boxes funded by this address. Only applies to application addreses. */
  readonly totalBoxes: uint64;

  /** The total number of box bytes funded by this address. Only applies to application addreses. */
  readonly totalBoxBytes: uint64;

  /** The balance of the given asset for this address */
  assetBalance(asa: Asset): uint64;

  /** Whether this address is opted into the given address */
  isOptedInToAsset(asa: Asset): boolean;

  /** Whether the given asset is frozen in this address */
  assetFrozen(asa: Asset): uint64;

  /** Whether this address is opted into the given application */
  isOptedInToApp(app: Application): boolean;

  /** Online stake in microalgos */
  voterBalance: uint64;

  /** Had this account opted into block payouts */
  incentiveEligible: boolean;

  /** The last block this account proposed */
  lastProposed: uint64;

  /** The last block this account sent a heartbeat */
  lastHeartbeat: uint64;
}

class AccountReference extends Address {}

type BytesLike = bytes | Address | string;

/** Alias for `Address` that uses `account` encoding for ABI arguments */
class Account extends Address {}

/** A stateful Algorand application */
declare class AppID {
  /** Get an `Application` instance for the application with the given application index */
  static fromUint64(appID: uint64): AppID;

  /** The application index */
  readonly id: uint64;

  /** Application index 0 */
  static readonly zeroIndex: AppID;

  /** The approval program for the application */
  readonly approvalProgram: bytes;

  /** The clear state program for the application */
  readonly clearStateProgram: bytes;

  /** The number of reserved uint64s in global state */
  readonly globalNumUint: uint64;

  /** The number of reserved byteslices in global state */
  readonly globalNumByteSlice: uint64;

  /** The number of reserved uint64s in local state */
  readonly localNumUint: uint64;

  /** The number of reserved byteslices in local state */
  readonly localNumByteSlice: uint64;

  /** The number of extra program pages */
  readonly extraProgramPages: uint64;

  /** The creator of this application */
  readonly creator: Address;

  /** The contract address for this application */
  readonly address: Address;

  /**
   * Get the global state value for the given key. **MUST** use an as expression to specify the value type.
   *
   * @example Get an array from global state
   * ```ts
   * someApp.globalState('someKey') as uint64[];
   * ```
   */
  globalState(key: BytesLike): unknown;

  /**
   * Get the local state value for the given account and key. **MUST** use an as expression to specify the value type.
   *
   * @example Get an array from global state
   * ```ts
   * someApp.localState(this.txn.sender, 'someKey') as uint64[];
   * ```
   */
  localState(account: Address, key: BytesLike): unknown;

  /**
   * Check if the given key exists in the global state
   */
  globalStateExists(key: BytesLike): boolean;

  /**
   * Check if the given key exists in the local state
   */
  localStateExists(account: Address, key: BytesLike): boolean;
}

declare class AppReference extends AppID {}

/** Used to log ARC28 events */
declare class EventLogger<ArgumentTypes extends Object> {
  /** Log the event with the given arguments */
  log(args: ArgumentTypes): void;
}

/** A value saved in box storage */
declare type BoxValue<ValueType> = {
  value: ValueType;
  delete: () => void;
  exists: boolean;
  create(size?: uint64): void;
  replace(offset: uint64, value: bytes): void;
  extract(offset: uint64, length: uint64): bytes;
  size: uint64;
  /**
   * Change the size of the box dding zero bytes to end or removing bytes from the end, as needed.
   * Throws error if the box does not exist or the size is larger than 32,768.
   *
   * @param size The new size of the box
   */
  resize(size: uint64): void;
  /**
   * Remove bytes from the box starting at the given offset and replace them with the given data.
   *
   * @param offset
   * @param length
   * @param data
   */
  splice(offset: uint64, length: uint64, data: bytes): void;
};

/** A single key in box storage */
declare function BoxKey<ValueType>(options?: { key?: string; dynamicSize?: boolean }): BoxValue<ValueType>;

/** A mapping of one type to another in box storage. Each key is a seperate box. */
declare function BoxMap<KeyType, ValueType>(options?: {
  dynamicSize?: boolean;
  prefix?: string;
  allowPotentialCollisions?: boolean;
}): (key: KeyType) => BoxValue<ValueType>;

/** A value saved in global state */
declare type GlobalStateValue<ValueType> = {
  value: ValueType;
  delete: () => void;
  exists: boolean;
};

/** A single key in global state */
declare function GlobalStateKey<ValueType>(options?: { key?: string }): GlobalStateValue<ValueType>;
/** A mapping of one type to another in global state */
declare function GlobalStateMap<KeyType, ValueType>(options: {
  maxKeys: number;
  prefix?: string;
  allowPotentialCollisions?: boolean;
}): (key: KeyType) => GlobalStateValue<ValueType>;

/** A value saved in local state */
declare type LocalStateValue<ValueType> = {
  value: ValueType;
  delete: () => void;
  exists: boolean;
};

/** A single key in local state */
declare function LocalStateKey<ValueType>(options?: { key?: string }): (account: Address) => LocalStateValue<ValueType>;
/** A mapping of one type to another in local state */
declare function LocalStateMap<KeyType, ValueType>(options: {
  maxKeys: number;
  prefix?: string;
  allowPotentialCollisions?: boolean;
}): (account: Address, key: KeyType) => LocalStateValue<ValueType>;

type IntLike = uint64 | AssetID | AppID | boolean | number;

interface CommonTransactionParams {
  /** The fee paid for this transaction */
  fee?: uint64;
  /** The sender of this transaction. This is the account that pays the fee (if non-zero) */
  sender?: Address;
  /** If set, changes the authAddr of `sender` to the given address  */
  rekeyTo?: Address;
  /** The note field for this transaction */
  note?: string;
}

interface CommonOnChainTransactionParams extends Required<CommonTransactionParams> {
  /** The index of this transaction in its group */
  groupIndex: uint64;
  /** The transaction ID for this transaction */
  txID: string;
}

interface AppOnChainTransactionParams extends CommonOnChainTransactionParams {
  /** The asset created by this application call */
  createdAssetID: AssetID;
  /** The application created by this application call */
  createdApplicationID: AppID;
  /** The last log emitted by this application call */
  lastLog: bytes;
  /** The application that was called */
  applicationID: AppID;
  /** The number of application arguments */
  numAppArgs: uint64;
  /** The number of accounts in the foreign accounts array */
  numAccounts: uint64;
  /** The number of assets in the foreign assets array */
  numAssets: uint64;
  /** The number of applications in the foreign applications array */
  numApplications: uint64;
  /** The number of logs emitted by this application call */
  numLogs: uint64;
  /** The number of pages used by the approval program */
  numApprovalProgrammPages: uint64;
  /** The number of pages used by the clear state program */
  numClearStateProgramPages: uint64;
  /**
   * Load the value in the given scratch slot. **MUST** use an `as` expression to specify the value type.
   *
   * @example Loading scratch slot 0
   * ```ts
   * someAppCall.loadScratch(0) as uint64;
   * ```
   */
  loadScratch: (slot: uint64) => unknown;

  /** The last valid round for this transaction */
  lastValid: uint64;

  /** The first valid round for this transaction */
  firstValid: uint64;
}

interface AssetTransferParams extends CommonTransactionParams {
  /** The asset being transfed */
  xferAsset: AssetID;
  /** The amount of the asset being transferred */
  assetAmount: uint64;
  /** The clawback target */
  assetSender?: Address;
  /** The receiver of the asset */
  assetReceiver: Address;
  /** The address to close the asset to */
  assetCloseTo?: Address;
}

interface AssetConfigParams extends CommonTransactionParams {
  configAsset: AssetID;
  configAssetManager?: Address;
  configAssetReserve?: Address;
  configAssetFreeze?: Address;
  configAssetClawback?: Address;
}

interface AssetCreateParams extends CommonTransactionParams {
  configAssetName?: bytes;
  configAssetUnitName?: bytes;
  configAssetTotal: uint64;
  configAssetDecimals?: uint64;
  configAssetManager?: Address;
  configAssetReserve?: Address;
  configAssetFreeze?: Address;
  configAssetClawback?: Address;
  configAssetDefaultFrozen?: uint64;
  configAssetURL?: bytes;
  configAssetMetadataHash?: bytes;
}

interface AssetFreezeParams extends CommonTransactionParams {
  freezeAsset: AssetID;
  freezeAssetAccount: Address;
  freezeAssetFrozen: boolean;
}

interface PaymentParams extends CommonTransactionParams {
  /** The amount, in microALGO, to transfer */
  amount?: uint64;
  /** The address of the receiver */
  receiver?: Address;
  /** If set, bring the sender balance to 0 and send all remaining balance to this address */
  closeRemainderTo?: Address;
}

// eslint-disable-next-line no-shadow
enum OnCompletion {
  NoOp = 0,
  OptIn = 1,
  CloseOut = 2,
  ClearState = 3,
  UpdateApplication = 4,
  DeleteApplication = 5,
}

interface AppParams extends CommonTransactionParams {
  applicationID?: AppID;
  onCompletion?: OnCompletion;
  accounts?: Address[];
  approvalProgram?: BytesLike | BytesLike[];
  applicationArgs?: BytesLike[];
  clearStateProgram?: BytesLike | BytesLike[];
  applications?: Array<AppID>;
  assets?: Array<AssetID>;
  globalNumByteSlice?: uint64;
  globalNumUint?: uint64;
  localNumByteSlice?: uint64;
  localNumUint?: uint64;
  extraProgramPages?: uint64;
}

interface KeyRegParams extends CommonTransactionParams {
  votePk?: bytes;
  selectionPK?: bytes;
  stateProofPk?: bytes;
  voteFirst?: uint64;
  voteLast?: uint64;
  voteKeyDilution?: uint64;
}

interface OnlineKeyRegParams extends CommonTransactionParams {
  votePK: bytes;
  selectionPK: bytes;
  stateProofPK: bytes;
  voteFirst: uint64;
  voteLast: uint64;
  voteKeyDilution: uint64;
}

declare type PayTxn = Required<PaymentParams>;
declare type AssetTransferTxn = Required<AssetTransferParams>;
declare type AppCallTxn = AppOnChainTransactionParams & Required<AppParams>;
declare type KeyRegTxn = Required<KeyRegParams>;
declare type AssetConfigTxn = Required<AssetConfigParams>;
declare type AssetFreezeTxn = Required<AssetFreezeParams>;

type SendMethodCallArgs<T> = {
  [K in keyof T]: T[K] extends PayTxn
    ? InnerPayment
    : T[K] extends AssetTransferTxn
    ? InnerAssetTransfer
    : T[K] extends AppCallTxn
    ? InnerAppCall
    : T[K] extends KeyRegTxn
    ? InnerOnlineKeyRegistration
    : T[K] extends AssetConfigTxn
    ? InnerAssetConfig
    : T[K] extends AssetFreezeTxn
    ? InnerAssetFreeze
    : T[K];
};

type MethodCallParams<ArgsType> = AppParams &
  (ArgsType extends Function
    ? {
        /** ABI method arguments */
        methodArgs?: SendMethodCallArgs<Parameters<ArgsType>>;
      }
    : {
        /** ABI method arguments */
        methodArgs?: SendMethodCallArgs<ArgsType>;
        /** Name of the ABI method */
        name: string;
      });

type ThisTxnParams = AppOnChainTransactionParams & AppParams;

type Txn = PayTxn &
  AssetTransferTxn &
  AppCallTxn &
  KeyRegTxn &
  AssetConfigTxn &
  AssetFreezeTxn & { typeEnum: TransactionType };

declare const globals: {
  minTxnFee: uint64;
  minBalance: uint64;
  maxTxnLife: uint64;
  zeroAddress: Address;
  groupSize: uint64;
  logicSigVersion: uint64;
  round: uint64;
  latestTimestamp: uint64;
  currentApplicationID: AppID;
  creatorAddress: Address;
  currentApplicationAddress: Address;
  groupID: bytes32;
  opcodeBudget: uint64;
  callerApplicationID: AppID;
  callerApplicationAddress: Address;
  assetCreateMinBalance: uint64;
  assetOptInMinBalance: uint64;
  genesisHash: bytes32;
  /** Whether block proposal payouts are enabled [AVM 11] */
  payoutsEnabled: boolean;
  /** The fee required in a keyreg transaction to make an account incentive eligible [AVM 11] */
  payoutsGoOnlineFee: uint64;
  /** The percentage of transaction fees in a block that can be paid to the block proposer [AVM 11] */
  payoutsPercent: uint64;
  /** The minimum algo balance an account must have to receive block payouts (in the agreement round) [AVM 11] */
  payoutsMinBalance: uint64;
  /** The maximum algo balance an account can have to receive block payouts (in the agreement round) [AVM 11] */
  payoutsMaxBalance: uint64;
};

/** Get information from the given block.
 * Fails unless the block falls between `this.txn.lastValid-1002` and `this.txn.firstValid` (exclusive) */
declare const blocks: {
  /** The block seed */
  seed: bytes;
  /** The timestamp of the block */
  timestamp: uint64;
  /** The proposer of the block */
  proposer: Address;
  /** The sum of all fees paid by transactions in this block. Only populated if payouts are enabled */
  feesCollected: uint64;
  /** Bonus is the bonus incentive to be paid for proposing this block.  It begins as a consensus parameter value, and decays periodically. */
  bonus: uint64;
  /** The hash of the previous block */
  branch: bytes;
  /** The fee sink address */
  feeSink: Address;
  /** string that identifies a version of the consensus protocol. */
  protocol: bytes;
  /** The transaction counter of the block */
  txnCounter: uint64;
  /** ProposerPayout is the amount that should be moved from the FeeSink to the Proposer at the start of the next block.
   * It is basically the bonus + the payouts percent of FeesCollected, but may be zero'd by proposer ineligibility.
   */
  proposerPayout: uint64;
}[];

/**
 * Given an ABI method signature, return the method selector
 *
 * @param signature - The method signature
 *
 * @example checking the method selector
 * ```ts
 * verifyAppCallTxn(
 * someAppCall,
 * { applicationArgs: { 0: method('add(uint64,uint64)uint64') }
 * })
 * ```
 */
declare function method(signature: string): bytes;

/**
 * Given an address string, return the 32 byte public key
 *
 * @param address - The address string. MUST be a string literal.
 */
declare function addr(address: string): Address;

/** Send a payment transaction */
declare function sendPayment(params: Expand<PaymentParams>): void;
/** Send an app call transaction */
declare function sendAppCall(params: Expand<AppParams>): void;
declare function sendAssetTransfer(params: Expand<AssetTransferParams>): void;
declare function sendAssetCreation(params: Expand<AssetCreateParams>): AssetID;
declare function sendOnlineKeyRegistration(params: Expand<OnlineKeyRegParams>): void;
declare function sendOfflineKeyRegistration(params: Expand<CommonTransactionParams>): void;
declare function sendAssetConfig(params: Expand<AssetConfigParams>): void;
declare function sendAssetFreeze(params: Expand<AssetFreezeParams>): void;

declare type InnerTxn<
  TxnType extends
    | InnerPayment
    | InnerAppCall
    | InnerAssetTransfer
    | InnerAssetConfig
    | InnerAssetCreation
    | InnerAssetFreeze
    | InnerOnlineKeyRegistration
    | InnerOfflineKeyRegistration,
> = Brand<TxnType, 'generic inner'>;
declare type InnerPayment = PaymentParams;
declare type InnerAppCall = AppParams;
declare type InnerAssetTransfer = AssetTransferParams;
declare type InnerAssetConfig = AssetConfigParams;
declare type InnerAssetCreation = AssetCreateParams;
declare type InnerAssetFreeze = AssetFreezeParams;
declare type InnerOnlineKeyRegistration = OnlineKeyRegParams;
declare type InnerOfflineKeyRegistration = CommonTransactionParams;
/**
 * @typeParam ArgTypesOrMethod - Either the TEALScript method to call or the types of the method arguments
 * @typeParam MethodReturnType - The return type of the method. *NOT* needed if ArgTypesOrMethod is TEALScript method type
 */
declare type MethodCall<ArgTypesOrMethod, ReturnType> = MethodCallParams<ArgTypesOrMethod>;

/**
 * Sends ABI method call. The two type arguments in combination with the
 * name argument are used to form the the method signature to ensure typesafety.
 *
 * @returns The return value of the method call
 *
 * @typeParam ArgTypesOrMethod - Either the TEALScript method to call or the types of the method arguments
 * @typeParam MethodReturnType - The return type of the method. *NOT* needed if ArgTypesOrMethod is TEALScript method type
 *
 * @param params - The parameters of the method call
 *
 * @example Calling a method defined in a contract
 * ```ts
 * // call createNFT(string,string)uint64
 * const createdAsset = sendMethodCall<typeof MyContract.prototype.createNFT>({
 *     applicationID: factoryApp,
 *     methodArgs: ['My NFT', 'MNFT'],
 * });
 * ```
 *
 * @example Calling a method and getting the return value
 * ```ts
 * // call createNFT(string,string)uint64
 * const createdAsset = sendMethodCall<[string, string], Asset>({
 *     applicationID: factoryApp,
 *     name: 'createNFT',
 *     methodArgs: ['My NFT', 'MNFT'],
 * });
 * ```
 */
declare function sendMethodCall<ArgTypesOrMethod, MethodReturnType = void>(
  params: Expand<MethodCallParams<ArgTypesOrMethod>>
): ArgTypesOrMethod extends Function ? ReturnType<ArgTypesOrMethod> : MethodReturnType;

/**
 * @returns the input data converted to  {@link uint64}
 * @throws if the input data is longer than 8 bytes
 */
declare function btoi(data: BytesLike): uint64;

/** @returns {@link uint64} converted to {@link bytes} */
declare function itob(int: IntLike): bytes;

/** Logs data to the chain. Logs only persist if the app call is successful */
declare function log(content: BytesLike): void;

/** @returns the sha256 hash of the given data */
declare function sha256(data: BytesLike): bytes32;

/** @returns the keccak256 hash of the given data */
declare function keccak256(data: BytesLike): bytes32;

/** @returns the sha512_256 hash of the given data */
declare function sha512_256(data: BytesLike): bytes32;

/**
 *
 * Verify the signature of ("ProgData" || program_hash || data) against the pubkey.
 * The program_hash is the hash of the program source code
 *
 * @param data - Data be verified
 * @param signature - The signature to verify
 * @param pubkey - The public key to verify the signature with
 *
 * @returns true if the signature is valid, false otherwise
 */
declare function ed25519Verify(data: BytesLike, signature: BytesLike, pubkey: BytesLike): boolean;

/**
 * Get the byte length of a type or value.
 *
 * @param value - The value to get the length of. May be omitted if a static type is given as `T`
 * @typeParam T - The type to get the length of. MUST be static if no value is given.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function len<T>(value?: any): uint64;

/** @throws if the given condition is false */
declare function assert(condition: IntLike, message?: string): void;

/** @throws if one of the given conditions is false */
declare function asserts(...conditions: IntLike[]): void;

/** @returns The concatenation of two {@link bytes} */
declare function concat(a: BytesLike, b: BytesLike): bytes;

/**
 *
 * @param data The input data from which bytes are extracted
 * @param start The start index of the bytes to extract
 * @param end The end index of the bytes to extract (not inclusive)
 *
 * @returns Extracted bytes
 */
declare function substring3(data: BytesLike, start: IntLike, end: IntLike): bytes;

/** @returns The value of the bit at the given index */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function getbit(data: BytesLike | uint64, bitIndex: uint64): boolean;

/**
 * @param data The input data to update
 * @param bitIndex The index of the bit to update
 * @param value The value to set the bit to
 *
 * @returns The updated data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function setbit<InputType extends bytes | uint64>(
  data: InputType,
  bitIndex: uint64,
  value: boolean
): InputType extends string ? bytes : uint64;

/** @returns The value of the byte at the given index */
declare function getbyte(data: BytesLike, byteIndex: uint64): uint64;

/**
 * @param data The input data to update
 * @param byteIndex The index of the byte to update
 * @param value The value to set the byte to
 *
 * @returns The updated data
 */
declare function setbyte(data: bytes, byteIndex: uint64, value: uint64): bytes;

/**
 * Extracts a subtstring of the given length starting at the given index
 *
 * @param data bytes to extract from
 * @param start byte index to start extracting from
 * @param length number of bytes to extract
 *
 * @returns extracted bytes
 */
declare function extract3(data: BytesLike, start: IntLike, length: IntLike): bytes;

/**
 * Extracts 2 bytes from the given data starting at the given index and converts them to uint16
 *
 * @param data bytes to extract from
 * @param start byte index to start extracting from
 *
 * @returns uint16 as uint64
 */
declare function extractUint16(data: BytesLike, byteIndex: IntLike): uint64;

/**
 * Extracts 4 bytes from the given data starting at the given index and converts them to uint32
 *
 * @param data bytes to extract from
 * @param start byte index to start extracting from
 *
 * @returns uint32 as uint64
 */
declare function extractUint32(data: BytesLike, byteIndex: IntLike): uint64;

/**
 * Extracts 8 bytes from the given data starting at the given index and converts them to uint64
 *
 * @param data bytes to extract from
 * @param start byte index to start extracting from
 *
 * @returns uint64
 */
declare function extractUint64(data: BytesLike, byteIndex: IntLike): uint64;

/**
 * Replace bytes in the given data starting at the given index
 *
 * @param data data containing the bytes that should be replaced
 * @param byteIndex index of the first byte to replace
 * @param newData bytes to replace with
 *
 * @returns updated data
 */
declare function replace3(data: BytesLike, byteIndex: IntLike, newData: BytesLike): bytes;

/**
 * Verifies the given signature against the given public key and message
 *
 * @param message message to verify
 * @param signature signature to verify
 * @param publicKey public key to verify the signature with
 *
 * @returns true if the signature is valid, false otherwise
 */
declare function ed25519VerifyBare(message: BytesLike, signature: BytesLike, publicKey: BytesLike): boolean;

/** @returns square root of the given integer */
declare function sqrt(n: IntLike | uint): uint;

/**
 * Combines two uint64 into one uint128 and then divides it by another uint64
 *
 * @param dividendHigh high bits of the dividend
 * @param dividendLow low bits of the dividend
 * @param divisor divisor
 */
declare function divw(dividendHigh: IntLike, dividendLow: IntLike, divisor: IntLike): uint64;

/** @returns sha3_256 hash of the given data */
declare function sha3_256(data: BytesLike): bytes32;

/**
 *
 * @param curve The curve being used
 * @param data The data that was signed
 * @param sSignatureComponent The s component of the lower-S signature
 * @param rSignatureComponent The r component of the lower-S signature
 * @param xPubkeyComponent The x component of the public key
 * @param yPubkeyComponent The y component of the public key
 *
 * @returns true if the signature is valid, false otherwise
 */
declare function ecdsaVerify(
  curve: 'Secp256k1' | 'Secp256r1',
  data: bytes32,
  sSignatureComponent: bytes32,
  rSignatureComponent: bytes32,
  xPubkeyComponent: bytes32,
  yPubkeyComponent: bytes32
): boolean;

declare type ECDSAPubKey = { x: bytes; y: bytes };

/**
 *
 * @param curve The curve being used
 * @param pubKey The public key to decompress
 *
 * @returns The X and Y components of the decompressed public key
 */
declare function ecdsaPkDecompress(curve: 'Secp256k1' | 'Secp256r1', pubKey: bytes<33>): ECDSAPubKey;

/**
 *
 * @param curve The curve being used
 * @param data The data that was signed
 * @param recoveryID The recovery ID
 * @param sSignatureComponent The s component of the lower-S signature
 * @param rSignatureComponent The r component of the lower-S signature
 *
 * @returns The X and Y components of the recovered public key
 */
declare function ecdsaPkRecover(
  curve: 'Secp256k1' | 'Secp256r1',
  data: bytes32,
  recoveryID: uint64,
  sSignatureComponent: bytes32,
  rSignatureComponent: bytes32
): ECDSAPubKey;

/**
 * Returns zero bytes of the given size.
 *
 * @param size the number of zero bytes to return. If not given, returns the size of the type given
 * the type argument
 *
 */
declare function bzero<T = bytes>(size?: IntLike): T;

/**
 * Use this method if all inputs to the expression are uint64s,
 * the output fits in a uint64, and all intermediate values fit in a uint128.
 * Otherwise uintN division should be used.
 *
 * @returns product of numerators divided by product of denominator */
declare function wideRatio(numeratorFactors: uint64[], denominatorFactors: uint64[]): uint64;

/** @returns hex input decoded to bytes */
declare function hex(input: string): bytes;

/** @returns bytes interpreted as a number */
declare function btobigint(input: BytesLike): number;

/**
 * Verifies the fields of a transaction against the given parameters.
 *
 * @param txn the transaction to verify
 * @param params the transaction fields to verify in the given transaction
 */
declare function verifyTxn(
  txn: Txn | PayTxn | AssetConfigTxn | AppCallTxn | AssetTransferParams | AssetFreezeParams | KeyRegTxn | ThisTxnParams,
  params: TxnVerificationFields
);

/**
 * Verifies the fields of a pay transaction against the given parameters.
 *
 * @param txn the transaction to verify
 * @param params the transaction fields to verify in the given transaction
 */
declare function verifyPayTxn(txn: Txn | PayTxn, params: PayTxnVerificationFields): txn is PayTxn;

/**
 * Verifies the fields of an asset config transaction against the given parameters.
 *
 * @param txn the transaction to verify
 * @param params the transaction fields to verify in the given transaction
 */
declare function verifyAssetConfigTxn(
  txn: Txn | AssetConfigTxn,
  params: AssetConfigTxnVerificationFields
): txn is AssetConfigTxn;

/**
 * Verifies the fields of an asset transfer transaction against the given parameters.
 *
 * @param txn the transaction to verify
 * @param params the transaction fields to verify in the given transaction
 */
declare function verifyAssetTransferTxn(
  txn: Txn | AssetTransferTxn,
  params: AssetTransferTxnVerificationFields
): txn is AssetTransferTxn;

/**
 * Verifies the fields of an app call transaction against the given parameters.
 *
 * @param txn the transaction to verify
 * @param params the transaction fields to verify in the given transaction
 */
declare function verifyAppCallTxn(
  txn: ThisTxnParams | Txn | AppCallTxn,
  params: AppCallTxnVerificationFields
): txn is AppCallTxn;

/**
 * Verifies the fields of a key reg transaction against the given parameters.
 *
 * @param txn the transaction to verify
 * @param params the transaction fields to verify in the given transaction
 */
declare function verifyKeyRegTxn(txn: Txn | KeyRegTxn, params: KeyRegTxnVerificationFields): txn is KeyRegTxn;

declare type decorator = (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;

/**
 * The allow decorators are used to specify when specific [OnComplete](https://developer.algorand.org/docs/get-details/dapps/avm/teal/specification/#oncomplete) operations are allowed after logic evaluation.
 * The OnComplete can be allowed on applicaiton creation via `@allow.create` or on non-create calls via `@allow.call`
 * By defualt, all methods are allowed to be called with the `NoOp` OnComplete (`@allow.call('NoOp')`). Once a single `@allow` decorator is used, `@allow.call(NoOp)` must be explicitly set if it is desired.
 *
 * @example Allow opt in on create and call
 * ```ts
 * \@allow.create('OptIn') // Allow the creator to use this method to create the application and opt in at the same time
 * \@allow.call('OptIn') // Also allow anyone to call this method to opt in
 * foo() {
 * ```
 */
declare class allow {
  /** Specify an allowed OnComplete when the method is called */
  static call(
    onComplete: 'NoOp' | 'OptIn' | 'CloseOut' | 'ClearState' | 'UpdateApplication' | 'DeleteApplication'
  ): decorator;

  /** Specify an allowed OnComplete when the method is used for contract creation */
  static create(
    onComplete: 'NoOp' | 'OptIn' | 'CloseOut' | 'ClearState' | 'UpdateApplication' | 'DeleteApplication' = 'NoOp'
  ): decorator;

  /** When no the contract is called without an ABI method selector, allow this method logic to be evaluated for the given OnComplete */
  static bareCall(
    onComplete: 'NoOp' | 'OptIn' | 'CloseOut' | 'ClearState' | 'UpdateApplication' | 'DeleteApplication'
  ): decorator;

  /** When the contract is created without an ABI method selector, allow this method logic to be evaluated for the given OnComplete */
  static bareCreate(
    onComplete: 'NoOp' | 'OptIn' | 'CloseOut' | 'ClearState' | 'UpdateApplication' | 'DeleteApplication' = 'NoOp'
  ): decorator;
}

declare class nonABIRouterFallback {
  static call(
    onComplete: 'NoOp' | 'OptIn' | 'CloseOut' | 'ClearState' | 'UpdateApplication' | 'DeleteApplication'
  ): decorator;

  static create(
    onComplete: 'NoOp' | 'OptIn' | 'CloseOut' | 'ClearState' | 'UpdateApplication' | 'DeleteApplication' = 'NoOp'
  ): decorator;
}

declare class abi {
  /** Signifies this method doesn't write any state to the chain, thus it can be
   * called via simulate to avoid fees */
  static readonly: decorator;
}

type StaticArrayOf<T, N> = Brand<T[], N>;
type StaticBytes<N> = Brand<string, N>;
type StaticArray<T, N> = T extends byte
  ? StaticBytes<N>
  : T extends boolean
  ? StaticArrayOf<true | false, N>
  : StaticArrayOf<T, N>;

// eslint-disable-next-line no-shadow
enum TransactionType {
  Unknown, // unknown
  Payment, // pay
  KeyRegistration, // keyreg
  AssetConfig, // acfg
  AssetTransfer, // axfer
  AssetFreeze, // afrz
  ApplicationCall, // appl
}

declare function TemplateVar<TmplType>(name?: string): TmplType;

declare function castBytes<T>(input: BytesLike): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function rawBytes(input: any): bytes;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function rawByte(input: any): byte;

declare function clone<T>(input: T): T;

declare type ScratchValue<ValueType> = {
  value: ValueType;
};

declare function ScratchSlot<ValueType>(slot: number): ScratchValue<ValueType>;

declare function DynamicScratchSlot<ValueType>(): (slot: number) => ScratchValue<ValueType>;

/**
 * Send an inner transaction app call to increase the current opcode budget.
 * This will also send any pending transaction in the same group.
 * For every call of this function, the required fee is increased by 1000 microAlgos.
 */
declare function increaseOpcodeBudget();

declare type ECGroup = 'BN254g1' | 'BN254g2' | 'BLS12_381g1' | 'BLS12_381g2';

declare type VRFReturnValues = { verified: boolean; output: bytes };

/**
 * Verify VRF proof of a message against the given public key
 *
 * @param standard VRF standard to use. Currently only VrfAlgorand is supported which is ECVRF-ED25519-SHA512-Elligator2, specified in the IETF internet draft [draft-irtf-cfrg-vrf-03](https://datatracker.ietf.org/doc/draft-irtf-cfrg-vrf/03/).
 * @param message The message to verify
 * @param proof The VRF proof
 * @param pubkey The VRF public key
 */
declare function vrfVefiry(
  standard: 'VrfAlgorand',
  message: bytes,
  proof: StaticArray<byte, 80>,
  pubkey: bytes32
): VRFReturnValues;

/**
 * Sum two curve points
 * @param group The target group
 * @param a The first point to add
 * @param b The second point to add
 */
declare function ecAdd(group: ECGroup, a: bytes, b: bytes): bytes;

/**
 * Return the point multiplied by the scalar
 *
 * @param point The point to multiply
 * @param scalar The scalar to multiply
 */
declare function ecScalarMul(group: ECGroup, point: bytes, scalar: bytes): bytes;

/**
 * Checks if the product of the pairing of each point in A with its respective point in B is equal to the identity element of the target group
 *
 * @param group The target group
 * @param a Concatenated points of the target group
 * @param b Concatenated if the associated group
 */
declare function ecPairingCheck(group: ECGroup, a: bytes, b: bytes): boolean;

/**
 * for curve points A and scalars B, return curve point B0A0 + B1A1 + B2A2 + ... + BnAn
 *
 * @param group The target group
 * @param points The concatenated points to multiply
 * @param scalars The scalars to multiply
 *
 */
declare function ecMultiScalarMul(group: ECGroup, points: bytes, scalars: bytes32[]): bytes;

/**
 * Checks if the given point is in the main prime-order subgroup of the target group. Fails if the point is not in the group at all.
 *
 * @param group The target group
 * @param point The point to check
 *
 */
declare function ecSubgroupCheck(group: ECGroup, point: bytes): boolean;

/**
 * Maps field element to the target group.
 *
 * BN254 points are mapped by the SVDW map. BLS12-381 points are mapped by the SSWU map.
 * G1 element inputs are base field elements and G2 element inputs are quadratic field elements,
 * with nearly the same encoding rules (for field elements) as defined in ec_add.
 *
 * There is one difference of encoding rule: G1 element inputs do not need to be 0-padded if
 * they fit in less than 32 bytes for BN254 and less than 48 bytes for BLS12-381. (As usual,
 * the empty byte array represents 0.) G2 elements inputs need to be always have the required size.
 *
 * @param group The target group
 * @param fieldElement The field element to map
 */
declare function ecMapTo(group: ECGroup, fieldElement: bytes): bytes;

/**
 * The highest set bit in the input. If the input is a byte-array, it is interpreted as a big-endian unsigned integer. bitlen of 0 is 0, bitlen of 8 is 4
 *
 * @param input The input to get the higher bit from
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function bitlen(input: any): uint64;

/**
 * decode the given base64 encoded bytes
 *
 * @param encoding The encoding of the bytes
 * @param input The bytes to decode
 */
declare function base64Decode(encoding: 'URLEncoding' | 'StdEncoding', input: bytes): bytes;

declare function jsonRef<TypeEncoded extends 'JSONString' | 'JSONUint64' | 'JSONObject'>(
  type: TypeEncoded,
  input: bytes,
  key: bytes
): TypeEncoded extends 'JSONString' ? bytes : TypeEncoded extends 'JSONUint64' ? uint64 : bytes;

declare type SplitUint128 = { low: uint64; high: uint64 };

/**
 * A * B with the result being 128 bits split across two uint64s
 */
declare function mulw(a: uint64, b: uint64): SplitUint128;

/**
 * A + B with the result being 128 bits split across two uint64s
 */
declare function addw(a: uint64, b: uint64): SplitUint128;

/**
 * A ** B with the result being 128 bits split across two uint64s
 */
declare function expw(a: uint64, b: uint64): SplitUint128;

declare type DivmodwOutput = { quotientHigh: uint64; quotientLow: uint64; remainderHigh: uint64; remainderLow: uint64 };
/**
 * Get AB / CD and AB % CD with the result for both being 128 bits split across two uint64s
 * @param a The numerator high bits
 * @param b The numerator low bits
 * @param c The denominator high bits
 * @param d The denominator low bits
 */
declare function divmodw(a: uint64, b: uint64, c: uint64, d: uint64): DivmodwOutput;

/** The total online stake in the agreement round [AVM 11] */
declare function onlineStake(): uint64;

/**
 * @deprecated Use `Address` instead. May require client-side changes. See [this PR](https://github.com/algorandfoundation/TEALScript/pull/296) for more details. Use `AccountReference` if you need to explicitly use the reference type.
 */
class Account {}

/**
 * @deprecated Use `AppID` instead. May require client-side changes. See [this PR](https://github.com/algorandfoundation/TEALScript/pull/296) for more details. Use `AppReference` if you need to explicitly use the reference type.
 */
class Application {}

/**
 * @deprecated Use `AssetID` instead. May require client-side changes. See [this PR](https://github.com/algorandfoundation/TEALScript/pull/296) for more details. Use `AssetReference` if you need to explicitly use the reference type.
 */
class Asset {}
