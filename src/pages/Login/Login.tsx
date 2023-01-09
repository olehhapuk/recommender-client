import { Link } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Login.module.css';
import Input from '@/lib/ui/Input';
import { login } from '@/services/auth';

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      login(values)
        .then(({ accessToken, user }) => {
          const result = signIn({
            token: accessToken,
            expiresIn: 1000 * 60 * 60 * 24 * 7,
            tokenType: 'bearer',
            authState: user,
          });

          if (result) {
            axios.defaults.headers.authorization = `Bearer ${accessToken}`;
            navigate('/');
          } else {
            console.log('Auth error');
          }
        })
        .catch((error) => console.log(error));
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <h1 className={styles.title}>Login</h1>
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
        Login
      </button>

      <p className={styles.help}>
        Don't have account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default Login;
