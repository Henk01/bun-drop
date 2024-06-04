import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Confirm.css';

function Confirm() {
    const [minutes, setMinutes] = useState(Math.floor(Math.random() * (40 - 20 + 1)) + 20);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);

  return (
    <div className="confCont">
        <div className="confDiv">
            <img className="confImg" src="public\Images\pngimg.com - chef_PNG140.png" alt="Order Confirmed"/>
            <div className="h1+time">
                <h1 className="confH1">ORDER CONFIRMED</h1>
                <h2 className="confH2">Estimated delivery time: {minutes} minutes and {seconds} seconds</h2>
                <Link to="/">
                    <button className="confBtn">HOME</button>
                </Link>
            </div>
        </div>
    </div>
  );
}

export default Confirm;