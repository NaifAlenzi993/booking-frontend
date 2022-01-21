
import React , {useState} from "react";

export default function AppN() {
    const [file, setFile] = useState("")

    // فنكش تقرا بيانات الملف وتحوله ل 
    // Base64
    // ويحفظ بستيت ال 
    // file
    const readFromPat = async (e)=> {
      getBase64(e.target.files[0]) 
      console.log(e.target.files);
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
        <div style={{
        display: "flex" , 
        flexDirection: "column",
        justifyContent: "space-around" , 
        alignItems: "center" ,
        borderRadius: "20px" , 
        border: "1px dashed" ,
        width: "500px" ,
        height: "700px" ,
        margin: "auto"}}>
            <input onChange={readFromPat} type="file" name="" id="" />
            
            {/* ملف الصورة كامل يتحول الى كود ونقدر نخليه مكان الرابط فوق ونحفظه بالداتا بيس  */}
            {/* يحفظ بستيت file */}
            <img src={file} alt="" width={300} height={300}/>

            <h3>انسخ بايتات الصورةالي تحت والصقها مكان الرابط فوق ولاحظ النتيجة</h3>

            <textarea id="imageCode" name="imageCode" rows="4" cols="50" value={file}>
            </textarea>
        </div>
    )
}
