import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";


function SignUpForm({setLoading, formError, setFormError, setSuccess }){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameValid, setUsernameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [rePasswordValid, setRePasswordValid] = useState(false);
    const [cookie, setCookie] = useCookies((['user']))



    const validateForm = () => {
        setEmailValid(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
        if(username) setUsernameValid(username.length > 5);
        else setUsernameValid(false);
        if(password) setPasswordValid(password.length > 5);
        else setPasswordValid(false);
        if(repassword) setRePasswordValid(password === repassword);
        else setRePasswordValid(false);
    }

    useEffect(() => {
        validateForm();
    }, [email, password, username, repassword])

    const submitForm = () => {
        if(!emailValid || !passwordValid || !usernameValid || !rePasswordValid) {
            console.log('data invalid');
            return;
        }
        const route = "https://isvault.azurewebsites.net/users/signup"
        const user = {
            username: username,
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
            if (resp.status === 201) return Promise.resolve(resp.json());
            else return Promise.reject("error has occured. " + resp.statusText);
        }).then((json) => {
            let expires = new Date();
            expires.setTime(expires.getTime() + 600000)
            setCookie('user', {username:json.user.username, token:json.token}, { path: '/',  expires})
            setSuccess(true);
        }).catch((err) => {
            console.log(err)
            setFormError(true)
            setLoading(false)
        }).finally(() => {
        });
    }   

  return (
      <form className="frm" autoComplete="off">
        <div className='row'>
          <div className='inputRow'>
            <label htmlFor="username">USERNAME:</label>
            <input type="text" id="username" name="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='errorMsg'>
            {!usernameValid && username && <p className='wrong'>username length must at least be 5</p>}
            {usernameValid && <p className='right'>correct</p>}
          </div>
        </div>

        <div className='row'>
          <div  className='inputRow'>
          <label htmlFor="email">EMAIL:</label>
          <input type="email" id="email" name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>

          <div className='errorMsg'>
            {!emailValid && email && <p className='wrong'>incorrect format</p>}
            {emailValid && <p className='right'>correct</p>}
          </div>
        </div> 

        <div className='row'>
          <div className='inputRow'>
            <label htmlFor="password">PASSWORD:</label>
            <input type="password" id="password" name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='errorMsg'>
              {!passwordValid && password && <p className='wrong'>password length must be at least 5</p>}
              {passwordValid && <p className='right'>correct</p>}
          </div>
        </div>

        <div className='row'>
          <div className='inputRow'>
            <label htmlFor="repassword">CONFIRM PASSWORD:</label>
            <input type="password" id="repassword" name="repassword" 
              value={repassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>

          <div className='errorMsg'>
              {!rePasswordValid && repassword && <p className='wrong'>passwords don't match</p>}
              {rePasswordValid &&  <p className='right'>correct</p>}
          </div>
        </div>

        <input className='submit' type="button" value="Submit" onClick={submitForm}/>
        {formError && <p className='formError'>user with that username already exists</p>}
      </form>
  );
}

export default SignUpForm;
