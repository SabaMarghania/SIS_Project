import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import './Register.css'
import {
    Link,
    useHistory
  } from "react-router-dom";


function Register() {

    //reg
    const [role, setRole] = useState("");
    const [birth, setBirth] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      );
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory()
    const userRegister = useSelector((state) => state.userRegister);
    const { error, userInfo } = userRegister;
    //modal

//

  
const postDetails = (pics) => {
  
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png"|| pics.type === "image/jpg") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "xtxk3b23");
      data.append("cloud_name", "dgnirmthd");
      fetch("https://api.cloudinary.com/v1_1/dgnirmthd/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

            useEffect(() => {
                if (userInfo) {
                    history.push("/home");
                }
            }, [history , userInfo]);

            const submitHandler = (e) => {
                e.preventDefault();

                if (password !== confirmpassword) {
                    setMessage("Passwords do not match");
                } else dispatch(register(role,username,email, password, pic, birth));
            };
     console.log(role)

    return (
        <div className='register'>
             
            <div className="login__modal_body">
           
            <div className="login__modal_body_title">
                <h2>Create your account</h2>
            </div>
            <div className="login__modal_body_cont">
                <input name='username'  onChange={(e) => setUsername(e.target.value)} type="text" placeholder='username' />
                <input name='email'  onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email' />
                <div className="register__type">
                <select onChange={(e) => setRole(e.target.value)}  className='box'>
                  <option value="">None</option>
                  <option value="Student">Student</option>
                  <option value="Lecturer">Lecturer</option>
                </select>
                </div>
                <input name='password' onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
                <input name='confirmPassword'onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' />
                <input type="file" onChange={(e) => postDetails(e.target.files[0])}   />
                   
                 
                <input onChange={(e)=>setBirth(e.target.value)}  type="date"  />
            </div>
            <div className="login__modal_button">
                <button onClick={submitHandler} type='submit'>Sign up</button>
            </div>
            <div className="register__login">
                <p>Already have an account? <Link to='/login'>Sign in</Link></p>
            </div>
        </div>
        </div>
    )
}

export default Register
