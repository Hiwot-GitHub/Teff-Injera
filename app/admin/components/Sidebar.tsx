import Link from 'next/link';
import { PiNotePencilThin } from "react-icons/pi";
import { VscDashboard } from "react-icons/vsc";
import { MdRestaurantMenu } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import MenuItemForm from './MenuItemForm';

const Sidebar = ({ activeTab, onTabClick} : { activeTab: string, onTabClick: (tab: string) => void}) => {
  const tabs = [
    { name: 'Dashboard', icon: <VscDashboard /> },
    { name: 'Orders',  icon: <PiNotePencilThin /> },
    { name: 'Menu', icon: <MdRestaurantMenu /> },
    { name: 'Customers', icon: <MdPeopleAlt /> },
  ];

  return (
    <div className="top-[6rem]  h-[calc(100vh-6rem)] bg-white text-DarkGrayishBlue fixed  left-0">
      <div className="p-4 text-lg font-bold">Admin Panel</div>
      <nav>
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.name}
            onClick={() => onTabClick(tab.name)}
             className={`flex cursor-pointer items-center px-4 py-2 hover:bg-green-50 ${activeTab === tab.name? 'bg-green-50': ''}`}>
                    <span className='w-4 h-4 mr-2'>{tab.icon}</span>{tab.name}
              
            </li>
          ))}
        </ul>
        <div className='px-4 py-6'><MenuItemForm /></div>
      </nav>
    </div>
  );
};

export default Sidebar;
