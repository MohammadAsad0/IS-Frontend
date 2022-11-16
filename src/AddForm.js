import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";


function AddForm({setLoading, setSuccess, state }){

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [filePassword, setFilePassword] = useState("")

    const [titleValid, setTitleValid] = useState(true)
    const [textValid, setTextValid] = useState(true)
    const [filePasswordValid, setFilePasswordValid] = useState(true)
    const [error, setError] = useState(false)
    const [cookie, setCookie] = useCookies((['user']))
    const [isEditMode, setIsEditMode] = useState(false);



    useEffect(() => {
        if(state) {
            setIsEditMode(true);
            setText(state.file.encryptedText);
            setTitle(state.file.title);
        }
    }, [])

    useEffect(() => {
        validateForm();
    },[title, text, filePassword])

    const validateForm = () => {
        if(title) setTitleValid(title.length > 5);
        else setTitleValid(false);
        if(text) setTextValid(text.length > 20);
        else setTextValid(false);
        if(filePassword) setFilePasswordValid(filePassword.length > 5)
        else setFilePasswordValid(false);
    }

    const submitForm = () => {
        if(!titleValid || !textValid || !filePasswordValid){
            setError(true);
            return;
        }
        setError(false)

        const route = "https://isvault.azurewebsites.net/files"
        const file = {
            title: title,
            text: text,
            password: filePassword,
        }

        const auth = cookie["user"].username + ' ' + cookie["user"].token
        setLoading(true);

        fetch(route, {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(file)
        }).then((resp) => {
            if (resp.status === 201) return Promise.resolve(resp.json());
            else return Promise.reject("error has occured. " + resp.statusText);
        }).then((json) => {
            setSuccess(true);
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        }).finally(() => {
        });
    } 
    
    const updateForm = () => {
        if(!titleValid || !textValid || !filePasswordValid){
            setError(true);
            return;
        }
        setError(false)

        const route = `https://isvault.azurewebsites.net/files/${state.file._id}`
        const file = {
            title: title,
            text: text,
            password: filePassword,
        }

        const auth = cookie["user"].username + ' ' + cookie["user"].token
        setLoading(true);

        fetch(route, {
            method: 'PUT',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(file)
        }).then((resp) => {
            if (resp.status === 201) return Promise.resolve(resp.json());
            else return Promise.reject("error has occured. " + resp.statusText);
        }).then((json) => {
            setSuccess(true);
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        }).finally(() => {
        });
    }

  return (
      <form className="frm" autoComplete="off">
        <div className="user">
          {cookie["user"] && <div className="username">User: {cookie["user"].username}</div>}
        </div>
        <div className='addRow'>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className='addRow'>
            <label htmlFor="password">file password</label>
            <input type="text" id="password" name="password" 
                value={filePassword}
                onChange={(e) => setFilePassword(e.target.value)}
            />
        </div>

        <div  className='addRow'>
            <label htmlFor="text">Text:</label>
            <textarea type="text" id="text" name="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>
        
        {!isEditMode && <input className='submit' type="button" value="Submit" onClick={submitForm}/>}
        {isEditMode && <input className='submit' type="button" value="Save" onClick={updateForm}/>}
        {error && <p className='formError'>title must be {">"} 5 and text must be {">"}
        20 and password must be {">"} 5</p>}
      </form>
  );
}

export default AddForm;
