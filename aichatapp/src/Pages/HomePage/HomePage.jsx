import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
      <div className="HomePage">
        <Link to="/dashboard">Dashboard</Link>
      </div>
    );
  }
  
  export default HomePage;
  