import React,{useState,useEffect} from 'react'
import {useSelector } from "react-redux";
import './Home.css'
import axios from 'axios'
import Modal from '@material-ui/core/Modal';

function Home() {
    const[Student,setStudent]=useState([])
    const [pointsModal, setPointsModal] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const pointsModalOpen = () => {
      setPointsModal(true);
    };
    const pointsModalClose = () => {
      setPointsModal(false);
    };

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

   const marksModal = (
    <div className="showPointsModal">
      <div className="showPointsModal__cont">
      {Student?.marks?.map((item)=>{
           return(
          <div className='marks' key={item._id}>
 
            <h3> {item.subjectName}</h3>
            <p>Activity: {item.activity}</p>
            <p>Quiz: {item.quiz}</p>
            <p>Midterm: {item.midterm}</p>
            <p>Final: {item.final}</p>
          </div>
        

              )
          })}
        </div>
      </div>
  )



    return (
        <div className='home'>
        {console.log(Student)}
       
                <div className="home__top">
                    <h2>Learning Course</h2>
                    <button onClick={pointsModalOpen} >Show your marks</button>
       
            </div>
            {Student.subjects?.map((item)=>{
             return(
              <div className='students__subjects' key={item._id}>
                <h4 >{item.subject}</h4>
             </div>
                )
            })}
       <Modal
                open={pointsModal}
                onClose={pointsModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {marksModal}
            </Modal>
        </div>
    )
}

export default Home
