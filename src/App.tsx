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
  Achievements,
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
import BlogPage from './pages/BlogPage';
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

type ThemeProps = {
    mode: string;
    onModeChange: () => void;
};

function AppShell({ mode, onModeChange }: ThemeProps) {
    const { isRtl } = useLanguage();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    /* A nav click on another route (e.g. /blog) lands here with the target
       section in the router state — finish the journey once the page exists */
    useEffect(() => {
        const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
        if (!target) {
            return;
        }
        const timer = setTimeout(() => {
            if (target === 'home') {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } else {
                document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
            }
        }, 150);
        return () => clearTimeout(timer);
    }, [location.state]);

    return (
    <div
        className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
        dir={isRtl ? 'rtl' : 'ltr'}
    >
        <Navigation parentToChild={{mode}} modeChange={onModeChange}/>
        <FadeIn transitionDuration={700}>
            <Main/>
            <About/>
            <Stats/>
            <Expertise/>
            <Project/>
            <Timeline/>
            <Education/>
            <Achievements/>
            <Contact/>
        </FadeIn>
        <Footer />
        <ChatWidget />
    </div>
    );
}

function App() {
    /* Theme lives above the routes so it survives moving between the
       one-page portfolio and the blog page */
    const [mode, setMode] = useState<string>('light');

    const handleModeChange = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <LanguageProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/projects/ai-inbox-management" element={<AiInboxManagement />} />
                    <Route path="/projects/caregivers-monitoring" element={<CaregiversMonitoring />} />
                    <Route path="/projects/zoho-ai-workflows" element={<ZohoAiWorkflows />} />
                    <Route path="/projects/color-form-automation" element={<ColorFormAutomation />} />
                    <Route path="/blog" element={<BlogPage mode={mode} onModeChange={handleModeChange} />} />
                    {/* Everything else shows the one-page portfolio */}
                    <Route path="*" element={<AppShell mode={mode} onModeChange={handleModeChange} />} />
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
