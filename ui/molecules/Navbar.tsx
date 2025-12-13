import React from 'react';
import { Menu } from 'lucide-react';

interface NavbarProps {
  title: string;
  children?: React.ReactNode;
  endAction?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ title, children, endAction }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {children}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">{title}</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {children}
        </ul>
      </div>
      <div className="navbar-end">
        {endAction}
      </div>
    </div>
  );
};

export const NavItem = ({ active, onClick, children }: { active?: boolean; onClick?: () => void; children?: React.ReactNode }) => (
  <li>
    <a onClick={onClick} className={active ? 'active font-bold' : ''}>{children}</a>
  </li>
);