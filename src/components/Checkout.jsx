import React, {useState, useEffect} from "react";
import "./Checkout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

function Checkout({ totalPrice }) {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const handlePayClick = () => {
        if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
            alert('Please enter exactly 10 digits');
            return;
        }
        // Navigate to /confirm
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    return(
        <div className="checkoutCont"> 
        <div className="checkoutHeader">
            <h1>Checkout</h1>
            <h3>Total: $ {totalPrice}</h3>
        </div>
            <div className="paymentDiv">
                <button className="cardBtn" onClick={() => handlePaymentMethodChange('card')}>
                    <img className="cardImg" src="public\Images\Visa-Mastercard-1-1024x378.png"/>   
                </button>
                <button  className="swishBtn" onClick={() => handlePaymentMethodChange('swish')}>
                    <img className="swishImg" src="public\Images\Swish_(payment)-Logo.wine.png"/>
                </button>
            </div>
            <div className="inputDiv">
            {paymentMethod === 'card' && (
                <div className="cardCont">
                    <div className="cardDet">
                        <h1>ENTER CARD DETAILS</h1>
                        <input type="text" id="cardName" name="cardName" placeholder="Cardholder Name" />
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number" />
                        <input type="text" id="expiryDate" name="expiryDate" placeholder="Expiry Date (MM/YY)" />
                        <input type="text" id="cvv" name="cvv" placeholder="CVV" />
                        <Link to="/confirm">
                            <button>PAY</button>
                        </Link>
                    </div>
                    </div>
                )}
                {paymentMethod === 'swish' && (
                    <div className="swishDet">
                        <h1>ENTER PHONE NUMBER</h1>
                        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number"  onChange={handlePhoneNumberChange}/>
                        <Link to="/confirm">
                            <button onClick={handlePayClick}>PAY</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;