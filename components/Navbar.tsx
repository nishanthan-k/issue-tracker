"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

const Navbar = () => {
  const pathname = usePathname();
  const navLinks = [
    { link: '/', text: 'Dashboard'},
    { link: '/issues', text: 'Issues'},
  ]
  return (
    <nav className='flex items-center space-x-6 border-b mb-5 px-5 h-14'>
      <Link href='/'>
        <AiFillBug />
      </Link>
      <ul className='flex space-x-6'>
        {navLinks.map((ele) => (
          <li key={ele.link}>
            <Link
              href={ele.link}
              className={`text-zinc-500 hover:text-zinc-900 transition-colors ${pathname === ele.link && 'text-zinc-900'}`}
            >
              {ele.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar;
