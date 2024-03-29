import { BigInt, Bytes, store, log } from "@graphprotocol/graph-ts"
import {
  Vault as VaultContract,
  CollateralDeposited,
  CollateralWithdrew,
  DebtBurned,
  DebtMinted,
  VaultLiquidated,
  VaultOpened,
  LiquidationThresholdChanged,
  BorrowThresholdChanged,
  MinWidthChanged
} from "../generated/Vault/Vault"
import { UniV3PositionManager } from "../generated/UniV3PositionManager/UniV3PositionManager"
import { UniV3Factory } from "../generated/UniV3PositionManager/UniV3Factory"
import { DebtBurnedEntity, DebtMintedEntity, Deposit, PoolInfo, UniV3Position, Vault, Withdrawal } from "../generated/schema"


export function handleVaultOpened(event: VaultOpened): void {
  let vault = new Vault(event.params.vaultId.toString());
  vault.vaultNormalizedDebt = BigInt.fromI32(0);
  vault.uniV3Positions = [];
  vault.save();
}

export function handleDebtMinted(event: DebtMinted): void {
  let vaultEntity = Vault.load(event.params.vaultId.toString());
  if (vaultEntity == null) {
    return;
  }
  let cdp = VaultContract.bind(event.address);
  vaultEntity.vaultNormalizedDebt = cdp.vaultNormalizedDebt(event.params.vaultId);
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
  vaultEntity.vaultNormalizedDebt = cdp.vaultNormalizedDebt(event.params.vaultId);
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
  store.remove('UniV3Position', position.id.toString());

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
  let factory = UniV3Factory.bind(positionManager.factory());
  let pool = factory.getPool(info.getToken0(), info.getToken1(), info.getFee());
  position.token0 = info.getToken0();
  position.token1 = info.getToken1();
  position.amount0 = info.getTokensOwed0();
  position.amount1 = info.getTokensOwed1();
  position.liquidity = info.getLiquidity();
  position.tickLower = info.getTickLower();
  position.tickUpper = info.getTickUpper();
  position.pool = pool.toHexString();
  position.save();

  let positions = vaultEntity.uniV3Positions;
  positions.push(position.id);
  vaultEntity.uniV3Positions = positions;
  vaultEntity.save();

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
  vault.vaultNormalizedDebt = BigInt.fromI32(0);
  let positions = vault.uniV3Positions;
  vault.uniV3Positions = [];
  vault.save();
  for (let i = 0; i < positions.length; ++i) {
    store.remove('UniV3Position', positions[i]);
  }
  // INFO: vault can be reopened 
  // so, we don't need to remove the vault itself
}

export function handleLiquidationThresholdChanged(event: LiquidationThresholdChanged): void {
  let poolInfo = PoolInfo.load(event.params.pool.toHexString());
  if (poolInfo == null) {
    poolInfo = new PoolInfo(event.params.pool.toHexString());
    poolInfo.liquidationThreshold = BigInt.fromI32(0);
    poolInfo.borrowThreshold = BigInt.fromI32(0);
    poolInfo.minWidth = 0;
  }
  poolInfo.liquidationThreshold = event.params.liquidationThreshold;
  poolInfo.save();
}

export function handleBorrowThresholdChanged(event: BorrowThresholdChanged): void {
  let poolInfo = PoolInfo.load(event.params.pool.toHexString());
  if (poolInfo == null) {
    poolInfo = new PoolInfo(event.params.pool.toHexString());
    poolInfo.liquidationThreshold = BigInt.fromI32(0);
    poolInfo.borrowThreshold = BigInt.fromI32(0);
    poolInfo.minWidth = 0;
  }
  poolInfo.borrowThreshold = event.params.borrowThreshold;
  poolInfo.save();
}

export function handleMinWidthChanged(event: MinWidthChanged): void {
  let poolInfo = PoolInfo.load(event.params.pool.toHexString());
  if (poolInfo == null) {
    poolInfo = new PoolInfo(event.params.pool.toHexString());
    poolInfo.liquidationThreshold = BigInt.fromI32(0);
    poolInfo.borrowThreshold = BigInt.fromI32(0);
    poolInfo.minWidth = 0;
  }
  poolInfo.minWidth = event.params.minWidth;
  poolInfo.save();
}
