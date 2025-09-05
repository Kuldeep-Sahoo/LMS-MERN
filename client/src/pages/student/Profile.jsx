import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Course from './Cource'
import { useLoadUserQuery, useUpdateUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'

const Profile = () => {
    const [name, setName] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const { data, isLoading, refetch } = useLoadUserQuery()
    const [updateUser
        , {
            data: updatedUserData,
            isLoading: updateUserIsLoading,
            isError,
            error,
            isSuccess
        }] = useUpdateUserMutation()

    console.log(data);

    const user = data && data.user;


    const onChangandler = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfilePhoto(file)
        }
    }
    const updateUserHandler = async () => {
        // console.log({name, profilePhoto});
        const formData = new FormData()
        formData.append("name", name)
        formData.append("profilePhoto", profilePhoto)
        await updateUser(formData)
    };
    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        if (isSuccess) {
            toast.success(updatedUserData?.message || "Profile updated...");
            refetch()
        }
        if (isError) {
            toast.error(error?.message || "Profile update failed!!!");
        }
    }, [error, isError, updatedUserData, isSuccess]);

    if (isLoading) return <h1 style={{ textAlign: "center", fontWeight: "bolder", marginTop: "200px" }}>Profie is Loading</h1>
    return (
        <div className="max-w-4xl mx-auto px-4 my-24">
            <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
                <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                        <AvatarImage
                            src={user?.photoURL || "https://github.com/shadcn.png"}
                            alt="@shadcn"
                            className="h-full w-full object-cover rounded-full"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div>
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                            Name:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {user?.name}
                            </span>
                        </h1>
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                            Email:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {user.email}
                            </span>
                        </h1>
                        <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
                            Role:
                            <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                                {user.role.toUpperCase()}
                            </span>
                        </h1>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="mt-2" size="sm">Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        {" Make changes to your profile here. Click save when you're done."}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label>
                                            Name
                                        </Label>
                                        <Input type="text" placeholder="Name"
                                            className="col-span-3"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Input>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label>
                                            Profile Photo
                                        </Label>
                                        <Input
                                            accept="image/*"
                                            type="file"
                                            className="col-span-3"
                                            onChange={onChangandler}
                                        ></Input>
                                    </div>
                                </div>
                                <DialogFooter>

                                    <Button disabled={updateUserIsLoading} type="submit"
                                        onClick={updateUserHandler}
                                    >
                                        {
                                            updateUserIsLoading ? (
                                                <>
                                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait
                                                </>
                                            ) :
                                                "Save changes"
                                        }
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='font-medium text-lg'>Courses You are enrolled in</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 gap-4">
                    {
                        user.enrolledCourses.length === 0 ? (
                            <h1>You have not enrolled yet...</h1>
                        ) :
                            (
                                user.enrolledCourses.map((course, index) => (<Course course={course} key={index} />))
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile