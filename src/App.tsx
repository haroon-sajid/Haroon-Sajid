import React, {useState, useEffect} from "react";
import {
  Main,
  About,
  Stats,
  Expertise,
  Project,
  Timeline,
  Education,
  Contact,
  Navigation,
  Footer,
  WelcomePopup,
} from "./components";
import FadeIn from './components/FadeIn';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import './index.scss';

function AppShell() {
    const [mode, setMode] = useState<string>('light');
    const { isRtl } = useLanguage();

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    return (
    <div
        className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
        dir={isRtl ? 'rtl' : 'ltr'}
    >
        <WelcomePopup/>
        <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
        <FadeIn transitionDuration={700}>
            <Main/>
            <About/>
            <Stats/>
            <Expertise/>
            <Project/>
            <Timeline/>
            <Education/>
            <Contact/>
        </FadeIn>
        <Footer />
    </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AppShell />
        </LanguageProvider>
    );
}

export default App;
