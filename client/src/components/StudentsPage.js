import React,{useState,useEffect} from 'react'
import {
    Link,
    useParams,
    useHistory
  } from "react-router-dom";
import axios from 'axios'
import {useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import './StudentsPage.css'
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import DelModal from '@mui/material/Modal';
function StudentsPage() {
    const[student,setStudent]=useState([])
    const[marks,setMarks]=useState([])
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    let{id}=useParams()
    const [update, setUpdate] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [pointsModal, setPointsModal] = useState(false);
    const [showPointsModal, setShowPointsModal] = useState(false);
    const[username,setUsername] = useState('')
    const [open, setOpen] = useState(false);
    const[email,setEmail] = useState('')
    const[birthdate,setBirthdate] = useState('')
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const[options,setOptions] = useState('')
    const[activityPoint,setActivityPoint] = useState(0)
    const[quizPoint,setQuizPoint] = useState(0)
    const[midtermPoint,setMidtermPoint] = useState(0)
    const[finalPoint,setFinalPoint] = useState(0)
    const[total,setTotal] = useState(0)

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
  
      const pointsModalOpen = () => {
        setPointsModal(true);
      };
      const pointsModalClose = () => {
        setPointsModal(false);
      };
      const showPointsModalOpen = () => {
        setShowPointsModal(true);
      };
      const showPointsModalClose = () => {
        setShowPointsModal(false);
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
       axios.get(`http://localhost:3001/student/${id}`, )
           .then((res) => {
               if (flag) {
                setStudent(res.data);
               }
           })
 
      
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
    setTimeout(()=>{
      window.location.reload()

  },1200) 
  }
  console.log(student)
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
  let history = useHistory()
  const delUser = async () =>{
    setTimeout(()=>{
      window.location.reload()

  },1000) 

    history.push("/staff")
  await axios.delete(`http://localhost:3001/deleteUser/${student._id}`)
  }


  const handlePoints = async()=>{
    setTotal(parseInt(activityPoint)+parseInt(quizPoint)+parseInt(midtermPoint)+parseInt(finalPoint))
    setTimeout(()=>{
      window.location.reload()
  
  },1000) 
  await axios.post(`http://localhost:3001/studentMarks`,{
    userID:student?._id,
    subjectName:options,
    activity:activityPoint,
    quiz:quizPoint,
    midterm:midtermPoint,
    final:finalPoint,
    totalMark:total,
  })

  }
  const givePoints = (
    <div className="pointsModal">
      <div className="pointsModal__title">
        <h1>Student rate</h1>
      </div>
      <div className="pointsModal__options__cont">
        <div className="pointsModal__box">
          <h3>Choose a subject</h3>
          <select onChange={(e)=>{setOptions(e.target.value)}}  className="pointsModal__select">
            <option value="">None</option>
          {student?.subjects?.map((item)=>{
             return(
              <option key={item._id} value={item.subject}>{item.subject}</option>
              )
            })}
          </select>
        </div>
            <div className="pointsModal__box">
              <h3>Activity</h3>
              <input onChange={(e)=>{setActivityPoint(e.target.value)}} value={activityPoint}  type="number"  />
            </div>
            <div className="pointsModal__box">
              <h3>Quiz</h3>
              <input onChange={(e)=>{setQuizPoint(e.target.value)}} value={quizPoint}  type="number" />
            </div>
            <div className="pointsModal__box">
              <h3>Midterm</h3>
              <input onChange={(e)=>{setMidtermPoint(e.target.value)}} value={midtermPoint}  type="number" />
            </div>
            <div className="pointsModal__box">
              <h3>Final</h3>
              <input onChange={(e)=>{setFinalPoint(e.target.value)}} value={finalPoint}  type="number" />
            </div>
      </div>
      <div className="pointsModal__submit">
        <button onClick={handlePoints}>Save</button>
      </div>
    </div>
  )

  const delModal = (
      <div className="deleteModal">
          <h2>Delete {student?.username}'s account?</h2>
        <div className="deleteModal__main">
          <button  onClick={delUser} className='delModal__yes'>Yes</button>
          <button onClick={delModalClose} className='delModal__no'>No</button>
          </div>
        </div>
    )
    const marksModal = (
      <div className="showPointsModal">
        <div className="showPointsModal__cont">
        {student?.marks?.map((item)=>{
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
        <div className='studentsPage'>
            <div className="studentsPage__profile">
           
                <Avatar style={{width:'200px',height:'200px',border:"2px solid rgb(61, 61, 214)"}} src={student?.pic} />
                    <div className="studentsPage__info">
                        <h1>{student?.username}</h1>
                        <h2>{student?.email}</h2>
                        <h3>{student?.role}</h3>
                        <div className="studentPage__AdminMode">
                          <button onClick={handleOpen} >Edit {student?.username}'s Profile</button>
                          <button onClick={delModalOpen} ><DeleteIcon style={{color:'white'}} /> Delete Student</button>
                          <button onClick={pointsModalOpen} >Give points to {student?.username}</button>
                          <button onClick={showPointsModalOpen} >Show {student?.username}'s points</button>
                          
                        </div>
                            
                    </div>
            </div>
          
            <div className="studentsPage__subjects">
            {student?.subjects?.map((item)=>{
             return(
              <div className='students__subjects' key={item._id}>
                <h4 >{item.subject}</h4>
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
        <Modal
                open={pointsModal}
                onClose={pointsModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {givePoints}
            </Modal>

            <Modal
                open={showPointsModal}
                onClose={showPointsModalClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
             >
                {marksModal}
            </Modal>

        </div>
    )
}

export default StudentsPage
