import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
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

export function createCollateralDepositedEvent(
  sender: Address,
  vaultId: BigInt,
  tokenId: BigInt
): CollateralDeposited {
  let collateralDepositedEvent = changetype<CollateralDeposited>(newMockEvent())

  collateralDepositedEvent.parameters = new Array()

  collateralDepositedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  collateralDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  collateralDepositedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return collateralDepositedEvent
}

export function createCollateralWithdrewEvent(
  sender: Address,
  vaultId: BigInt,
  tokenId: BigInt
): CollateralWithdrew {
  let collateralWithdrewEvent = changetype<CollateralWithdrew>(newMockEvent())

  collateralWithdrewEvent.parameters = new Array()

  collateralWithdrewEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  collateralWithdrewEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  collateralWithdrewEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return collateralWithdrewEvent
}

export function createDebtBurnedEvent(
  sender: Address,
  vaultId: BigInt,
  amount: BigInt
): DebtBurned {
  let debtBurnedEvent = changetype<DebtBurned>(newMockEvent())

  debtBurnedEvent.parameters = new Array()

  debtBurnedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  debtBurnedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  debtBurnedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return debtBurnedEvent
}

export function createDebtMintedEvent(
  sender: Address,
  vaultId: BigInt,
  amount: BigInt
): DebtMinted {
  let debtMintedEvent = changetype<DebtMinted>(newMockEvent())

  debtMintedEvent.parameters = new Array()

  debtMintedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  debtMintedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )
  debtMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return debtMintedEvent
}

export function createOracleUpdatedEvent(
  origin: Address,
  sender: Address,
  oracleAddress: Address
): OracleUpdated {
  let oracleUpdatedEvent = changetype<OracleUpdated>(newMockEvent())

  oracleUpdatedEvent.parameters = new Array()

  oracleUpdatedEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  oracleUpdatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  oracleUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oracleAddress",
      ethereum.Value.fromAddress(oracleAddress)
    )
  )

  return oracleUpdatedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createStabilisationFeeUpdatedEvent(
  origin: Address,
  sender: Address,
  stabilisationFee: BigInt
): StabilisationFeeUpdated {
  let stabilisationFeeUpdatedEvent = changetype<StabilisationFeeUpdated>(
    newMockEvent()
  )

  stabilisationFeeUpdatedEvent.parameters = new Array()

  stabilisationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  stabilisationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  stabilisationFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "stabilisationFee",
      ethereum.Value.fromUnsignedBigInt(stabilisationFee)
    )
  )

  return stabilisationFeeUpdatedEvent
}

export function createSystemPausedEvent(
  origin: Address,
  sender: Address
): SystemPaused {
  let systemPausedEvent = changetype<SystemPaused>(newMockEvent())

  systemPausedEvent.parameters = new Array()

  systemPausedEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  systemPausedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return systemPausedEvent
}

export function createSystemPrivateEvent(
  origin: Address,
  sender: Address
): SystemPrivate {
  let systemPrivateEvent = changetype<SystemPrivate>(newMockEvent())

  systemPrivateEvent.parameters = new Array()

  systemPrivateEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  systemPrivateEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return systemPrivateEvent
}

export function createSystemPublicEvent(
  origin: Address,
  sender: Address
): SystemPublic {
  let systemPublicEvent = changetype<SystemPublic>(newMockEvent())

  systemPublicEvent.parameters = new Array()

  systemPublicEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  systemPublicEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return systemPublicEvent
}

export function createSystemUnpausedEvent(
  origin: Address,
  sender: Address
): SystemUnpaused {
  let systemUnpausedEvent = changetype<SystemUnpaused>(newMockEvent())

  systemUnpausedEvent.parameters = new Array()

  systemUnpausedEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  systemUnpausedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return systemUnpausedEvent
}

export function createTokenSetEvent(
  origin: Address,
  sender: Address,
  tokenAddress: Address
): TokenSet {
  let tokenSetEvent = changetype<TokenSet>(newMockEvent())

  tokenSetEvent.parameters = new Array()

  tokenSetEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  tokenSetEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  tokenSetEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return tokenSetEvent
}

export function createVaultClosedEvent(
  sender: Address,
  vaultId: BigInt
): VaultClosed {
  let vaultClosedEvent = changetype<VaultClosed>(newMockEvent())

  vaultClosedEvent.parameters = new Array()

  vaultClosedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  vaultClosedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )

  return vaultClosedEvent
}

export function createVaultLiquidatedEvent(
  sender: Address,
  vaultId: BigInt
): VaultLiquidated {
  let vaultLiquidatedEvent = changetype<VaultLiquidated>(newMockEvent())

  vaultLiquidatedEvent.parameters = new Array()

  vaultLiquidatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  vaultLiquidatedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )

  return vaultLiquidatedEvent
}

export function createVaultOpenedEvent(
  sender: Address,
  vaultId: BigInt
): VaultOpened {
  let vaultOpenedEvent = changetype<VaultOpened>(newMockEvent())

  vaultOpenedEvent.parameters = new Array()

  vaultOpenedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  vaultOpenedEvent.parameters.push(
    new ethereum.EventParam(
      "vaultId",
      ethereum.Value.fromUnsignedBigInt(vaultId)
    )
  )

  return vaultOpenedEvent
}
