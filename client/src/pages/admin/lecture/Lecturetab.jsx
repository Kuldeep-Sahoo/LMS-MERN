import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/features/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
// 
// const MEDIA_ROUT = "https://lms-mern-final-kuldeep.onrender.com/api/v1/media"
const MEDIA_ROUT = "https://lms-kuldeep.vercel.app/api/v1/media"

// const MEDIA_ROUT = `${import.meta.env.VITE_API_URL}/media`

const Lecturetab = () => {
    const [lectureTitle, setLectureTitle] = useState("")
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
    const [isFree, setIsFree] = useState(false)
    const [mediaProgress, setMediaProgress] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [btnDisable, setBtnDisable] = useState(true)

    const params = useParams()
    const { courseId, lectureId } = params

    const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation()

    const [removeLecture, { data: removedData, error: removeError, isLoading: removeLoading, isSuccess: removeIsSuccess }] = useRemoveLectureMutation()

    const { data: lectureData } = useGetLectureByIdQuery(lectureId)
    const lecture = lectureData?.lecture

    useEffect(() => {
        if (lecture) {
            console.log(lecture);
            setLectureTitle(lecture.lectureTitle)
            setIsFree(lecture.isPreviewFree)
            setUploadVideoInfo({
                videoUrl: lecture?.videoUrl || "",
                publicId: lecture?.publicId || ""
            });
        }
    }, [lecture])

    const editLectureHandler = async () => {
        await editLecture({
            lectureTitle,
            videoInfo: uploadVideoInfo,
            isPreviewFree: isFree,
            courseId,
            lectureId
        })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
        }
        if (error) {
            toast.error(error.data.message)
        }
    }, [isSuccess, error])

    useEffect(() => {
        if (removeIsSuccess) {
            toast.success(removedData.message)
        }
        if (removeError) {
            toast.error(removeError.data.message)
        }
    }, [removeIsSuccess, removeError])




    const fileChangeHandler = async (e) => {
        const file = e.target.files[0]
        if (file) {
            const formData = new FormData()
            formData.append("file", file)
            setMediaProgress(true)
            try {
                const res = await axios.post(`${MEDIA_ROUT}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round(loaded * 100) / total)
                    }
                })
                if (res.data.success) {
                    console.log(res);
                    setUploadVideoInfo({
                        videoUrl: res.data.data.secure_url,
                        publicId: res.data.data.public_id
                    })
                    setBtnDisable(false)
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error("video upload failed...")
            } finally {
                setMediaProgress(false)
            }
        }
    }
    const handleRemoveLecture = async () => {
        await removeLecture(lectureId)
    }
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit COurse</CardTitle>
                    <CardDescription>Make changes and click save when done.</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button onClick={handleRemoveLecture} variant="destructive" disabled={removeLoading}>
                        {
                            removeLoading ?
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please Wait
                                </>
                                : "Remove lecture"
                        }
                    </Button>

                </div>
                <CardContent>
                    <div>
                        <Label>
                            Title
                        </Label>
                        <Input
                            type="text"
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            placeholder="Eg. Introduction to JS"
                        />
                    </div>
                    <div>
                        <Label>
                            Video
                            <span className='text-red-600'> *</span>
                        </Label>
                        <Input
                            type="file"
                            accept="video/*"
                            onChange={fileChangeHandler}
                            placeholder="Eg. Introduction to JS"
                            className="w-fit"
                        />
                    </div>
                    {
                        lecture?.videoUrl ?
                            <video style={{ maxWidth: "42%" }} className='mt-2 ' src={lecture?.videoUrl} controls></video> : ""
                    }
                    <div className='flex items-center space-x-2 my-5'>
                        <Switch
                            checked={isFree}
                            onCheckedChange={setIsFree}
                        />

                        <Label htmlFor="airplane-mode" >Is this Video Free</Label>
                    </div>

                    {
                        mediaProgress && (
                            <div className='my-4'>
                                <Progress value={uploadProgress} className="w-[60%]" />
                                <p>{uploadProgress}% uploades</p>
                            </div>
                        )
                    }

                    <div className='mt-4 '>
                        <Button onClick={editLectureHandler} disabled={isLoading}>
                            {
                                isLoading ?
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please Wait
                                    </>
                                    : "Update Lecture"
                            }


                        </Button>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    )
}

export default Lecturetab