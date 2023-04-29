import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class ARC75 extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: {}, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKCWIgbWFpbgoKYmFyZV9yb3V0ZV9jcmVhdGU6Cgl0eG4gT25Db21wbGV0aW9uCglpbnQgTm9PcAoJPT0KCXR4biBBcHBsaWNhdGlvbklECglpbnQgMAoJPT0KCSYmCglhc3NlcnQKCWNhbGxzdWIgY3JlYXRlCglpbnQgMQoJcmV0dXJuCgpjcmVhdGU6Cglwcm90byAwIDAKCXJldHN1YgoKdmVyaWZ5TUJSUGF5bWVudDoKCXByb3RvIDIgMAoKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6MTMKCS8vIGFzc2VydChwYXltZW50LmFtb3VudCA9PT0gdGhpcy5hcHAuYWRkcmVzcy5taW5CYWxhbmNlIC0gcHJlTUJSKQoJZnJhbWVfZGlnIC0xIC8vIHBheW1lbnQ6IHBheQoJZ3R4bnMgQW1vdW50Cgl0eG5hIEFwcGxpY2F0aW9ucyAwCglhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCglhc3NlcnQKCWFjY3RfcGFyYW1zX2dldCBBY2N0TWluQmFsYW5jZQoJYXNzZXJ0CglmcmFtZV9kaWcgLTIgLy8gcHJlTUJSOiB1aW50NjQKCS0KCT09Cglhc3NlcnQKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjE0CgkvLyBhc3NlcnQocGF5bWVudC5yZWNlaXZlciA9PT0gdGhpcy5hcHAuYWRkcmVzcykKCWZyYW1lX2RpZyAtMSAvLyBwYXltZW50OiBwYXkKCWd0eG5zIFJlY2VpdmVyCgl0eG5hIEFwcGxpY2F0aW9ucyAwCglhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCglhc3NlcnQKCT09Cglhc3NlcnQKCXJldHN1YgoKc2VuZE1CUlBheW1lbnQ6Cglwcm90byAxIDAKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjE4CgkvLyBzZW5kUGF5bWVudCh7CglpdHhuX2JlZ2luCglpbnQgcGF5CglpdHhuX2ZpZWxkIFR5cGVFbnVtCgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czoxOQoJLy8gc2VuZGVyOiB0aGlzLmFwcC5hZGRyZXNzCgl0eG5hIEFwcGxpY2F0aW9ucyAwCglhcHBfcGFyYW1zX2dldCBBcHBBZGRyZXNzCglhc3NlcnQKCWl0eG5fZmllbGQgU2VuZGVyCgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czoyMAoJLy8gcmVjZWl2ZXI6IHRoaXMudHhuLnNlbmRlcgoJdHhuIFNlbmRlcgoJaXR4bl9maWVsZCBSZWNlaXZlcgoKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6MjEKCS8vIGFtb3VudDogcHJlTUJSIC0gdGhpcy5hcHAuYWRkcmVzcy5taW5CYWxhbmNlCglmcmFtZV9kaWcgLTEgLy8gcHJlTUJSOiB1aW50NjQKCXR4bmEgQXBwbGljYXRpb25zIDAKCWFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKCWFzc2VydAoJYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCglhc3NlcnQKCS0KCWl0eG5fZmllbGQgQW1vdW50CgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czoyMgoJLy8gZmVlOiAwCglpbnQgMAoJaXR4bl9maWVsZCBGZWUKCWl0eG5fc3VibWl0CglyZXRzdWIKCmFiaV9yb3V0ZV9hZGRBcHBUb1doaXRlTGlzdDoKCXR4biBPbkNvbXBsZXRpb24KCWludCBOb09wCgk9PQoJdHhuIEFwcGxpY2F0aW9uSUQKCWludCAwCgkhPQoJJiYKCWFzc2VydAoJYnl0ZSAweAoJZHVwbiAyCgl0eG4gR3JvdXBJbmRleAoJaW50IDEKCS0KCXR4bmEgQXBwbGljYXRpb25BcmdzIDMKCWJ0b2kKCXR4bmEgQXBwbGljYXRpb25BcmdzIDIKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWV4dHJhY3QgMiAwCgljYWxsc3ViIGFkZEFwcFRvV2hpdGVMaXN0CglpbnQgMQoJcmV0dXJuCgphZGRBcHBUb1doaXRlTGlzdDoKCXByb3RvIDcgMAoKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6MzYKCS8vIHByZU1CUiA9IHRoaXMuYXBwLmFkZHJlc3MubWluQmFsYW5jZQoJdHhuYSBBcHBsaWNhdGlvbnMgMAoJYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwoJYXNzZXJ0CglhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKCWFzc2VydAoJZnJhbWVfYnVyeSAtNSAvLyBwcmVNQlI6IHVpbnQ2NAoKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6MzcKCS8vIHdoaXRlbGlzdDogV2hpdGVsaXN0ID0geyBhY2NvdW50OiB0aGlzLnR4bi5zZW5kZXIsIGJveEluZGV4OiBib3hJbmRleCwgYXJjOiBhcmMgfQoJYnl0ZSAweAoJZHVwCglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCXN0b3JlIDEgLy8gdHVwbGUgdGFpbAoJYnl0ZSAweDAwMjQKCXN0b3JlIDIgLy8gaGVhZCBvZmZzZXQKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCgl0eG4gU2VuZGVyCgljb25jYXQKCXN0b3JlIDAgLy8gdHVwbGUgaGVhZAoJbG9hZCAwIC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMiAvLyBib3hJbmRleDogdWludDE2Cgljb25jYXQKCXN0b3JlIDAgLy8gdHVwbGUgaGVhZAoJbG9hZCAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMiAvLyBoZWFkIG9mZnNldAoJY29uY2F0CglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMSAvLyBhcmM6IGJ5dGVzCglkdXAKCWxlbgoJaXRvYgoJZXh0cmFjdCA2IDIKCXN3YXAKCWNvbmNhdAoJZHVwCglsZW4KCWxvYWQgMiAvLyBoZWFkIG9mZnNldAoJYnRvaQoJKwoJaXRvYgoJZXh0cmFjdCA2IDIKCXN0b3JlIDIgLy8gaGVhZCBvZmZzZXQKCWxvYWQgMSAvLyB0dXBsZSB0YWlsCglzd2FwCgljb25jYXQKCXN0b3JlIDEgLy8gdHVwbGUgdGFpbAoJbG9hZCAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMSAvLyB0dXBsZSB0YWlsCgljb25jYXQKCWZyYW1lX2J1cnkgLTYgLy8gd2hpdGVsaXN0OiBXaGl0ZWxpc3QKCgkvLyBpZjBfY29uZGl0aW9uCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjM5CgkvLyB0aGlzLndoaXRlbGlzdC5leGlzdHMod2hpdGVsaXN0KQoJZnJhbWVfZGlnIC02IC8vIHdoaXRlbGlzdDogV2hpdGVsaXN0Cglib3hfZ2V0Cglzd2FwCglwb3AKCWJ6IGlmMF9lbHNlCgoJLy8gaWYwX2NvbnNlcXVlbnQKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6NDAKCS8vIHRoaXMud2hpdGVsaXN0LmdldCh3aGl0ZWxpc3QpLnB1c2goYXBwSUQpCglmcmFtZV9kaWcgLTYgLy8gd2hpdGVsaXN0OiBXaGl0ZWxpc3QKCWJveF9nZXQKCWFzc2VydAoJZHVwCglpbnQgMAoJZXh0cmFjdF91aW50MTYKCWludCAxCgkrCglpdG9iCglleHRyYWN0IDYgMgoJc3dhcAoJZXh0cmFjdCAyIDAKCWNvbmNhdAoJZnJhbWVfZGlnIC0zIC8vIGFwcElEOiB1aW50NjQKCWl0b2IKCWNvbmNhdAoJZnJhbWVfZGlnIC02IC8vIHdoaXRlbGlzdDogV2hpdGVsaXN0CglkdXAKCWJveF9kZWwKCXBvcAoJc3dhcAoJYm94X3B1dAoJYiBpZjBfZW5kCgppZjBfZWxzZToKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6NDIKCS8vIG5ld1doaXRlbGlzdDogdWludDY0W10gPSBbYXBwSURdCglmcmFtZV9kaWcgLTMgLy8gYXBwSUQ6IHVpbnQ2NAoJaXRvYgoJYnl0ZSAweDAwMDEKCXN3YXAKCWNvbmNhdAoJZnJhbWVfYnVyeSAtNyAvLyBuZXdXaGl0ZWxpc3Q6IHVpbnQ2NFtdCgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czo0MwoJLy8gdGhpcy53aGl0ZWxpc3QucHV0KHdoaXRlbGlzdCwgbmV3V2hpdGVsaXN0KQoJZnJhbWVfZGlnIC02IC8vIHdoaXRlbGlzdDogV2hpdGVsaXN0CglkdXAKCWJveF9kZWwKCXBvcAoJZnJhbWVfZGlnIC03IC8vIG5ld1doaXRlbGlzdDogdWludDY0W10KCWJveF9wdXQKCmlmMF9lbmQ6CgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjQ2CgkvLyB0aGlzLnZlcmlmeU1CUlBheW1lbnQocGF5bWVudCwgcHJlTUJSKQoJZnJhbWVfZGlnIC01IC8vIHByZU1CUjogdWludDY0CglmcmFtZV9kaWcgLTQgLy8gcGF5bWVudDogcGF5CgljYWxsc3ViIHZlcmlmeU1CUlBheW1lbnQKCXJldHN1YgoKYWJpX3JvdXRlX3NldEFwcFdoaXRlbGlzdDoKCXR4biBPbkNvbXBsZXRpb24KCWludCBOb09wCgk9PQoJdHhuIEFwcGxpY2F0aW9uSUQKCWludCAwCgkhPQoJJiYKCWFzc2VydAoJYnl0ZSAweAoJZHVwCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAzCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAyCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglleHRyYWN0IDIgMAoJY2FsbHN1YiBzZXRBcHBXaGl0ZWxpc3QKCWludCAxCglyZXR1cm4KCnNldEFwcFdoaXRlbGlzdDoKCXByb3RvIDUgMAoKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6NTgKCS8vIHByZU1CUiA9IHRoaXMuYXBwLmFkZHJlc3MubWluQmFsYW5jZQoJdHhuYSBBcHBsaWNhdGlvbnMgMAoJYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwoJYXNzZXJ0CglhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKCWFzc2VydAoJZnJhbWVfYnVyeSAtNCAvLyBwcmVNQlI6IHVpbnQ2NAoKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6NTkKCS8vIHdoaXRlbGlzdDogV2hpdGVsaXN0ID0geyBhY2NvdW50OiB0aGlzLnR4bi5zZW5kZXIsIGJveEluZGV4OiBib3hJbmRleCwgYXJjOiBhcmMgfQoJYnl0ZSAweAoJZHVwCglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCXN0b3JlIDEgLy8gdHVwbGUgdGFpbAoJYnl0ZSAweDAwMjQKCXN0b3JlIDIgLy8gaGVhZCBvZmZzZXQKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCgl0eG4gU2VuZGVyCgljb25jYXQKCXN0b3JlIDAgLy8gdHVwbGUgaGVhZAoJbG9hZCAwIC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMiAvLyBib3hJbmRleDogdWludDE2Cgljb25jYXQKCXN0b3JlIDAgLy8gdHVwbGUgaGVhZAoJbG9hZCAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMiAvLyBoZWFkIG9mZnNldAoJY29uY2F0CglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMSAvLyBhcmM6IGJ5dGVzCglkdXAKCWxlbgoJaXRvYgoJZXh0cmFjdCA2IDIKCXN3YXAKCWNvbmNhdAoJZHVwCglsZW4KCWxvYWQgMiAvLyBoZWFkIG9mZnNldAoJYnRvaQoJKwoJaXRvYgoJZXh0cmFjdCA2IDIKCXN0b3JlIDIgLy8gaGVhZCBvZmZzZXQKCWxvYWQgMSAvLyB0dXBsZSB0YWlsCglzd2FwCgljb25jYXQKCXN0b3JlIDEgLy8gdHVwbGUgdGFpbAoJbG9hZCAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMSAvLyB0dXBsZSB0YWlsCgljb25jYXQKCWZyYW1lX2J1cnkgLTUgLy8gd2hpdGVsaXN0OiBXaGl0ZWxpc3QKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjYxCgkvLyB0aGlzLndoaXRlbGlzdC5kZWxldGUod2hpdGVsaXN0KQoJZnJhbWVfZGlnIC01IC8vIHdoaXRlbGlzdDogV2hpdGVsaXN0Cglib3hfZGVsCgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czo2MwoJLy8gdGhpcy53aGl0ZWxpc3QucHV0KHdoaXRlbGlzdCwgYXBwSURzKQoJZnJhbWVfZGlnIC01IC8vIHdoaXRlbGlzdDogV2hpdGVsaXN0CglkdXAKCWJveF9kZWwKCXBvcAoJZnJhbWVfZGlnIC0zIC8vIGFwcElEczogdWludDY0W10KCWJveF9wdXQKCgkvLyBpZjFfY29uZGl0aW9uCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjY1CgkvLyBwcmVNQlIgPiB0aGlzLmFwcC5hZGRyZXNzLm1pbkJhbGFuY2UKCWZyYW1lX2RpZyAtNCAvLyBwcmVNQlI6IHVpbnQ2NAoJdHhuYSBBcHBsaWNhdGlvbnMgMAoJYXBwX3BhcmFtc19nZXQgQXBwQWRkcmVzcwoJYXNzZXJ0CglhY2N0X3BhcmFtc19nZXQgQWNjdE1pbkJhbGFuY2UKCWFzc2VydAoJPgoJYnogaWYxX2Vsc2UKCgkvLyBpZjFfY29uc2VxdWVudAoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czo2NgoJLy8gdGhpcy5zZW5kTUJSUGF5bWVudChwcmVNQlIpCglmcmFtZV9kaWcgLTQgLy8gcHJlTUJSOiB1aW50NjQKCWNhbGxzdWIgc2VuZE1CUlBheW1lbnQKCWIgaWYxX2VuZAoKaWYxX2Vsc2U6CgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjY4CgkvLyB0aGlzLnZlcmlmeU1CUlBheW1lbnQodGhpcy50eG5Hcm91cFt0aGlzLnR4bi5ncm91cEluZGV4IC0gMV0sIHByZU1CUikKCWZyYW1lX2RpZyAtNCAvLyBwcmVNQlI6IHVpbnQ2NAoJdHhuIEdyb3VwSW5kZXgKCWludCAxCgktCgljYWxsc3ViIHZlcmlmeU1CUlBheW1lbnQKCmlmMV9lbmQ6CglyZXRzdWIKCmFiaV9yb3V0ZV9kZWxldGVXaGl0ZWxpc3Q6Cgl0eG4gT25Db21wbGV0aW9uCglpbnQgTm9PcAoJPT0KCXR4biBBcHBsaWNhdGlvbklECglpbnQgMAoJIT0KCSYmCglhc3NlcnQKCWJ5dGUgMHgKCWR1cAoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQoJZXh0cmFjdCAyIDAKCWNhbGxzdWIgZGVsZXRlV2hpdGVsaXN0CglpbnQgMQoJcmV0dXJuCgpkZWxldGVXaGl0ZWxpc3Q6Cglwcm90byA0IDAKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjgwCgkvLyBwcmVNQlIgPSB0aGlzLmFwcC5hZGRyZXNzLm1pbkJhbGFuY2UKCXR4bmEgQXBwbGljYXRpb25zIDAKCWFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKCWFzc2VydAoJYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCglhc3NlcnQKCWZyYW1lX2J1cnkgLTMgLy8gcHJlTUJSOiB1aW50NjQKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjgxCgkvLyB3aGl0ZWxpc3Q6IFdoaXRlbGlzdCA9IHsgYWNjb3VudDogdGhpcy50eG4uc2VuZGVyLCBib3hJbmRleDogYm94SW5kZXgsIGFyYzogYXJjIH0KCWJ5dGUgMHgKCWR1cAoJc3RvcmUgMCAvLyB0dXBsZSBoZWFkCglzdG9yZSAxIC8vIHR1cGxlIHRhaWwKCWJ5dGUgMHgwMDI0CglzdG9yZSAyIC8vIGhlYWQgb2Zmc2V0Cglsb2FkIDAgLy8gdHVwbGUgaGVhZAoJdHhuIFNlbmRlcgoJY29uY2F0CglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTIgLy8gYm94SW5kZXg6IHVpbnQxNgoJY29uY2F0CglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCglsb2FkIDIgLy8gaGVhZCBvZmZzZXQKCWNvbmNhdAoJc3RvcmUgMCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTEgLy8gYXJjOiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWR1cAoJbGVuCglsb2FkIDIgLy8gaGVhZCBvZmZzZXQKCWJ0b2kKCSsKCWl0b2IKCWV4dHJhY3QgNiAyCglzdG9yZSAyIC8vIGhlYWQgb2Zmc2V0Cglsb2FkIDEgLy8gdHVwbGUgdGFpbAoJc3dhcAoJY29uY2F0CglzdG9yZSAxIC8vIHR1cGxlIHRhaWwKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCglsb2FkIDEgLy8gdHVwbGUgdGFpbAoJY29uY2F0CglmcmFtZV9idXJ5IC00IC8vIHdoaXRlbGlzdDogV2hpdGVsaXN0CgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czo4MwoJLy8gdGhpcy53aGl0ZWxpc3QuZGVsZXRlKHdoaXRlbGlzdCkKCWZyYW1lX2RpZyAtNCAvLyB3aGl0ZWxpc3Q6IFdoaXRlbGlzdAoJYm94X2RlbAoKCS8vIGV4YW1wbGVzL2FyYzc1L2FyYzc1LmFsZ28udHM6ODUKCS8vIHRoaXMuc2VuZE1CUlBheW1lbnQocHJlTUJSKQoJZnJhbWVfZGlnIC0zIC8vIHByZU1CUjogdWludDY0CgljYWxsc3ViIHNlbmRNQlJQYXltZW50CglyZXRzdWIKCmFiaV9yb3V0ZV9kZWxldGVBcHBGcm9tV2hpdGVsaXN0OgoJdHhuIE9uQ29tcGxldGlvbgoJaW50IE5vT3AKCT09Cgl0eG4gQXBwbGljYXRpb25JRAoJaW50IDAKCSE9CgkmJgoJYXNzZXJ0CglieXRlIDB4CglkdXBuIDIKCXR4bmEgQXBwbGljYXRpb25BcmdzIDQKCWJ0b2kKCXR4bmEgQXBwbGljYXRpb25BcmdzIDMKCWJ0b2kKCXR4bmEgQXBwbGljYXRpb25BcmdzIDIKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWV4dHJhY3QgMiAwCgljYWxsc3ViIGRlbGV0ZUFwcEZyb21XaGl0ZWxpc3QKCWludCAxCglyZXR1cm4KCmRlbGV0ZUFwcEZyb21XaGl0ZWxpc3Q6Cglwcm90byA3IDAKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjk3CgkvLyBwcmVNQlIgPSB0aGlzLmFwcC5hZGRyZXNzLm1pbkJhbGFuY2UKCXR4bmEgQXBwbGljYXRpb25zIDAKCWFwcF9wYXJhbXNfZ2V0IEFwcEFkZHJlc3MKCWFzc2VydAoJYWNjdF9wYXJhbXNfZ2V0IEFjY3RNaW5CYWxhbmNlCglhc3NlcnQKCWZyYW1lX2J1cnkgLTUgLy8gcHJlTUJSOiB1aW50NjQKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjk4CgkvLyB3aGl0ZWxpc3Q6IFdoaXRlbGlzdCA9IHsgYWNjb3VudDogdGhpcy50eG4uc2VuZGVyLCBib3hJbmRleDogYm94SW5kZXgsIGFyYzogYXJjIH0KCWJ5dGUgMHgKCWR1cAoJc3RvcmUgMCAvLyB0dXBsZSBoZWFkCglzdG9yZSAxIC8vIHR1cGxlIHRhaWwKCWJ5dGUgMHgwMDI0CglzdG9yZSAyIC8vIGhlYWQgb2Zmc2V0Cglsb2FkIDAgLy8gdHVwbGUgaGVhZAoJdHhuIFNlbmRlcgoJY29uY2F0CglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTIgLy8gYm94SW5kZXg6IHVpbnQxNgoJY29uY2F0CglzdG9yZSAwIC8vIHR1cGxlIGhlYWQKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCglsb2FkIDIgLy8gaGVhZCBvZmZzZXQKCWNvbmNhdAoJc3RvcmUgMCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTEgLy8gYXJjOiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWR1cAoJbGVuCglsb2FkIDIgLy8gaGVhZCBvZmZzZXQKCWJ0b2kKCSsKCWl0b2IKCWV4dHJhY3QgNiAyCglzdG9yZSAyIC8vIGhlYWQgb2Zmc2V0Cglsb2FkIDEgLy8gdHVwbGUgdGFpbAoJc3dhcAoJY29uY2F0CglzdG9yZSAxIC8vIHR1cGxlIHRhaWwKCWxvYWQgMCAvLyB0dXBsZSBoZWFkCglsb2FkIDEgLy8gdHVwbGUgdGFpbAoJY29uY2F0CglmcmFtZV9idXJ5IC02IC8vIHdoaXRlbGlzdDogV2hpdGVsaXN0CgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czoxMDAKCS8vIHNwbGljZWQgPSB0aGlzLndoaXRlbGlzdC5nZXQod2hpdGVsaXN0KS5zcGxpY2UoaW5kZXgsIDEpCglmcmFtZV9kaWcgLTYgLy8gd2hpdGVsaXN0OiBXaGl0ZWxpc3QKCWJveF9nZXQKCWFzc2VydAoJaW50IDAKCWV4dHJhY3RfdWludDE2CglpbnQgMQoJLQoJaXRvYgoJZXh0cmFjdCA2IDIKCWZyYW1lX2RpZyAtNCAvLyBpbmRleDogdWludDY0CglpbnQgOAoJKgoJaW50IDIKCSsKCXN0b3JlIDEyIC8vIHNwbGljZSBzdGFydAoJaW50IDEKCWludCA4CgkqCglpbnQgOAoJKwoJc3RvcmUgMTMgLy8gc3BsaWNlIGJ5dGUgbGVuZ3RoCglmcmFtZV9kaWcgLTYgLy8gd2hpdGVsaXN0OiBXaGl0ZWxpc3QKCWJveF9nZXQKCWFzc2VydAoJaW50IDIKCWxvYWQgMTIgLy8gc3BsaWNlIHN0YXJ0CglzdWJzdHJpbmczCglmcmFtZV9kaWcgLTYgLy8gd2hpdGVsaXN0OiBXaGl0ZWxpc3QKCWJveF9nZXQKCWFzc2VydAoJZHVwCglsZW4KCWxvYWQgMTIgLy8gc3BsaWNlIHN0YXJ0Cglsb2FkIDEzIC8vIHNwbGljZSBieXRlIGxlbmd0aAoJKwoJaW50IDgKCS0KCXN3YXAKCXN1YnN0cmluZzMKCWNvbmNhdAoJY29uY2F0CglpbnQgMQoJaXRvYgoJZXh0cmFjdCA2IDIKCWZyYW1lX2RpZyAtNiAvLyB3aGl0ZWxpc3Q6IFdoaXRlbGlzdAoJYm94X2dldAoJYXNzZXJ0Cglsb2FkIDEyIC8vIHNwbGljZSBzdGFydAoJbG9hZCAxMyAvLyBzcGxpY2UgYnl0ZSBsZW5ndGgKCWludCA4CgktCglleHRyYWN0MwoJY29uY2F0Cglzd2FwCglmcmFtZV9kaWcgLTYgLy8gd2hpdGVsaXN0OiBXaGl0ZWxpc3QKCWR1cAoJYm94X2RlbAoJcG9wCglzd2FwCglib3hfcHV0CglmcmFtZV9idXJ5IC03IC8vIHNwbGljZWQ6IHVpbnQ2NFtdCgoJLy8gZXhhbXBsZXMvYXJjNzUvYXJjNzUuYWxnby50czoxMDIKCS8vIGFzc2VydChzcGxpY2VkWzBdID09PSBhcHBJRCkKCWZyYW1lX2RpZyAtNyAvLyBzcGxpY2VkOiB1aW50NjRbXQoJaW50IDAKCWludCA4IC8vIGVsZW1lbnQgbGVuZ3RoCgkqIC8vIGVsZW1lbnQgb2Zmc2V0CglpbnQgMgoJKyAvLyBhZGQgdHdvIGZvciBsZW5ndGgKCWludCA4CglleHRyYWN0MwoJYnRvaQoJZnJhbWVfZGlnIC0zIC8vIGFwcElEOiB1aW50NjQKCT09Cglhc3NlcnQKCgkvLyBleGFtcGxlcy9hcmM3NS9hcmM3NS5hbGdvLnRzOjEwNAoJLy8gdGhpcy5zZW5kTUJSUGF5bWVudChwcmVNQlIpCglmcmFtZV9kaWcgLTUgLy8gcHJlTUJSOiB1aW50NjQKCWNhbGxzdWIgc2VuZE1CUlBheW1lbnQKCXJldHN1YgoKbWFpbjoKCXR4biBOdW1BcHBBcmdzCglibnogcm91dGVfYWJpCgl0eG4gQXBwbGljYXRpb25JRAoJaW50IDAKCT09CglibnogYmFyZV9yb3V0ZV9jcmVhdGUKCnJvdXRlX2FiaToKCW1ldGhvZCAiYWRkQXBwVG9XaGl0ZUxpc3Qoc3RyaW5nLHVpbnQxNix1aW50NjQscGF5KXZvaWQiCgltZXRob2QgInNldEFwcFdoaXRlbGlzdChzdHJpbmcsdWludDE2LHVpbnQ2NFtdKXZvaWQiCgltZXRob2QgImRlbGV0ZVdoaXRlbGlzdChzdHJpbmcsdWludDE2KXZvaWQiCgltZXRob2QgImRlbGV0ZUFwcEZyb21XaGl0ZWxpc3Qoc3RyaW5nLHVpbnQxNix1aW50NjQsdWludDY0KXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCBhYmlfcm91dGVfYWRkQXBwVG9XaGl0ZUxpc3QgYWJpX3JvdXRlX3NldEFwcFdoaXRlbGlzdCBhYmlfcm91dGVfZGVsZXRlV2hpdGVsaXN0IGFiaV9yb3V0ZV9kZWxldGVBcHBGcm9tV2hpdGVsaXN0";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50IDEKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "addAppToWhiteList", desc: "", args: [{ type: "string", name: "arc", desc: "" }, { type: "uint16", name: "boxIndex", desc: "" }, { type: "uint64", name: "appID", desc: "" }, { type: "pay", name: "payment", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "setAppWhitelist", desc: "", args: [{ type: "string", name: "arc", desc: "" }, { type: "uint16", name: "boxIndex", desc: "" }, { type: "uint64[]", name: "appIDs", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "deleteWhitelist", desc: "", args: [{ type: "string", name: "arc", desc: "" }, { type: "uint16", name: "boxIndex", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "deleteAppFromWhitelist", desc: "", args: [{ type: "string", name: "arc", desc: "" }, { type: "uint16", name: "boxIndex", desc: "" }, { type: "uint64", name: "appID", desc: "" }, { type: "uint64", name: "index", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async addAppToWhiteList(args: {
        arc: string;
        boxIndex: bigint;
        appID: bigint;
        payment: algosdk.TransactionWithSigner | algosdk.Transaction;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.addAppToWhiteList({ arc: args.arc, boxIndex: args.boxIndex, appID: args.appID, payment: args.payment }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async setAppWhitelist(args: {
        arc: string;
        boxIndex: bigint;
        appIDs: bigint[];
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.setAppWhitelist({ arc: args.arc, boxIndex: args.boxIndex, appIDs: args.appIDs }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async deleteWhitelist(args: {
        arc: string;
        boxIndex: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.deleteWhitelist({ arc: args.arc, boxIndex: args.boxIndex }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async deleteAppFromWhitelist(args: {
        arc: string;
        boxIndex: bigint;
        appID: bigint;
        index: bigint;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.deleteAppFromWhitelist({ arc: args.arc, boxIndex: args.boxIndex, appID: args.appID, index: args.index }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        addAppToWhiteList: async (args: {
            arc: string;
            boxIndex: bigint;
            appID: bigint;
            payment: algosdk.TransactionWithSigner | algosdk.Transaction;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "addAppToWhiteList"), { arc: args.arc, boxIndex: args.boxIndex, appID: args.appID, payment: args.payment }, txnParams, atc);
        },
        setAppWhitelist: async (args: {
            arc: string;
            boxIndex: bigint;
            appIDs: bigint[];
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "setAppWhitelist"), { arc: args.arc, boxIndex: args.boxIndex, appIDs: args.appIDs }, txnParams, atc);
        },
        deleteWhitelist: async (args: {
            arc: string;
            boxIndex: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "deleteWhitelist"), { arc: args.arc, boxIndex: args.boxIndex }, txnParams, atc);
        },
        deleteAppFromWhitelist: async (args: {
            arc: string;
            boxIndex: bigint;
            appID: bigint;
            index: bigint;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "deleteAppFromWhitelist"), { arc: args.arc, boxIndex: args.boxIndex, appID: args.appID, index: args.index }, txnParams, atc);
        }
    };
}
