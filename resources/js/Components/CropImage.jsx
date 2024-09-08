import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Dialog, DialogContent } from './ui/dialog'
import { Button } from './ui/button'
import getCroppedImg from '@/lib/utils'

export default function CropImage({open,setOpen,handleImageCrop}){
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [preview, setPreview] = useState()
  
    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        try{
            const croppedImage = await getCroppedImg(
                open,
                croppedAreaPixels,
                0
            )
            setPreview(croppedImage);
        }catch(e){
            console.log(e);
        }
    }
  
    const handleSubmit = () => {
        handleImageCrop(preview)
        setOpen(false)
    }  

    return (
        <Dialog open={open ? true : false} onOpenChange={setOpen} className="costum-scroll">
            <DialogContent size="4" className="border-none costum-scroll p-0 max-w-[700px] h-[80vh] gap-0">
                <div className='grid md:grid-cols-3 grid-cols-1'>
                    <div className='relative col-span-2'>    
                        <Cropper
                            image={open}
                            crop={crop}
                            zoom={zoom}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className='p-3'>
                        <h1>Preview</h1>
                        <img src={preview} className='m-auto rounded-full w-24 h-24'/>
                        <h1 className='text-center font-bold mt-5'>Lorem ipsum dolor sit.</h1>
                        <p className='text-center text-xs'>Github</p>
                        <Button className="w-full mt-5" onClick={handleSubmit}>Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}