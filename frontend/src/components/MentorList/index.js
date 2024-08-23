import React, { useState, useEffect } from 'react';
import './index.css'

const MentorList = () => {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        getMentors();
    }, [])

    const getMentors = async () => {
        try {
            const res = await fetch('https://schedular1x1.onrender.com/api/mentors');
            const data = await res.json();
            setMentors(data);
            console.log(data);
        }
        catch {
            console.log("error");
        }
    }
    // {mentor.areas_interest.join(', ')}
    return (
        <div>
            <ul className='mentor-card-container'>
                {mentors.map(mentor => (
                    <li key={mentor.id} className='mentor-card'>
                        <h3 className='name'>{mentor.name}</h3>
                        <p className='id'>MentorId : {mentor.id}</p>
                        <div className=''>
                            <p>Expertise</p>
                            <ul>
                                {mentor.areas_interest && mentor.areas_interest.length > 0 ? (
                                    mentor.areas_interest.map((each, index) => (
                                        <li key={index} className=''>
                                            {each}
                                        </li>
                                    ))
                                ) : (
                                    <li>No areas of interest available</li>
                                )}
                            </ul>

                        </div>
                        <div>
                            <p>Availability</p>
                            <ul>
                                <li>{mentor.availability[0].start}</li>
                                <li>{mentor.availability[0].end}</li>
                            </ul>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MentorList;
