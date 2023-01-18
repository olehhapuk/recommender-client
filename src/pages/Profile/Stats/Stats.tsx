import numeral from 'numeral';

import styles from './Stats.module.css';

interface StatsProps {
  following: number;
  followers: number;
}

const Stats = ({ following, followers }: StatsProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <h3 className={styles.value}>
          {following >= 1000 ? numeral(following).format('0.0a') : following}
        </h3>
        <span className={styles.title}>Following</span>
      </div>
      <div className={styles.stat}>
        <h3 className={styles.value}>
          {followers >= 1000 ? numeral(followers).format('0.0a') : followers}
        </h3>
        <span className={styles.title}>Followers</span>
      </div>
    </div>
  );
};

export default Stats;
