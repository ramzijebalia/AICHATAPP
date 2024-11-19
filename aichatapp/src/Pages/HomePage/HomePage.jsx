import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
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
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;
  