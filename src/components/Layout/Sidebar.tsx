import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Calendar, 
  BarChart, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  
  const navItems = [
    { name: 'Painel', path: '/', icon: <LayoutDashboard className="mr-3 h-5 w-5" /> },
    { name: 'Veículos', path: '/cars', icon: <Car className="mr-3 h-5 w-5" /> },
    { name: 'Motoristas', path: '/drivers', icon: <Users className="mr-3 h-5 w-5" /> },
    { name: 'Eventos', path: '/events', icon: <Calendar className="mr-3 h-5 w-5" /> },
    { name: 'Relatórios', path: '/reports', icon: <BarChart className="mr-3 h-5 w-5" /> },
  ];

  return (
    <div className="h-full flex flex-col bg-indigo-800 text-white">
      <div className="flex items-center justify-center h-16 flex-shrink-0 px-4 bg-indigo-900">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-900 text-white'
                    : 'text-indigo-100 hover:bg-indigo-700'
                }`
              }
              end={item.path === '/'}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-indigo-700">
        <button
          className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-700"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;