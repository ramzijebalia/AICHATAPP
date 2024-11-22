import { useEffect, useRef } from 'react';
import './NewPrompt.css';

function NewPrompt() {

    const endRef = useRef(null);
    useEffect(() => { // scroll to the bottom of the chat slowly
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);


    return (
      <div className="newPrompt">
        {/* we can not see our last message so we added a padding bottom  here */} 
        <div className="endChat" ref={endRef}></div>
        <div className="newForm">
            <label htmlFor="file">
                <img src="/attachment.png" alt="" />
            </label>
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
  