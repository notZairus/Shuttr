import { Link } from "wouter";
import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <header className="w-full py-4 h-16 justify-between items-center px-8 bg-foreground text-background shadow
                hidden sm:flex absolute
            ">
                <h1 className="text-2xl font-black font-mono">Shuttr.</h1>
                <nav className="flex justify-center items-center gap-8">
                    <Link href="/">
                        <button className="cursor-pointer">Home</button>
                    </Link>

                    <Link href="/about">
                        <button className="cursor-pointer">About</button>
                    </Link>

                    <Link href="#">
                        <button className="cursor-pointer">Soon</button>
                    </Link>
                </nav>
                <h1 className="opacity-0 text-2xl font-black font-mono">Shuttr.</h1>
            </header>
            <main className="w-full h-dvh pt-16">
                {children}
            </main>
        </>
    )
}
