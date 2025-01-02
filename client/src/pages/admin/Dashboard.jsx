import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetPurchasedCourseQuery } from '@/features/api/purchaseApi'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const DashBoard = () => {
    const { data, isSuccess, isError, isLoading } = useGetPurchasedCourseQuery()
    const { purchasedcourse } = data || []
    const courseData = purchasedcourse?.map((course) => ({
        name: course.courseId.courseTitle,
        price: course.courseId.coursePrice,
    }))
    const totalRevinue = purchasedcourse?.reduce((accumulator, element) => accumulator + (element.amount || 0) , 0)
    const totalSales = purchasedcourse?.length
    if (isLoading) return <h1 className='mt-20 text-green-600'>Loading...</h1>
    if (isError) return <h1 className='mt-20 text-red-600'>Some error occured...</h1>
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 ">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Total sales</CardTitle>
                    <CardContent>
                        <p className='text-3xl font-bold text-blue-600'>{totalSales}</p>
                    </CardContent>
                </CardHeader>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Total Tevenue</CardTitle>
                    <CardContent>
                        <p className='text-3xl font-bold text-blue-600'>{totalRevinue}</p>
                    </CardContent>
                </CardHeader>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-700">
                        Course Prices
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={courseData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis
                                dataKey="name"
                                stroke="#6b7280"
                                angle={-30} // Rotated labels for better visibility
                                textAnchor="end"
                                interval={0} // Display all labels
                            />
                            <YAxis stroke="#6b7280" />
                            <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#4a90e2" // Changed color to a different shade of blue
                                strokeWidth={3}
                                dot={{ stroke: "#4a90e2", strokeWidth: 2 }} // Same color for the dot
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashBoard