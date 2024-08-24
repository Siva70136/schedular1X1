import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import './index.css';

const PaymentPage = () => {
    const [duration, setDuration] = useState(0);
    const [isPremium, setIsPremium] = useState(false);
    const [baseCost, setBaseCost] = useState(2000);
    //let  = 2000;

    useEffect(() => {
        getSchedules();
        if (duration === 30) setBaseCost(2000);
        if (duration === 45) setBaseCost(3000);
        if (duration === 60) setBaseCost(4000);
    }, [baseCost])

    const getSchedules = async () => {
        try {
            const res = await fetch('https://schedular1x1.onrender.com/api/bookings');
            const data = await res.json();
            setDuration(data[0].duration);
            setIsPremium(data[0].isPrime == 1 ? true : false);
        }
        catch {
            console.log("error");
        }
    }

    const calculateCost = () => {  
        return isPremium ? baseCost + 1000 : baseCost;
    };


    return (
        <div>
            <Navbar />
            <div className="container">

                <h2 className="payment-head">Payment Details</h2>
                {duration != 0 &&
                    <div className="records-container">
                        <div className="record">
                            <p className="">Item Total</p>
                            <p className="">{baseCost}</p>
                        </div>
                        <div className="record">
                            <p className="">Premium</p>
                            <p className="">{isPremium ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="record">
                            <p className="">Total Cost</p>
                            <p className="">{calculateCost()}</p>
                        </div>
                    </div>
                }
                <button onClick={() => alert('Payment processed!')} className="button home-button pay">Pay Now</button>
            </div>
        </div>
    );
};

export default PaymentPage;
