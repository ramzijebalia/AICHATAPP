import './Dashboard.css';
import {useAuth} from "@clerk/clerk-react";

function Dashboard() {

  //const userId = useAuth().userId
  const handleSubmit = async(e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;
    await fetch("http://localhost:3001/api/chats", {
      method: "POST",
      credentials: "include", // we gonne snent our cookies we we gonne use it to verify teh user
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({text})
    })
  }
    return (
      <div className="dashboard">
        <div className="texts">
          <div className="logo">
            <img src="/logo.png" alt="" />
            <h1>Chaty V.0</h1>
          </div>
          <div className="options">
            <div className="option">
              <img src="/chat.png" alt="" />
              <span>Create a new Chat</span>
            </div>
            <div className="option">
              <img src="/image.png" alt="" />
              <span>Analyse Images </span>
            </div>
            <div className="option">
              <img src="/code.png" alt="" />
              <span>Help me with my code</span>
            </div>
          </div>
        </div>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <input type="text" name="text" placeholder="Ask me anything ... "  />
            <button>
              <img src="/arrow.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  