import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { courseApi } from '@/features/api/courseApi'
import React from 'react'
import { Link } from 'react-router-dom'

const SeaechResult = ({ course }) => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4'>
      <Link to={`/course-details/${course._id}`} className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
        <img
          src={course.courseThumbnail}
          alt='course-thumbnail'
          className='h-32 w-full md:w-56 object-cover rounded'
        />
        <div className="flex flex-col gap-2">
          <h1 className='font-bold text-lg md:text-xl'>
            {course.courseTitle}
          </h1>
          <p className='text-sm text-gray-600'>{course.subTitle}</p>
          <div className="flex gap-2 text-sm text-gray-700">
            Instructor:
            <span className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={course?.user?.photoURL || "https://github.com/shadcn.png"}
                  alt="Instructor Avatar"
                  className="h-full w-full object-cover rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-bold">{course.creator?.name}</span>
            </span>
          </div>
          <Badge className={"w-fit mt-2 md:mt-0"}>{course.courseLevel}</Badge>
        </div>

      </Link>
      <div className='mt-4 md:mt-0 md:text-right w-full md:w-auto'>
        <h1 className='font-bold text-lg md:text-xl'>₹{course.coursePrice}</h1>
      </div>
    </div>
  )
}

export default SeaechResult