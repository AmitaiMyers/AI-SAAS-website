import {Button} from "@/components/ui/button";
// import { Menu } from "lucide-react";
import {UserButton} from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import {getApiLimitCount} from "../lib/api-limit";
// import MobileSidebar from "./mobile-sidebar";
const Navbar = async () => {
    const apiLimitCount = await getApiLimitCount();

    return (
        <div className="flex items-center p-4">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}

export default Navbar;