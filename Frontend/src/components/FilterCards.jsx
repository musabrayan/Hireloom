import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { ChevronDown, ChevronUp } from 'lucide-react'

const filterData = [
  {
    filterType: "location",
    title: "IT Cities",
    array: ["Bangalore", "Hyderabad", "Pune", "Chennai", "Delhi", "Noida"]
  },
  {
    filterType: "title",
    title: "Designation",
    array: [
      "Full Stack Engineer",
      "Software Developer",
      "Senior Software Engineer",
      "Tech Lead",
      "Engineering Manager",
      "QA Engineer",
      "DevOps Engineer"
    ]
  },
  {
    filterType: "salaryRange",
    title: "Salary Range",
    array: [
      { label: "3-5 LPA", value: [3, 5] },
      { label: "5-8 LPA", value: [5, 8] },
      { label: "8-12 LPA", value: [8, 12] },
      { label: "12-20 LPA", value: [12, 20] },
      { label: "20+ LPA", value: [20, 100] }
    ]
  }
]

const FilterCards = ({ filters, setFilters }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleRadioChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: filterType === 'salaryRange' ? JSON.parse(value) : value
    }))
  }

  return (
    <div className="w-full bg-card text-card-foreground p-4 rounded-2xl shadow border border-border">
    
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Filter Jobs</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="lg:hidden flex items-center justify-center p-1 hover:bg-accent rounded-md transition-colors"
          aria-label="Toggle filters"
        >
          {isCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </button>
      </div>

      <hr className="border-border mb-4" />

      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        {filterData.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">{section.title}</h3>
            <RadioGroup
              value={
                section.filterType === 'salaryRange'
                  ? JSON.stringify(filters[section.filterType] || [])
                  : filters[section.filterType] || ''
              }
              onValueChange={(value) =>
                handleRadioChange(section.filterType, value)
              }
              className="space-y-2"
            >
              {section.array.map((item, idx) => {
                const label = typeof item === 'string' ? item : item.label
                const value =
                  section.filterType === 'salaryRange'
                    ? JSON.stringify(item.value)
                    : item
                const id = `filter-${section.filterType}-${idx}`

                return (
                  <div className="flex items-center space-x-2" key={idx}>
                    <RadioGroupItem value={value} id={id} />
                    <Label htmlFor={id} className="text-sm">{label}</Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>
        ))}

       
        <button
          onClick={() => setFilters({ title: '', location: '', salaryRange: [] })}
          className="text-sm text-accent hover:underline mt-2 cursor-pointer"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FilterCards
