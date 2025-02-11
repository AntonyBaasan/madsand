import PostContainer from '@/components/PostContainer';
import BattleClient from './BattleClient';

interface IParams {
  battleId?: string;
}

// public facing page for a listing
const BattlePage = async ({ params }: { params: Promise<IParams> }) => {
  const param = await params;
  return (
    <PostContainer>
      <div className='text-4xl mb-4'>
        <BattleClient battleId={param.battleId} />
      </div>
    </PostContainer>
  );
};

export default BattlePage;
