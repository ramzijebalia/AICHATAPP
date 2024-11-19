import './SignUp.css';
import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
    return (
      <div className="SignUp">
        <SignUp path="/sign-up" />
      </div>
    );
  }
  
  export default SignUpPage;
  