import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'

const AddCourse = () => {
    const navigate = useNavigate()
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("")
    const [createCourse,{data,error,isSuccess,isLoading}]=useCreateCourseMutation()
    const createCourseHandler = async () => {
        await createCourse({courseTitle,category})

    }
    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message||"Course created...")
            navigate(-1)
        }
        if (error) {
            toast.error(error.data.message||"error...")
        }
    }, [isSuccess,error])
    
    return (
        <div className='flex-1 mx-10 mt-20'>
            <div className="mb-4">
                <h1 className='font-bold text-xl'>
                    Lets add course, add some basic course details for your new course
                </h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, dicta?</p>
                <div>
                    <div className='space-y-4'>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            placeholder="Your course name"
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                        />
                    </div>
                    <div className='space-y-4'>
                        <Label>Category</Label>
                        <Select onValueChange={getSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="nextjs">Next JS</SelectItem>
                                    <SelectItem value="data-science">Data Science</SelectItem>
                                    <SelectItem value="frontend-development">Frontend Development</SelectItem>
                                    <SelectItem value="fullstack-development">Fullstack Development</SelectItem>
                                    <SelectItem value="mern-stack">MERN Stack Development</SelectItem>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="docker">Docker</SelectItem>
                                    <SelectItem value="mongodb">MongoDB</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className=' mt-2 flex items-center gap-2'>
                    <Button variant="outline" onClick={() => navigate(-1) /* navigate("/admin/course") */}>Back</Button>
                    <Button disabled={isLoading} onClick={createCourseHandler}>
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                </>
                            ) :
                                "Create"
                        }

                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse