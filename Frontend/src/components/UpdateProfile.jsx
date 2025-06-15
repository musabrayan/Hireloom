import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner'
import { setUser } from '../redux/authSlice';
import {USER_API_BASE_URL} from "../utils/constant"


const UpdateProfile = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        mobileNumber: user?.mobileNumber || '',
        bio: user?.profileDetails?.bio || '',
        skills: user?.profileDetails?.skills?.join(', ') || '',
        file: null,
    });

    const changeInputHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.mobileNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_BASE_URL}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-background text-foreground shadow-lg border border-border">
                <DialogHeader>
                    <DialogTitle className="text-primary tracking-wide">Update Profile</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Name</Label>
                        <Input
                            id="name"
                            name="fullName"
                            placeholder="Enter your name"
                            value={input.fullName}
                            onChange={changeInputHandler}
                            className="bg-input text-foreground border border-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-foreground">Description</Label>
                        <Textarea
                            id="description"
                            name="bio"
                            onChange={changeInputHandler}
                            value={input.bio}
                            placeholder="Tell us about yourself"
                            className="bg-input text-foreground border border-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={input.email}
                            onChange={changeInputHandler}
                            type="email"
                            placeholder="Enter your email"
                            className="bg-input text-foreground border border-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                        <Input
                            id="phone"
                            name="mobileNumber"
                            value={input.mobileNumber}
                            onChange={changeInputHandler}
                            type="tel"
                            placeholder="Enter your phone number"
                            className="bg-input text-foreground border border-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="skills" className="text-foreground">Skills (comma-separated)</Label>
                        <Input
                            id="skills"
                            name="skills"
                            value={input.skills}
                            onChange={changeInputHandler}
                            placeholder="e.g. HTML, CSS, JavaScript"
                            className="bg-input text-foreground border border-border"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="resume" className="text-foreground">Resume</Label>
                        <Input
                            id="resume"
                            name="resume"
                            onChange={changeFileHandler}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="bg-input text-foreground border border-border file:text-muted-foreground file:bg-muted file:border file:border-border file:rounded-sm file:py-1 file:px-2"
                        />
                    </div>

                    <DialogFooter>
                        {loading ? (
                            <Button disabled className="w-full bg-primary text-primary-foreground my-4">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-primary text-primary-foreground my-4 hover:bg-primary/90">
                                Update
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfile;
