"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import ThemeChanger from './ThemeChanger';

const Navbar = () => {
  const pathname = usePathname();
  const navLinks = [
    { link: '/', text: 'Dashboard'},
    { link: '/issues', text: 'Issues'},
  ]
  return (
    <nav className="flex items-center border-b mb-5 px-5 h-14">
      <Link href="/" className="flex items-center">
        <AiFillBug />
      </Link>

      <ul className="flex items-center space-x-6 ml-6">
        {navLinks.map((ele) => (
          <li key={ele.link}>
            <Link
              href={ele.link}
              className={`text-zinc-500 hover:text-gray-200 transition-colors ${
                pathname === ele.link && "text-gray-200"
              }`}
            >
              {ele.text}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ml-auto">
          <ThemeChanger />
      </div>
    </nav>
  )
}

export default Navbar;
