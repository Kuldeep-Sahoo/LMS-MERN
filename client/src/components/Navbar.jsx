import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import DarkMode from '@/DarkMode'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

// console.log(process.env.REACT_APP_API_URL);

const Navbar = () => {
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        await logoutUser()
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User Logged Out...")
            navigate("/login")
        }
    }, [isSuccess])
    const { user } = useSelector(store => store.auth)
    // console.log(user);

    return (
        <div className='h-16 dark:bg-[#0a0a0a] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
            {/* Desktop */}
            <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
                <div className='flex items-center gap-2'>
                    <School size={"30"} />
                    <h1 className='hidden md:block font-extrabold text-2xl'><Link to="/">Kuldeep-LMS</Link></h1>
                </div>
                {/* User icon and dark mode icon */}
                <div className='flex items-center gap-8'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage className="h-full w-full object-cover rounded-full" src={user?.photoURL || "https://github.com/shadcn.png"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link to={"my-learning"}>
                                                My Learning
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to={"profile"}>
                                                Edit Profile
                                            </Link>

                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={logoutHandler}>Log Out</DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {
                                        user.role === "instructor" && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                            </>
                                        )
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className='flex justify-between gap-4'>
                                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                                <Button onClick={() => navigate("/login")}>Signup</Button>
                            </div>
                        )
                    }
                    <DarkMode />
                </div>

            </div>
            {/* Mobile device */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className='font-extrabold text-2xl'><Link to="/">Kuldeep-LMS</Link></h1>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar



const MobileNavbar = () => {
    const role = "instructor"
    return (

        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline">
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className={"flex flex-col"}>
                    <SheetHeader className={"flex flex-row justify-between mt-2 items-center"}>
                        <SheetTitle>Kuldeep-LMS</SheetTitle>
                        <DarkMode />
                    </SheetHeader>
                    <Separator className='mr-2' />
                    <nav className='flex flex-col space-y-4 '>
                        <SheetClose asChild>
                            <Link to={"my-learning"}>My Learning</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link to={"profile"}>Edit Profile</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link >Log Out</Link>
                        </SheetClose>
                    </nav>
                    {
                        role === "instructor" && (
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit">Dashboard</Button>
                                </SheetClose>
                            </SheetFooter>

                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}