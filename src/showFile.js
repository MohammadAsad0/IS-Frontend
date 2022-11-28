import NavBar from './Nav';
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { makeQRCode } from './qrcode';


function ShowFile() {

  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies((['user']))
  const { state } = useLocation();
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false);

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

  const deleteForm = () => {
        const route = `https://isvault.azurewebsites.net/files/${state.file._id}`

        const auth = cookie["user"].username + ' ' + cookie["user"].token
        setLoading(true);

        fetch(route, {
            method: 'DELETE',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
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

  const editForm = () => {
    navigate('/add', { state: { file: state.file } })
  }

  const downloadQRCode = async (dataString) => {
    makeQRCode(dataString)
  }


  return (
    <div className="App">
        {!loading && <NavBar />}

        {!loading &&
        <div className='filedata'>
            <div className="user">
            {cookie["user"] && <div className="username">User: {cookie["user"].username}</div>}
            <input className='submit' type="button" value="Delete" onClick={deleteForm}/>
            <input className='submit' type="button" value="Edit" onClick={editForm}/>
            <input className={"submit"} type={"button"} value="download QR"
             onClick={() => downloadQRCode(`https://isvault.azurewebsites.net/qr/${state.file._id}`)}
            />
            </div>
            <div className='fileFull'>
                <div className='filetitle'>
                    <h2>Title: {state.file.title}</h2>
                </div>
                    <div className='filetext'>
                        <h4>Decrypted Text: </h4>
                        <br />
                        <div>{state.file.encryptedText}</div>
                    </div>
            </div>
        </div>
        }  
        {loading && <p>loading...</p>} 
    </div>
  );
}

export default ShowFile;
