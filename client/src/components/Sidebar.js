import React from 'react'
import './Sidebar.css'
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar__top__title">
                <h2>C L A S S</h2>
            </div>

            <div className="sidebar__nav">
                <p>NAVIGATION</p>
                <div className="sidebar__nav__container">

                <div className="sidebar__nav__box">
                    <DateRangeOutlinedIcon style={{color:'rgb(131, 131, 131)',fontSize:'28px'}} />
                    <h3>Timetable</h3>
                </div>

                <div className="sidebar__nav__box">
                    <MenuBookOutlinedIcon style={{color:'rgb(131, 131, 131)',fontSize:'28px'}} />
                    <h3>Your Subjects</h3>
                </div>

                <div className="sidebar__nav__box">
                    <AssignmentIndOutlinedIcon style={{color:'rgb(131, 131, 131)',fontSize:'28px'}} />
                    <h3>Profile</h3>
                </div>
                </div>
            </div>

         
        </div>
    )
}

export default Sidebar
