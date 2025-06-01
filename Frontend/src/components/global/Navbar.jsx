import { Link } from "react-router-dom";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
    const user = false;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="bg-background border-b border-border">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-14 sm:h-16 px-3 sm:px-4 md:px-6 lg:px-8">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                    Hire<span className="text-primary">loom</span>
                </h1>

                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                  
                    <Button
                        variant="ghost"
                        size="sm"
                        className="sm:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </Button>

                  
                    <ul className="hidden sm:flex items-center gap-3 sm:gap-4 md:gap-6 text-muted-foreground font-medium">
                        <li className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base"><Link to="/">
                            Home</Link> 
                        </li>
                        <li className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base">
                            <Link to="/jobs">
                            Jobs</Link> 
                        </li>
                        <li className="hover:text-primary cursor-pointer transition-colors text-sm md:text-base">
                            <Link to="/browse">
                            Browse</Link> 
                        </li>
                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                           <Link to="/login"> 
                               <Button
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer border-[var(--primary)] text-[var(--primary)] hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button 
                                    size="sm"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                                >
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer w-8 h-8 sm:w-10 sm:h-10">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                                    <AvatarFallback className="text-xs sm:text-sm">HR</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="w-56 sm:w-64 p-3 sm:p-4 space-y-3 sm:space-y-4 bg-popover text-popover-foreground border border-border shadow-md">
                               
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                                        <AvatarFallback className="text-xs sm:text-sm">HR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-medium">Musab Rayan</h4>
                                        <p className="text-xs text-muted-foreground">
                                            musab@example.com
                                        </p>
                                    </div>
                                </div>

                               
                                <div className="border-t border-border pt-2 space-y-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start gap-2 hover:bg-muted transition-colors text-xs sm:text-sm h-8 sm:h-9"
                                    >
                                        <User2 size={14} className="sm:w-4 sm:h-4" /> View Profile
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start gap-2 text-destructive hover:bg-destructive-foreground/10 transition-colors text-xs sm:text-sm h-8 sm:h-9"
                                    >
                                        <LogOut size={14} className="sm:w-4 sm:h-4" /> Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
            
            
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-background border-t border-border">
                    <div className="px-3 py-4 space-y-3">
                        <ul className="space-y-3 text-muted-foreground font-medium">
                            <li>
                                <Link 
                                    to="/" 
                                    className="block hover:text-primary transition-colors text-base py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/jobs" 
                                    className="block hover:text-primary transition-colors text-base py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Jobs
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/browse" 
                                    className="block hover:text-primary transition-colors text-base py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Browse
                                </Link>
                            </li>
                        </ul>
                        
                     
                        {!user && (
                            <div className="flex flex-col gap-3 pt-3 border-t border-border">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button
                                        variant="outline"
                                        className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;