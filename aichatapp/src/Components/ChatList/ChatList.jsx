import { Link } from "react-router-dom";
import "./ChatList.css";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {

    const { isPending, error, data } = useQuery({
        queryKey: ['userChatss'],
        queryFn: () =>
          fetch(`${process.env.REACT_APP_API_URL}/api/userChats` , 
            {credentials:"include"
            }).then((res) => res.json(),
          ),
      })

 return (
    <div className="chatList">
        <span className="title">DASHBOARD</span>
        <Link to="/dashboard">Create new Chat</Link>
        <Link to="/">Explor Chaty V.0</Link>
        <Link to="/">Contact</Link>
        <hr />
        <span className="title">RECENT CHATS</span>
        <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
        <hr />
        <div className="upgrade">
            <img src="/logo.png" alt="" />
            <div className="text">
                <span>Upgrade to Chaty V.1 ( PRO ) </span>
                <span>Get unlimited access to all features</span>
            </div>
        </div>
    </div>
 )
}

export default ChatList;