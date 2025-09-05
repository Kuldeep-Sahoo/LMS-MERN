import { Menu, School } from 'lucide-react'
import { useEffect } from 'react'
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

const Navbar = () => {
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await logoutUser()
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "✅ User Logged Out")
            navigate("/login")
        }
    }, [isSuccess])

    const { user } = useSelector(store => store.auth)

    return (
        <div className="h-16 dark:bg-[#0b0b0b]/95 bg-white/90 backdrop-blur-md border-b dark:border-gray-800 border-gray-200 fixed top-0 left-0 right-0 z-20 shadow-sm transition-all duration-300">
            {/* Desktop Navbar */}
            <div className="max-w-7xl mx-auto px-4 hidden md:flex justify-between items-center h-full">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <School size={28} className="text-indigo-600 dark:text-indigo-400" />
                    <h1 className="font-extrabold text-2xl tracking-tight">
                        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            Kuldeep-LMS
                        </Link>
                    </h1>
                </div>

                {/* User Menu */}
                <div className="flex items-center gap-6">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-indigo-500/50 hover:ring-indigo-600 transition-all">
                                    <AvatarImage
                                        className="h-full w-full object-cover"
                                        src={user?.photoURL || "https://github.com/shadcn.png"}
                                        alt="user avatar"
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 shadow-xl rounded-xl">
                                <DropdownMenuLabel className="font-semibold">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link to="my-learning">📚 My Learning</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="profile">⚙️ Edit Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutHandler} className="text-red-600">
                                        🚪 Log Out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                {user.role === "instructor" && (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin/dashboard">📊 Dashboard</Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/login")}
                                className="rounded-full px-5 hover:bg-indigo-50"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate("/login")}
                                className="rounded-full px-5 bg-indigo-600 hover:bg-indigo-700"
                            >
                                Signup
                            </Button>
                        </div>
                    )}
                    <DarkMode />
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-xl tracking-tight">
                    <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Kuldeep-LMS
                    </Link>
                </h1>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar

/* ------------------- Mobile Drawer ------------------- */

const MobileNavbar = () => {
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        await logoutUser()
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "✅ User Logged Out")
            navigate("/login")
        }
    }, [isSuccess])

    const { user } = useSelector(store => store.auth)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col bg-white dark:bg-[#0b0b0b]">
                <SheetHeader className="flex flex-row justify-between items-center">
                    <SheetTitle className="text-lg font-bold">Kuldeep-LMS</SheetTitle>
                    <DarkMode />
                </SheetHeader>

                {user ? (
                    <>
                        <Separator className="my-3" />
                        <nav className="flex flex-col space-y-5 text-base font-medium">
                            <SheetClose asChild>
                                <Link to="my-learning" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                    📚 My Learning
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link to="profile" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                    ⚙️ Edit Profile
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link
                                    onClick={logoutHandler}
                                    className="text-red-600 font-semibold hover:underline"
                                >
                                    🚪 Log Out
                                </Link>
                            </SheetClose>
                        </nav>

                        {user?.role === "instructor" && (
                            <SheetFooter className="mt-auto space-y-3">
                                <SheetClose asChild>
                                    <Button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                                        onClick={() => navigate("/admin/course")}
                                    >
                                        Manage Courses
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button
                                        className="w-full bg-purple-600 hover:bg-purple-700"
                                        onClick={() => navigate("/admin/dashboard")}
                                    >
                                        Dashboard
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col gap-3 mt-6">
                        <SheetClose asChild>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/login")}
                                className="rounded-full"
                            >
                                Login
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button
                                onClick={() => navigate("/login")}
                                className="rounded-full bg-indigo-600 hover:bg-indigo-700"
                            >
                                Signup
                            </Button>
                        </SheetClose>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
