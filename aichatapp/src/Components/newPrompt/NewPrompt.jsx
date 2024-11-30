import { useEffect, useRef, useState } from 'react';
import './NewPrompt.css';
import Upload from '../Upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from 'react-markdown'; // we use this to render the markdown text ( to make it easy to read )
import { useMutation, useQueryClient } from '@tanstack/react-query';

function NewPrompt({data}) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading : false ,
    error : "",
    dbData : {},
    aiData : {}
  });

  const endRef = useRef(null);
  const formRef = useRef(null);
  
  useEffect(() => { // scroll to the bottom of the chat slowly
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data , question , answer , img.dbData]); // we want to scroll to the bottom when we have a new message or image


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.REACT_APP_API_URL}/api/chats/${data._id}`, {  // chatid
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question : question.length ? question : undefined,
          answer,
          img : img.dbData?.filePath || undefined
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient
      .invalidateQueries({ queryKey: ["chat" , data._id] })
      .then(() => {
        formRef.current.reset(); // reset the input field after sending the message
        setQuestion("");
        setAnswer("");
        setImg({
          isLoading : false ,
          error : "",
          dbData : {},
          aiData : {}
        });
        
      });
    },
    onError: (error) => {
      console.log(error)
    }
  });

  const handleSubmit = async(e) => {
    e.preventDefault() // we don't wanna refresh teh page
    const text = e.target.text.value ;  // using the name attribute of the input field "text" to reach teh value
    if(!text) return ; // if the input field is empty we don't wanna do anything

    add(text , false) // call the add function and sent our text
  }

  const add = async (text , isInitial) => {
    if(!isInitial) setQuestion(text)
    try{
    // we should check ( if we have any image ) : if it isnot empty snet the image ai data and text and if it is empty snet only teh text
    const result = await chat.sendMessageStream(Object.entries(img.aiData).length  ? [img.aiData , text] : [text]);
    let accumulatedText =""
    for await(const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      setAnswer(accumulatedText)
    }
    mutation.mutate()
    }catch(error){
      console.log(error)
    }
  }


  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{text :"Can you help me with a question?"}],
      },
      {
        role: "model",
        parts: [{text :"Welcome to the chat! How can I help you today?"}],
      },
    ],
    generationConfig: {
      // maxTokens: 100,
    },
  })

  const hasRun = useRef(false);  // to  make sure he does not run it twice
  // we want to add the first message to the chat when we open the chat ( the ai need to respond to the first message also whne we create a new chat )
  useEffect(() => {
    if(!hasRun.current) {
      if(data?.history?.length === 1) {
        add(data.history[0].parts[0].text , true)
      }
    }
    hasRun.current = true;
  }, [])

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
        <form className="newForm" onSubmit={handleSubmit} ref={formRef}> {/* we use the form ref ( reset teh input form ) after ssending the msg */ }
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
  