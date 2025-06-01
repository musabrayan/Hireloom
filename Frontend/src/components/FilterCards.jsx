import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ChevronDown, ChevronUp } from 'lucide-react'

const filterData = [
  {
    filterType: "IT Cities",
    array: ["Bangalore", "Hyderabad", "Pune", "Chennai", "Gurgaon", "Noida"]
  },
  {
    filterType: "Designation",
    array: [
      "Junior Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Tech Lead",
      "Engineering Manager",
      "QA Engineer",
      "DevOps Engineer"
    ]
  },
  {
    filterType: "Salary Range",
    array: [
      "3-5 LPA",
      "4-7 LPA",
      "5-8 LPA",
      "7-14 LPA",
      "8-15 LPA",
      "15-25 LPA",
      "25-40 LPA"
    ]
  }
]

const FilterCards = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(true)

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  return (
    <div className="w-full bg-white p-3 rounded-md">

      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:hidden flex items-center justify-center p-1 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Toggle filters"
        >
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>

      <hr className="mt-3" />


      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="mt-4">
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`
                return (
                  <div className="flex items-center space-x-2 my-2" key={idx}>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                )
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCards