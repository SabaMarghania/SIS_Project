import React,{useState,useEffect} from 'react'
import './Login.css'
import {
    Link
  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import img from '../images/logo.jpg'
function LoginPage({history}) {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
  
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin);
    const { error, userInfo } = userLogin;
  
    useEffect(() => {
      if (userInfo) {
        history.push("/home");
      }
    }, [history, userInfo]);
  

    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    };
  
    return (
        <div className='loginpage' >

        <div className='loginpage__cont' >
            <div className='loginpage__top' >
           
            </div>
            <div className="loginpage__text">
                <h1>Log in </h1>
                <div className="loginpage__img">
                  <img src={img} alt="" />
                </div>
            </div>
            <form onSubmit={submitHandler}>
            <div className="loginpage__form">
            
              <input type="text"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='Email ' />

            

              <input type="password"   
              value={password}  
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'/>
             </div>
            <div className="loginpage__button">
                <button type='submit' onClick={submitHandler}>Log in</button>
            </div>
            </form>
            <div className="loginpage__signup">
                    <p>Don't have an account? <Link to='/register' style={{color:'gray'}}>Sign up</Link> </p>
            </div>
            </div>
       
        </div>
    )
}

export default LoginPage
