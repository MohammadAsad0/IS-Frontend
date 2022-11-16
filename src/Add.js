import { useEffect, useState } from 'react';
import NavBar from './Nav';
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import AddForm from './AddForm';


function Add() {

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies((['user']))
  const { state } = useLocation();


  useEffect(() => {
    if(!cookie["user"]){
        navigate('/signup')
    }
  }, [])

  useEffect(() => {
    if(success){
        navigate('/user');
    }
  }, [success])


  return (
    <div className="App">
      {!loading && 
      <NavBar />}

      {!loading &&
        <AddForm 
            setLoading={setLoading}
            setSuccess={setSuccess}
            state={state}
        />
      }

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Add;
