import { Contract } from '../../src/lib/index';

// eslint-disable-next-line no-unused-vars
class StorageTest extends Contract {
  globalRef = new GlobalReference<bytes>({ key: 'foo' });

  globalMap = new GlobalMap<bytes, bytes>();

  localRef = new LocalReference<bytes>({ key: 'foo' });

  localMap = new LocalMap<bytes, bytes>();

  boxRef = new BoxReference<bytes>({ key: 'foo', dynamicSize: false });

  boxMap = new BoxMap<bytes, bytes>({ dynamicSize: false });

  boxMapWithPrefix = new BoxMap<bytes, bytes>({ prefix: 'f' });

  prefix(): void {
    this.boxMapWithPrefix.put('oo', 'bar');
  }

  globalRefPut(): void {
    this.globalRef.put('bar');
  }

  globalRefGet(): void {
    assert(this.globalRef.get() === 'bar');
  }

  globalRefDelete(): void {
    this.globalRef.delete();
  }

  globalRefExists(): void {
    this.globalRef.exists();
  }

  localRefPut(a: Account): void {
    this.localRef.put(a, 'bar');
  }

  localRefGet(a: Account): void {
    assert(this.localRef.get(a) === 'bar');
  }

  localRefDelete(a: Account): void {
    this.localRef.delete(a);
  }

  localRefExists(a: Account): void {
    this.localRef.exists(a);
  }

  boxRefPut(): void {
    this.boxRef.put('bar');
  }

  boxRefGet(): void {
    assert(this.boxRef.get() === 'bar');
  }

  boxRefDelete(): void {
    this.boxRef.delete();
  }

  boxRefExists(): void {
    this.boxRef.exists();
  }

  globalMapPut(): void {
    this.globalMap.put('foo', 'bar');
  }

  globalMapGet(): void {
    assert(this.globalMap.get('foo') === 'bar');
  }

  globalMapDelete(): void {
    this.globalMap.delete('foo');
  }

  globalMapExists(): void {
    this.globalMap.exists('foo');
  }

  localMapPut(a: Account): void {
    this.localMap.put(a, 'foo', 'bar');
  }

  localMapGet(a: Account): void {
    assert(this.localMap.get(a, 'foo') === 'bar');
  }

  localMapDelete(a: Account): void {
    this.localMap.delete(a, 'foo');
  }

  localMapExists(a: Account): void {
    this.localMap.exists(a, 'foo');
  }

  boxMapPut(): void {
    this.boxMap.put('foo', 'bar');
  }

  boxMapGet(): void {
    assert(this.boxMap.get('foo') === 'bar');
  }

  boxMapDelete(): void {
    this.boxMap.delete('foo');
  }

  boxMapExists(): void {
    this.boxMap.exists('foo');
  }
}
