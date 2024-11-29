
import './ChatPage.css';
import NewPrompt from '../../Components/newPrompt/NewPrompt';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';

function ChatPage() {

  const path =  useLocation().pathname;
  const chatId = path.split("/").pop()  // w euse pop to get teh last item

  const { isPending, error, data } = useQuery({
    queryKey: ['chat' , chatId],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API_URL}/api/chats/${chatId}` , 
        {credentials:"include"
        }).then((res) => res.json(),
      ),
  })

    return (
      <div className="chatPage">
        <div className="wrapper">
          <div className="chat">
            {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (  // we use the map function to loop through the history array ( see teh model)
            <>
            {message.img && (
              <IKImage
                urlEndpoint={process.env.REACT_APP_IMAGE_KIT_ENDPOINT}
                path={message.img}
                height="300"
                width="400"
                transformation={[{height: "300",width: "400"}]}
                loading='lazy' 
                lqip={{ active: true, quality : 20 }}  //its how us teh low quality version of teh image
              >

              </IKImage>
            )}
              <div className={message.role === "user" ? "message user" : "message" } key={i}>
                  <Markdown>{message.parts.text}</Markdown>    
                  {console.log(message)}    
              </div>
            </>
            ))}
            
            
            <NewPrompt />
          </div>
        </div>
      </div>
    );
  }
  
  export default ChatPage;
  