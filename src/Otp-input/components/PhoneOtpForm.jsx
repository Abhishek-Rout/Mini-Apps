import { useState } from 'react'
import OtpInput from './OtpInput';

const PhoneOtpForm = () => {
  const [phoneNumber, setPhonenumber] = useState('');
  const [showOtpInput, setshowOtpInput] = useState(false);
  const handlePhoneNumber = (event) => {
    setPhonenumber(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // validations
    const regex = /[0-9]/g;
    if (phoneNumber.length < 10 && regex.test(phoneNumber)) {
      alert("Invalid number");
      return;
    }
    // Backend API
    // show Otp field
    setshowOtpInput(true);
  };

  const onOtpSubmit = () => {
    console.log("Login Successful");
  }
  return (
    <div>
      {!showOtpInput ? <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={phoneNumber}
          placeholder='Enter phone number'
          onChange={handlePhoneNumber}
        />
        <button type='submit'>Submit</button>
      </form> :
        <div>
          <p>Enter Otp sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      }
    </div>
  )
}

export default PhoneOtpForm;
