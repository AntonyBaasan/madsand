import PostContainer from '@/components/PostContainer';
import { getBattles } from '../actions/getBattles';
import BattleItem from './BattleItem';

const BattlesPage = async () => {
  const battles = await getBattles();

  return (
    <PostContainer>
      <div className='flex flex-row gap-5'>
        <div className='p-5'>
          <div className='text-4xl mb-4 gap-2'>Player (Warlord):</div>
          <div className='text-lg'>Name: Lonely Wolf</div>
          <div className='text-lg'>Tribe: River People</div>
          <div className='text-lg'>Units: 10 melee, 20 range, 1 tank</div>
        </div>
        <div className='p-5'>
          <div className='text-4xl mb-4 gap-2'>Battles:</div>
          <div className='flex flex-col gap-4'>
            {battles.map((b) => (
              <BattleItem key={b.id} battle={b} />
            ))}
            {/* create new battle */}
            <button className='bg-green-500 hover:bg-green-700 px-4 py-2 text-white'>Create New Battle</button>
          </div>
        </div>
      </div>
    </PostContainer>
  );
};

export default BattlesPage;
