import { Link, Outlet } from 'react-router-dom';
import './PageLayout.css';
import { ClerkProvider , SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = process.env.REACT_APP_VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function PageLayout() {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
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
      </ClerkProvider>
    );
  }
  
  export default PageLayout;
  