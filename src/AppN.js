
import React , {useState , useEffect , useRef} from "react";
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export default function AppN() {
    const [file, setFile] = useState("")

 
    const readFromPat = async (e)=> {
      getBase64(e.target.files[0]) 
    }

    function getBase64(fileinfo) {
        const reader = new FileReader();

        reader.readAsDataURL(fileinfo);
        reader.onload = () => {
          setFile(reader.result)
        };
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
     }
   
    return (
        <div>
            <input onChange={readFromPat} type="file" name="" id="" />
            
            {/* <img src={file} alt="" /> */}
            <span>{file}</span>
        </div>
    )
}
