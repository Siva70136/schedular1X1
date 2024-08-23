import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './index.css';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className='body-container'>
                <div className='data-container'>
                    <h1 className='main-head'>Welcome to CareerCarve Scheduler</h1>
                    <p className='sub-head'>We've got you covered</p>
                    <div className='buttons-container'>
                        <Link to="/mentors">
                            <button type='button' className='button home-button'>
                                View Mentors
                            </button>
                        </Link>
                        <br />
                        <Link to="/book">
                            <button type='button' className='button home-button'>
                                Book 1X1
                            </button>
                        </Link>
                    </div>
                    <p className='sub-head'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div className='image-section'>
                    <img className='home-img' src="https://ccicons.s3.amazonaws.com/landing_page/LandingPageImg_1.webp" alt='home-image' />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
