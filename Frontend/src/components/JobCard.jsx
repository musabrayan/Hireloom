import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const JobCard = () => {
  return (
    <div className="bg-card text-card-foreground p-5 rounded-2xl shadow border border-border transition hover:shadow-lg">
   
      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>2 days ago</span>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

    
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://imgs.search.brave.com/hoof-A79UqpE4cGRslutlU9zqOAoCwEI4sfy5cdG--c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3QtY29t/cGFueS1sb2dvXzUz/ODc2LTEyMDUwMS5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw" />
        </Avatar>
        <div>
          <h2 className="font-semibold text-sm">Company Name</h2>
          <p className="text-xs text-muted-foreground">India</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-lg text-primary">Frontend Developer</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, reiciendis?
        </p>
      </div>

 
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="outline" className="font-semibold text-accent">12 Positions</Badge>
        <Badge variant="outline" className="font-semibold text-destructive">Part-Time</Badge>
        <Badge variant="outline" className="font-semibold text-emerald-600 dark:text-emerald-400">12 LPA</Badge>
      </div>

   
      <div className="flex items-center gap-3">
        <Button variant="secondary">Details</Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save for Later</Button>
      </div>
    </div>
  )
}

export default JobCard
