import { NavLink } from 'react-router-dom';
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlinePlus,
  AiFillBell,
  AiOutlineBell,
} from 'react-icons/ai';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';

import styles from './Footer.module.css';

const iconSize = 28;
const iconColor = '#fff';
const plusIconColor = '#000';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.link}>
          {({ isActive }) =>
            isActive ? (
              <AiFillHome size={iconSize} color={iconColor} />
            ) : (
              <AiOutlineHome size={iconSize} color={iconColor} />
            )
          }
        </NavLink>
        <NavLink to="/search" className={styles.link}>
          <AiOutlineSearch size={iconSize} color={iconColor} />
        </NavLink>
        <NavLink to="/upload" className={styles.uploadLink}>
          <AiOutlinePlus size={iconSize} color={plusIconColor} />
        </NavLink>
        <NavLink to="/notifications" className={styles.link}>
          {({ isActive }) =>
            isActive ? (
              <AiFillBell size={iconSize} color={iconColor} />
            ) : (
              <AiOutlineBell size={iconSize} color={iconColor} />
            )
          }
        </NavLink>
        <NavLink to="/profile/1" className={styles.link}>
          {({ isActive }) =>
            isActive ? (
              <IoPerson size={iconSize} color={iconColor} />
            ) : (
              <IoPersonOutline size={iconSize} color={iconColor} />
            )
          }
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
