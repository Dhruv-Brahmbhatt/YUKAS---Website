import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Events from './pages/Events';

import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import EventDetail from './pages/EventDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 font-sans">
      <Navbar />
      
      {/* Main content takes up remaining space. pt-24 offsets fixed navbar */}
      <main className="flex-grow pt-24 md:pt-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
