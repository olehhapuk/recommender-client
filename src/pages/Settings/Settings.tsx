import { useSignOut } from 'react-auth-kit';

import styles from './Settings.module.css';

const Settings = () => {
  const signOut = useSignOut();

  return (
    <div className={styles.container}>
      <button type="button" onClick={signOut} className={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

export default Settings;
