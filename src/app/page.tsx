import HeroSection from '@/components/HeroSection';

export default function Home() {
  
  return (
    <div className='w-full h-[calc(100vh-74px)] bg-[url(/pages/dune-and-cars.webp)] bg-cover bg-bottom bg-no-repeat'>
      <div className='grid items-center justify-items-center p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
        <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
          <HeroSection />
        </main>
      </div>
    </div>
  );
}
