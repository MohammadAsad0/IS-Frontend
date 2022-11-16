import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


function App() {

  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies((['user']))


  useEffect(() => {
    if(cookie["user"]){
      navigate('/user')
    } else {
      navigate('/signup')
    }
  }, [])


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
