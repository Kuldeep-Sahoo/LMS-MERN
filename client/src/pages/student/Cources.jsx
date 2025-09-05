import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import Course from './Cource'
import { useGetCoursesQuery } from '@/features/api/courseApi'

const Cources = () => {
    const { data, isloading, isError } = useGetCoursesQuery()
    console.log(data);

    if (isError) return <h1 className="text-center text-red-500 font-semibold mt-10">⚠️ Some error occurred while fetching courses...</h1>

    return (
        <div className="bg-gray-50 dark:bg-[#0f172a] min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="font-extrabold text-4xl text-center mb-14 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    Our Courses
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        isloading ? (
                            Array(8).fill(0).map((_, index) => (
                                <CourseSkeleton key={index} />
                            ))
                        ) : (
                            data?.courses?.map((course, index) => (
                                <Course key={index} course={course} />
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cources

const CourseSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
            <Skeleton className="w-full h-40" />
            <div className="px-6 py-5 space-y-4">
                <Skeleton className="h-6 w-2/3 rounded-md" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-24 rounded-md" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded-md" />
                </div>
                <Skeleton className="h-4 w-1/3 rounded-md" />
            </div>
        </div>
    );
};
