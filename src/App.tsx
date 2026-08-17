import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
  ChatWidget,
} from "./components";
import FadeIn from './components/FadeIn';
import AiInboxManagement from './pages/AiInboxManagement';
import CaregiversMonitoring from './pages/CaregiversMonitoring';
import ZohoAiWorkflows from './pages/ZohoAiWorkflows';
import ColorFormAutomation from './pages/ColorFormAutomation';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import './index.scss';

/* Route changes land at the top of the new page, not mid-scroll */
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

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
        <ChatWidget />
    </div>
    );
}

function App() {
    return (
        <LanguageProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/projects/ai-inbox-management" element={<AiInboxManagement />} />
                    <Route path="/projects/caregivers-monitoring" element={<CaregiversMonitoring />} />
                    <Route path="/projects/zoho-ai-workflows" element={<ZohoAiWorkflows />} />
                    <Route path="/projects/color-form-automation" element={<ColorFormAutomation />} />
                    {/* Everything else shows the one-page portfolio */}
                    <Route path="*" element={<AppShell />} />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
