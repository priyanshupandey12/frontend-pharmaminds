import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import DarkMode from '@/DarkMode';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation, useLoadUserQuery } from '@/store/userApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const NavBar = () => {
    const { user, isAuthenticated } = useSelector((store) => store.user);
    const [logoutUser, { data, isSuccess, isError }] = useLogoutUserMutation();
    const navigate = useNavigate();
    
   
    const { refetch } = useLoadUserQuery(undefined, { skip: false }); 

    


    const logoutHandler = async () => {
        await logoutUser();
    }

    useEffect(() => {
        if(isSuccess) {
            toast.success(data?.message || "Logout Successfully");
            navigate('/login');
        }
        if(isError) {
            toast.error("Something went Wrong");
        }
    }, [isSuccess, isError, data, navigate]);

    return (
        <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50">
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
                
                <div className="flex items-center gap-3">
                <Link to='/'>  <img src="/img/pharma.png" alt="Pharma" className="h-12 w-12 rounded-md" /></Link> 
                   <Link to='/'><h1 className="font-extrabold text-xl text-cyan-300">Pharmaminds</h1></Link> 
                </div>

            
                <div className="flex items-center gap-6">
                    {isAuthenticated && user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage 
                                        src={user?.profilePicture} 
                                        alt={`${user?.firstName} ${user?.lastName}`} 
                                    />
                                    <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link to='profile'><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                            
                                <Link to='my-learning'><DropdownMenuItem>My Learning</DropdownMenuItem></Link>  
                                   {
                                    user.role==='teacher' &&   <Link to='/admin/dashboard'><DropdownMenuItem>Dashboard</DropdownMenuItem></Link>  
                                   }
                            
                             
                                <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex items-center gap-2">
                         <Link to='login'><Button variant="outline">Login</Button></Link>
                         <Link to='login'><Button>Signup</Button></Link>
                        </div>
                    )}

                
                    <div className="flex items-center">
                        <DarkMode />
                    </div>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-2xl">Pharmaminds</h1>
                <MobileNavbar user={user} logoutHandler={logoutHandler} isAuthenticated={isAuthenticated} />
            </div>
        </div>
    );
};

export default NavBar;

const MobileNavbar = ({ user, logoutHandler, isAuthenticated }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" className="rounded-full hover:bg-gray-200" variant="outline">
                    ☰
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle>Pharmaminds</SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                    {isAuthenticated && user ? (
                        <>
                            <div className="flex items-center gap-2 mb-4">
                                <Avatar>
                                    <AvatarImage 
                                        src={user?.profilePicture} 
                                        alt={`${user?.firstName} ${user?.lastName}`} 
                                    />
                                    <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                                </Avatar>
                                <span>{user?.firstName} {user?.lastName}</span>
                            </div>
                            <Link to="profile" className="cursor-pointer">Profile</Link>
                            <Link to="my-learning" className="cursor-pointer">My Learning</Link>
                            <p className="cursor-pointer" onClick={logoutHandler}>Logout</p>
                        </>
                    ) : (
                        <>
                            <Link to="login" className="cursor-pointer">Login</Link>
                            <Link to="login" className="cursor-pointer">Signup</Link>
                        </>
                    )}
                </nav>
            </SheetContent>
        </Sheet>
    );
};