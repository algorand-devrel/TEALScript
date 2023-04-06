import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class ContactsApp extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: { myContact: { type: bkr.AVMType.bytes, key: "myContact", desc: "", static: false } }, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKCWIgbWFpbgoKcHJlQXJyYXlBY2Nlc3M6Cglwcm90byAzIDAKCWZyYW1lX2RpZyAtMyAvLyBmdWxsIHR1cGxlCglzdG9yZSAwIC8vIGZ1bGwgdHVwbGUKCWxvYWQgMCAvLyBmdWxsIHR1cGxlCglmcmFtZV9kaWcgLTEgLy8gaGVhZCBvZmZzZXQKCWV4dHJhY3RfdWludDE2IC8vIGV4dHJhY3QgYXJyYXkgb2Zmc2V0CglzdG9yZSAxIC8vIGFycmF5IG9mZnNldAoJbG9hZCAwIC8vIGZ1bGwgdHVwbGUKCWxvYWQgMSAvLyBhcnJheSBvZmZzZXQKCWV4dHJhY3RfdWludDE2IC8vIGV4dHJhY3QgYXJyYXkgbGVuZ3RoCglmcmFtZV9kaWcgLTIgLy8gdHlwZSBsZW5ndGgKCSogLy8gYXJyYXkgc2l6ZQoJaW50IDIKCSsgLy8gYXJyYXkgc2l6ZSArIGxlbgoJc3RvcmUgMiAvLyBmdWxsIGFycmF5IGxlbmd0aAoJcmV0c3ViCgp1cGRhdGVEeW5hbWljRWxlbWVudDoKCXByb3RvIDggMQoJZnJhbWVfZGlnIC04IC8vIG5ld0FycmF5CglzdG9yZSA2IC8vIG5ldyBhcnJheQoJbG9hZCAwIC8vIGZ1bGwgdHVwbGUKCWludCAwCglmcmFtZV9kaWcgLTIgLy8gc3RhcnRPZkhlYWRzCglleHRyYWN0MwoJc3RvcmUgMyAvLyBzdGF0aWMgcGFydCBvZiB0dXBsZQoJbG9hZCAwIC8vIGZ1bGwgdHVwbGUKCWZyYW1lX2RpZyAtMiAvLyBzdGFydE9mSGVhZHMKCWZyYW1lX2RpZyAtMyAvLyB0b3RhbEhlYWRMZW5ndGgKCWV4dHJhY3QzIAoJc3RvcmUgNCAvLyBkeW5hbWljIGhlYWRzCglieXRlIDB4CglkdXAKCXN0b3JlIDUgLy8gdmFsdWVzIGFmdGVyIGFycmF5CglzdG9yZSA3IC8vIHZhbHVlcyBiZWZvcmUgYXJyYXkKCWZyYW1lX2RpZyAtNCAvLyBsYXN0RHluYW1pY0VsZW1lbnQKCWJueiBza2lwX3ZhbHVlc19hZnRlcl9hcnJheQoJbG9hZCAwIC8vIGZ1bGwgdHVwbGUKCWxvYWQgMSAvLyBhcnJheSBvZmZzZXQKCWxvYWQgMiAvLyBmdWxsIGFycmF5IGxlbmd0aAoJKwoJbG9hZCAwIC8vIGZ1bGwgdHVwbGUKCWxlbgoJc3Vic3RyaW5nMwoJc3RvcmUgNSAvLyB2YWx1ZXMgYWZ0ZXIgYXJyYXkKCnNraXBfdmFsdWVzX2FmdGVyX2FycmF5OgoJZnJhbWVfZGlnIC01IC8vIGZpcnN0RHluYW1pY0VsZW1lbnQKCWJueiBza2lwX3ZhbHVlc19iZWZvcmVfYXJyYXkKCWxvYWQgMCAvLyBmdWxsIHR1cGxlCglmcmFtZV9kaWcgLTEgLy8gaGVhZEVuZAoJbG9hZCAxIC8vIGFycmF5IG9mZnNldAoJc3Vic3RyaW5nMwoJc3RvcmUgNyAvLyB2YWx1ZXMgYmVmb3JlIGFycmF5Cgpza2lwX3ZhbHVlc19iZWZvcmVfYXJyYXk6Cglsb2FkIDQgLy8gZHluYW1pYyBoZWFkcwoJZnJhbWVfZGlnIC02IC8vIGhlYWRVcGRhdGVCaXRtYXNrCglsb2FkIDYgLy8gbmV3IGFycmF5CglsZW4KCWxvYWQgMiAvLyBmdWxsIGFycmF5IGxlbmd0aAoJbG9hZCA2IC8vIG5ldyBhcnJheQoJbGVuCglsb2FkIDIgLy8gZnVsbCBhcnJheSBsZW5ndGgKCT49Cglibnogc2tpcF9sZW5fc3dhcAoJc3dhcAoKc2tpcF9sZW5fc3dhcDoKCS0KCWl0b2IKCWV4dHJhY3QgNiAyCglkdXAKCWNvbmNhdAoJZHVwCgljb25jYXQKCWR1cAoJY29uY2F0CglkdXAKCWNvbmNhdAoJZHVwCgljb25jYXQKCWImCglsb2FkIDYgLy8gbmV3IGFycmF5CglsZW4KCWxvYWQgMiAvLyBmdWxsIGFycmF5IGxlbmd0aAoJPj0KCWJueiBhZGRfaGVhZAoJYi0KCWIgc3ViX29yX2FkZF9oZWFkX2VuZAoKYWRkX2hlYWQ6CgliKwoKc3ViX29yX2FkZF9oZWFkX2VuZDoKCWZyYW1lX2RpZyAtNyAvLyBmdWxsSGVhZEJpdG1hc2sKCWImCglzdG9yZSA0IC8vIGR5bmFtaWMgaGVhZHMKCWxvYWQgMyAvLyBzdGF0aWMgcGFydCBvZiB0dXBsZQoJbG9hZCA0IC8vIGR5bmFtaWMgaGVhZHMKCWxvYWQgNyAvLyB2YWx1ZXMgYmVmb3JlIGFycmF5Cglsb2FkIDYgLy8gbmV3IGFycmF5Cglsb2FkIDUgLy8gdmFsdWVzIGFmdGVyIGFycmF5Cgljb25jYXQKCWNvbmNhdAoJY29uY2F0Cgljb25jYXQKCXJldHN1YgoKYmFyZV9yb3V0ZV9jcmVhdGU6Cgl0eG4gT25Db21wbGV0aW9uCglpbnQgTm9PcAoJPT0KCXR4biBBcHBsaWNhdGlvbklECglpbnQgMAoJPT0KCSYmCglhc3NlcnQKCWJ5dGUgMHgKCWR1cG4gMAoJY2FsbHN1YiBjcmVhdGUKCWludCAxCglyZXR1cm4KCmNyZWF0ZToKCXByb3RvIDEgMAoJcmV0c3ViCgphYmlfcm91dGVfc2V0TXlDb250YWN0OgoJdHhuIE9uQ29tcGxldGlvbgoJaW50IE5vT3AKCT09Cgl0eG4gQXBwbGljYXRpb25JRAoJaW50IDAKCSE9CgkmJgoJYXNzZXJ0CglieXRlIDB4CglkdXBuIDEKCXR4bmEgQXBwbGljYXRpb25BcmdzIDIKCWV4dHJhY3QgMiAwCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglleHRyYWN0IDIgMAoJY2FsbHN1YiBzZXRNeUNvbnRhY3QKCWludCAxCglyZXR1cm4KCnNldE15Q29udGFjdDoKCXByb3RvIDQgMAoKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czoxNQoJLy8gY29udGFjdDogQ29udGFjdCA9IHsgbmFtZTogbmFtZSwgY29tcGFueTogY29tcGFueSB9CglieXRlIDB4IC8vIG5vIHN0YXRpYyBlbGVtZW50cwoJc3RvcmUgMTEgLy8gc3RhdGljIGVsZW1lbnRzCglieXRlIDB4MDAwNCAvLyBoZWFkIGVuZAoJc3RvcmUgOCAvLyBkeW5hbWljIGhlYWQKCWludCA0CglzdG9yZSA5IC8vIGR5bmFtaWMgaGVhZCBvZmZzZXQKCWJ5dGUgMHgKCXN0b3JlIDEwIC8vIGR5bmFtaWMgZWxlbWVudHMKCWZyYW1lX2RpZyAtMSAvLyBuYW1lOiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWR1cAoJbGVuCglsb2FkIDkgLy8gZHluYW1pYyBoZWFkIG9mZnNldAoJKwoJZHVwCglzdG9yZSA5IC8vIGR5bmFtaWMgaGVhZCBvZmZzZXQKCWl0b2IKCWV4dHJhY3QgNiAyCglsb2FkIDggLy8gZHluYW1pYyBoZWFkCglzd2FwCgljb25jYXQKCXN0b3JlIDggLy8gZHluYW1pYyBoZWFkCglsb2FkIDEwIC8vIGR5bmFtaWMgZWxlbWVudHMKCXN3YXAKCWNvbmNhdAoJc3RvcmUgMTAgLy8gZHluYW1pYyBlbGVtZW50cwoJZnJhbWVfZGlnIC0yIC8vIGNvbXBhbnk6IGJ5dGVzCglkdXAKCWxlbgoJaXRvYgoJZXh0cmFjdCA2IDIKCXN3YXAKCWNvbmNhdAoJbG9hZCAxMCAvLyBkeW5hbWljIGVsZW1lbnRzCglzd2FwCgljb25jYXQKCXN0b3JlIDEwIC8vIGR5bmFtaWMgZWxlbWVudHMKCWxvYWQgMTEgLy8gc3RhdGljIGVsZW1lbnRzCglsb2FkIDggLy8gZHluYW1pYyBoZWFkCglsb2FkIDEwIC8vIGR5bmFtaWMgZWxlbWVudHMKCWNvbmNhdAoJY29uY2F0CglmcmFtZV9idXJ5IC0zIC8vIGNvbnRhY3Q6IENvbnRhY3QKCgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MTcKCS8vIHRoaXMubXlDb250YWN0LnB1dChjb250YWN0KQoJYnl0ZSAibXlDb250YWN0IgoJZnJhbWVfZGlnIC0zIC8vIGNvbnRhY3Q6IENvbnRhY3QKCWFwcF9nbG9iYWxfcHV0CgoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjE4CgkvLyB0aGlzLmNvbnRhY3RzLnB1dCh0aGlzLnR4bi5zZW5kZXIsIGNvbnRhY3QpCgl0eG4gU2VuZGVyCglkdXAKCWJveF9kZWwKCXBvcAoJZnJhbWVfZGlnIC0zIC8vIGNvbnRhY3Q6IENvbnRhY3QKCWJveF9wdXQKCXJldHN1YgoKYWJpX3JvdXRlX2FkZENvbnRhY3Q6Cgl0eG4gT25Db21wbGV0aW9uCglpbnQgTm9PcAoJPT0KCXR4biBBcHBsaWNhdGlvbklECglpbnQgMAoJIT0KCSYmCglhc3NlcnQKCWJ5dGUgMHgKCWR1cG4gMQoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMwoJYnRvaQoJdHhuYXMgQWNjb3VudHMKCXR4bmEgQXBwbGljYXRpb25BcmdzIDIKCWV4dHJhY3QgMiAwCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAxCglleHRyYWN0IDIgMAoJY2FsbHN1YiBhZGRDb250YWN0CglpbnQgMQoJcmV0dXJuCgphZGRDb250YWN0OgoJcHJvdG8gNSAwCgoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjIyCgkvLyBjb250YWN0OiBDb250YWN0ID0geyBuYW1lOiBuYW1lLCBjb21wYW55OiBjb21wYW55IH0KCWJ5dGUgMHggLy8gbm8gc3RhdGljIGVsZW1lbnRzCglzdG9yZSAxMSAvLyBzdGF0aWMgZWxlbWVudHMKCWJ5dGUgMHgwMDA0IC8vIGhlYWQgZW5kCglzdG9yZSA4IC8vIGR5bmFtaWMgaGVhZAoJaW50IDQKCXN0b3JlIDkgLy8gZHluYW1pYyBoZWFkIG9mZnNldAoJYnl0ZSAweAoJc3RvcmUgMTAgLy8gZHluYW1pYyBlbGVtZW50cwoJZnJhbWVfZGlnIC0xIC8vIG5hbWU6IGJ5dGVzCglkdXAKCWxlbgoJaXRvYgoJZXh0cmFjdCA2IDIKCXN3YXAKCWNvbmNhdAoJZHVwCglsZW4KCWxvYWQgOSAvLyBkeW5hbWljIGhlYWQgb2Zmc2V0CgkrCglkdXAKCXN0b3JlIDkgLy8gZHluYW1pYyBoZWFkIG9mZnNldAoJaXRvYgoJZXh0cmFjdCA2IDIKCWxvYWQgOCAvLyBkeW5hbWljIGhlYWQKCXN3YXAKCWNvbmNhdAoJc3RvcmUgOCAvLyBkeW5hbWljIGhlYWQKCWxvYWQgMTAgLy8gZHluYW1pYyBlbGVtZW50cwoJc3dhcAoJY29uY2F0CglzdG9yZSAxMCAvLyBkeW5hbWljIGVsZW1lbnRzCglmcmFtZV9kaWcgLTIgLy8gY29tcGFueTogYnl0ZXMKCWR1cAoJbGVuCglpdG9iCglleHRyYWN0IDYgMgoJc3dhcAoJY29uY2F0Cglsb2FkIDEwIC8vIGR5bmFtaWMgZWxlbWVudHMKCXN3YXAKCWNvbmNhdAoJc3RvcmUgMTAgLy8gZHluYW1pYyBlbGVtZW50cwoJbG9hZCAxMSAvLyBzdGF0aWMgZWxlbWVudHMKCWxvYWQgOCAvLyBkeW5hbWljIGhlYWQKCWxvYWQgMTAgLy8gZHluYW1pYyBlbGVtZW50cwoJY29uY2F0Cgljb25jYXQKCWZyYW1lX2J1cnkgLTQgLy8gY29udGFjdDogQ29udGFjdAoKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czoyMwoJLy8gdGhpcy5jb250YWN0cy5wdXQoYWRkcmVzcywgY29udGFjdCkKCWZyYW1lX2RpZyAtMyAvLyBhZGRyZXNzOiBhY2NvdW50CglkdXAKCWJveF9kZWwKCXBvcAoJZnJhbWVfZGlnIC00IC8vIGNvbnRhY3Q6IENvbnRhY3QKCWJveF9wdXQKCXJldHN1YgoKYWJpX3JvdXRlX3VwZGF0ZUNvbnRhY3RGaWVsZDoKCXR4biBPbkNvbXBsZXRpb24KCWludCBOb09wCgk9PQoJdHhuIEFwcGxpY2F0aW9uSUQKCWludCAwCgkhPQoJJiYKCWFzc2VydAoJYnl0ZSAweAoJZHVwbiAwCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAzCglidG9pCgl0eG5hcyBBY2NvdW50cwoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgoJZXh0cmFjdCAyIDAKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWV4dHJhY3QgMiAwCgljYWxsc3ViIHVwZGF0ZUNvbnRhY3RGaWVsZAoJaW50IDEKCXJldHVybgoKdXBkYXRlQ29udGFjdEZpZWxkOgoJcHJvdG8gNCAwCgoJLy8gaWYwX2NvbmRpdGlvbgoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjI3CgkvLyBmaWVsZCA9PT0gJ25hbWUnCglmcmFtZV9kaWcgLTEgLy8gZmllbGQ6IGJ5dGVzCglieXRlICJuYW1lIgoJPT0KCWJ6IGlmMF9lbHNlaWYxX2NvbmRpdGlvbgoKCS8vIGlmMF9jb25zZXF1ZW50CgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MjgKCS8vIHRoaXMuY29udGFjdHMuZ2V0KGFkZHJlc3MpLm5hbWUgPSB2YWx1ZQoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjEKCS8vIHRoaXMuY29udGFjdHMuZ2V0KGFkZHJlc3MpCglmcmFtZV9kaWcgLTMgLy8gYWRkcmVzczogYWNjb3VudAoJYm94X2dldAoJYXNzZXJ0CglpbnQgMSAvLyB0eXBlIGxlbmd0aAoJaW50IDAgLy8gaGVhZCBvZmZzZXQKCWNhbGxzdWIgcHJlQXJyYXlBY2Nlc3MKCWZyYW1lX2RpZyAtMiAvLyB2YWx1ZTogYnl0ZXMKCWR1cAoJbGVuCglpdG9iCglleHRyYWN0IDYgMgoJc3dhcAoJY29uY2F0CglieXRlIDB4RkZGRkZGRkYKCWJ5dGUgMHgwMDAwRkZGRiAvLyBoZWFkIHVwZGF0ZSBiaXRtYXNrCglpbnQgMSAvLyBpcyBmaXJzdCBkeW5hbWljIGVsZW1lbnQKCWludCAwIC8vIGlzIGxhc3QgZHluYW1pYyBlbGVtZW50CglpbnQgNCAvLyB0b3RhbCBoZWFkIGxlbmd0aAoJaW50IDAgLy8gc3RhcnRPZkhlYWRzCglpbnQgNCAvLyBoZWFkIGVuZAoJY2FsbHN1YiB1cGRhdGVEeW5hbWljRWxlbWVudAoJZnJhbWVfZGlnIC0zIC8vIGFkZHJlc3M6IGFjY291bnQKCWR1cAoJYm94X2RlbAoJcG9wCglzd2FwCglib3hfcHV0CgliIGlmMF9lbmQKCmlmMF9lbHNlaWYxX2NvbmRpdGlvbjoKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czoyOQoJLy8gZmllbGQgPT09ICdjb21wYW55JwoJZnJhbWVfZGlnIC0xIC8vIGZpZWxkOiBieXRlcwoJYnl0ZSAiY29tcGFueSIKCT09CglieiBpZjBfZWxzZQoKCS8vIGlmMF9lbHNlaWYxX2NvbnNlcXVlbnQKCS8vIGV4YW1wbGVzL3R1cGxlX2luX2JveC9hcHAuYWxnby50czozMAoJLy8gdGhpcy5jb250YWN0cy5nZXQoYWRkcmVzcykuY29tcGFueSA9IHZhbHVlCgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MQoJLy8gdGhpcy5jb250YWN0cy5nZXQoYWRkcmVzcykKCWZyYW1lX2RpZyAtMyAvLyBhZGRyZXNzOiBhY2NvdW50Cglib3hfZ2V0Cglhc3NlcnQKCWludCAxIC8vIHR5cGUgbGVuZ3RoCglpbnQgMiAvLyBoZWFkIG9mZnNldAoJY2FsbHN1YiBwcmVBcnJheUFjY2VzcwoJZnJhbWVfZGlnIC0yIC8vIHZhbHVlOiBieXRlcwoJZHVwCglsZW4KCWl0b2IKCWV4dHJhY3QgNiAyCglzd2FwCgljb25jYXQKCWJ5dGUgMHhGRkZGRkZGRgoJYnl0ZSAweDAwMDAwMDAwIC8vIGhlYWQgdXBkYXRlIGJpdG1hc2sKCWludCAwIC8vIGlzIGZpcnN0IGR5bmFtaWMgZWxlbWVudAoJaW50IDEgLy8gaXMgbGFzdCBkeW5hbWljIGVsZW1lbnQKCWludCA0IC8vIHRvdGFsIGhlYWQgbGVuZ3RoCglpbnQgMCAvLyBzdGFydE9mSGVhZHMKCWludCA0IC8vIGhlYWQgZW5kCgljYWxsc3ViIHVwZGF0ZUR5bmFtaWNFbGVtZW50CglmcmFtZV9kaWcgLTMgLy8gYWRkcmVzczogYWNjb3VudAoJZHVwCglib3hfZGVsCglwb3AKCXN3YXAKCWJveF9wdXQKCWIgaWYwX2VuZAoKaWYwX2Vsc2U6CgkvLyBleGFtcGxlcy90dXBsZV9pbl9ib3gvYXBwLmFsZ28udHM6MzEKCS8vIGVycigpCgllcnIKCmlmMF9lbmQ6CglyZXRzdWIKCmFiaV9yb3V0ZV92ZXJpZnlDb250YWN0TmFtZToKCXR4biBPbkNvbXBsZXRpb24KCWludCBOb09wCgk9PQoJdHhuIEFwcGxpY2F0aW9uSUQKCWludCAwCgkhPQoJJiYKCWFzc2VydAoJYnl0ZSAweAoJZHVwbiAwCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAyCglidG9pCgl0eG5hcyBBY2NvdW50cwoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQoJZXh0cmFjdCAyIDAKCWNhbGxzdWIgdmVyaWZ5Q29udGFjdE5hbWUKCWludCAxCglyZXR1cm4KCnZlcmlmeUNvbnRhY3ROYW1lOgoJcHJvdG8gMyAwCgoJLy8gZXhhbXBsZXMvdHVwbGVfaW5fYm94L2FwcC5hbGdvLnRzOjM1CgkvLyBhc3NlcnQodGhpcy5jb250YWN0cy5nZXQoYWRkcmVzcykubmFtZSA9PT0gbmFtZSkKCWZyYW1lX2RpZyAtMiAvLyBhZGRyZXNzOiBhY2NvdW50Cglib3hfZ2V0Cglhc3NlcnQKCWZyYW1lX2RpZyAtMiAvLyBhZGRyZXNzOiBhY2NvdW50Cglib3hfZ2V0Cglhc3NlcnQKCWludCAxIC8vIHR5cGUgbGVuZ3RoCglpbnQgMCAvLyBoZWFkIG9mZnNldAoJY2FsbHN1YiBwcmVBcnJheUFjY2VzcwoJbG9hZCAwIC8vIGZ1bGwgdHVwbGUKCWxvYWQgMSAvLyBhcnJheSBvZmZzZXQKCWxvYWQgMiAvLyBmdWxsIGFycmF5IGxlbmd0aAoJZXh0cmFjdDMKCWV4dHJhY3QgMiAwIC8vIGV4dHJhY3QgYnl0ZXMgZnJvbSBzdHJpbmcKCWZyYW1lX2RpZyAtMSAvLyBuYW1lOiBieXRlcwoJPT0KCWFzc2VydAoJcmV0c3ViCgptYWluOgoJdHhuIE51bUFwcEFyZ3MKCWJueiByb3V0ZV9hYmkKCXR4biBBcHBsaWNhdGlvbklECglpbnQgMAoJPT0KCWJueiBiYXJlX3JvdXRlX2NyZWF0ZQoKcm91dGVfYWJpOgoJbWV0aG9kICJzZXRNeUNvbnRhY3Qoc3RyaW5nLHN0cmluZyl2b2lkIgoJbWV0aG9kICJhZGRDb250YWN0KHN0cmluZyxzdHJpbmcsYWNjb3VudCl2b2lkIgoJbWV0aG9kICJ1cGRhdGVDb250YWN0RmllbGQoc3RyaW5nLHN0cmluZyxhY2NvdW50KXZvaWQiCgltZXRob2QgInZlcmlmeUNvbnRhY3ROYW1lKHN0cmluZyxhY2NvdW50KXZvaWQiCgl0eG5hIEFwcGxpY2F0aW9uQXJncyAwCgltYXRjaCBhYmlfcm91dGVfc2V0TXlDb250YWN0IGFiaV9yb3V0ZV9hZGRDb250YWN0IGFiaV9yb3V0ZV91cGRhdGVDb250YWN0RmllbGQgYWJpX3JvdXRlX3ZlcmlmeUNvbnRhY3ROYW1l";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50IDEKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "setMyContact", desc: "", args: [{ type: "string", name: "name", desc: "" }, { type: "string", name: "company", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "addContact", desc: "", args: [{ type: "string", name: "name", desc: "" }, { type: "string", name: "company", desc: "" }, { type: "account", name: "address", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "updateContactField", desc: "", args: [{ type: "string", name: "field", desc: "" }, { type: "string", name: "value", desc: "" }, { type: "account", name: "address", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "verifyContactName", desc: "", args: [{ type: "string", name: "name", desc: "" }, { type: "account", name: "address", desc: "" }], returns: { type: "void", desc: "" } })
    ];
    async setMyContact(args: {
        name: string;
        company: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.setMyContact({ name: args.name, company: args.company }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async addContact(args: {
        name: string;
        company: string;
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.addContact({ name: args.name, company: args.company, address: args.address }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async updateContactField(args: {
        field: string;
        value: string;
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.updateContactField({ field: args.field, value: args.value, address: args.address }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async verifyContactName(args: {
        name: string;
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this.execute(await this.compose.verifyContactName({ name: args.name, address: args.address }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    compose = {
        setMyContact: async (args: {
            name: string;
            company: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "setMyContact"), { name: args.name, company: args.company }, txnParams, atc);
        },
        addContact: async (args: {
            name: string;
            company: string;
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "addContact"), { name: args.name, company: args.company, address: args.address }, txnParams, atc);
        },
        updateContactField: async (args: {
            field: string;
            value: string;
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "updateContactField"), { field: args.field, value: args.value, address: args.address }, txnParams, atc);
        },
        verifyContactName: async (args: {
            name: string;
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this.addMethodCall(algosdk.getMethodByName(this.methods, "verifyContactName"), { name: args.name, address: args.address }, txnParams, atc);
        }
    };
}
