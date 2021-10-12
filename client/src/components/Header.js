import React,{useState,useEffect} from 'react'
import './Header.css'
import Avatar from '@material-ui/core/Avatar';
import logo from '../images/logo.jpg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
  } from "react-router-dom";
  import {logout} from '../actions/userAction'
  import { useDispatch, useSelector } from "react-redux";
  import axios from 'axios'
function Header() {
    const[student,setStudent]=useState([])

    const history = useHistory()
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    let dispatch = useDispatch()
    const logoutHandler = () => {
      dispatch(logout());
    };


    useEffect(()=>{
        let  flag = true
        axios.get(`http://localhost:3001/student/${userInfo?._id}`, )
            .then((res) => {
                if (flag) {
                 setStudent(res.data);
                }
            })
       
        if(!userInfo){
            history.push('/')
        }

        return () => flag = false
    },[history,userInfo])
    return (
        <div className='header'>
            <div className="header__left">
                <div className="header__logo">
                    <img height='80px' width='100px' src={logo}/>
                </div>
                <div className="header__links_cont">
                <Link to='/home' style={{textDecoration:'none'}} >
                    <div className="header__links">
                        <h3>Home</h3>
                    </div>
                    </Link>

                    <Link to='/allSubject' style={{textDecoration:'none'}} >
                        <div className="header__links">
                            <h3>All Subjects</h3>
                        </div>
                    </Link>
                    <Link to='/subReg' style={{textDecoration:'none'}} >
                        <div className="header__links">
                            <h3>Academic Registration</h3>
                        </div>
                    </Link>
                    <Link to='/Staff' style={{textDecoration:'none'}} >
                        <div className="header__links">
                            <h3>Staff Room</h3>
                        </div>
                    </Link>
                </div>
            </div>
          
            <div className="header__profile">
                <button onClick={logoutHandler} type='submit'>Logout</button>
                <Avatar src={student?.pic} />
                <div className="header__profile__info">
                    <p>{student?.username}</p>
                </div>
            </div>
        </div>
    )
}

export default Header
