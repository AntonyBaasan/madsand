'use server';

import { addToWaitingList } from '@/app/actions/addToWaitingList';

const HeroSection = () => {
  return (
    <div className='rounded-lg bg-white bg-opacity-60 p-8 flex flex-col gap-4'>
      <h1 className='text-4xl font-bold'>MadSand</h1>
      <div className='text-2xl'>Build. Conquer. Survive.</div>
      <div className='text-lg'>
        In a world where civilization has crumbled, only the strongest tribes will rise from the ashes. Forge your
        legacy in this post-apocalyptic strategy game—gather survivors, build your tribe, and wage war for dominance.
        Resources are scarce, danger lurks in every shadow, and only the most cunning leaders will survive.
      </div>
      <div>Will you unite the wasteland or watch your tribe fall? The battle for survival begins now!</div>
      <form className='mt-4 flex flex-col sm:flex-row gap-2' action={addToWaitingList}>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='Enter your email'
          className='flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-gray-500'
          required
        />
        <button type='submit' className='bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors'>
          Join Waitlist
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
