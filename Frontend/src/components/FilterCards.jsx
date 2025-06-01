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
    <div className="w-full bg-card text-card-foreground p-4 rounded-2xl shadow border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Filter Jobs</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:hidden flex items-center justify-center p-1 hover:bg-accent rounded-md transition-colors"
          aria-label="Toggle filters"
        >
          {isCollapsed ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>

      <hr className="border-border mb-4" />

      {/* Filter Options */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
          {filterData.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">{section.filterType}</h3>
              <div className="space-y-2">
                {section.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className="flex items-center space-x-2" key={idx}>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId} className="text-sm">{item}</Label>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCards
