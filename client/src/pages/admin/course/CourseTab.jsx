import RichTextEditor from '@/components/RichTextEditor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCOurseMutation } from '@/features/api/courseApi'
import { toast } from 'sonner'
import LoadingSpinner from '@/components/LoadingSpinner'
const CourseTab = () => {
    const navigate = useNavigate()
    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation()
    const params = useParams()
    const courseId = params.courseId
    // console.log(courseId);

    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
        description: ""
    })
    const { data: courseByIdData, isLoading: courseByIdLoading ,refetch} = useGetCourseByIdQuery(courseId, { refetchOnMountOrArgChange: true })
    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course
            setInput({
                courseTitle: course.courseTitle || "",
                subTitle: course.subTitle || "",
                category: course.category || "",
                courseLevel: course.courseLevel || "",
                coursePrice: course.coursePrice || "",
                description: course.description || "",
            });
            if (course.courseThumbnail) {
                setPreviewThumbnail(course.courseThumbnail); // Assuming courseThumbnail is a URL
            }
        }
    }, [courseByIdData])

    const changeEventHandle = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }
    // get file
    const [previewThumbnail, setPreviewThumbnail] = useState("")
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setInput({ ...input, courseThumbnail: file })
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
                setPreviewThumbnail(fileReader.result)
            }
            fileReader.readAsDataURL(file)
        }
    }
    const updateCourseHandler = async () => {
        let formData = new FormData()
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);
        formData.append("courseTitle", input.courseTitle);
        formData.append("description", input.description);
        formData.append("subTitle", input.subTitle);        // console.log(input);

        await editCourse({ formData, courseId })
    }


    const [publishCourse,{}] = usePublishCOurseMutation()

    const publicStatusHandler = async (action) => {
        try {
            const res=await publishCourse({courseId,query:action})
            if (res.data) {
                refetch()
                console.log(res);
                
                toast.success(res.data.message)
            }

        } catch (error) {
            toast.error("Failled to publish/uppublishe course")
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course Updated...")
        }
        if (error) {
            toast.error(error.data.message || "Course Updation failed...")
        }
    }, [isSuccess, error])

    if (courseByIdLoading) {
        return (<h1 className='text-center '>Loading...</h1>)
    }

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row justify-between ">
                    <div>
                        <CardTitle>Basic course Information</CardTitle>
                        <CardDescription>
                            Make changes to your course here. Click save when you are done.
                        </CardDescription>
                    </div>
                    <div className="space-x-2">
                        <Button disabled={courseByIdData?.course.lectures.length===0} variant="outline" onClick={() => publicStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
                            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
                        </Button>
                        <Button>
                            Remove course
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 mt-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                placeholder="Ex. Fullstack developer"
                                value={input.courseTitle}
                                onChange={changeEventHandle}
                                name="courseTitle"></Input>
                        </div>
                        <div>
                            <Label>Subtitle</Label>
                            <Input
                                type="text"
                                placeholder="Ex. Become a fullstack developer from zero to hero"
                                value={input.subTitle}
                                onChange={changeEventHandle}
                                name="subTitle"></Input>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <RichTextEditor input={input} setInput={setInput} />
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <Label>Category</Label>
                                <Select value={input.category} onValueChange={selectCategory}>
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
                            <div>
                                <Label>Course Level</Label>
                                <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Course Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Course Level</SelectLabel>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Advance">Advance</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Price in (INR)</Label>
                                <Input type="number"
                                    name="coursePrice"
                                    value={input.coursePrice}
                                    onChange={changeEventHandle}
                                    placeholder="199"
                                />
                            </div>

                        </div>
                        <div>
                            <Label>Course Thumbnail</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-fit"
                                onChange={selectThumbnail}
                            />
                            {
                                previewThumbnail && (
                                    <img src={previewThumbnail}
                                        className='w-64 my-2'
                                        alt='course_thumbnail' />
                                )
                            }
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => navigate(-1)}> Cancel</Button>
                            <Button disabled={isLoading} onClick={updateCourseHandler}> {
                                isLoading ?
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                    </>
                                    : "Save"
                            }
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default CourseTab