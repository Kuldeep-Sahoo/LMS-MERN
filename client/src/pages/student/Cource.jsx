import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AvatarFallback } from '@radix-ui/react-avatar'
import React from 'react'
import { Link } from 'react-router-dom'

const Course = ({ course }) => {
    return (
        <Card className="overflow-hidden rounded-2xl dark:bg-[#111827] bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800 group">
            {/* Thumbnail */}
            <div className="relative">
                <img
                    className="w-full h-40 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                    src={course?.courseThumbnail}
                    alt="course"
                />
                {/* Level Badge floating on thumbnail */}
                <Badge
                    className={`absolute top-3 right-3 
    bg-gradient-to-r ${course?.courseLevel === "Beginner"
                            ? "from-green-400 via-emerald-500 to-teal-500"
                            : course?.courseLevel === "Intermediate"
                                ? "from-blue-400 via-indigo-500 to-blue-600"
                                : course?.courseLevel === "Advance"
                                    ? "from-red-500 via-orange-500 to-yellow-500"
                                    : course?.courseLevel === "Expert"
                                        ? "from-fuchsia-500 via-purple-600 to-indigo-500"
                                        : "from-gray-400 to-gray-600"
                        }
    text-white px-3 py-1 text-xs font-semibold rounded-full shadow-md`}
                >
                    {course?.courseLevel}
                </Badge>

            </div>

            {/* Content */}
            <CardContent className="px-6 py-5 space-y-4">
                {/* Title */}
                <h1 className="mt-1 font-extrabold text-lg tracking-tight text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <Link to={`/course-details/${course?._id}`}>
                        {course?.courseTitle}
                    </Link>
                </h1>

                {/* Creator Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-2 ring-indigo-500/40">
                            <AvatarImage
                                className="h-full w-full object-cover rounded-full ring-1 ring-white"
                                src={course?.creator?.photoURL || ""}
                                alt="creator"
                            />
                            <AvatarFallback className="ml-3 bg-gradient-to-r  flex items-center justify-center font-semibold">
                                {course?.creator?.name?.charAt(0).toUpperCase() || "U"}
                            </AvatarFallback>
                        </Avatar>


                        <h1 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                            {course?.creator?.name}
                        </h1>
                    </div>
                </div>

                {/* Price */}
                <div className="flex justify-between items-center">
                    <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        ₹{course?.coursePrice}
                    </span>
                    <button className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-full shadow-md hover:bg-indigo-700 transition">
                        Enroll
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Course
