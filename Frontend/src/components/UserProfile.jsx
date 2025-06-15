import React, { useState } from 'react';
import Navbar from './global/Navbar';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import MyJobApplications from './MyJobApplications';
import UpdateProfile from './UpdateProfile';
import { useSelector } from 'react-redux';
import useUserAppliedJobs from '@/hooks/useUserAppliedJobs';




const UserProfile = () => {
 
  const [open,setOpen] = useState(false)
  const {user} = useSelector(store=>store.auth)
  const userSkills = user?.profileDetails.skills;
  const userHasResume = true;
  useUserAppliedJobs()

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto my-6 p-6 sm:p-8 bg-background border border-border rounded-2xl shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profileDetails.profileImageUrl}
                alt="User Avatar"
              />
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user?.fullName}</h2>
              <p className="text-muted-foreground text-sm">
              {user?.profileDetails.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} variant="outline" className="self-start sm:self-auto">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

       
        <div className="mt-6 space-y-2 text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="h-5 w-5 text-muted-foreground" />
            <span>{user?.mobileNumber}</span>
          </div>
        </div>

       
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(userSkills) && userSkills.length > 0 ? (
             userSkills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Not Available</span>
            )}
          </div>
        </div>

      
        <div className="mt-6">
          <Label className="block mb-1">Resume</Label>
          {userHasResume ? (
            <a
              href={user?.profileDetails.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
             {user?.profileDetails.resumeFilename}
            </a>
          ) : (
            <span className="text-muted-foreground">Not Uploaded</span>
          )}
        </div>

       
       
      </div>

       <div className="mx-auto max-w-5xl">
          <h3 className="font-semibold text-lg mb-2">Applied Jobs</h3>
          <MyJobApplications />
        </div>
        <UpdateProfile open={open} setOpen={setOpen}/>
        
    </div>


  );
};

export default UserProfile;
