import { Link, Outlet } from 'react-router-dom';
import './PageLayout.css';
import { ClerkProvider , SignedIn,  UserButton } from "@clerk/clerk-react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const PUBLISHABLE_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// Create a client
const queryClient = new QueryClient()

function PageLayout() {
    return (
      <ClerkProvider publishableKey={process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
        <QueryClientProvider client={queryClient}>
          <div className="PageLayout">
            <header> 
                <Link className="logo" to="/">
                    <img src="/logo.png" alt=""  />
                    <span> Chaty V.0</span>
                </Link>
                <div className="user">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
          </div>
        </QueryClientProvider>
      </ClerkProvider>
    );
  }
  
  export default PageLayout;
  