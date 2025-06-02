import React from 'react';
import Navbar from './global/Navbar';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import MyJobApplications from './MyJobApplications';

const userSkills = ['HTML', 'CSS', 'JavaScript'];
const userHasResume = true;

const UserProfile = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-6 p-6 sm:p-8 bg-background border border-border rounded-2xl shadow-sm">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://imgs.search.brave.com/hoof-A79UqpE4cGRslutlU9zqOAoCwEI4sfy5cdG--c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJzdHJhY3QtY29t/cGFueS1sb2dvXzUz/ODc2LTEyMDUwMS5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw"
                alt="User Avatar"
              />
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Musab</h2>
              <p className="text-muted-foreground text-sm">
                Passionate developer with a love for building responsive web apps.
              </p>
            </div>
          </div>
          <Button variant="outline" className="self-start sm:self-auto">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2 text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>musab@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="h-5 w-5 text-muted-foreground" />
            <span>+91 89933 020XX</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {userSkills.length > 0 ? (
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
              href="https://drive.google.com/your-resume-link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              View Resume
            </a>
          ) : (
            <span className="text-muted-foreground">Not Uploaded</span>
          )}
        </div>

       
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-2">Applied Jobs</h3>
          <MyJobApplications />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
