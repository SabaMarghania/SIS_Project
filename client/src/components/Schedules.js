import React,{useState,useEffect} from 'react'
import "./Schedules.css"
import {useSelector} from 'react-redux'
import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Timetable() {
    const[student,setStudent]=useState([])
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
    
      let  flag = true
       axios.get(`http://localhost:3001/student/${userInfo?._id}`, )
           .then((res) => {
               if (flag) {
                setStudent(res.data);
               }
           })
       
      
       return () => flag = false
   }, [])
    return (
        <div className='timetable'>
            <div className="timetable__title">
                <h1>Schedules</h1>
            </div>
               {student?.subjects?.map((item)=>{
                return(
             
            <div key={item._id}>
    <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'#fff'}} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{item.subject}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="text">
            {item.schedule}
          </Typography>
         
        </AccordionDetails>
      </Accordion>
            </div>
          

                )
            })}
    
        </div>
    )
}

export default Timetable
