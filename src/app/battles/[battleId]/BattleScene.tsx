/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Game } from './models/Game';
import Cell from './Cell';
import { Unit } from './models/Unit';

interface BattleSceneProps {
  battleId?: string;
  players?: string[];
}
const BattleScene: React.FC<BattleSceneProps> = ({ battleId }) => {
  const [game, setGame] = useState<Game>();
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<number[] | null>(null);

  useEffect(() => {
    setGame(new Game());
  }, []);

  const onClickUnit = (position: number[]) => {
    if (!game) {
      return;
    }
    const unit = game?.board[position[0]][position[1]];

    // If no unit is selected and clicked on own unit
    if (!selectedUnit && unit && unit.player === currentPlayer) {
      setSelectedUnit(unit);
      setSelectedPosition(position);
    } else if (selectedUnit && selectedPosition) {
      // If unit is already selected
      const moves = game.getPossibleMoves(selectedPosition[0], selectedPosition[1]);
      const attacks = game.getPossibleAttacks(selectedPosition[0], selectedPosition[1]);

      // check if clicked position is valid attack
      if (attacks.some(([mi, mj]) => mi === position[0] && mj === position[1])) {
        game.attack(selectedPosition[0], selectedPosition[1], position[0], position[1]);
        setSelectedUnit(null);
        setSelectedPosition(null);
        return;
      }
      // check if move is valid
      if (moves.some(([mi, mj]) => mi === position[0] && mj === position[1])) {
        // move from old to new position
        game.moveUnit(selectedPosition[0], selectedPosition[1], position[0], position[1]);
        setSelectedUnit(null);
        setSelectedPosition(null);
        return;
      }
      // deselect unit
      setSelectedUnit(null);
      setSelectedPosition(null);
    }
  };

  const isSelected = (i: number, j: number) => {
    if (selectedPosition) {
      return selectedPosition[0] === i && selectedPosition[1] == j;
    }
    return false;
  };

  const isPossibleMove = (i: number, j: number) => {
    if (!game) {
      return false;
    }
    if (!selectedPosition) {
      return false;
    }
    const moves = game.getPossibleMoves(selectedPosition[0], selectedPosition[1]);
    if (moves.some(([mi, mj]) => mi === i && mj === j)) {
      return true;
    }
    return false;
  };

  const isPossibleAttack = (i: number, j: number) => {
    if (!game) {
      return false;
    }
    if (!selectedPosition) {
      return false;
    }
    const attacks = game.getPossibleAttacks(selectedPosition[0], selectedPosition[1]);
    if (attacks.some(([mi, mj]) => mi === i && mj === j)) {
      return true;
    }
    return false;
  };

  const endMyTurn = () => {
    if (!game) {
      return;
    }

    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    game.endTurn();
    // deselect unit
    setSelectedUnit(null);
    setSelectedPosition(null);
  };
  return (
    <div className='text-sm flex flex-col gap-1'>
      <div>Player Turn - {currentPlayer}</div>
      <div>
        Selected Unit - type:{selectedUnit?.unitType} | attack:{selectedUnit?.attack} | health:{selectedUnit?.health}
      </div>
      <div >
        <button className='bg-blue-500 text-white px-2' onClick={endMyTurn} >Finish My Turn</button>
      </div>
      <div>
        <div>Board:</div>
        <div className='gap-1 grid grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(15,minmax(0,1fr))]'>
          {game &&
            game.board.map((row, i) =>
              row.map((cell, j) => (
                <Cell
                  key={i + ':' + j}
                  position={[i, j]}
                  unit={game.board[i][j]}
                  isSelected={isSelected(i, j)}
                  onClick={onClickUnit}
                  isPossibleMove={isPossibleMove(i, j)}
                  isPossibleAttack={isPossibleAttack(i, j)}
                />
              ))
            )}
        </div>
      </div>
    </div>
  );
};

export default BattleScene;
