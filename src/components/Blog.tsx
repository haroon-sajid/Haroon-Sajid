import React from "react";
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Blog.scss';

/* Article teasers for now — when the first post is ready, give it a route
   (like the /projects/* pages) and turn its card into a link. */
function Blog() {
    const { t } = useLanguage();

    return (
    <div className="container" id="blog">
        <div className="blog-container">

            <div className="blog-head">
                <span className="blog-eyebrow">{t.blog.eyebrow}</span>
                <h1>{t.blog.titleMain} <span className="blog-outline">{t.blog.titleOutline}</span></h1>
                <span className="blog-rule"></span>
                <p className="blog-intro">{t.blog.intro}</p>
            </div>

            <div className="blog-grid">
                {t.blog.items.map((post, index) => (
                    <article className="blog-card" key={index}>
                        {/* Placeholder art in the style of the project banners —
                            swap for a real image once the post is written */}
                        <div className="blog-thumb">
                            <span className="blog-soon">{t.blog.comingSoon}</span>
                            <span className="blog-thumb-num" dir="ltr">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <div className="blog-card-body">
                            <h3>{post.title}</h3>
                            <p>{post.desc}</p>
                        </div>
                    </article>
                ))}
            </div>

        </div>
    </div>
    );
}

export default Blog;
