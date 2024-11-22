
import './ChatPage.css';
import NewPrompt from '../../Components/newPrompt/NewPrompt';

function ChatPage() {


    return (
      <div className="chatPage">
        <div className="wrapper">
          <div className="chat">
          <div className="message">message from ai </div>
          <div className="message user">message from user ; this is just a testmessage to test the appearence in teh forntend</div>
          <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">message from ai</div>
            <div className="message user">message from user</div>
            <div className="message">Test scroll</div>
            <NewPrompt />
          </div>
        </div>
      </div>
    );
  }
  
  export default ChatPage;
  