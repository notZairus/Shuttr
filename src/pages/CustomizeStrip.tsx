import { useImageContext } from "@/contexts/ImageContext";
import { useState } from "react";
import { cn } from "@/lib/utils";



const availableFrames = [
  {
    frameBG: "bg-white",
    fontColor: "text-black"
  },
  {
    frameBG: "bg-black",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-pink-400",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-yellow-300",
    fontColor: "text-black"
  },
  {
    frameBG: "bg-blue-300",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_1.png)]",
    fontColor: "text-black"
  },
  {
    frameBG: "bg-[url(/bgs/_2.png)]",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_3.png)]",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_4.jpg)]",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_5.jpg)]",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_6.png)]",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_7.png)]",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_8.png)]",
    fontColor: "text-white"
  },
  {
    frameBG: "bg-[url(/bgs/_9.png)]",
    fontColor: "text-black"
  },
  {
    frameBG: "bg-[url(/bgs/_10.png)]",
    fontColor: "text-white"
  }
]


function CustomizeStrip() {
  const { images } = useImageContext();
  const [ frameBG, setFrameBG ] = useState(availableFrames[0]);

  

  return (
    <>
      <div className="w-full">
        <div className="w-3/4 h-full mx-auto flex flex-col md:flex-row gap-9 md:gap-4 pt-12 pb-20 mt:pb-0">
          <div className="flex-1">
          
            <div className={cn("w-[160px] md:w-[180px] mx-auto space-y-1 p-2 border", frameBG.frameBG)}>
              { images.map((image: string) => (
                  <div className="w-full aspect-15/9">
                    <img src={image} className="w-full h-full object-fit"/>
                  </div>
                ))
              }
              <p className={cn("text-primary text-xs font-bold text-center mt-4", frameBG.fontColor)}>Shuttr.</p>
            </div>

          </div>
          <div className="flex-1">
            <div className="w-full h-full">
              <h1 className="text-xl font-bold text-center">Customize your strip!</h1>

              <div className="mt-4 border">
                <h2>Frame: </h2>
                <div className="max-w-full flex items-start justify-baseline gap-2 flex-wrap">
                  { availableFrames.map((frame) => (
                      <div className={cn("aspect-square w-10 rounded-full border bg-repeat", frame.frameBG)} 
                        onClick={() => setFrameBG(frame)}
                      />
                    ))
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default CustomizeStrip