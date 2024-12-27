import { Card, CardHeader } from '@/components/ui/card'
import React from 'react'

const DashBoard = () => {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 ">
            <Card className="s">
                <CardHeader>
                    Total sales
                </CardHeader>
            </Card>
        </div>
    )
}

export default DashBoard