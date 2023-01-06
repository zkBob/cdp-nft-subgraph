import { BigInt, store } from "@graphprotocol/graph-ts"
import {
  Vault as VaultContract,
  CollateralDeposited,
  CollateralWithdrew,
  DebtBurned,
  DebtMinted,
  VaultLiquidated,
  VaultOpened
} from "../generated/Vault/Vault"
import { UniV3PositionManager } from "../generated/UniV3PositionManager/UniV3PositionManager"
import { uniV3Position, Vault } from "../generated/schema"


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
}

export function handleCollateralWithdrew(event: CollateralWithdrew): void {
  let position = uniV3Position.load(event.params.tokenId.toString());
  if (position == null) {
    return;
  }
  store.remove('uniV3Position', position.id.toString());
}

export function handleCollateralDeposited(event: CollateralDeposited): void {
  let vaultEntity = Vault.load(event.params.vaultId.toString());
  if (vaultEntity == null) {
    return;
  }
  let position = new uniV3Position(event.params.tokenId.toString());
  let cdp = VaultContract.bind(event.address);
  let positionManager = UniV3PositionManager.bind(cdp.positionManager());
  let info = positionManager.positions(event.params.tokenId);
  position.token0 = info.getToken0();
  position.token1 = info.getToken1();
  position.amount0 = info.getTokensOwed0();
  position.amount1 = info.getTokensOwed1();
  position.vault = vaultEntity.id;
  position.liquidity = info.getLiquidity();
  position.save();
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
  store.remove('Vault', vault.id);
}
