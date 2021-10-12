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
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import DelModal from '@mui/material/Modal';
function StudentsPage() {
    const[student,setStudent]=useState([])
    const[subjects,setSubjects]=useState([])
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    let{id}=useParams()
    const [update, setUpdate] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const[username,setUsername] = useState('')
    const [open, setOpen] = useState(false);
    const[email,setEmail] = useState('')
    const[birthdate,setBirthdate] = useState('')
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const delModalOpen = () => {
        setDeleteModal(true);
      };
      const delModalClose = () => {
        setDeleteModal(false);
      };
  

    // background: dimgray;
      const postDetails = (pics) => {

        if (pics.type === "image/jpeg" || pics.type === "image/png"|| pics.type === "image/jpg") {
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "xtxk3b23");
          data.append("cloud_name", "dgnirmthd");
          fetch("https://api.cloudinary.com/v1_1/dgnirmthd/image/upload", {
            method: "put",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              setPic(data.url.toString());
            })
            .catch((err) => {
              console.log(err);
            });
        } 
      };
    



    useEffect(() => {
      
      let  flag = true
       axios.get(`http://localhost:3001/student/${id}`, )
           .then((res) => {
               if (flag) {
                setStudent(res.data);
               }
           })
          //  axios.get(`http://localhost:3001/subject/${id}`, )
          //  .then((res) => {
          //      if (flag) {
          //       setSubjects(res.data);
          //      }
          //  })
      
       return () => flag = false
   }, [])
   const updateProfile = async () =>{
    setUpdate(true)
    await axios.put(`http://localhost:3001/editStudentsProfile/${id}`,{
       username:username,
       email:email,
       birth:birthdate,
     })
     setTimeout(()=>{
      window.location.reload()

  },1700)
   }
   const updatePic = async ()  =>{
    const formData = new FormData();
    formData.append("file", pic)
    await axios.put(`http://localhost:3001/updateStudentsPic/${id}`,formData)
    console.log(pic)
    setTimeout(()=>{
      window.location.reload()

  },1200) 
  }
   const body = (
    <div className="profile__modal_body">
        <div className="profile__modal__title">
       {update && <h1 style={{color:'rgb(117, 117, 117)'}}>Profile has been updated</h1>}
            <h2>Edit profile</h2>
        </div>
        <div className="profile__modal_avatar">
             <Avatar src={student?.pic} style={{width:'100px',height:'100px'}} />
             <input onChange={(e) => postDetails(e.target.files[0])}   name='file' type="file" />
            <button onClick={updatePic} type='submit' >Save</button>
        </div>
        <div className="profile__modal_body_cont">
            <input onChange={(e)=>{setUsername(e.target.value)}}  type="text" placeholder='Name' />
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
            <input onChange={(e)=>{setBirthdate(e.target.value)}} type="date"  />
        </div>
        <div className="profile__modal__birthdate">
            <p>Birth date</p>
            <h3>{student?.birth}</h3>
        </div>
        <div className="profile__modal_button">
            <button onClick={updateProfile} type='submit' >Save</button>
        </div>
   
    </div>
  );
  const delUser = async () =>{
  //   setTimeout(()=>{
  //     window.location.reload()

  // },1200) 

  await axios.delete(`http://localhost:3001/deleteUser/${student._id}`)
  }

  const delModal = (
      <div className="deleteModal">
          <h2>Delete {student?.username}'s account?</h2>
        <div className="deleteModal__main">
          <button  onClick={delUser} className='delModal__yes'>Yes</button>
          <button onClick={delModalClose} className='delModal__no'>No</button>
          </div>
        </div>
    )
    console.log(id)
    return (
        <div className='studentsPage'>
            <div className="studentsPage__profile">
           
                <Avatar style={{width:'200px',height:'200px',border:"2px solid rgb(61, 61, 214)"}} src={student?.pic} />
                    <div className="studentsPage__info">
                        <h1>{student?.username}</h1>
                        <h2>{student?.email}</h2>
                        <h3>{student?.role}</h3>
                        <div className="studentPage__AdminMode">
                          <button onClick={handleOpen} >Edit {student?.username}'s Profile</button>
                          <button onClick={delModalOpen} ><DeleteIcon style={{color:'white'}} onClick={delModalOpen} /> Delete Student</button>
                          
                        </div>
                            
                    </div>
            </div>
            <div className="studentsPage__subjects">

            {student?.subjects?.map((item)=>{
            //  console.log(item)
             return(
            <div key={item._id}>
    <Accordion className='accordion'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{color:'#fff'}}/> }
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className='subject__info'>{item.subject} </Typography>
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
                 <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {body}
            </Modal>

        <div>
        <DelModal
        open={deleteModal}
        onClose={delModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {delModal}
      </DelModal>
        </div>
        </div>
    )
}

export default StudentsPage
