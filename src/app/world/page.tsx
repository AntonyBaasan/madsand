import PostContainer from '@/components/PostContainer';
import Image from 'next/image';

const WorldPage = () => {
  return (
    <PostContainer>
      <div className='text-4xl mb-4'>World of MadSand</div>
      <div>
        <div className='text-2xl py-2'>History</div>
        <div className='flex flex-col gap-2'>
          <p className=''>
            No one remembers when the world ended—only that it did. The old world, the one of towering cities and
            endless lights, crumbled into dust, swallowed by time and fire. Some say it was war, others whisper of a
            sickness, but most do not care anymore. All that matters is the now, and in the now, survival is everything.
          </p>
          <p>
            When the chaos began, the strong took what they could, the weak clung to the edges, and the foolish
            perished. Civilization fractured into a thousand warring tribes, each clawing for whatever scraps remained.
            Water, fuel, bullets—these are the new gods. Land is just something to bleed over.
          </p>
          <Image src={'/art/world/art-1.jpg'} alt='MadSand fight scene' width={1000} height={643}></Image>
          <p>
            Nothing is ever enough. Scarcity rules this wasteland. Food is worth more than blood, and blood is spent
            like currency. In the struggle to endure, people turned to the only thing left—the machines.
          </p>
          <p>
            Rusting steel and scavenged parts became salvation. Engineers, once nameless, became the new warlords,
            forging weapons on wheels. Cars turned into war chariots, motorcycles into hunting beasts, and trucks into
            moving fortresses. Everything was built for one purpose: the fight.
          </p>
          <p>The world has no law. No peace. Only motion. Only war.</p>
        </div>
      </div>
    </PostContainer>
  );
};

export default WorldPage;
