import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Image, Images, Trash } from "lucide-react";
import { useImageContext } from "@/contexts/ImageContext";



function CameraRoom() {
  const { images, setImages } = useImageContext();
  const [taking, setTaking] = useState<boolean>(false);
  const webcamRef = useRef<any>(null);

  const noImageSlot = images.length === 4;

  function takeAShot() {
    if (!webcamRef.current) return;
    if (noImageSlot) return;

    const imgSrc = webcamRef.current.getScreenshot();
    setImages([...images, imgSrc]);
  }

  function takeMultipleShots() {
    setTaking(true);
  }

  function clearImages() {
    setImages([]);
  }

  
  useEffect(() => {
    if (!taking) return;

    const interval = setInterval(() => {
      const imgSrc = webcamRef.current.getScreenshot();
      setImages(prev => {
        if (prev.length >= 4 - 1) {
          setTaking(false);
          clearInterval(interval);
        }
        return [...prev, imgSrc];
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [taking])
  


  return (
    <>
      <div className="w-full min-h-full pb-12 md:py-12 bg-black/5">
        <div className="md:max-w-3xl px-4 mx-auto">
          <section className="w-full flex-col md:flex-row flex gap-8 mx-auto">
            <div className="aspect-video lg:h-[300px] bg-white rounded shadow p-2">
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