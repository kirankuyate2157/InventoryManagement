import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
// import { currentUser, logOutUser } from "@/utils/apis";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  // useEffect(() => {
  //   // Fetch user data from your API endpoint
  //   const fetchUserData = async () => {
  //     try {
  //       const userData = await currentUser(); 
  //       setUser(userData);
  //       console.log("user data : ", userData);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // const logout = async () => {
  //   const res = await logOutUser();
  //   console.log("iiii poo", res);
  //   if (res.success) {
  //     showToast(res.message);
  //     nav("/auth");
  //   }
  // };

  return (
    <>
      <div className='lg:hidden flex px-4 md:px-10 justify-between items-center w-full py-1 gap-5 border-slate-200 bg-background  dark:border-slate-700  h-12'>
        <svg
          className='h-5 w-5 '
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='lucide lucide-command'
        >
          <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
        </svg>
        <Input
          type='text'
          placeholder='Search'
          className='rounded max-w-md bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent'
        />
        <DropdownMenu>
          <DropdownMenuTrigger className='p-0 bg-transparent'>
            {user ? (
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.fullName} />
                <AvatarFallback>
                  {user?.fullName
                    ? user?.fullName?.toString()?.toUpperCase()[0]
                    : "U"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem className='hover:cursor-pointer'>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Navbar;
