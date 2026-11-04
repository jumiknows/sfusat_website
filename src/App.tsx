import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Sponsors from './pages/Sponsors';
import Outreach from './pages/Outreach';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTitle from './components/PageTitle';
import BackToTop from './components/BackToTop';
import ProjectNav from './components/ProjectNav';
import NotFound from './pages/NotFound';
import Join from './pages/Join';
import Rover from './pages/Rover';
import AleasatPage from './pages/Aleasat';
import Balloon3Page from './pages/Balloon3';
import ProjectPage from './pages/ProjectPage';
import { PROJECT_PAGES } from './content/projects';
import './App.css';
// Imported here, not in the lazy page, so theme.css always loads after it and wins
import './pages/RoverApply.css';
import './theme.css';

// Holds the 3D rover and the game, so other pages do not download them
const RoverApply = lazy(() => import('./pages/RoverApply'));

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <PageTitle />
      <div className="App">
        <Navbar />
        <a href="#main" className="skip-link">Skip to content</a>
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/website" element={<Home />} />
            <Route path="/rover" element={<Rover />} />
            <Route path="/rover/apply" element={<Suspense fallback={<div className="route-loading" />}><RoverApply /></Suspense>} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/aleasat" element={<AleasatPage />} />
            <Route path="/projects/balloon3" element={<Balloon3Page />} />
            {PROJECT_PAGES.map((project) => (
              <Route key={project.slug} path={`/projects/${project.slug}`} element={<ProjectPage project={project} />} />
            ))}
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/join" element={<Join />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ProjectNav />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
};

export default App;
