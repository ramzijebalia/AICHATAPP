import { useEffect, useRef, useState } from 'react';
import './NewPrompt.css';
import Upload from '../Upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';

function NewPrompt() {

  const [img, setImg] = useState({
    isLoading : false ,
    error : "",
    dbData : {}
  });

    const endRef = useRef(null);
    useEffect(() => { // scroll to the bottom of the chat slowly
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const add = async (e) => {
    const prompt = "Write a story about a magic backpack.";
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

  }

    return (
      <div className="newPrompt">
        {img.isLoading && <div className="loading">Loading...</div>}
        {img.dbData?.filePath && (
          <IKImage
            urlEndpoint= {process.env.REACT_APP_IMAGE_KIT_ENDPOINT}
            path= {img.dbData.filePath}
            width={300}
            transformation={[{width: 300}]}
          />
        )}
        <button onClick={add}>TEST AI </button>
        {/* we can not see our last message so we added a padding bottom  here */} 
        <div className="endChat" ref={endRef}></div>
        <div className="newForm">
            <Upload setImg={setImg}/>
            <input type="file" multiple={false} hidden id='file' />
            <input type="text" placeholder='Ask anything ...'/>
            <button>
                <img src="/arrow.png" alt="" />
            </button>
        </div>
      </div>
    );
  }
  
  export default NewPrompt;
  