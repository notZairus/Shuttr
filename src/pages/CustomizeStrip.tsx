import { useImageContext } from "@/contexts/ImageContext";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { availableFrames, imageShapes } from "@/configs";
import { Button } from "@/components/ui/button.tsx";
import { Switch } from "@/components/ui/switch";
import html2canvas from "html2canvas";



function CustomizeStrip() {
  const [, setLocation] = useLocation();
  const { images } = useImageContext();
  const [ frameBG, setFrameBG ] = useState(availableFrames[0]);
  const [ imageShape, setImageShape ] = useState(imageShapes[0]); 
  const [ showDate, setShowDate ] = useState(false);
  const stripRef = useRef(null);


  function getFullDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();

    return `${date}/${month + 1}/${year}`;
  }

  async function downloadStrip() {
    if (!stripRef.current) return;

    const canvasStrip: any = await html2canvas(stripRef.current);
    const a: any = document.createElement('a');
    a.href = canvasStrip.toDataURL(('image/png'));
    a.download = "shuttr.png";
    a.target = "blank";
    a.click();
  }

  useEffect(() => {
    if (images.length < 1) {
      setLocation('/camera');
    }
  }, [])

  return (
    <>
      <div className="w-full">
        <div className="w-3/4 h-full mx-auto flex flex-col md:flex-row gap-9 md:gap-4 pt-12 pb-20 mt:pb-0">
          <div className="flex-1">
          
            <div className="w-min border mx-auto">
              <div 
                className="w-[160px] md:w-[180px] h-min mx-auto space-y-1 p-2 pb-4"
                ref={stripRef}
                style={{
                  background: frameBG.frameBG
                }}
              >
                { images.map((image: string) => (
                    <div className={cn("w-full aspect-15/9 border-[0.5px] border-white overflow-hidden flex items-center scale-x-[-1]", imageShape)}>
                      {/* <div className={cn("w-full aspect-15/9 border  borde-woverflow-hidden")}
                        style={{
                          transform: 'scale(-1, 1)',
                          backgroundImage: `url(${image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      /> */}
                      <img src={image} className="w-full"/>
                    </div>
                  ))
                }
                <div className="mt-2 h-min">
                  { showDate && 
                    <p 
                      className="text-[8px] text-center font-semibold h-4"
                      style={{
                        color: frameBG.fontColor
                      }}
                    >
                      { getFullDate() }
                    </p>
                  }
                  <p 
                    className="text-xs font-bold text-center"
                    style={{
                      color: frameBG.fontColor
                    }}
                  >
                    Shuttr.
                  </p>
                </div>
              </div>
            </div>

          </div>
          <div className="flex-1">
            <div className="w-full h-full">
              <h1 className="text-xl font-bold text-center">Customize your strip!</h1>

              <div className="mx-auto w-[240px]">
                <div className="mt-4">
                  <h2>Frame: </h2>
                  <div className="max-w-full flex items-start justify-baseline gap-2 flex-wrap">
                    { availableFrames.map((frame) => (
                        <div 
                          className="aspect-square w-10 rounded-full border bg-repeat" 
                          style={{
                            background: frame.frameBG
                          }}
                          onClick={() => setFrameBG(frame)}
                        />
                      ))
                    }
                  </div>
                </div>
  
                <div className="mt-4">
                  <h2>Frame Shape: </h2>
                  <div className="max-w-full flex items-start gap-2 flex-wrap">
                    { imageShapes.map((shape) => (
                        <div className={cn("aspect-square w-10 border bg-repeat bg-white", shape)} 
                          onClick={() => setImageShape(shape)}
                        />
                      ))
                    }
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <h2>Display Date: </h2>
                  <Switch
                    checked={showDate}
                    onCheckedChange={() => setShowDate(!showDate)}
                  />
                </div>

                <div className="w-full bg-black/10 mt-8">
                  <Button className="w-full" onClick={downloadStrip}>Download Strip</Button>
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