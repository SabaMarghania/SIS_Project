import React,{useState,useEffect} from 'react'
import './StaffRoom.css'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import {useSelector} from 'react-redux'
import {
    Link,
    useParams
  } from "react-router-dom";

function StaffRoom() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin
    const[students,setStudents]=useState([])
    const[secret,setSecret] = useState('')
    const[message,setMessage] = useState('')
    
    useEffect(() => {
    
      let  flag = true
       axios.get("http://localhost:3001/getStudents", )
           .then((res) => {
               if (flag) {
                setStudents(res.data);
               }
           })

      
       return () => flag = false
   }, [])
   console.log(students)
    return (
        <>
        {
            userInfo?.role === "Lecturer" ? (
            <div className='staffroom'>
               <div className="staffroom__title">
                    <h1>Students</h1>
                </div>
                <div className="staffroom__container">
              
            {students?.map((student)=>{
                return (
                    <div key={student._id} className='staffroom__cont'>
                        <Link style={{textDecoration:'none'}} to={`/student/${student._id}`}>
                        <div className="staffroom__students__box">
                            <Avatar style={{width:'50px',height:'50px'}} src={student?.pic} />
                                <div className="staffroom__students__info">
                                    <h3>{student?.username}</h3>
                                    <h4>{student?.email}</h4>
                                </div>
                        </div>
                        </Link>
                        </div>
                )
            })}
        
        </div>
        </div>
        )
        :
        (
        <div className='auth'>
            <h1>You don't have permissions to see this page!</h1>

        </div>
        )}
    
        </>
    )
}

export default StaffRoom
