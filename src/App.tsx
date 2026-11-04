import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';
import Sponsors from './components/Sponsors';
import Outreach from './components/Outreach';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTitle from './components/PageTitle';
import NotFound from './components/NotFound';
import Rover from './components/Rover';
import RoverApply from './components/RoverApply';
import AleasatPage from './components/pages/Aleasat';
import Balloon3Page from './components/pages/Balloon3';
import CSDC5Page from './components/pages/CSDC5';
import CCP1Page from './components/pages/CCP1';
import Balloon2Page from './components/pages/Balloon2';
import CSDC4Page from './components/pages/CSDC4';
import Balloon1Page from './components/pages/Balloon1';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <PageTitle />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/website" element={<Home />} />
            <Route path="/rover" element={<Rover />} />
            <Route path="/rover/apply" element={<RoverApply />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/aleasat" element={<AleasatPage />} />
            <Route path="/projects/balloon3" element={<Balloon3Page />} />
            <Route path="/projects/csdc5" element={<CSDC5Page />} />
            <Route path="/projects/ccp1" element={<CCP1Page />} />
            <Route path="/projects/balloon2" element={<Balloon2Page />} />
            <Route path="/projects/csdc4" element={<CSDC4Page />} />
            <Route path="/projects/balloon1" element={<Balloon1Page />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
