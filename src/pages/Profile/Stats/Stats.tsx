import numeral from 'numeral';

import styles from './Stats.module.css';

interface StatsProps {
  following: number;
  followers: number;
  likes: number;
}

const Stats = ({ following, followers, likes }: StatsProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <h3 className={styles.value}>{numeral(following).format('0.0a')}</h3>
        <span className={styles.title}>Following</span>
      </div>
      <div className={styles.stat}>
        <h3 className={styles.value}>{numeral(followers).format('0.0a')}</h3>
        <span className={styles.title}>Followers</span>
      </div>
      <div className={styles.stat}>
        <h3 className={styles.value}>{numeral(likes).format('0.0a')}</h3>
        <span className={styles.title}>Likes</span>
      </div>
    </div>
  );
};

export default Stats;
