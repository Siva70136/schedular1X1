import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './index.css'

const ScheduleForm = () => {
    const [studentId, setStudentId] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState(30);
    const navigate = useNavigate();
    const [preferredMentorId, setPreferredMentorId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const scheduleData = {
            student_id: studentId,
            area_of_interest: areaOfInterest,
            start_time: startTime,
            duration,
            preferred_mentor_id: preferredMentorId || null
        };

        //console.log(scheduleData);
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify(scheduleData)
        }
        try {
            const res = await fetch('https://schedular1x1.onrender.com/api/book', options);
            const data = await res.json();
            setStudentId('');
            setAreaOfInterest('');
            setStartTime('');
            setDuration(30);
            setPreferredMentorId('');
            if (res.ok) {
                await new Promise((resolve) => {
                    toast.success(`${data.msg}`, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        onClose: resolve,
                    });
                });
                navigate('/payment');
            }

            else {
                toast.error(`${data.msg}`, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }



        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='slot-form'>
            <div className='row'>
                <label className='label'>Student ID:</label><br />
                <input type="text" className='input-field' value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
            </div>
            <div className='row'>
                <label className='label'>Area of Interest:</label>
                <input className='input-field' type="text" value={areaOfInterest} onChange={(e) => setAreaOfInterest(e.target.value)} required />
            </div>
            <div className='row'>
                <label className='label'>Start Time:</label>
                <input className='input-field' type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div className='row'>
                <label className='label'>Duration:</label>
                <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className='input-field'>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                </select>
            </div >
            <div className='row'>
                <label className='label'>Preferred Mentor ID :</label>
                <input className='input-field' type="text" value={preferredMentorId} onChange={(e) => setPreferredMentorId(e.target.value)} />
            </div>
            <button type="submit" className='button home-button'>Book Session</button>
            <ToastContainer />
        </form>
    );
};

export default ScheduleForm;
