'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { WalletButton } from './WalletButton';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-black/30 backdrop-blur-sm border-b border-yellow-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link 
                href="/betting" 
                className={`${isActive('/betting') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors`}
              >
                Betting
              </Link>
              <Link 
                href="/predictions" 
                className={`${isActive('/predictions') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors`}
              >
                Predictions
              </Link>
              <Link 
                href="/profile" 
                className={`${isActive('/profile') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors`}
              >
                Profile
              </Link>
              <Link 
                href="/comments" 
                className={`${isActive('/comments') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors`}
              >
                Community
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <WalletButton />
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/betting" 
              className={`${isActive('/betting') ? 'bg-blue-900/50 text-white' : 'text-gray-300'} hover:bg-blue-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            >
              Betting
            </Link>
            <Link 
              href="/predictions" 
              className={`${isActive('/predictions') ? 'bg-blue-900/50 text-white' : 'text-gray-300'} hover:bg-blue-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            >
              Predictions
            </Link>
            <Link 
              href="/profile" 
              className={`${isActive('/profile') ? 'bg-blue-900/50 text-white' : 'text-gray-300'} hover:bg-blue-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            >
              Profile
            </Link>
            <Link 
              href="/comments" 
              className={`${isActive('/comments') ? 'bg-blue-900/50 text-white' : 'text-gray-300'} hover:bg-blue-900/30 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            >
              Community
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
