import { Link } from "react-router-dom";
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
import { User2, LogOut } from "lucide-react";

const Navbar = () => {
    const user = false;

    return (
        <div className="bg-background border-b border-border">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <h1 className="text-2xl font-bold text-foreground">
                    Hire<span className="text-primary">loom</span>
                </h1>

                <div className="flex items-center gap-10">
                    <ul className="flex items-center gap-6 text-muted-foreground font-medium">
                        <li className="hover:text-primary cursor-pointer transition-colors">
                            Home
                        </li>
                        <li className="hover:text-primary cursor-pointer transition-colors">
                            Jobs
                        </li>
                        <li className="hover:text-primary cursor-pointer transition-colors">
                            Browse
                        </li>
                    </ul>

                    {!user ? (
                        <div className="flex item-center gap-2">
                            <Button
                                variant="outline"
                                className="cursor-pointer border-[var(--primary)] text-[var(--primary)] hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                                Login
                            </Button>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                                Signup
                            </Button>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                                    <AvatarFallback>HR</AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent className="w-64 p-4 space-y-4 bg-popover text-popover-foreground border border-border shadow-md">
                                {/* User Info */}
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="user" />
                                        <AvatarFallback>HR</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="text-sm font-medium">Musab Rayan</h4>
                                        <p className="text-xs text-muted-foreground">
                                            musab@example.com
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="border-t border-border pt-2 space-y-1">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 hover:bg-muted transition-colors"
                                    >
                                        <User2 size={16} /> View Profile
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start gap-2 text-destructive hover:bg-destructive-foreground/10 transition-colors"
                                    >
                                        <LogOut size={16} /> Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
