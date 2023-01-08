import { Routes, Route } from 'react-router-dom';

import Footer from '@/components/Footer';
import Feed from '@/pages/Feed';
import Profile from '@/pages/Profile';
import Trending from '@/pages/Trending';
import Notifications from '@/pages/Notifications';
import Search from '@/pages/Search';
import Upload from '@/pages/Upload';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile/:profileId/*" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
