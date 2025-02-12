import { Unit } from './Unit';

export class Game {
  public board: (Unit | null)[][];

  constructor() {
    this.board = this.create2DArray(15, 15);
    this.initialize();
  }

  initialize() {
    // Create units for player 1
    this.createUnit(1, 0, 0, 'melee');
    this.createUnit(1, 0, 1, 'melee');
    this.createUnit(1, 0, 2, 'range');
    this.createUnit(1, 5, 2, 'range');
    this.createUnit(1, 3, 2, 'range');

    // Create units for player 2
    this.createUnit(2, 14, 14, 'melee');
    this.createUnit(2, 10, 12, 'melee');
    this.createUnit(2, 13, 14, 'range');
    this.createUnit(2, 10, 14, 'range');
    this.createUnit(2, 12, 13, 'range');
  }

  createUnit(player: number, x: number, y: number, unitType: 'melee' | 'range') {
    const health = Math.floor(Math.random() * 50) + 50; // 50-100 health
    const attack = Math.floor(Math.random() * 20) + 10; // 10-30 attack
    const defense = Math.floor(Math.random() * 10) + 5; // 5-15 defense
    const movement = Math.floor(Math.random() * 3) + 8; // 2-4 movement
    // const movement = 30;

    this.board[x][y] = { player, health, attack, defense, movement, unitType } as Unit;
  }

  isValidPosition(x: number, y: number) {
    return x >= 0 && x < 15 && y >= 0 && y < 15;
  }

  getPossibleMoves(x: number, y: number) {
    const unit = this.board[x][y];
    if (!unit || unit.hasMoved) return [];

    const moves = [];
    const movement = unit.movement;

    for (let i = -movement; i <= movement; i++) {
      for (let j = -movement; j <= movement; j++) {
        if (Math.abs(i) + Math.abs(j) <= movement) {
          const newX = x + i;
          const newY = y + j;
          if (this.isValidPosition(newX, newY) && !this.board[newX][newY]) {
            moves.push([newX, newY]);
          }
        }
      }
    }

    return moves;
  }

  getPossibleAttacks(x: number, y: number) {
    const unit = this.board[x][y];
    if (!unit || unit.hasAttacked) return [];

    const attacks = [];
    const range = 1; // Attack range is 1 cell

    for (let i = -range; i <= range; i++) {
      for (let j = -range; j <= range; j++) {
        const newX = x + i;
        const newY = y + j;
        if (this.isValidPosition(newX, newY) &&
          this.board[newX][newY] &&
          this.board[newX][newY].player !== unit.player) {
          attacks.push([newX, newY]);
        }
      }
    }

    return attacks;
  }

  moveUnit(fromX: number, fromY: number, toX: number, toY: number) {
    const unit = this.board[fromX][fromY];
    if (!unit) {
      return;
    }
    const toPositionUnit = this.board[toX][toY];
    // if target position has no unit (which means we are moving)
    if (!toPositionUnit) {
      this.board[toX][toY] = unit;
      this.board[fromX][fromY] = null;
      unit.hasMoved = true;
      return;
    }
    // if target position has a unit (which means we are attacking)
    // than move to a closer position
    const possibleMoves = this.getPossibleMoves(fromX, fromY);
    if (possibleMoves.length > 0) {
      // Calculate distances to target for all possible moves
      const closestMove = possibleMoves.reduce((closest, [moveX, moveY]) => {
        const currentDistance = Math.abs(moveX - toX) + Math.abs(moveY - toY);
        const closestDistance = Math.abs(closest[0] - toX) + Math.abs(closest[1] - toY);
        return currentDistance < closestDistance ? [moveX, moveY] : closest;
      }, possibleMoves[0]);

      // Move to the closest valid position
      this.board[closestMove[0]][closestMove[1]] = this.board[fromX][fromY];
      this.board[fromX][fromY] = null;
      if (unit) unit.hasMoved = true;
    }
  }

  attack(attackerX: number, attackerY: number, defenderX: number, defenderY: number) {
    const attacker = this.board[attackerX][attackerY];
    const defender = this.board[defenderX][defenderY];

    if (attacker && defender) {
      const damage = Math.max(0, attacker.attack - defender.defense);
      defender.health -= damage;
      attacker.hasAttacked = true;

      if (defender.health <= 0) {
        this.board[defenderX][defenderY] = null;
      }

      // move to a closer position if it is a melee attack
      if (attacker.unitType === 'melee') {
        this.moveUnit(attackerX, attackerY, defenderX, defenderY);
      }
    }
  }

  endTurn() {
    // Reset movement and attack flags
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 15; j++) {
        if (this.board[i][j]) {
          (this.board[i][j] as Unit).hasMoved = false;
          (this.board[i][j] as Unit).hasAttacked = false;
        }
      }
    }
  }

  // move to utils
  create2DArray(rows: number, cols: number): (null)[][] {
    // Create array of arrays
    const array: (null)[][] = new Array(rows);

    // Fill each row with an array of nulls
    for (let i = 0; i < rows; i++) {
      array[i] = new Array(cols).fill(null);
    }

    return array;
  }
}