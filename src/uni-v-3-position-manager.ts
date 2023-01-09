import {
  Collect as CollectEvent,
  DecreaseLiquidity as DecreaseLiquidityEvent,
  IncreaseLiquidity as IncreaseLiquidityEvent,
  UniV3PositionManager,
} from "../generated/UniV3PositionManager/UniV3PositionManager"
import {
  UniV3Position
} from "../generated/schema"


export function handleCollect(event: CollectEvent): void {
  let entity = UniV3Position.load(event.params.tokenId.toString());
  if (entity == null) {
    return;
  }
  let positionManager = UniV3PositionManager.bind(event.address);
  let position = positionManager.positions(event.params.tokenId);
  entity.amount0 = position.getTokensOwed0();
  entity.amount1 = position.getTokensOwed1();
  entity.save();
}

export function handleDecreaseLiquidity(event: DecreaseLiquidityEvent): void {
  let entity = UniV3Position.load(event.params.tokenId.toString());
  if (entity == null) {
    return;
  }
  let positionManager = UniV3PositionManager.bind(event.address);
  let position = positionManager.positions(event.params.tokenId);
  entity.amount0 = position.getTokensOwed0();
  entity.amount1 = position.getTokensOwed1();
  entity.liquidity = entity.liquidity.minus(event.params.liquidity);
  entity.save();
}

export function handleIncreaseLiquidity(event: IncreaseLiquidityEvent): void {
  let entity = UniV3Position.load(event.params.tokenId.toString());
  if (entity == null) {
    return;
  }
  let positionManager = UniV3PositionManager.bind(event.address);
  let position = positionManager.positions(event.params.tokenId);
  entity.amount0 = position.getTokensOwed0();
  entity.amount1 = position.getTokensOwed1();
  entity.liquidity = entity.liquidity.plus(event.params.liquidity);
  entity.save();
}
