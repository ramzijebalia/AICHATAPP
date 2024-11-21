import './SignIn.css';
import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
    return (
      <div className="SignIn">
        <SignIn path="/sign-in" signUpUrl='/sign-up' forceRedirectUrl="/dashboard"/>
      </div>
    );
  }
  
  export default SignInPage;
  