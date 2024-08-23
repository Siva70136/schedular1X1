import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MentorPage from './pages/MentorPage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './components/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/mentors" element={<MentorPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path='/payment' element={<PaymentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
