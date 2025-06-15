import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../ui/avatar";
import { Button } from "../ui/button";
import { User2, LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_BASE_URL } from "@/utils/constant";
import { setUser } from '@/redux/authSlice';

const Navbar = () => {

    const { user } = useSelector(store => store.auth)


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_BASE_URL}/logout`, {
                withCredentials: true
            });

            if (res.data?.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message || "Logged out successfully");
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Logout failed. Please try again.";
            toast.error(message);
            console.error("Logout Error:", error);
        }
    };


    return (
        <motion.div 
            className="bg-background border-b border-border"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between mx-auto max-w-7xl h-14 sm:h-16 px-3 sm:px-4 md:px-6 lg:px-8">
                <Link to="/" className="cursor-pointer">  
                    <motion.h1 
                        className="text-lg sm:text-xl md:text-2xl font-bold text-foreground"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        Hire<span className="text-primary">loom</span>
                    </motion.h1>
                </Link>

                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            className="sm:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </motion.div>



                    <motion.ul 
                        className="hidden sm:flex items-center gap-3 sm:gap-4 md:gap-6 text-muted-foreground font-medium"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >

                        {
                            user && user.userRole === 'recruiter' ? (
                                <>
                                    <motion.li 
                                        className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to="/admin/companies">
                                            Companies
                                        </Link>
                                    </motion.li>
                                    <motion.li 
                                        className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to="/admin/jobs">
                                            Jobs
                                        </Link>
                                    </motion.li>
                                </>
                            ) : (
                                <>
                                    <motion.li 
                                        className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to="/">
                                            Home
                                        </Link>
                                    </motion.li>
                                    <motion.li 
                                        className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to="/jobs">
                                            Jobs
                                        </Link>
                                    </motion.li>
                                    <motion.li 
                                        className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Link to="/browse">
                                            Browse
                                        </Link>
                                    </motion.li>

                                </>

                            )
                        }

                    </motion.ul>

                    {!user ? (
                        <motion.div 
                            className="flex items-center gap-1.5 sm:gap-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Link to="/login">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer border-[var(--primary)] text-[var(--primary)] hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                                    >
                                        Login
                                    </Button>
                                </motion.div>
                            </Link>
                            <Link to="/signup">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        size="sm"
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                                    >
                                        Signup
                                    </Button>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Popover>
                                <PopoverTrigger asChild>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Avatar className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10">
                                            <AvatarImage src={user?.profileDetails.profileImageUrl} alt="user" />
                                            <AvatarFallback className="text-xs sm:text-sm">HR</AvatarFallback>
                                        </Avatar>
                                    </motion.div>
                                </PopoverTrigger>

                                <PopoverContent className="w-56 sm:w-64 p-3 sm:p-4 space-y-3 sm:space-y-4 bg-popover text-popover-foreground border border-border shadow-md">

                                    <motion.div 
                                        className="flex items-center gap-2 sm:gap-3"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                            <AvatarImage src={user?.profileDetails.profileImageUrl} alt="user" />
                                            <AvatarFallback className="text-xs sm:text-sm">HR</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-medium">{user?.fullName}</h4>
                                            <p className="text-xs text-muted-foreground">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </motion.div>


                                    <motion.div 
                                        className="border-t border-border pt-2 space-y-1"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                         {user && user.userRole === 'student' && (
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full justify-start gap-2 hover:bg-muted transition-colors text-xs sm:text-sm h-8 sm:h-9 cursor-pointer"
                                                >
                                                   
                                                    <User2 size={14} className="sm:w-4 sm:h-4" /> <Link to='/user-profile'> View Profile</Link>
                                                </Button>
                                            </motion.div>
                                         )}
                                        
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={logOutHandler}
                                                className="w-full justify-start gap-2 text-destructive hover:bg-destructive-foreground/10 transition-colors text-xs sm:text-sm h-8 sm:h-9 cursor-pointer"
                                            >
                                                <LogOut size={14} className="sm:w-4 sm:h-4" /> Logout
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </PopoverContent>
                            </Popover>
                        </motion.div>
                    )}
                </div>
            </div>


            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        className="sm:hidden bg-background border-t border-border"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className="px-3 py-4 space-y-3"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <ul className="space-y-3 text-muted-foreground font-medium">
                                {
                                    user && user.userRole === 'recruiter' ? (
                                        <>
                                            <motion.li
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    to="/admin/companies"
                                                    className="block hover:text-primary transition-colors text-base py-2"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Home
                                                </Link>
                                            </motion.li>
                                            <motion.li
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.3 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    to="/admin/jobs"
                                                    className="block hover:text-primary transition-colors text-base py-2"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Jobs
                                                </Link>
                                            </motion.li>

                                        </>
                                    ) : (
                                        <>
                                            <motion.li
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.2 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    to="/"
                                                    className="block hover:text-primary transition-colors text-base py-2"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Home
                                                </Link>
                                            </motion.li>
                                            <motion.li
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.3 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    to="/jobs"
                                                    className="block hover:text-primary transition-colors text-base py-2"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Jobs
                                                </Link>
                                            </motion.li>
                                            <motion.li
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.4 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <Link
                                                    to="/browse"
                                                    className="block hover:text-primary transition-colors text-base py-2"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Browse
                                                </Link>
                                            </motion.li>
                                        </>
                                    )
                                }


                            </ul>


                            {!user && (
                                <motion.div 
                                    className="flex flex-col gap-3 pt-3 border-t border-border"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                >
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-primary hover:text-primary-foreground transition-colors"
                                            >
                                                Login
                                            </Button>
                                        </motion.div>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                                Signup
                                            </Button>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Navbar;