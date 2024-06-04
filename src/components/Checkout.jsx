import React, {useState, useEffect} from "react";
import "./Checkout.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

function Checkout({ totalPrice }) {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
    const [isCardNameValid, setIsCardNameValid] = useState(false);
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);
    const [isExpiryDateValid, setIsExpiryDateValid] = useState(false);
    const [isCvvValid, setIsCvvValid] = useState(false);

    const handleCardNameChange = (event) => {
        const cardName = event.target.value;
        if (cardName.trim() !== '') {
            setIsCardNameValid(true);
        } else {
            setIsCardNameValid(false);
        }
    }

    const handleCardNumberChange = (event) => {
        let cardNumber = event.target.value.replace(/\s/g, ''); 
        cardNumber = cardNumber.match(/.{1,4}/g).join(' ');
        event.target.value = cardNumber; 
    
        if (cardNumber.replace(/\s/g, '').length === 16 && !isNaN(cardNumber.replace(/\s/g, ''))) {
            setIsCardNumberValid(true);
        } else {
            setIsCardNumberValid(false);
        }
    }

    const handleExpiryDateChange = (event) => {
        let expiryDate = event.target.value.replace(/\//g, ''); // Remove all '/'
        if (expiryDate.length > 2) {
            expiryDate = expiryDate.slice(0, 2) + '/' + expiryDate.slice(2); // Insert '/' after the first 2 characters
        }
        event.target.value = expiryDate; // Update the input value
    
        // Check if expiryDate is in the format MM/YY
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
        if (expiryDateRegex.test(expiryDate)) {
            setIsExpiryDateValid(true);
        } else {
            setIsExpiryDateValid(false);
        }
    }

    const handleCvvChange = (event) => {
        const cvv = event.target.value;
        // Check if cvv is 3 digits and only contains numbers
        if (cvv.length === 3 && !isNaN(cvv)) {
            setIsCvvValid(true);
        } else {
            setIsCvvValid(false);
        }
    }

    const isCardDetailsValid = isCardNameValid && isCardNumberValid && isExpiryDateValid && isCvvValid;

    const handlePhoneNumberChange = (event) => {
        const phoneNumber = event.target.value;
        if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
            setIsPhoneNumberValid(true);
        } else {
            setIsPhoneNumberValid(false);
        }
    }

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
                        <input type="text" id="cardName" name="cardName" placeholder="Cardholder Name" onChange={handleCardNameChange} />
                        <input type="text" id="cardNumber" name="cardNumber" placeholder="Card Number" onChange={handleCardNumberChange} />
                        <input type="text" id="expiryDate" name="expiryDate" placeholder="Expiry Date (MM/YY)" onChange={handleExpiryDateChange} />
                        <input type="text" id="cvv" name="cvv" placeholder="CVV" onChange={handleCvvChange} />
                        <Link to="/confirm">
                            <button className={!isCardDetailsValid ? 'disabled' : ''} disabled={!isCardDetailsValid}>PAY</button>
                        </Link>
                    </div>
                    </div>
                )}
                {paymentMethod === 'swish' && (
                    <div className="swishDet">
                        <h1>ENTER PHONE NUMBER</h1>
                        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Phone Number"  onChange={handlePhoneNumberChange}/>
                        <Link to="/confirm">
                            <button className={!isPhoneNumberValid ? 'disabled' : ''} disabled={!isPhoneNumberValid}>PAY</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Checkout;