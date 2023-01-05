import { BigInt } from "@graphprotocol/graph-ts"
import {
  Vault,
  CollateralDeposited,
  CollateralWithdrew,
  DebtBurned,
  DebtMinted,
  OracleUpdated,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StabilisationFeeUpdated,
  SystemPaused,
  SystemPrivate,
  SystemPublic,
  SystemUnpaused,
  TokenSet,
  VaultClosed,
  VaultLiquidated,
  VaultOpened
} from "../generated/Vault/Vault"
import { ExampleEntity } from "../generated/schema"

export function handleCollateralDeposited(event: CollateralDeposited): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from)

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.sender = event.params.sender
  entity.vaultId = event.params.vaultId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.ADMIN_DELEGATE_ROLE(...)
  // - contract.ADMIN_ROLE(...)
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.DENOMINATOR(...)
  // - contract.OPERATOR(...)
  // - contract.Q48(...)
  // - contract.Q96(...)
  // - contract.YEAR(...)
  // - contract.calculateVaultAdjustedCollateral(...)
  // - contract.depositorsAllowlist(...)
  // - contract.factory(...)
  // - contract.getOverallDebt(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.globalStabilisationFeePerUSDD(...)
  // - contract.globalStabilisationFeePerUSDSnapshotD(...)
  // - contract.globalStabilisationFeePerUSDSnapshotTimestamp(...)
  // - contract.hasRole(...)
  // - contract.isAdmin(...)
  // - contract.isOperator(...)
  // - contract.isPaused(...)
  // - contract.isPrivate(...)
  // - contract.mintDebtFromScratch(...)
  // - contract.openVault(...)
  // - contract.oracle(...)
  // - contract.ownedVaultsByAddress(...)
  // - contract.positionManager(...)
  // - contract.protocolGovernance(...)
  // - contract.stabilisationFeeRateD(...)
  // - contract.stabilisationFeeVaultSnapshot(...)
  // - contract.supportsInterface(...)
  // - contract.token(...)
  // - contract.treasury(...)
  // - contract.vaultCount(...)
  // - contract.vaultDebt(...)
  // - contract.vaultNftsById(...)
  // - contract.vaultOwner(...)
}

export function handleCollateralWithdrew(event: CollateralWithdrew): void {}

export function handleDebtBurned(event: DebtBurned): void {}

export function handleDebtMinted(event: DebtMinted): void {}

export function handleOracleUpdated(event: OracleUpdated): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleStabilisationFeeUpdated(
  event: StabilisationFeeUpdated
): void {}

export function handleSystemPaused(event: SystemPaused): void {}

export function handleSystemPrivate(event: SystemPrivate): void {}

export function handleSystemPublic(event: SystemPublic): void {}

export function handleSystemUnpaused(event: SystemUnpaused): void {}

export function handleTokenSet(event: TokenSet): void {}

export function handleVaultClosed(event: VaultClosed): void {}

export function handleVaultLiquidated(event: VaultLiquidated): void {}

export function handleVaultOpened(event: VaultOpened): void {}
