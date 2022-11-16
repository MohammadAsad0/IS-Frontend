import { useEffect, useState } from 'react';
import NavBar from './Nav';
import LoginForm from './LoignForm';
import { useNavigate } from "react-router-dom";


function Login({}) {

  const [loading, setLoading] = useState(false);
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
        <LoginForm 
          setLoading={setLoading}
          formError={formError}
          setFormError={setFormError}
          setSuccess={setSuccess}
        />}
        {loading && <p>Loading...</p>}

    </div>
  );
}

export default Login;
