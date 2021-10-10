import React,{useState,useEffect} from 'react'
import {
    Link,
    useParams
  } from "react-router-dom";
import axios from 'axios'
import {useSelector} from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import './StudentsPage.css'
function StudentsPage() {
    const[student,setStudent]=useState([])
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    let{id}=useParams()
    useEffect(() => {
    
      let  flag = true
       axios.get(`http://localhost:3001/student/${id}`, )
           .then((res) => {
               if (flag) {
                setStudent(res.data);
               }
           })
       
      
       return () => flag = false
   }, [])
   
    return (
        <div className='studentsPage'>
            <div className="studentsPage__profile">
                <Avatar style={{width:'180px',height:'180px'}} src={student?.pic} />
                    <div className="studentsPage__info">
                        <h1>{student?.username}</h1>
                        <h2>{student?.email}</h2>
                        <h3>{student?.role}</h3>
                    </div>
            </div>
            <div className="studentsPage__subjects">

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
          <Typography>
            Activity: 20
          </Typography>
          <Typography>
            Quiz: 10
          </Typography>
          <Typography>
            Midterm: 15
          </Typography>
          <Typography>
            FinalExam: 30
          </Typography>
          <Typography style={{color:"#fff"}}>
            Overall: 75
          </Typography>
        </AccordionDetails>
      </Accordion>
            </div>
          

                )
            })}
            </div>
        </div>
    )
}

export default StudentsPage
