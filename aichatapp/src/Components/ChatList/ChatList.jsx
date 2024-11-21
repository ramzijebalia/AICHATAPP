import { Link } from "react-router-dom";
import "./ChatList.css";

const ChatList = () => {
 return (
    <div className="chatList">
        <span className="title">DASHBOARD</span>
        <Link to="/dashboard">Create new Chat</Link>
        <Link to="/">Explor Chaty V.0</Link>
        <Link to="/">Contact</Link>
        <hr />
        <span className="title">RECENT CHATS</span>
        <div className="list"> 
            <Link to="/">My chat Title 1</Link>
            <Link to="/">My chat Title 2</Link>
            <Link to="/">My chat Title 3</Link>
            <Link to="/">My chat Title 4</Link>
            <Link to="/">My chat Title 5</Link>
            <Link to="/">My chat Title 6</Link>
            <Link to="/">My chat Title 7</Link>
            <Link to="/">My chat Title 2</Link>
            <Link to="/">My chat Title 3</Link>
            <Link to="/">My chat Title 4</Link>
            <Link to="/">My chat Title 5</Link>
            <Link to="/">My chat Title 6</Link>
            <Link to="/">My chat Title 7</Link>
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