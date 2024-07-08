import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { FaCartShopping } from "react-icons/fa6";

const MainNavBar = () => {
  return (
    <div>
      <nav className='bg-muted-foreground/20 border-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <a
            href='/'
            className='flex items-center space-x-3 rtl:space-x-reverse'
          >
            <img
              src='https://flowbite.com/docs/images/logo.svg'
              className='h-8'
              alt='Beates Logo'
            />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              Kshop
            </span>
          </a>
          {/* <div className='flex items-center space-x-1 md:space-x-4 rtl:space-x-reverse'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                </NavigationMenuItem>
                <button
                  type='button'
                  data-dropdown-toggle='language-dropdown-menu'
                  className='inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                  English (US)
                </button>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div> */}
          
          <FaCartShopping  className="text-lg mx-2"/>
        </div>
      </nav>
    </div>
  );
};

export default MainNavBar;
