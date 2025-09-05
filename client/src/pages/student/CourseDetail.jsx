import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi'
import { BadgeInfo, Lock, PlayCircle, Users } from 'lucide-react'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const CourseDetail = () => {
    const { courseId } = useParams()
    const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId)
    const course = data?.course
    const purchased = data?.purchased
    const navigate = useNavigate()

    const handleContinueCourse = () => {
        if (purchased) navigate(`/course-progress/${courseId}`)
    }

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Failed to load course details...</h1>

    return (
        <div className="mt-16">
            {/* Hero Section - clean, no gradient */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto py-10 px-6 space-y-3">
                    <h1 className="font-extrabold text-3xl md:text-4xl text-gray-900 dark:text-white">
                        {course?.courseTitle}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">{course?.subTitle}</p>

                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={course?.creator?.photoURL || ""} />
                            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 font-semibold">
                                {course?.creator?.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            Created by <span className="font-medium">{course?.creator?.name}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><BadgeInfo size={16} /> Updated {course?.createdAt.split("T")[0]}</span>
                        <span className="flex items-center gap-1"><Users size={16} /> {course?.enrolledStudents.length} enrolled</span>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="max-w-7xl mx-auto my-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div>
                        <h2 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Description</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: course?.description }} />
                    </div>

                    <Card className="rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">Course Content</CardTitle>
                            <CardDescription>{course?.lectures.length} Lectures</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {course?.lectures.map((lecture, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                >
                                    {lecture?.isPreviewFree
                                        ? <PlayCircle size={16} className="text-emerald-500" />
                                        : <Lock size={16} className="text-gray-400" />}
                                    <p className="text-sm text-gray-800 dark:text-gray-200">{lecture?.lectureTitle}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1">
                    <Card className="rounded-xl border border-gray-200 dark:border-gray-800 shadow-md">
                        <CardContent className="p-4 flex flex-col">
                            <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    url={course?.lectures[0]?.videoUrl}
                                    controls
                                />
                            </div>
                            <h1 className="text-base font-medium mb-2 text-gray-900 dark:text-gray-200">{course?.lectures[0]?.lectureTitle}</h1>
                            <Separator className="my-3" />
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">₹{course?.coursePrice}</h1>
                        </CardContent>
                        <CardFooter className="p-4">
                            {purchased ? (
                                <Button
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                    onClick={handleContinueCourse}
                                >
                                    Continue Course
                                </Button>
                            ) : (
                                <BuyCourseButton courseId={courseId} />
                            )}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
