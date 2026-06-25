import ConstellationCanvas from './canvas/ConstellationCanvas.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Leadership from './components/Leadership.jsx';
import Awards from './components/Awards.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import BackToTop from './components/BackToTop.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

export default function App() {
    useScrollReveal();

    return (
        <>
            <ConstellationCanvas />
            <Navbar />
            <BackToTop />
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Leadership />
            <Awards />
            <Testimonials />
            <Contact />
        </>
    );
}
