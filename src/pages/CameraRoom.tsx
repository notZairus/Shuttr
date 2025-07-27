import Webcam from "react-webcam";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";



function CameraRoom() {
  const [images, setImages] = useState<any>([]); 
  const webcamRef = useRef<any>(null);

  const noImageSlot = images.length === 4;


  function takeAPic() {
    if (!webcamRef.current) return;
    if (noImageSlot) return;
    const imgSrc = webcamRef.current.getScreenshot();
    
    console.log(imgSrc);
    setImages([...images, imgSrc]);
  }

  function clearImages() {
    setImages([]);
  }


  return (
    <>
      <div className="w-full min-h-full pb-12 md:py-12 bg-black/5">
        <div className="max-w-3xl px-4 mx-auto">
          <section className="w-full flex-col md:flex-row flex gap-8 mx-auto">
            <div className="aspect-video lg:h-[300px] bg-white rounded shadow-md p-2">
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
                onClick={takeAPic}
              >
                Take a Pic
              </Button>
  
              <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer" size="lg" variant="outline">
                Ewan
              </Button>
  
              <Button className="w-10/12 md:w-full py-8 text-lg font-semibold cursor-pointer" size="lg" variant="destructive"
                onClick={clearImages}
              >
                Clear Images
              </Button>
            </div>
          </section>
          { images.length > 0 && 
            <section className="w-11/12 md:w-full mx-auto mt-8 ">
              <div className="w-full bg-white p-4 md:p-2 rounded shadow-md flex flex-col md:flex-row gap-4">
                { images.map((imageSrc: string) => (
                    <div className="h-24 rounded overflow-hidden flex-1 md:max-w-1/4 bg-red-400 aspect-video">
                      <img src={imageSrc} alt="" className="w-full h-full object-fit"/>
                    </div>
                  ))

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