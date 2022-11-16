import { useEffect, useState } from 'react';
import NavBar from './Nav';
import SignUpForm from './SignUpForm';
import { useNavigate } from "react-router-dom";


function SignUp() {

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(success){
        navigate('/user')
    }
  }, [success])


  return (
    <div className="App">
      {!loading && 
      <NavBar />}

      {!loading &&
      <SignUpForm 
        setLoading={setLoading}
        formError={formError}
        setFormError={setFormError}
        setSuccess={setSuccess}
      />}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default SignUp;
