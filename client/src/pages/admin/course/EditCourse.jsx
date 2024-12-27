import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
    const navigate = useNavigate()
    return (
        <div className='flex-1 mt-20'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='font-bold text-xl'>Add Detail information regarding course</h1>
                <Link onClick={() => navigate(-1)}>
                    <Button variant="Link" className="hover:text-blue-600 hover:underline">
                        Go to lecture page
                    </Button>
                </Link>

            </div>
            <CourseTab />
        </div>
    )
}

export default EditCourse