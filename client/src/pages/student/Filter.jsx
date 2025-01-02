import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react'
const categories = [
    { id: "nextjs", label: "Next JS" },
    { id: "data-science", label: "Data Science" },
    { id: "frontend-development", label: "Frontend Development" },
    { id: "fullstack-development", label: "Fullstack Development" },
    { id: "mern-stack", label: "MERN Stack Development" },
    { id: "javascript", label: "JavaScript" },
    { id: "python", label: "Python" },
    { id: "docker", label: "Docker" },
    { id: "mongodb", label: "MongoDB" },
    { id: "html", label: "HTML" },
];

const Filter = ({ handleFilterChange }) => {

    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortByPrice, setSortByPrice] = useState("")

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevCategory) => {
            const newCategories = prevCategory.includes(categoryId)
                ?
                prevCategory.filter((id) => id !== categoryId)
                :
                [...prevCategory, categoryId]
            console.log(newCategories, sortByPrice);
            
            handleFilterChange(newCategories, sortByPrice)
            return newCategories
        })
    }
    const selectByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue)
        handleFilterChange(selectedCategories,selectedValue)
    }
    return (
        <div className='w-full md:w-[20%]'>
            <div className="flex items-center justify-between">
                <h1 className='font-semibold text-lg md:text-xl'>Filter Option</h1>
                <Select onValueChange={selectByPriceHandler}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort By Price</SelectLabel>
                            <SelectItem value="low">Low to High</SelectItem>
                            <SelectItem value="high">High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator className="my-4" />
            <div>
                <h1 className='font-semibold mb-2'>CATEGORY</h1>
                {
                    categories.map((category, idx) => (
                        <div className='flex items-center space-x-2 my-2' key={idx}>
                            <Checkbox id={category.id} onCheckedChange={() => handleCategoryChange(category.id)} />
                            <Label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                {category.label}
                            </Label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Filter