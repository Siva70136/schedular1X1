import Navbar from '../components/Navbar';
import ScheduleForm from '../components/BookForm';

const BookingPage = () => {

    return (
        <div>
            <Navbar />
            <div className='book-container'>
                <h1>Book a Session</h1>
                <ScheduleForm/>
            </div>
        </div>
    );
};

export default BookingPage;
