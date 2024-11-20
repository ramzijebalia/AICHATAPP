import { TypeAnimation } from 'react-type-animation';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function HomePage() {

  const [typingStatus , SetTypingStatus] = useState("Human1");
    return (
      <div className="HomePage">
        <img src="/orbital.png" alt="" className='orbital'/>
        <div className="left">
          <h1>Chaty V.0</h1>
          <h2>Supercharge your creativity and productivity</h2>
          <h3>Welcome to Chaty V.0 – Your AI-powered assistant for conversations, insights, and solutions. Ask questions, explore ideas, or get help with tasks instantly!</h3>
          <Link to='/dashboard'>Get Started</Link>
        </div>
        <div className="right">
          <div className="imgContainer">
            <div className="bgConatiner">
              <div className="bg"></div>
            </div>
            <img src="/bot.png" alt="" className='botImg'/>
            <div className="chat">
              <img src={typingStatus === "Human1" ? "/Human1.jpeg" : typingStatus === "Human2" ? "/Human2.jpeg" : "/bot.png"} alt="" />
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Human : Hello, can you help me solve a math problem?',
                  2000, /* wait 1s */ () =>{SetTypingStatus("Chaty V.0")},
                  'Chaty V.0 :  Of course! Please tell me the problem, and I\'ll do my best to assist.',
                  2000, () =>{SetTypingStatus("Human2")},
                  'Human2 :  What’s the square root of 144 ?',
                  2000, () =>{SetTypingStatus("Chaty V.0")},
                  'Chaty V.0 : The square root of 144 is 12. Let me know if you need help with anything else!',
                  2000,  () =>{SetTypingStatus("Human1")},
                ]}
                wrapper="span"
                repeat={Infinity}
                cursor={true}
                omitDeletionAnimation={true} // remove deleting effect of the messages 
              />
            </div>
          </div>
        </div>
        <div className="terms">
          <img src="/logo.png" alt="" />
          <div className="links">
            <Link to="/">Terms of Service</Link>
            <span>|</span>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  