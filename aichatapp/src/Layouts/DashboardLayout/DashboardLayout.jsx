
import { Outlet, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';
import {useAuth} from "@clerk/clerk-react"
import { useEffect } from 'react';

function DashboardLayout() {

  const { userId , isLoaded} = useAuth();

  const navigate = useNavigate()
  
  useEffect(() => {
    if (isLoaded && !userId) { // if the loading process is completed and we have no user id 
      navigate('/sign-in')
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading ... "

  

  return (
    <div className="DashboardLayout">
      <div className="menu">Menu</div>
      <div className="content">
          <Outlet />
      </div>  
    </div>
  );
}
  
export default DashboardLayout;
  