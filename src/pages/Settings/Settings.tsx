import { useSignOut } from 'react-auth-kit';

import styles from './Settings.module.css';

const Settings = () => {
  const signOut = useSignOut();

  return (
    <div>
      <button type="button" onClick={signOut}>
        Logout
      </button>
    </div>
  );
};

export default Settings;
