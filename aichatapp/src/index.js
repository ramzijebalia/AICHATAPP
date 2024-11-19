import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './Pages/HomePage/HomePage';
import Dashboard from './Pages/Dashboard/Dashboard';
import ChatPage from './Pages/ChatPage/ChatPage';
import "./index.css";
import { RouterProvider , createBrowserRouter} from 'react-router-dom';
import PageLayout from './Layouts/PageLayout/PageLayout';
import DashboardLayout from './Layouts/DashboardLayout/DashboardLayout';
import SignInPage from './Pages/SignInPage/SignIn';
import SignUpPage from './Pages/SignUpPage/SignUp';


const router = createBrowserRouter([
  {
   element : <PageLayout />, // navbar
   children : [
    { path : '/' , element : <HomePage /> },
    { path : '/sign-in' , element : <SignInPage /> },
    { path : '/sign-up' , element : <SignUpPage /> },
    { element : <DashboardLayout /> , // sidebar
      children : [
        { path : '/dashboard' , element : <Dashboard /> },
        { path : '/dashboard/chats/:id' , element : <ChatPage /> },
      ]
    },
   ]
  }
],
{
  future: {
    v7_relativeSplatPath: true, // Enable future behavior
  },}
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



