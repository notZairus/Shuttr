import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Image, Images, Trash } from "lucide-react";
import { useImageContext } from "@/contexts/ImageContext";


function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('finished');
    }, seconds * 1000);
  })
}


function CameraRoom() {
  const { images, setImages } = useImageContext();
  const webcamRef = useRef<any>(null);
  const [timer, setTimer] = useState(0);
  const [taking, setTaking] = useState(false);

  const noImageSlot = images.length === 4;

  const takeAShot = useCallback(() => {
    if (!webcamRef.current) return;
    if (noImageSlot) return;

    const imgSrc = webcamRef.current.getScreenshot();
    setImages(images => [...images, imgSrc]);
  }, []);


  const takeMultipleShots = useCallback(async() => {
    if (noImageSlot) return;
    
    setTaking(true);
    for (let i = 0; i < 4 - images.length; i++) {
      for (let j = 3; j >= 0; j--) {
        setTimer(j);
        await sleep(1);
      }

      takeAShot();
    }
    setTaking(false);
  }, [images]);


  const clearImages = useCallback(async() => {
    setImages([]);
  }, []);

  return (
    <>
      <div className="w-full min-h-full pb-12 md:py-12 bg-black/5 ">
        <div className="md:max-w-4xl mx-auto">
          <section className="w-full flex-col px-4 md:px-0 md:flex-row flex gap-8 mx-auto ">
            <div className="aspect-video lg:h-[300px] bg-white rounded shadow p-2 relative">
              {taking && (
                timer > 0 ?
              
                <div className="absolute flex items-center justify-center aspect-square w-1/5 rounded-full text-foregound bg-background/50 top-1/2 left-1/2 -translate-1/2">
                  <p className="text-4xl font-semibold">{timer}</p>
                </div> :

                <div className="bg-white absolute inset-0" />
              )}

              <Webcam 
                className="w-full h-full rounded"
                ref={webcamRef}
                audio={false}
                height={720}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user"
                }}
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 items-center">

              <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer" size="lg"
                onClick={takeAShot}
              >
                <Image className="size-6"/>
                <p>take a shot</p>
              </Button>

              <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer" size="lg"
                onClick={takeMultipleShots}
              >
                <Images className="size-6"/>
                <p>take {4 - images.length > 1 ? `${4 - images.length} shots` : `${4 - images.length} shot` }</p>
              </Button>
  
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
              <div className="w-full bg-white p-2 rounded shadow-md flex flex-col md:flex-row gap-4 items-end">
                { images.map((imageSrc: string) => (
                    <div className="rounded overflow-hidden flex-1 md:max-w-1/5 bg-red-400 aspect-video border">
                      <img src={imageSrc} alt="" className="w-full h-full object-fit"/>
                    </div>
                  ))
                }
                { noImageSlot && 
                  <Button className="h-full max-w-24 wrap-break-word">
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