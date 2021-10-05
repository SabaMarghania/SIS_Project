import React,{useState,useEffect} from 'react'
import './StaffRoom.css'
import axios from 'axios'

function StaffRoom() {

    const[subject,setSubjects]=useState([])


    useEffect(() => {
    
      let  flag = true
       axios.get("http://localhost:3001/subjects", )
           .then((res) => {
               if (flag) {
                setSubjects(res.data);
               }
           })

      
       return () => flag = false
   }, [])
    return (
        <div className='staffroom'>

        
        </div>
    )
}

export default StaffRoom
