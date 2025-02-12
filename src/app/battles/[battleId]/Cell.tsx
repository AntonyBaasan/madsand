/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Unit } from './models/Unit';

interface CellProps {
  unit: Unit | null;
  position: number[];
  isSelected: boolean;
  isPossibleMove: boolean;
  isPossibleAttack: boolean;
  onClick: (position: number[]) => void;
}
const Cell: React.FC<CellProps> = ({ unit, position, onClick, isPossibleAttack, isPossibleMove, isSelected }) => {
  const getBackgroundColor = () => {
    let result = '';
    if (unit) {
      if (unit.player === 1) {
        result = 'bg-blue-400 hover:bg-blue-500';
      } else {
        result = 'bg-red-400 hover:bg-red-500';
      }
      if (isSelected) {
        result += ' ring ring-1 ring-green-500';
      }
    } else if (isPossibleMove) {
      result = 'bg-green-100 hover:bg-green-200';
    } else if (isPossibleAttack) {
      result = 'bg-rose-500 hover:bg-rose-700';
    } else {
      result = 'bg-white hover:bg-blue-100';
    }

    return result;
  };
  return (
    <div
      onClick={() => onClick(position)}
      className={`
        text-sm 
        flex 
        flex-col
        justify-center
        items-center
        w-full
        h-full
        text-white
        ${getBackgroundColor()}
        hover:cursor-pointer
        border border-1 border-gray-500
        `}
    >
      {unit && unit.health}
    </div>
  );
};

export default Cell;
