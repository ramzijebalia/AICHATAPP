import { useEffect, useRef, useState } from 'react';
import './NewPrompt.css';
import Upload from '../Upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown'; // we use this to render the markdown text ( to make it easy to read )

function NewPrompt() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading : false ,
    error : "",
    dbData : {}
  });

    const endRef = useRef(null);
    useEffect(() => { // scroll to the bottom of the chat slowly
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question , answer , img.dbData]); // we want to scroll to the bottom when we have a new message or image

  const handleSubmit = (e) => {
    e.preventDefault() // we don't wanna refresh teh page
    const text = e.target.text.value ;  // using the name attribute of the input field "text" to reach teh value
    if(!text) return ; // if the input field is empty we don't wanna do anything

    add(text) // call the add function and sent our text
  }

  const add = async (text) => {
    setQuestion(text)
    const result = await model.generateContent(text);
    const response = await result.response ;
    setAnswer(response.text());
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
        {question && <div className="message user">{question}</div>}
        {answer && <div className="message"><Markdown>{answer}</Markdown></div>}
        {/* we can not see our last message so we added a padding bottom  here */} 
        <div className="endChat" ref={endRef}></div>
        <form className="newForm" onSubmit={handleSubmit}>
            <Upload setImg={setImg}/>
            <input type="file" multiple={false} hidden id='file' />
            <input type="text" name='text' placeholder='Ask anything ...'/>
            <button>
                <img src="/arrow.png" alt="" />
            </button>
        </form>
      </div>
    );
  }
  
  export default NewPrompt;
  