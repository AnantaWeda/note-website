import ReactQuill, { Quill } from "react-quill";
import ImageResize from 'quill-image-resize-module-react';
import { 
    MdFormatBold, 
    MdFormatItalic, 
    MdFormatUnderlined,
    MdFormatQuote,
    MdOutlineCode,
    MdOutlineFormatListBulleted,
    MdOutlineFormatListNumbered,
    MdFormatIndentIncrease 
} from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";
import { domToString } from "@/lib/utils";
import { FaImage } from "react-icons/fa6";
import { LuHeading1,LuHeading2 } from "react-icons/lu";
import ImageUploader from "quill-image-uploader";
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { useEffect, useMemo, useState } from "react";
import { useToast } from "./ui/use-toast";
import { cva } from "class-variance-authority";

Quill.register("modules/imageUploader", ImageUploader);
Quill.register('modules/imageResize', ImageResize);

const EditorComponent = ({valueNote, setValueNote, csrf, disabled}) => {
  const { toast } = useToast();
  const handlePush = (content) => {
    setValueNote(content)
  };
  const optionModules = useMemo(() => ({
        toolbar: {
          container: "#toolbar",
        },
        imageResize: disabled ? undefined : {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        },
        imageUploader: {
            upload: file => {
              return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("_token", csrf);
      
                fetch(
                  "/action/note/image",
                  {
                    method: "POST",
                    body: formData
                  }
                )
                  .then(response => response.json())
                  .then(result => {
                    if('errors' in result){
                      toast({
                        title: "Something wrong with you image",
                        description: result?.errors,
                        variant: "destructive"
                      });
                      reject(result?.errors);
                    }
                    resolve(result.url);
                  })
                  .catch(error => {
                    reject("Upload failed");
                  });
              });
            }
        },
    }),[]);
    

    return (
        <ReactQuill
            placeholder="Note..."
            modules={optionModules}
            readOnly={disabled}
            className="costum-scroll max-w-[700px] overflow-y-scroll max-h-[60vh]"
            theme={disabled ? "bubble" : "snow"}
            value={valueNote}
            onChange={handlePush}
        />
    );
};

const ToolbarComponent = ({value}) => {
  const [categoryShow, setCategoryShow] = useState(false);
  const [category, setCategory] = useState("green");

  const categoryColor = cva(
    "transition-all",
    {
        variants:{
            variant:{
                green: "bg-green-500 border-green-700",
                purple: "bg-purple-500 border-purple-700",
                yellow: "bg-yellow-500 border-yellow-700",
                red: "bg-red-500 border-red-700",
            },
            status:{
              active: "ring-ring ring-offset-2 border-none"
            },
            element:{
              button: "w-5 h-5 rounded-full cursor-pointer border-2 ring-offset-background ring-2 ms-2"
            }
        }
    }
  );

  useEffect(() => {
    console.log(category)
    value(categoryColor({
      variant: category,
    }))
  },[category]);

  var icons = Quill.import('ui/icons');
  icons['category'] =  domToString(<IoMdColorPalette className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['bold'] =  domToString(<MdFormatBold className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['italic'] = domToString(<MdFormatItalic  className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['underline'] = domToString(<MdFormatUnderlined className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['image'] = domToString(<FaImage className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['header']['1'] = domToString(<LuHeading1 className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['header']['2'] = domToString(<LuHeading2 className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['blockquote'] = domToString(<MdFormatQuote className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['code-block'] = domToString(<MdOutlineCode className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['list']['ordered'] = domToString(<MdOutlineFormatListNumbered className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['list']['bullet'] = domToString(<MdOutlineFormatListBulleted className="text-lg text-white group-[.ql-active]:text-gray-400"/>);
  icons['indent']['+1'] = domToString(<MdFormatIndentIncrease className="text-lg text-white group-[.ql-active]:text-white rotate-180"/>);
  icons['indent']['-1'] = domToString(<MdFormatIndentIncrease className="text-lg text-white group-[.ql-active]:text-gray-400"/>);

  return (
    <div className="relative flex">
      {/* <button className={`ql-category group ms-2`} type="button" title="Category" onClick={() => setCategoryShow(prev => !prev)}>
        <IoMdColorPalette className="text-lg text-white group-[.ql-active]:text-gray-400"/>
      </button> */}
      <div className={`flex items-center gap-4 ${categoryColor({variant: category})} absolute h-full left-9 z-40 ${!categoryShow ? 'w-0' : 'w-full'} overflow-hidden`}>
        <div className={categoryColor({variant: "green", element: "button",status: category === "green" ? "active" : null})} onClick={() => setCategory("green")}></div>
        <div className={categoryColor({variant: "yellow", element: "button",status: category === "yellow" ? "active" : null})} onClick={() => setCategory("yellow")}></div>
        <div className={categoryColor({variant: "red", element: "button",status: category === "red" ? "active" : null})} onClick={() => setCategory("red")}></div>
        <div className={categoryColor({variant: "purple", element: "button",status: category === "purple" ? "active" : null})} onClick={() => setCategory("purple")}></div>
      </div>
      <div id="toolbar" className={`!border-none flex overflow-hidden transition-all`}>
        <span className="ql-formats !flex gap-2">
            <button className="ql-category group" onClick={() => setCategoryShow(prev => !prev)} title="Category"></button>
            <button className="ql-bold group" title="Bold"></button>
            <button className="ql-italic group" title="Italic"></button>
            <button className="ql-underline group" title="Underline"></button>
            <button className="ql-image group" title="Image"></button>
            <button className="ql-header group" value="1"></button>
            <button className="ql-header group" value="2"></button>
            <button className="ql-blockquote group"></button>
            <button className="ql-code-block group"></button>
            <button className="ql-list group" value="ordered"></button>
            <button className="ql-list group" value="bullet"></button>
            <button className="ql-indent group" value="-1"></button>
            <button className="ql-indent group" value="+1"></button>
        </span>
      </div>
  
    </div>
  );
};


export {
    EditorComponent,
    ToolbarComponent
}