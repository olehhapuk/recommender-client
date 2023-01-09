import { Routes, Route } from 'react-router-dom';

import Footer from '@/components/Footer';
import PrivateRoute from '@/components/PrivateRoute';
import Feed from '@/pages/Feed';
import Profile from '@/pages/Profile';
import Trending from '@/pages/Trending';
import Notifications from '@/pages/Notifications';
import Search from '@/pages/Search';
import Upload from '@/pages/Upload';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Settings from '@/pages/Settings';

const loginPath = '/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route
          path="/feed"
          element={
            <PrivateRoute loginPath={loginPath}>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:profileId/settings"
          element={
            <PrivateRoute loginPath={loginPath}>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path="/profile/:profileId/*" element={<Profile />} />
        <Route
          path="/notifications"
          element={
            <PrivateRoute loginPath={loginPath}>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route
          path="/upload"
          element={
            <PrivateRoute loginPath={loginPath}>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
