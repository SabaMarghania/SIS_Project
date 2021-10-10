import React,{useState,useEffect} from 'react'
import './Profile.css'
import {useSelector} from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios'
import Modal from '@material-ui/core/Modal';
function Profile() {
        const[student,setStudent]=useState([])
        const userLogin = useSelector((state) => state.userLogin);
        const { userInfo } = userLogin;
        const [open, setOpen] = useState(false);
        const [load, setLoad] = useState(false);
        const [update, setUpdate] = useState(false);
        const[username,setUsername] = useState('')
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
           axios.get(`http://localhost:3001/student/${userInfo?._id}`, )
               .then((res) => {
                   if (flag) {
                    setStudent(res.data);
                   }
               })
           
          
           return () => flag = false
       }, [])
      //  console.log(userInfo?._id)
       const updateProfile = async () =>{
        setUpdate(true)
        await axios.put(`http://localhost:3001/editProfile/${userInfo?._id}`,{
           username:username,
           email:email,
           birth:birthdate,
         })
         setTimeout(()=>{
          window.location.reload()
    
      },1700)
       }
       const updatePic =async ()  =>{
        const formData = new FormData();
        formData.append("file", pic)
        await axios.put(`http://localhost:3001/updatePic/${userInfo?._id}`,formData)
        console.log(pic)
        setTimeout(()=>{
          window.location.reload()
    
      },1200) 
      }
      console.log(birthdate)
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
        return (
            <div className='profile'>
                <div className="profile__profile">
                    <Avatar style={{width:'200px',height:'200px',border:"2px solid rgb(61, 61, 214)"}} src={student?.pic} />
                        <div className="profile__info">
                            <h1>{student?.username}</h1>
                            <h2>{student?.email}</h2>
                            <h3>{student?.role}</h3>
                            <button onClick={handleOpen} >Edit Profile</button>
                        </div>
                </div>
                <div className="profile__subjects">
    
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
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {body}
            </Modal>
            </div>
    )
}

export default Profile
