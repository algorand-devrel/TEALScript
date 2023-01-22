/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import { Contract } from '../../src/lib/index';

// eslint-disable-next-line no-unused-vars
class AccountTest extends Contract {
  hasAsset(a: Account): void {
    assert(a.hasAsset(new Asset(123)));
  }

  assetBalance(a: Account): void {
    assert(a.assetBalance(new Asset(123)));
  }

  assetFrozen(a: Account): void {
    assert(a.assetFrozen(new Asset(123)));
  }

  hasBalance(a: Account): void {
    assert(a.hasBalance);
  }

  balance(a: Account): void {
    assert(a.balance);
  }

  minBalance(a: Account): void {
    assert(a.minBalance);
  }

  authAddr(a: Account): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    assert(a.authAddr);
  }

  totalNumUint(a: Account): void {
    assert(a.totalNumUint);
  }

  totalNumByteSlice(a: Account): void {
    assert(a.totalNumByteSlice);
  }

  totalExtraAppPages(a: Account): void {
    assert(a.totalExtraAppPages);
  }

  totalAppsCreated(a: Account): void {
    assert(a.totalAppsCreated);
  }

  totalAppsOptedIn(a: Account): void {
    assert(a.totalAppsOptedIn);
  }

  totalAssetsCreated(a: Account): void {
    assert(a.totalAssetsCreated);
  }

  totalAssets(a: Account): void {
    assert(a.totalAssets);
  }

  totalBoxes(a: Account): void {
    assert(a.totalBoxes);
  }

  totalBoxBytes(a: Account): void {
    assert(a.totalBoxBytes);
  }
}
