import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Feed
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
      >
        Trending
      </NavLink>
    </div>
  );
};

export default Navbar;
