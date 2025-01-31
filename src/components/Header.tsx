import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='border-b'>
      <nav className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-around'>
          <div className='flex items-center gap-6'>
            <Link href='/' className='flex items-center gap-2 mr-5'>
              <Image src='/logo.webp' alt='News Logo' width={64} height={64} className='w-8 h-8' />
              <span className='font-semibold text-xl'>MadSand</span>
            </Link>
            <ul className='flex gap-4'>
              <li>
                <Link href='/blog' className='hover:text-blue-600'>
                  Events
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:text-blue-600'>
                  Learn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
