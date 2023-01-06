// import {
//   assert,
//   describe,
//   test,
//   clearStore,
//   beforeAll,
//   afterAll,
//   createMockedFunction
// } from "matchstick-as/assembly/index"
// import { ethereum } from "@graphprotocol/graph-ts"
// import { Address, BigInt } from "@graphprotocol/graph-ts"
// import { handleCollateralDeposited, handleVaultOpened } from "../src/vault"
// import { createCollateralDepositedEvent, createVaultOpenedEvent } from "./vault-utils"

// // Tests structure (matchstick-as >=0.5.0)
// // https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

// describe("", () => {
//   beforeAll(() => {
//     let sender = Address.fromString(
//       "0x0000000000000000000000000000000000000001"
//     )
//     let vaultId = BigInt.fromI32(1)
//     let newVault = createVaultOpenedEvent(sender, vaultId)
//     handleVaultOpened(newVault);
//   })

//   afterAll(() => {
//     clearStore()
//   })

//   // For more test scenarios, see:
//   // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

//   test("Full lifecycle", () => {
//     assert.entityCount("Vault", 1)
//     let sender = Address.fromString(
//       "0x0000000000000000000000000000000000000001"
//     )
//     let vaultId = BigInt.fromI32(1)
//     createMockedFunction(
//       Address.fromString("0xC36442b4a4522E871399CD717aBDD847Ab11FE88"),
//       "positions",
//       "positions(uint256):(uint96,address,address,address,uint24,int24,int24,uint128)"
//     )
//       .withArgs([ethereum.Value.fromI32()])
//       .returns([ethereum.Value.fromI32(0),])
//     let newCollateralDepositedEvent = createCollateralDepositedEvent(
//       sender,
//       vaultId,
//       tokenId
//     )
//     handleCollateralDeposited(newCollateralDepositedEvent)

//     // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "sender",
//       "0x0000000000000000000000000000000000000001"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "vaultId",
//       "234"
//     )
//     assert.fieldEquals(
//       "ExampleEntity",
//       "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
//       "tokenId",
//       "234"
//     )

//     // More assert options:
//     // https://thegraph.com/docs/en/developer/matchstick/#asserts
//   })
// })
