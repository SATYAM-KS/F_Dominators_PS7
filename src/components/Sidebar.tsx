import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Droplet, 
  AlertCircle, 
  User, 
  Users, 
  ClipboardList, 
  Settings
} from 'lucide-react';

interface SidebarProps {
  isAdmin: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isAdmin }) => {
  const location = useLocation();
  
  const userLinks = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'My Donations', icon: Droplet, path: '/donations' },
    { name: 'Emergency Requests', icon: AlertCircle, path: '/emergency-requests' },
    { name: 'My Profile', icon: User, path: '/profile' },
  ];
  
  const adminLinks = [
    { name: 'Admin Dashboard', icon: Settings, path: '/admin' },
    { name: 'Manage Users', icon: Users, path: '/admin/users' },
    { name: 'Manage Donations', icon: Droplet, path: '/admin/donations' },
    { name: 'Manage Emergencies', icon: ClipboardList, path: '/admin/emergency-requests' },
  ];
  
  const links = isAdmin ? [...userLinks, ...adminLinks] : userLinks;
  
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-2 space-y-1 bg-white">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`${
                      isActive
                        ? 'bg-red-50 text-red-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <link.icon
                      className={`${
                        isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-500'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                      aria-hidden="true"
                    />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;