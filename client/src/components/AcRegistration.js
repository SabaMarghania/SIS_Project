import React,{useState,useEffect} from 'react'
import './AcRegistration.css'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
function AcRegistration() {
    // const products = useSelector((state) => state.product.products);

      const[credit,setCredit]=useState(30)
      const[subject,setSubjects]=useState([])
      const[lecturer,setLecturers]=useState('')
      const[load,setLoad]=useState(false)
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

      
           setTimeout(()=>{
             setLoad(false)
           },700)
      
       return () => flag = false
   }, [load])
const itemAdd = async(subjectCredit,subject,lecturers,schedule)=>{
  setLoad(true)
  if(credit <= 4){
    setCredit(0)
  }
  console.log(userInfo?._id)

    console.log(subject,lecturers,subjectCredit,schedule)
    setCredit(credit - subjectCredit)
  
  await axios.post("http://localhost:3001/subject",{
    userId:userInfo._id,
    subject:subject,
    lecturer:lecturers,
    subjectCredit:subjectCredit,
    schedule:schedule
  })

}

// useEffect( [userInfo])
 
return (
        <div className='acregistration'>
             <h3>Note : You can choose maximum 6 subjects </h3>
          <div style={{marginTop:'10px'}} className="acregistration__info">
            <h3>Subjects chosen : {subject?.subjects?.length}</h3>
          </div>
            <table>
    <tbody>
    <tr>
        <th className='title'>Major Courses</th>
  </tr>
  <tr>
    <th>Study Course</th>
    <th>ECTS / Point</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>Computer skills</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=   6 ? "none":'block')}} onClick={()=>itemAdd( 5,"Computer Skills","Maria Anders","Monday, From 10AM to 1PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>Computer Architect</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=   6 ? "none":'block')}} onClick={()=>itemAdd( 5,"Computer Architect","San Paul","Tuesday, From 9AM to 12PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>Python</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=   6 ? "none":'block')}} onClick={()=>itemAdd( 5,"Python","John Anderson","Wednesday, From 1PM to 4PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>HTML and CSS</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=   6 ? "none":'block')}} onClick={()=>itemAdd( 5,"HTML and CSS","Connor Armstrong","Thursday, From 1PM to 4PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>Academic writing</td>
    <td>4.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}} onClick={()=>itemAdd( 4,"Academic writing","Francisco Chang","Friday, From 4PM to 7PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>English language B1.1</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"English language B1.1","Roland Mendel","Saturday, From 4PM to 7PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>English language B1.2</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"English language B1.2","Roland Mendel","Monday, From 2PM 5PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>English language B2.1</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"English language B2.1","Roland Mendel","Tuesday, From 8AM to 11AM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>English language B2.2 </td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"English language B2.2","Roland Mendel","Wednesday, From 4PM to 7PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>English language 5 (Field) </td>
    <td>6.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 6,"English language 5","Roland Mendel","Thursday, From 10AM to 1PM")}>Choose  your subject</span>
     </td>
  </tr>  
  <tr>
    <td>Calculus I</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"Calculus I","George Smith","Friday, From 10AM to 1PM")}>Choose  your subject</span>
     </td>
  </tr>

  <tr>
    <td>Calculus II </td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"Calculus II","George Smith","Friday, From 7PM to 10PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>Linear Algebra  </td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"Linear Algebra ","George Adams","Monday, From 4PM to 7PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <th className='title'>Minor Courses</th>
  </tr>
  <tr>
    <th>Study Course</th>
    <th>ECTS/Point</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>AutoCad</td>
    <td>6.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 6,"AutoCad","Alfreds Futterkiste","Tuesday, From 10AM to 1PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>PhotoShop</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"PhotoShop","Ernst Handel","Tuesday, From 2PM to 5PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>Physics</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,"Physics","Alfreds Futterkiste","Thursday, From 11AM 2PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>.NET Programming</td>
    <td>5.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 5,".NET Programming","Bacchus Winecellars","Friday, From 2PM to 5PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>.NET Programming 2</td>
    <td>4.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 4,".NET Programming 2","Bacchus Winecellars","Friday, From 10AM to 1PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>ArchiCad</td>
    <td>4.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 4,"ArchiCad","Francisco Chang","Saturday, From 1PM to 3PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <th className='title'>Final Project</th>
  </tr>
  <tr>
    <th>Study Course</th>
    <th>ECTS/Point</th>
    <th>Action</th>
  </tr>
  <tr>
    <td>Practice</td>
    <td>10.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 10,"Practice","Francisco Chang,Ernst Handel","Saturday, From 2PM to 5PM")}>Choose  your subject</span>
     </td>
  </tr>
  <tr>
    <td>Bachelor Final Project</td>
    <td>15.0 / -</td>
     <td className="Action">
         <span style={{display: (subject?.subjects?.length >=  6 ? "none":'block')}}  onClick={()=>itemAdd( 15,"Bachelor Final Project","Alfreds Futterkiste,Francisco Chang","Monday, From 1PM to 4PM")}>Choose  your subject</span>
     </td>
  </tr>

    </tbody>

</table>
        </div>
    )
}

export default AcRegistration
