import MentorList from '../components/MentorList';
import Navbar from '../components/Navbar';

const MentorPage = () => {
    return (
        <div>
            <Navbar />
            <h1 className='title'>Mentors</h1>
            <MentorList />
        </div>
    );
};

export default MentorPage;
