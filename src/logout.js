import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";


function LogOut() {

  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies((['user']))


  useEffect(() => {
    let expires = new Date()
    expires.setTime(expires.getTime() - 1000)
    setCookie('user', null, { path: '/',  expires})
    navigate('/')
  }, [])


  return (
    <div className="App">
      <p>hello</p>
    </div>
  );
}

export default LogOut;
