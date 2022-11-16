import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./Nav";


function User() {

  const [cookie, setCookie] = useCookies((['user']))
  const [username, setUsername] = useState("no one");
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(files) {
      setLoading(false)
    }
  },[files])

  useEffect(() => {
    if(!cookie["user"]){
      navigate("/")
      return
    }
    setUsername(cookie["user"].username)
    setLoading(true);
    const auth = cookie["user"].username + ' ' + cookie["user"].token

    const route="https://isvault.azurewebsites.net/files"
    fetch(route, {
        method: 'GET',
        headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
        },
    }).then((resp) => {
        if (resp.status === 201) return Promise.resolve(resp.json());
        else return Promise.reject("error has occured. " + resp.statusText);
    }).then((json) => {
      setFiles(json)
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
    });
  }, [])

  const addPage = () => {
    navigate("/add")
  }

  const viewFile = (pos) => {
    navigate('/showfile', { state: { file: files[pos] } })
  }

  return (
      <div className="App">
        {!loading &&
        <NavBar />}
        
        {!loading &&  
        <div className="userHomePage"> 
          <div className="user">
            <div className="username">User: {username}</div>
            <input className='submit' type="button" value="Add" onClick={addPage}/>
          </div>
            {files.map((file, pos) => {
              return (
              <div key={file._id} className="file" onClick={() => viewFile(pos)}>
                <div className="title">
                  <h4>Title: {file.title}</h4>
                </div>
                <div className="text">
                  <p>{file.encryptedText.slice(0,5)}...</p>
                </div>
              </div>
              )
            })}
        </div>
        }
        {loading && <p>Loading...</p>}
      </div>
  );
}

export default User;
