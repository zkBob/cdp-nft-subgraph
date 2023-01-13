import { BigInt, Bytes, store } from "@graphprotocol/graph-ts"
import {
  Vault as VaultContract,
  CollateralDeposited,
  CollateralWithdrew,
  DebtBurned,
  DebtMinted,
  VaultLiquidated,
  VaultOpened,
  WhitelistedPoolSet,
  WhitelistedPoolRevoked,
  LiquidationThresholdSet
} from "../generated/Vault/Vault"
import { UniV3PositionManager } from "../generated/UniV3PositionManager/UniV3PositionManager"
import { DebtBurnedEntity, DebtMintedEntity, Deposit, LiquidationThreshold, UniV3Position, Vault, Withdrawal } from "../generated/schema"


export function handleVaultOpened(event: VaultOpened): void {
  let vault = new Vault(event.params.vaultId.toString());
  vault.debt = BigInt.fromI32(0);
  vault.lastDebtUpdate = event.block.timestamp;
  vault.save();
}

export function handleDebtMinted(event: DebtMinted): void {
  let vaultEntity = Vault.load(event.params.vaultId.toString());
  if (vaultEntity == null) {
    return;
  }
  let cdp = VaultContract.bind(event.address);
  vaultEntity.debt = cdp.getOverallDebt(event.params.vaultId);
  vaultEntity.lastDebtUpdate = event.block.timestamp;
  vaultEntity.save();

  let minted = new DebtMintedEntity(event.transaction.hash.toHexString().concat(event.logIndex.toHexString()));
  minted.debtIncrease = event.params.amount;
  minted.vault = event.params.vaultId.toString();
  minted.save();
}

export function handleDebtBurned(event: DebtBurned): void {
  let vaultEntity = Vault.load(event.params.vaultId.toString());
  if (vaultEntity == null) {
    return;
  }
  let cdp = VaultContract.bind(event.address);
  vaultEntity.debt = cdp.getOverallDebt(event.params.vaultId);
  vaultEntity.lastDebtUpdate = event.block.timestamp;
  vaultEntity.save();

  let burned = new DebtBurnedEntity(event.transaction.hash.toHexString().concat(event.logIndex.toHexString()));
  burned.debtDecrease = event.params.amount;
  burned.vault = event.params.vaultId.toString();
  burned.save();
}

export function handleCollateralWithdrew(event: CollateralWithdrew): void {
  let position = UniV3Position.load(event.params.tokenId.toString());
  if (position == null) {
    return;
  }
  store.remove('uniV3Position', position.id.toString());

  let withdrawal = new Withdrawal(event.transaction.hash.toHexString().concat(event.logIndex.toHexString()));
  withdrawal.uniV3Position = event.params.tokenId;
  withdrawal.vault = event.params.vaultId.toString();
  withdrawal.save();
}

export function handleCollateralDeposited(event: CollateralDeposited): void {
  let vaultEntity = Vault.load(event.params.vaultId.toString());
  if (vaultEntity == null) {
    return;
  }
  let position = new UniV3Position(event.params.tokenId.toString());
  let cdp = VaultContract.bind(event.address);
  let positionManager = UniV3PositionManager.bind(cdp.positionManager());
  let info = positionManager.positions(event.params.tokenId);
  position.token0 = info.getToken0();
  position.token1 = info.getToken1();
  position.amount0 = info.getTokensOwed0();
  position.amount1 = info.getTokensOwed1();
  position.vault = vaultEntity.id;
  position.liquidity = info.getLiquidity();
  position.tickLower = info.getTickLower();
  position.tickUpper = info.getTickUpper();
  position.save();

  let deposit = new Deposit(event.transaction.hash.toHexString().concat(event.logIndex.toHexString()));
  deposit.uniV3Position = event.params.tokenId;
  deposit.vault = event.params.vaultId.toString();
  deposit.save();
}

export function handleVaultLiquidated(event: VaultLiquidated): void {
  let vault = Vault.load(event.params.vaultId.toString());
  if (vault == null) {
    return;
  }
  let positions = vault.uniV3Positions;
  for (let i = 0; i < positions.length; ++i) {
    let position = positions[i];
    store.remove('uniV3Position', position);
  }
  // INFO: vault can be reopened 
  // so, we don't need to remove the vault itself
}

export function handleWhitelistedPoolSet(event: WhitelistedPoolSet): void {
  let lt = new LiquidationThreshold(event.params.pool.toHexString());
  lt.liquidationThreshold = BigInt.fromI32(0);
  lt.save();
}

export function handleWhitelistedPoolRevoked(event: WhitelistedPoolRevoked): void {
  store.remove('LiquidationThreshold', event.params.pool.toHexString());
}

export function handleLiquidationThresholdSet(event: LiquidationThresholdSet): void {
  let lt = LiquidationThreshold.load(event.params.pool.toHexString());
  if (lt == null) {
    return;
  }
  lt.liquidationThreshold = event.params.liquidationThresholdD_;
  lt.save();
}
