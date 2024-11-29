import { useMutation, useQueryClient } from '@tanstack/react-query';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (text) => {
      return fetch(`${process.env.REACT_APP_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["userChatss"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });




  const handleSubmit = async(e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if(!text) return;
    mutation.mutate(text);
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
  