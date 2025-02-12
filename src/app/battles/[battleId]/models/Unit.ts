export interface Unit {
  unitType?: 'melee' | 'range';
  player: number;
  health: number;
  attack: number;
  defense: number;
  movement: number;
  hasMoved?: boolean;
  hasAttacked?: boolean;
}