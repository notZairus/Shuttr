import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function CustomSidebarTrigger() {
    const { toggleSidebar } = useSidebar();
    
    return (
        <Button onClick={toggleSidebar}>
            <Menu />
        </Button>
    )
}
