const db = require('../config/db');

const findAvailableMentor = async (areaOfInterest, startTime, duration, preferredMentorId = null, callback) => {
    const endTime = new Date(new Date(startTime).getTime() + duration * 60000);
    const query = `SELECT * FROM mentors WHERE JSON_CONTAINS(areas_interest, ?);`;

    try {
        const [mentors] = await db.query(query, [JSON.stringify(areaOfInterest)]);

        // Filter mentors by availability

        let availableMentors = mentors.filter(mentor => {
            //console.log(mentor.availability);
            const availability = typeof mentor.availability === 'string' ? JSON.parse(mentor.availability) : mentor.availability;

            return availability.some(slot => {
                const slotStart = new Date(slot.start);
                const slotEnd = new Date(slot.end);
                return slotStart <= startTime && slotEnd >= endTime;
            });
        });
        

        if (preferredMentorId) {
            availableMentors = availableMentors.filter(mentor => mentor.id == preferredMentorId);
        }

        // Sort mentors by back-to-back schedule preference

        availableMentors.sort((a, b) => {
            const aSchedule = a.schedule || [];
            const bSchedule = b.schedule || [];
            return aSchedule.length - bSchedule.length;
        });

        if (availableMentors.length === 0) {
            return null;
        }

        //console.log(availableMentors[0]); 
        return availableMentors[0];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateMentorAvailability = async (mentorId, startTime, endTime) => {
    const querySelect = `SELECT availability FROM mentors WHERE id = ?`;
    const [rows] = await db.query(querySelect, [mentorId]);
    let availability = rows[0].availability;
    const date = new Date(startTime);

    startTime = date;
    // Filter out the booked time slot

    availability = availability.flatMap(slot => {
        const slotStart = new Date(slot.start);
        const slotEnd = new Date(slot.end);

        if (slotStart <= startTime && slotEnd >= endTime) {
            const newSlots = [];

            if (slotStart < startTime) {
                startTime = startTime.getFullYear() + "-" +
                    String(startTime.getMonth() + 1).padStart(2, '0') + "-" +
                    String(startTime.getDate()).padStart(2, '0') + " " +
                    String(startTime.getHours()).padStart(2, '0') + ":" +
                    String(startTime.getMinutes()).padStart(2, '0') + ":" +
                    String(startTime.getSeconds()).padStart(2, '0');
                newSlots.push({
                    start: slot.start,
                    end: startTime,
                });
            }

            if (slotEnd > endTime) {
                endTime = endTime.getFullYear() + "-" +
                    String(endTime.getMonth() + 1).padStart(2, '0') + "-" +
                    String(endTime.getDate()).padStart(2, '0') + " " +
                    String(endTime.getHours()).padStart(2, '0') + ":" +
                    String(endTime.getMinutes()).padStart(2, '0') + ":" +
                    String(endTime.getSeconds()).padStart(2, '0');

                newSlots.push({
                    start: endTime,
                    end: slot.end,
                });
            }

            return newSlots;
        }

        return slot;
    });
    return availability;
};


exports.createSchedule = async (req, res) => {
    const { student_id, area_of_interest, start_time, duration, preferred_mentor_id } = req.body;
    //console.log(req.body);

    const mentor = await findAvailableMentor(area_of_interest, new Date(start_time), duration, preferred_mentor_id);
    //console.log(mentor);

    if (!mentor) return res.status(404).json({ msg: 'No mentor available for the selected time.' });

    const end_time = new Date(new Date(start_time).getTime() + duration * 60000);

    const isPrime = preferred_mentor_id == null ? false : true;
    const scheduleData = {
        student_id,
        mentor_id: mentor.id,
        start_time,
        end_time,
        duration,
        isPrime,
    };

    //console.log(scheduleData);

    const query = `INSERT INTO schedules (student_id, mentor_id, start_time, end_time, duration, isPrime) 
            VALUES (?, ?, ?, ?, ?, ?); `;

    try {

        const [result] = await db.query(query, [
            scheduleData.student_id,
            scheduleData.mentor_id,
            scheduleData.start_time,
            scheduleData.end_time,
            scheduleData.duration,
            scheduleData.isPrime
        ]);


        const updatedAvailability = await updateMentorAvailability(mentor.id, start_time, end_time);
        console.log(updatedAvailability);
        const updateQuery = `UPDATE mentors SET availability = ? WHERE id = ?; `;

        await db.query(updateQuery, [JSON.stringify(updatedAvailability), mentor.id]);


        return res.status(200).json({ msg: "Slot Booked" });

    }
    catch (err) {
        console.error('Error inserting schedule:', err);
        return res.status(500).send('Error inserting slot');
    }

};



exports.getBookings = async (req, res) => {
    let sql = 'SELECT * FROM schedules order by id desc ';
    const [results]=await db.query(sql);
 // console.log(results[0]);
 
    res.json(results);
};
