import Webcam from "react-webcam";
import { useState, useRef } from "react";



function CameraRoom() {
  const [images, setImages] = useState<any>([]); 
  const webcamRef = useRef<any>(null);


  function takeAPic() {
    if (!webcamRef.current) return;

    const imgSrc = webcamRef.current.getScreenshot();
    
    console.log(imgSrc);
    setImages([...images, imgSrc]);

  }


  return (
    <>
      <div className="w-full h-full bg-black/5 py-12">
        <section className="grid grid-cols-3 max-w-3/4 grid-rows-4 h-full mx-auto gap-8 auto-rows-[200px]">
          <div className="bg-white rounded shadow-md col-span-2 row-span-3 p-1">
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
          <div className="h-full w-full bg-white rounded shadow-md col-span-2">
              <button onClick={takeAPic}>take</button>
          </div>

          <div className="h-full w-full scrollbar-hidden bg-white rounded shadow-md overflow-auto col-start-3 row-start-1 row-span-4 p-2 flex flex-col gap-2">
            {images.map((imgSrc) => (
              <div className="w-full aspect-16/9 bg-red-400 rounded">
                <img src={imgSrc} alt="" className="w-full h-full object-fit rounded" />
              </div> 
            ) )}
          </div>
        </section>

      </div>
    </>
  )
}

export default CameraRoom