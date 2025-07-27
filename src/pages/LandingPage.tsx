import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";


export default function LandingPage() {
    const [, setLocation] = useLocation();

    return (
        <>
            <section className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-5xl sm:text-7xl font-bold text-center">Shuttr.</h1>
                <h2 className="text-center text-2xl">
                    free photobooth for everyone!
                </h2>  
                <Button 
                    size="lg" 
                    className="px-12 py-6 text-xl font-bold mt-8 cursor-pointer"
                    onClick={() => setLocation('/camera')}
                >
                    Start
                </Button>                
            </section>
            
        </>
    )
}