import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateCourseMutation, useCreateLectureMutation, useGetCourseLectureQuery } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const navigate = useNavigate()
    const [lectureTitle, setLectureTitle] = useState("")
    const params = useParams()
    const { courseId } = params
    const [createLecture, {
        data,
        isLoading,
        error,
        isSuccess
    }] = useCreateLectureMutation()
    const {
        data: lecturesData,
        isLoading: lectuteIsLoading,
        isError: lecturesError,
        refetch
    } = useGetCourseLectureQuery(courseId)
    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
            refetch()
        }
        if (error) {
            toast.error(error.data.message)
        }
    }, [isSuccess, error])
    console.log(lecturesData);

    return (
        <div className='flex-1 mx-10 mt-20'>
            <div className="mb-4">
                <h1 className='font-bold text-xl'>
                    {" Let's add leetures. add some basic details for your new lecture"}
                </h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, dicta?</p>
                <div>
                    <div className='space-y-4'>
                        <Label>Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            placeholder="Your Title name"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className=' mt-2 flex items-center gap-2'>
                    <Button variant="outline" onClick={() => navigate(-1) /* navigate("/admin/course") */}>Back to course</Button>
                    <Button disabled={isLoading}
                        onClick={createLectureHandler}
                    >
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                                </>
                            ) :
                                "Create Lecture"
                        }

                    </Button>
                </div>
                <div className="mt-10">
                    {
                        lectuteIsLoading ? (
                            <p>Loading Lectures...</p>
                        ) : (
                            lecturesError ? (
                                <p>Failed to load lectures</p>
                            ) : (
                                lecturesData.lectures.length === 0 ? (
                                    <p>No Lecture available</p>
                                ) : (
                                    lecturesData.lectures.map((lecture, index) => (
                                        <Lecture
                                            key={lecture._id}
                                            lecture={lecture}
                                            index={index}
                                            courseId={courseId}
                                        />
                                    ))

                                )
                            )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateLecture