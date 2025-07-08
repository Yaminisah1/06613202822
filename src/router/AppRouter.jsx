import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Stats from '../pages/Stats';
import Redirect from '../pages/Redirect';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/redirect/:shortcode" element={<Redirect />} />
    </Routes>
  </Router>
);

export default AppRouter;
