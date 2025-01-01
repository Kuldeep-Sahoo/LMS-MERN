import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Lecturetab from './Lecturetab'

const EditLecture = () => {
    return (
        <div>
            <div className='flex items-center justify-between mb-5 mt-20'>
                <div className='flex items-center gap-2'>
                    <Link to={-1}>
                        <Button size="icon" variant="outline" className="rounded-full">
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-xl'>
                        Update Your Lecture
                    </h1>
                </div>
            </div>
            <Lecturetab />
        </div>
    )
}

export default EditLecture