/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  CoreAppCallArgs,
  RawAppCallArgs,
  AppState,
  TealTemplateParams,
  ABIAppCallArg,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom } from '@algorandfoundation/algokit-utils/types/transaction'
import type { TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "mintAndGetAsset()uint64": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "createApplication()void": {
      "call_config": {
        "no_op": "CREATE"
      }
    }
  },
  "bare_call_config": {
    "no_op": "NEVER",
    "opt_in": "NEVER",
    "close_out": "NEVER",
    "update_application": "NEVER",
    "delete_application": "NEVER"
  },
  "schema": {
    "local": {
      "declared": {},
      "reserved": {}
    },
    "global": {
      "declared": {},
      "reserved": {}
    }
  },
  "state": {
    "global": {
      "num_byte_slices": 0,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDkKCi8vIFRoaXMgVEVBTCB3YXMgZ2VuZXJhdGVkIGJ5IFRFQUxTY3JpcHQgdjAuNjYuMQovLyBodHRwczovL2dpdGh1Yi5jb20vYWxnb3JhbmRmb3VuZGF0aW9uL1RFQUxTY3JpcHQKCi8vIFRoaXMgY29udHJhY3QgaXMgY29tcGxpYW50IHdpdGggYW5kL29yIGltcGxlbWVudHMgdGhlIGZvbGxvd2luZyBBUkNzOiBbIEFSQzQgXQoKLy8gVGhlIGZvbGxvd2luZyB0ZW4gbGluZXMgb2YgVEVBTCBoYW5kbGUgaW5pdGlhbCBwcm9ncmFtIGZsb3cKLy8gVGhpcyBwYXR0ZXJuIGlzIHVzZWQgdG8gbWFrZSBpdCBlYXN5IGZvciBhbnlvbmUgdG8gcGFyc2UgdGhlIHN0YXJ0IG9mIHRoZSBwcm9ncmFtIGFuZCBkZXRlcm1pbmUgaWYgYSBzcGVjaWZpYyBhY3Rpb24gaXMgYWxsb3dlZAovLyBIZXJlLCBhY3Rpb24gcmVmZXJzIHRvIHRoZSBPbkNvbXBsZXRlIGluIGNvbWJpbmF0aW9uIHdpdGggd2hldGhlciB0aGUgYXBwIGlzIGJlaW5nIGNyZWF0ZWQgb3IgY2FsbGVkCi8vIEV2ZXJ5IHBvc3NpYmxlIGFjdGlvbiBmb3IgdGhpcyBjb250cmFjdCBpcyByZXByZXNlbnRlZCBpbiB0aGUgc3dpdGNoIHN0YXRlbWVudAovLyBJZiB0aGUgYWN0aW9uIGlzIG5vdCBpbXBsbWVudGVkIGluIHRoZSBjb250cmFjdCwgaXRzIHJlc3BlY3RpdmUgYnJhbmNoIHdpbGwgYmUgIk5PVF9JTVBMRU1FTlRFRCIgd2hpY2gganVzdCBjb250YWlucyAiZXJyIgp0eG4gQXBwbGljYXRpb25JRAppbnQgMAo+CmludCA2CioKdHhuIE9uQ29tcGxldGlvbgorCnN3aXRjaCBjcmVhdGVfTm9PcCBOT1RfSU1QTEVNRU5URUQgTk9UX0lNUExFTUVOVEVEIE5PVF9JTVBMRU1FTlRFRCBOT1RfSU1QTEVNRU5URUQgTk9UX0lNUExFTUVOVEVEIGNhbGxfTm9PcAoKTk9UX0lNUExFTUVOVEVEOgoJZXJyCgovLyBtaW50QW5kR2V0QXNzZXQoKXVpbnQ2NAphYmlfcm91dGVfbWludEFuZEdldEFzc2V0OgoJLy8gVGhlIEFCSSByZXR1cm4gcHJlZml4CglieXRlIDB4MTUxZjdjNzUKCgkvLyBleGVjdXRlIG1pbnRBbmRHZXRBc3NldCgpdWludDY0CgljYWxsc3ViIG1pbnRBbmRHZXRBc3NldAoJaXRvYgoJY29uY2F0Cglsb2cKCWludCAxCglyZXR1cm4KCm1pbnRBbmRHZXRBc3NldDoKCS8vIFNldHVwIHRoZSBmcmFtZSBmb3IgYXJncyBhbmQgcmV0dXJuIHZhbHVlLiBVc2UgZW1wdHkgYnl0ZXMgdG8gY3JlYXRlIHNwYWNlIG9uIHRoZSBzdGFjayBmb3IgbG9jYWwgdmFyaWFibGVzIGlmIG5lY2Vzc2FyeQoJcHJvdG8gMCAxOyBieXRlIDB4OyBkdXBuIDEKCgkvLyBleGFtcGxlcy9pdHhucy9pdHhucy5hbGdvLnRzOjI1CgkvLyBzZW5kTWV0aG9kQ2FsbDxbXSwgdm9pZD4oewoJLy8gICAgICAgbmFtZTogJ2NyZWF0ZUFwcGxpY2F0aW9uJywKCS8vICAgICAgIGNsZWFyU3RhdGVQcm9ncmFtOiBORlRGYWN0b3J5LmNsZWFyUHJvZ3JhbSgpLAoJLy8gICAgICAgYXBwcm92YWxQcm9ncmFtOiBORlRGYWN0b3J5LmFwcHJvdmFsUHJvZ3JhbSgpLAoJLy8gICAgIH0pCglpdHhuX2JlZ2luCglpbnQgYXBwbAoJaXR4bl9maWVsZCBUeXBlRW51bQoJbWV0aG9kICJjcmVhdGVBcHBsaWNhdGlvbigpdm9pZCIKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCgoJLy8gZXhhbXBsZXMvaXR4bnMvaXR4bnMuYWxnby50czoyNwoJLy8gY2xlYXJTdGF0ZVByb2dyYW06IE5GVEZhY3RvcnkuY2xlYXJQcm9ncmFtKCkKCWJ5dGUgYjY0IENRPT0KCWl0eG5fZmllbGQgQ2xlYXJTdGF0ZVByb2dyYW0KCgkvLyBleGFtcGxlcy9pdHhucy9pdHhucy5hbGdvLnRzOjI4CgkvLyBhcHByb3ZhbFByb2dyYW06IE5GVEZhY3RvcnkuYXBwcm92YWxQcm9ncmFtKCkKCWJ5dGUgYjY0IENTQUNBUUF4R0NNTmdRWUxNUmtJalFjQVlBQUFBQUFBQUFBQUFBQUFiZ0NBQkJVZmZIVTJHZ0pYQWdBMkdnRlhBZ0NJQUFVV1VMQWlRNG9DQWJHQkE3SVFpLyt5Sm92K3NpVWlzaUlqc2dHenREeUpOaG9DRjhBY05ob0JGOEF3aUFBQ0lrT0tBZ0N4Z1FTeUVJditzaFFpc2hLTC83SVJJN0lCczRraVE0QUV1RVI3TmpZYUFJNEIvL0VBZ0FUU0FreHpnQVJJSVdad05ob0FqZ0wvZnYreUFBPT0KCWl0eG5fZmllbGQgQXBwcm92YWxQcm9ncmFtCgoJLy8gRmVlIGZpZWxkIG5vdCBzZXQsIGRlZmF1bHRpbmcgdG8gMAoJaW50IDAKCWl0eG5fZmllbGQgRmVlCgoJLy8gU3VibWl0IGlubmVyIHRyYW5zYWN0aW9uCglpdHhuX3N1Ym1pdAoKCS8vIGV4YW1wbGVzL2l0eG5zL2l0eG5zLmFsZ28udHM6MzEKCS8vIGZhY3RvcnlBcHAgPSB0aGlzLml0eG4uY3JlYXRlZEFwcGxpY2F0aW9uSUQKCWl0eG4gQ3JlYXRlZEFwcGxpY2F0aW9uSUQKCWZyYW1lX2J1cnkgMCAvLyBmYWN0b3J5QXBwOiBhcHBsaWNhdGlvbgoKCS8vIGV4YW1wbGVzL2l0eG5zL2l0eG5zLmFsZ28udHM6MzMKCS8vIHNlbmRQYXltZW50KHsKCS8vICAgICAgIGFtb3VudDogMjAwXzAwMCwKCS8vICAgICAgIHJlY2VpdmVyOiBmYWN0b3J5QXBwLmFkZHJlc3MsCgkvLyAgICAgfSkKCWl0eG5fYmVnaW4KCWludCBwYXkKCWl0eG5fZmllbGQgVHlwZUVudW0KCgkvLyBleGFtcGxlcy9pdHhucy9pdHhucy5hbGdvLnRzOjM0CgkvLyBhbW91bnQ6IDIwMF8wMDAKCWludCAyMDBfMDAwCglpdHhuX2ZpZWxkIEFtb3VudAoKCS8vIGV4YW1wbGVzL2l0eG5zL2l0eG5zLmFsZ28udHM6MzUKCS8vIHJlY2VpdmVyOiBmYWN0b3J5QXBwLmFkZHJlc3MKCWZyYW1lX2RpZyAwIC8vIGZhY3RvcnlBcHA6IGFwcGxpY2F0aW9uCglhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCglhc3NlcnQKCWl0eG5fZmllbGQgUmVjZWl2ZXIKCgkvLyBGZWUgZmllbGQgbm90IHNldCwgZGVmYXVsdGluZyB0byAwCglpbnQgMAoJaXR4bl9maWVsZCBGZWUKCgkvLyBTdWJtaXQgaW5uZXIgdHJhbnNhY3Rpb24KCWl0eG5fc3VibWl0CgoJLy8gZXhhbXBsZXMvaXR4bnMvaXR4bnMuYWxnby50czozOAoJLy8gY3JlYXRlZEFzc2V0ID0gc2VuZE1ldGhvZENhbGw8W3N0cmluZywgc3RyaW5nXSwgQXNzZXQ+KHsKCS8vICAgICAgIGFwcGxpY2F0aW9uSUQ6IGZhY3RvcnlBcHAsCgkvLyAgICAgICBuYW1lOiAnY3JlYXRlTkZUJywKCS8vICAgICAgIG1ldGhvZEFyZ3M6IFsnTXkgTkZUJywgJ01ORlQnXSwKCS8vICAgICB9KQoJaXR4bl9iZWdpbgoJaW50IGFwcGwKCWl0eG5fZmllbGQgVHlwZUVudW0KCW1ldGhvZCAiY3JlYXRlTkZUKHN0cmluZyxzdHJpbmcpdWludDY0IgoJaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKCgkvLyBleGFtcGxlcy9pdHhucy9pdHhucy5hbGdvLnRzOjM5CgkvLyBhcHBsaWNhdGlvbklEOiBmYWN0b3J5QXBwCglmcmFtZV9kaWcgMCAvLyBmYWN0b3J5QXBwOiBhcHBsaWNhdGlvbgoJaXR4bl9maWVsZCBBcHBsaWNhdGlvbklECgoJLy8gZXhhbXBsZXMvaXR4bnMvaXR4bnMuYWxnby50czo0MQoJLy8gbWV0aG9kQXJnczogWydNeSBORlQnLCAnTU5GVCddCglieXRlIDB4MDAwNjRkNzkyMDRlNDY1NAoJaXR4bl9maWVsZCBBcHBsaWNhdGlvbkFyZ3MKCWJ5dGUgMHgwMDA0NGQ0ZTQ2NTQKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCgoJLy8gRmVlIGZpZWxkIG5vdCBzZXQsIGRlZmF1bHRpbmcgdG8gMAoJaW50IDAKCWl0eG5fZmllbGQgRmVlCgoJLy8gU3VibWl0IGlubmVyIHRyYW5zYWN0aW9uCglpdHhuX3N1Ym1pdAoJaXR4biBOdW1Mb2dzCglpbnQgMQoJLQoJaXR4bmFzIExvZ3MKCWV4dHJhY3QgNCAwCglidG9pCglmcmFtZV9idXJ5IDEgLy8gY3JlYXRlZEFzc2V0OiBhc3NldAoKCS8vIGV4YW1wbGVzL2l0eG5zL2l0eG5zLmFsZ28udHM6NDQKCS8vIHNlbmRBc3NldFRyYW5zZmVyKHsKCS8vICAgICAgIGFzc2V0UmVjZWl2ZXI6IHRoaXMuYXBwLmFkZHJlc3MsCgkvLyAgICAgICBhc3NldEFtb3VudDogMCwKCS8vICAgICAgIHhmZXJBc3NldDogY3JlYXRlZEFzc2V0LAoJLy8gICAgIH0pCglpdHhuX2JlZ2luCglpbnQgYXhmZXIKCWl0eG5fZmllbGQgVHlwZUVudW0KCgkvLyBleGFtcGxlcy9pdHhucy9pdHhucy5hbGdvLnRzOjQ1CgkvLyBhc3NldFJlY2VpdmVyOiB0aGlzLmFwcC5hZGRyZXNzCglnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwoJaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCgoJLy8gZXhhbXBsZXMvaXR4bnMvaXR4bnMuYWxnby50czo0NgoJLy8gYXNzZXRBbW91bnQ6IDAKCWludCAwCglpdHhuX2ZpZWxkIEFzc2V0QW1vdW50CgoJLy8gZXhhbXBsZXMvaXR4bnMvaXR4bnMuYWxnby50czo0NwoJLy8geGZlckFzc2V0OiBjcmVhdGVkQXNzZXQKCWZyYW1lX2RpZyAxIC8vIGNyZWF0ZWRBc3NldDogYXNzZXQKCWl0eG5fZmllbGQgWGZlckFzc2V0CgoJLy8gRmVlIGZpZWxkIG5vdCBzZXQsIGRlZmF1bHRpbmcgdG8gMAoJaW50IDAKCWl0eG5fZmllbGQgRmVlCgoJLy8gU3VibWl0IGlubmVyIHRyYW5zYWN0aW9uCglpdHhuX3N1Ym1pdAoKCS8vIGV4YW1wbGVzL2l0eG5zL2l0eG5zLmFsZ28udHM6NTAKCS8vIHNlbmRNZXRob2RDYWxsPFtBc3NldCwgQWNjb3VudF0sIHZvaWQ+KHsKCS8vICAgICAgIGFwcGxpY2F0aW9uSUQ6IGZhY3RvcnlBcHAsCgkvLyAgICAgICBuYW1lOiAndHJhbnNmZXJORlQnLAoJLy8gICAgICAgbWV0aG9kQXJnczogW2NyZWF0ZWRBc3NldCwgdGhpcy5hcHAuYWRkcmVzc10sCgkvLyAgICAgfSkKCWl0eG5fYmVnaW4KCWludCBhcHBsCglpdHhuX2ZpZWxkIFR5cGVFbnVtCgltZXRob2QgInRyYW5zZmVyTkZUKGFzc2V0LGFjY291bnQpdm9pZCIKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCgoJLy8gZXhhbXBsZXMvaXR4bnMvaXR4bnMuYWxnby50czo1MQoJLy8gYXBwbGljYXRpb25JRDogZmFjdG9yeUFwcAoJZnJhbWVfZGlnIDAgLy8gZmFjdG9yeUFwcDogYXBwbGljYXRpb24KCWl0eG5fZmllbGQgQXBwbGljYXRpb25JRAoKCS8vIGV4YW1wbGVzL2l0eG5zL2l0eG5zLmFsZ28udHM6NTMKCS8vIG1ldGhvZEFyZ3M6IFtjcmVhdGVkQXNzZXQsIHRoaXMuYXBwLmFkZHJlc3NdCglmcmFtZV9kaWcgMSAvLyBjcmVhdGVkQXNzZXQ6IGFzc2V0CglpdHhuX2ZpZWxkIEFzc2V0cwoJYnl0ZSAweDAwMDAwMDAwMDAwMDAwMDAKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCglnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwoJaXR4bl9maWVsZCBBY2NvdW50cwoJYnl0ZSAweDAwMDAwMDAwMDAwMDAwMDEKCWl0eG5fZmllbGQgQXBwbGljYXRpb25BcmdzCgoJLy8gRmVlIGZpZWxkIG5vdCBzZXQsIGRlZmF1bHRpbmcgdG8gMAoJaW50IDAKCWl0eG5fZmllbGQgRmVlCgoJLy8gU3VibWl0IGlubmVyIHRyYW5zYWN0aW9uCglpdHhuX3N1Ym1pdAoKCS8vIGV4YW1wbGVzL2l0eG5zL2l0eG5zLmFsZ28udHM6NTYKCS8vIHJldHVybiBjcmVhdGVkQXNzZXQ7CglmcmFtZV9kaWcgMSAvLyBjcmVhdGVkQXNzZXQ6IGFzc2V0CgoJLy8gc2V0IHRoZSBzdWJyb3V0aW5lIHJldHVybiB2YWx1ZQoJZnJhbWVfYnVyeSAwCgoJLy8gcG9wIGFsbCBsb2NhbCB2YXJpYWJsZXMgZnJvbSB0aGUgc3RhY2sKCXBvcG4gMQoJcmV0c3ViCgphYmlfcm91dGVfY3JlYXRlQXBwbGljYXRpb246CglpbnQgMQoJcmV0dXJuCgpjcmVhdGVfTm9PcDoKCW1ldGhvZCAiY3JlYXRlQXBwbGljYXRpb24oKXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCBhYmlfcm91dGVfY3JlYXRlQXBwbGljYXRpb24KCWVycgoKY2FsbF9Ob09wOgoJbWV0aG9kICJtaW50QW5kR2V0QXNzZXQoKXVpbnQ2NCIKCXR4bmEgQXBwbGljYXRpb25BcmdzIDAKCW1hdGNoIGFiaV9yb3V0ZV9taW50QW5kR2V0QXNzZXQKCWVycg==",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDk="
  },
  "contract": {
    "name": "FactoryCaller",
    "desc": "",
    "methods": [
      {
        "name": "mintAndGetAsset",
        "args": [],
        "desc": "",
        "returns": {
          "type": "uint64",
          "desc": ""
        }
      },
      {
        "name": "createApplication",
        "desc": "",
        "returns": {
          "type": "void",
          "desc": ""
        },
        "args": []
      }
    ]
  }
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt 
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

/**
 * Defines the types of available calls and state of the FactoryCaller smart contract.
 */
export type FactoryCaller = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'mintAndGetAsset()uint64' | 'mintAndGetAsset', {
      argsObj: {
      }
      argsTuple: []
      returns: bigint
    }>
    & Record<'createApplication()void' | 'createApplication', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
}
/**
 * Defines the possible abi call signatures
 */
export type FactoryCallerSig = keyof FactoryCaller['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends FactoryCallerSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the FactoryCaller smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends FactoryCallerSig> = FactoryCaller['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the FactoryCaller smart contract to the method's return type
 */
export type MethodReturn<TSignature extends FactoryCallerSig> = FactoryCaller['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type FactoryCallerCreateCalls = (typeof FactoryCallerCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type FactoryCallerCreateCallParams =
  | (TypedCallParams<'createApplication()void'> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type FactoryCallerDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: FactoryCallerCreateCalls) => FactoryCallerCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class FactoryCallerCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the FactoryCaller smart contract using the createApplication()void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      createApplication(args: MethodArgs<'createApplication()void'>, params: AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: 'createApplication()void' as const,
          methodArgs: Array.isArray(args) ? args : [],
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the mintAndGetAsset()uint64 ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static mintAndGetAsset(args: MethodArgs<'mintAndGetAsset()uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'mintAndGetAsset()uint64' as const,
      methodArgs: Array.isArray(args) ? args : [],
      ...params,
    }
  }
}

/**
 * A client to make calls to the FactoryCaller smart contract
 */
export class FactoryCallerClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `FactoryCallerClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue }
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof FactoryCaller['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the FactoryCaller smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: FactoryCallerDeployArgs & AppClientDeployCoreParams = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(FactoryCallerCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the FactoryCaller smart contract using the createApplication()void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The create result
       */
      async createApplication(args: MethodArgs<'createApplication()void'>, params: AppClientCallCoreParams & AppClientCompilationParams & (OnCompleteNoOp) = {}): Promise<AppCallTransactionResultOfType<MethodReturn<'createApplication()void'>>> {
        return $this.mapReturnValue(await $this.appClient.create(FactoryCallerCallFactory.create.createApplication(args, params)))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the FactoryCaller smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the mintAndGetAsset()uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public mintAndGetAsset(args: MethodArgs<'mintAndGetAsset()uint64'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(FactoryCallerCallFactory.mintAndGetAsset(args, params))
  }

  public compose(): FactoryCallerComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      mintAndGetAsset(args: MethodArgs<'mintAndGetAsset()uint64'>, params?: AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.mintAndGetAsset(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async execute() {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams: {} }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as FactoryCallerComposer
  }
}
export type FactoryCallerComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the mintAndGetAsset()uint64 ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  mintAndGetAsset(args: MethodArgs<'mintAndGetAsset()uint64'>, params?: AppClientCallCoreParams & CoreAppCallArgs): FactoryCallerComposer<[...TReturns, MethodReturn<'mintAndGetAsset()uint64'>]>

  /**
   * Makes a clear_state call to an existing instance of the FactoryCaller smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs): FactoryCallerComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): FactoryCallerComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Executes the transaction group and returns an array of results
   */
  execute(): Promise<FactoryCallerComposerResults<TReturns>>
}
export type FactoryCallerComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
