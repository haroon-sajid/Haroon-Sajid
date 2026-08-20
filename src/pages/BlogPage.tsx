import React from 'react';
import { Navigation, Blog, Footer } from '../components';
import FadeIn from '../components/FadeIn';
import { useLanguage } from '../context/LanguageContext';

/* The blog on its own route, framed by the same header and footer as the
   one-page portfolio. Theme state comes down from App so the toggle carries
   over when moving between pages. */

type Props = {
  mode: string;
  onModeChange: () => void;
};

function BlogPage({ mode, onModeChange }: Props) {
  const { isRtl } = useLanguage();

  return (
    <div
      className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <Navigation parentToChild={{ mode }} modeChange={onModeChange} />
      {/* Clears the fixed navbar, and stretches so the footer stays at the
          bottom even while the post list is short */}
      <div className="blog-page-body">
        <FadeIn transitionDuration={700}>
          <Blog />
        </FadeIn>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPage;
