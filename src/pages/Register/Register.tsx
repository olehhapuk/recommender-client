import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import styles from './Register.module.css';
import Input from '@/lib/ui/Input';
import { register } from '@/services/auth';

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      register(values).then(() => {
        navigate('/login');
      });
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <h1 className={styles.title}>Register</h1>
      <div className={styles.fieldsList}>
        <div className={styles.field}>
          <Input
            type="text"
            placeholder="Username"
            required
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className={styles.field}>
          <Input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>

      <button type="submit" className={styles.btn}>
        Register
      </button>

      <p className={styles.help}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Register;
