import styles from './OtpInput.module.scss';
import PhoneOtpForm from './components/PhoneOtpForm';

function Otpform() {
  return (
    <div className={styles.wrapper}>
      <h1>Login with Phone</h1>
      <PhoneOtpForm />
    </div>
  )
}

export default Otpform;
