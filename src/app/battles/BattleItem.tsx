'use client';
import { useRouter } from 'next/navigation';
import { Battle } from '../actions/getBattles';

interface BattleItemProps {
  battle: Battle;
}
const BattleItem: React.FC<BattleItemProps> = ({ battle }) => {
  const router = useRouter();

  const onClickJoin = (battleId: string) => {
    router.push(`/battles/${battleId}`);
  };
  return (
    <div key={battle.id} className='flex flex-row gap-2 border bottom-1 border-black p-4'>
      <div className='text-lg'>
        {battle.name} ({battle.id})
      </div>
      <div>
        <button onClick={() => onClickJoin(battle.id)} className='bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white'>
          Join
        </button>
      </div>
    </div>
  );
};

export default BattleItem;
