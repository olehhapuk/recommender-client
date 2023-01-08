import { Link } from 'react-router-dom';

import styles from './Login.module.css';
import Input from '@/lib/ui/Input';

const Login = () => {
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.fieldsList}>
        <div className={styles.field}>
          <Input type="text" placeholder="Username" required />
        </div>
        <div className={styles.field}>
          <Input type="password" placeholder="Password" required />
        </div>
      </div>

      <button type="submit" className={styles.btn}>
        Login
      </button>

      <p className={styles.help}>
        Don't have account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
