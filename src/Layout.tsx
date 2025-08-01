import { Link } from "wouter";
import React from "react";
import CustomSidebarTrigger from "@/components/custom-sidebar-trigger";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SidebarProvider open={false}>
                <AppSidebar />

                <header className="w-full py-4 h-16 justify-between items-center px-4 md:px-8 bg-foreground text-background shadow
                    flex absolute
                ">
                    <Link href="/">
                        <h1 className="text-2xl font-black">Shuttr.</h1>
                    </Link>

                    {/* visible on desktop */}
                    <nav className="justify-center items-center gap-8 hidden md:flex">

                        <Link href="/">
                            <button className="cursor-pointer">Home</button>
                        </Link>

                        <Link href="/about">
                            <button className="cursor-pointer">About</button>
                        </Link>
                    
                    </nav>

                    {/* visible on mobile */}
                    <div className="md:hidden text-2xl font-black font-mono">
                        <CustomSidebarTrigger />  
                    </div>
                </header>
                
                <main className="w-full h-dvh pt-16">
                    {children}
                </main>

            </SidebarProvider>
        </> 
    )
}
