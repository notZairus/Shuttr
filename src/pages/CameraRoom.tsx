import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Image, Images, Trash, Pause } from "lucide-react";
import { useImageContext } from "@/contexts/ImageContext";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";


const filters = [
  "filter",            // Enables filter
  "filter-none",       

  // Blur
  "blur-[1px]",

  // Brightness
  "brightness-150",
  "brightness-200",

  // Contrast
  "contrast-125",
  "contrast-150",
  "contrast-200",

  // Grayscale
  "grayscale grayscale-400",

  // Invert
  "invert",

  // Sepia
  "filter sepia",

  // Hue Rotate
  "hue-rotate-90",
  "hue-rotate-180",

  // Saturate
  "saturate-0",
  "saturate-150",
  "saturate-200",
];



interface ReactWebcam {
  getScreenshot: () => string
}


function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('finished');
    }, seconds * 1000);
  })
}

function CameraRoom() {
  const [, setLocation] = useLocation();
  const { images, setImages } = useImageContext();
  const webcamRef = useRef<ReactWebcam & Webcam | null>(null);
  const [timer, setTimer] = useState(0);
  const [taking, setTaking] = useState(false);
  const takingRef = useRef(false);
  const [filter, setFilter] = useState('filter-none');

  const noImageSlot = images.length === 4;

  function takeAShot() {
    if (!webcamRef.current) return;
    if (noImageSlot) return;

    const imgSrc = webcamRef.current.getScreenshot();
    const image = { image: imgSrc, filter: filter };
    setImages(images => [...images, image]);
  }

  function pause() {
    setTaking(false);
    takingRef.current = false;
  }


  async function takeMultipleShots() {
    if (noImageSlot) return;
    
    setTaking(true);
    takingRef.current = true;
    for (let i = 0; i < 4 - images.length; i++) {
      for (let j = 3; j >= 0; j--) {
        setTimer(j);
        await sleep(1);
        if (!takingRef.current) {
          setTaking(false);
          return;
        }
      }
      takeAShot();
    }
    setTaking(false);
  }

  const clearImages = useCallback(async() => {
    setImages([]);
  }, []);

  return (
    <>
      <div className="w-full min-h-full pb-12 py-12 bg-black/5 ">
        <div className="md:max-w-4xl mx-auto">
          <section className="flex-col px-4 md:px-0 md:flex-row flex gap-8 mx-auto">
            <div className="bg-white rounded shadow p-2 relative">

              {taking && (
                timer > 0 ?
              
                <div className="z-10 absolute flex items-center justify-center aspect-square w-1/5 rounded-full text-foregound bg-background/50 top-1/2 left-1/2 -translate-1/2">
                  <p className="text-4xl font-semibold">{timer}</p>
                </div> :

                <div className="bg-white absolute inset-0 z-10" />
              )}

              <Webcam 
                className={cn("h-[200px] md:h-[300px] w-full aspect-video object-cover rounded scale-x-[-1] md:scale-x-[1]", filter)}
                ref={webcamRef}
                audio={false}
                height={720}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
              />

              <div className="mt-2">
                <p>Filters: </p>
                <div className="w-full flex gap-2 items-start flex-wrap justify-start">
                  { filters.map(filter => (
                      <div 
                        className="border h-full rounded-full w-12 aspect-square overflow-y-hidden"
                        onClick={() => setFilter(filter)}
                      >
                        <img src="src/images/image copy.png" className={cn("object-cover w-full h-full", filter)} />  
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>
            <div className="flex-1 flex flex-col gap-4 items-center">

              <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer" size="lg"
                onClick={takeAShot}
              >
                <Image className="size-6"/>
                <p>take a shot</p>
              </Button>

              { images.length < 4 && !taking && 
                <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer" size="lg"
                  onClick={takeMultipleShots}
                >
                  <Images className="size-6"/>
                  <p>take {4 - images.length > 1 ? `${4 - images.length} shots` : `${4 - images.length} shot` }</p>
                </Button>
              }

              { taking && 
                <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer flex items-center justify-center" size="lg" variant="destructive"
                  onClick={pause}
                >
                  <Pause className="size-6"/>
                  <p>Stop</p>
                </Button>
              }
  
              <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer flex items-center justify-center" size="lg" variant="destructive"
                onClick={clearImages}
              >
                <Trash className="size-6"/>
                <p>clear images</p>
              </Button>

            </div>
          </section>


          { images.length > 0 && 
            <section className="w-11/12 md:w-full mx-auto mt-8 ">
              <div className="bg-white p-4 rounded shadow-md h-min flex flex-col md:flex-row gap-4 items-end">
                { images.map((image) => (
                    <div className="rounded aspect-video flex-1 overflow-hidden md:max-w-1/5 bg-red-400 border">
                      <img src={image.image} alt="" className={cn("w-full h-full object-cover scale-x-[-1]", image.filter)}/>
                    </div>
                  ))
                }
                {/* { images.map((imageSrc: string) => (
                    <div className="rounded overflow-hidden flex-1 md:max-w-1/5 bg-red-400 aspect-video border">
                      <img src={imageSrc} alt="" className="w-full h-full object-cover"/>
                    </div>
                  ))
                } */}
                { noImageSlot && 
                  <Button className="h-full max-w-24 wrap-break-word"
                    onClick={() => setLocation('/customize')}
                  >
                    Customize <br/> Strip
                  </Button> 
                }
              </div>
            </section>
          }


        </div>
      </div>
    </>
  )
}

export default CameraRoom