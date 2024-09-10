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

  console.log(pathname)

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
              className={`hover:text-navText transition-colors ${
                pathname === ele.link ? "text-navText" : "text-zinc-500"
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
