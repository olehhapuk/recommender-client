import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useState } from 'react';

import styles from './Search.module.css';
import { searchUsers } from '@/services/users';

const Search = () => {
  const [query, setQuery] = useState('');

  const searchUsersMutation = useMutation(() => searchUsers(query));

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    searchUsersMutation.mutate();
  }

  return (
    <div className={styles.container}>
      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <div className={styles.searchField}>
          <input
            type="search"
            name="query"
            placeholder="Search"
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={styles.searchIcon}>
            <AiOutlineSearch size={18} />
          </div>
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </div>
      </form>

      {searchUsersMutation.data && (
        <div className={styles.resultsList}>
          {searchUsersMutation.data.map((user) => (
            <Link className={styles.resultsItem} to={`/profile/${user.id}`}>
              <img src={user.avatarUrl} alt={user.username} />
              <p>{user.username}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
