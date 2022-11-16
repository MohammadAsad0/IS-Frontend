import { useState } from "react";
import { useCookies } from "react-cookie";

function LoginForm({setLoading, formError, setFormError, setSuccess}) {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const [cookie, setCookie] = useCookies((['user']))

    
    

    const submitForm = ( ) => {

    const route = "https://isvault.azurewebsites.net/users/signin"
    const user = {
      password: password,
      email: email,
    }

    setLoading(true);

    fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then((resp) => {
        if (resp.status === 200) return Promise.resolve(resp.json());
        else return Promise.reject("error has occured. " + resp.statusText);
    }).then((json) => {
        let expires = new Date();
        expires.setTime(expires.getTime() + 600000)
        setCookie('user', {username:json.user.username, token:json.token}, { path: '/',  expires})
        setSuccess(true);
    }).catch((err) => {
        console.log(err)
        setFormError(true)
        setLoading(false);
    }).finally(() => {
    });

  }

  return (
    <form className="frm" autoComplete="off">

        <div className='inputRow'>
            <label htmlFor="email">EMAIL:</label>
            <input type="email" id="email" name="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className='inputRow'>
            <label htmlFor="password">QR PASSWORD:</label>
            <input type="password" id="password" name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <input className='submit' type="button" value="Submit" onClick={submitForm}/>
        {formError && <p className='formError'>no such user</p>}
    </form>
  );
}

export default LoginForm;
