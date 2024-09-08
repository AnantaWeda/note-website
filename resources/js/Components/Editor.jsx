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
import ReactQuill, { Quill } from "react-quill";
import ImageResize from 'quill-image-resize-module-react';
import ImageUploader from "quill-image-uploader";
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "./ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { CategoryContext } from "@/context/CategoryContext";
import { useTheme } from "./ThemeProvider";

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

const ToolbarComponent = ({value,setValue}) => {
  const [categoryShow, setCategoryShow] = useState(false);
  const [category, setCategory] = useState(value);

  const {dataCategory} = useContext(CategoryContext);

  const { categoryColor } = useTheme()

  const backgroundColorToolbar = (id_category) => 
    categoryColor({variant: dataCategory.find(res => res.id_category === id_category)?.color})

  useEffect(() => {
    setValue(category)
  },[category]);

  const toolbarOption = [
    {
      name: 'category',
      icon: (className) => <IoMdColorPalette className={className} />,
      props: {onClick: () => setCategoryShow(prev => !prev) }
    },
    {
      name: 'bold',
      icon: (className) => <MdFormatBold className={className} />
    },
    {
      name: 'italic',
      icon: (className) => <MdFormatItalic className={className} />
    },
    {
      name: 'underline',
      icon: (className) => <MdFormatUnderlined className={className} />
    },
    {
      name: 'image',
      icon: (className) => <FaImage className={className} />
    },
    {
      name: 'header',
      sub: [
        {
          name: '1',
          icon: (className) => <LuHeading1 className={className}/>
        },
        {
          name: '2',
          icon: (className) => <LuHeading2 className={className}/>
        },
      ],
    },
    {
      name: 'blockquote',
      icon: (className) => <MdFormatQuote className={className} />
    },
    {
      name: 'code-block',
      icon: (className) => <MdOutlineCode className={className} />
    },
    {
      name: 'list',
      sub: [
        {
          name: 'ordered',
          icon: (className) => <MdOutlineFormatListNumbered className={className}/>
        },
        {
          name: 'bullet',
          icon: (className) => <MdOutlineFormatListBulleted className={className}/>
        },
      ],
    },
    {
      name: 'indent',
      sub: [
        {
          name: '+1',
          icon: (className) => <MdFormatIndentIncrease className={`${className} rotate-180`}/>
        },
        {
          name: '-1',
          icon: (className) => <MdFormatIndentIncrease className={className}/>
        },
      ],
    },
  ]

  const classIcon = "text-lg text-white group-[.ql-active]:text-gray-400"

  var icons = Quill.import('ui/icons');
  toolbarOption.forEach((res) => {
    if(!res?.sub){
      icons[res.name] = domToString(res.icon(classIcon))
    }else{
      res.sub.forEach(res2 => {
        icons[res.name][res2.name] = domToString(res2.icon(classIcon))
      })
    }
  });

  return (
    <div className="relative flex">
      <div className={`flex items-center gap-4 ${value ? backgroundColorToolbar(category) : "bg-background"} absolute h-full left-9 z-40 ${!categoryShow ? 'w-0' : 'w-full'} overflow-hidden`}>
        <TooltipProvider>
          {dataCategory.map((res,key) => {
            return(
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <div className={categoryColor({variant: res.color, element: "button",status: category === res.id_category ? "active" : null})} onClick={() => setCategory(res.id_category)}></div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{res.name}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
      <div id="toolbar" className={`!border-none flex overflow-hidden transition-all`}>
        <span className="ql-formats !flex gap-2">
            {toolbarOption.map((res) => {
              if(!res?.sub){
                return <button className={`ql-${res.name} group`} title={res.name} {...res?.props}></button>
              }else{
                return res.sub.map(res2 => {
                  return <button className={`ql-${res.name} group`} value={res2.name}></button>
                })
              }
            })}
        </span>
      </div>
  
    </div>
  );
};


export {
    EditorComponent,
    ToolbarComponent
}