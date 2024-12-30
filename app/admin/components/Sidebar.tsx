import Link from 'next/link';
import { PiNotePencilThin } from "react-icons/pi";
import { VscDashboard } from "react-icons/vsc";
import { MdRestaurantMenu } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import MenuItemForm from './MenuItemForm';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: <VscDashboard /> },
    { name: 'Orders', href: '/admin/orders', icon: <PiNotePencilThin /> },
    { name: 'Menu', href: '/admin/menu', icon: <MdRestaurantMenu /> },
    { name: 'Customers', href: '/admin/customers', icon: <MdPeopleAlt /> },
  ];

  return (
    <div className="hidden md:block top-[6rem] w-64 h-[calc(100vh-6rem)] bg-lime-50 text-DarkGrayishBlue fixed  left-0">
      <div className="p-4 text-lg font-bold">Admin Panel</div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <a className="block px-4 py-2 hover:bg-lime-100">
                    <span className='mr-2 align-middle '>{item.icon}</span>{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        <MenuItemForm />
      </nav>
    </div>
  );
};

export default Sidebar;
