import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Home.css'
import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
function Home() {
    const[subject,setSubjects]=useState([])
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    useEffect(() => {
    
      let  flag = true
       axios.get(`http://localhost:3001/student/${userInfo?._id}`, )
           .then((res) => {
               if (flag) {
                setSubjects(res.data);
               }
           })
       
      
       return () => flag = false
   }, [])
    return (
        <div className='home'>
       
                <div className="home__top">
                    <h2>Learning Course</h2>
       
            </div>
            {subject?.subjects?.map((item)=>{
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
    )
}

export default Home
