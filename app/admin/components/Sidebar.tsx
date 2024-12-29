import Link from 'next/link';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Orders', href: '/admin/orders' },
    { name: 'Menu Management', href: '/admin/menu' },
    { name: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed">
      <div className="p-4 text-lg font-bold">Admin Panel</div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>
                <a className="block px-4 py-2 hover:bg-gray-700">{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
