"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    return pathname === path ? "text-primary font-semibold" : "text-accent hover:text-primary";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">AstrAID</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/')}`}>
                Home
              </Link>
              <Link href="/about" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/about') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/about')}`}>
                About Us
              </Link>
              <Link href="/hub" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/hub') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/hub')}`}>
                Training Hub
              </Link>
              <Link href="/chat" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/chat') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/chat')}`}>
                AI Assistant
              </Link>
              {session?.user.role === "ADMIN" && (
                <Link href="/admin" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/admin') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/admin')}`}>
                  Admin
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-accent hover:text-primary">
                  {session.user.name || session.user.email}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-md hover:bg-opacity-90"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-accent border border-accent rounded-md hover:bg-accent hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/about" className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/about') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/about')}`}>
              About Us
            </Link>
            <Link href="/hub" className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/hub') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/hub')}`}>
              Training Hub
            </Link>
            <Link href="/chat" className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/chat') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/chat')}`}>
              AI Assistant
            </Link>
            {session?.user.role === "ADMIN" && (
              <Link href="/admin" className={`block pl-3 pr-4 py-2 border-l-4 ${isActive('/admin') === 'text-primary font-semibold' ? 'border-primary' : 'border-transparent'} ${isActive('/admin')}`}>
                Admin
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {session ? (
              <div className="space-y-1">
                <Link href="/profile" className="block pl-3 pr-4 py-2 text-accent hover:text-primary">
                  {session.user.name || session.user.email}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left pl-3 pr-4 py-2 text-accent hover:text-primary"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link href="/login" className="block pl-3 pr-4 py-2 text-accent hover:text-primary">
                  Log In
                </Link>
                <Link href="/register" className="block pl-3 pr-4 py-2 text-accent hover:text-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
