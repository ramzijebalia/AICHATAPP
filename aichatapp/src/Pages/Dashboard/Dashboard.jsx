import './Dashboard.css';

function Dashboard() {
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
          <form>
            <input type="text" placeholder="Ask me anything ... "  />
            <button>
              <img src="/arrow.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Dashboard;
  