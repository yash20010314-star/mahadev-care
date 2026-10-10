import React from 'react';
import { siteConfig } from '../config/siteConfig';

interface StorySocialProps {
  onLearnMore: () => void;
}

export const StorySocial: React.FC<StorySocialProps> = ({ onLearnMore }) => {
  const { story, community } = siteConfig.editorial;
  const { socialPosts } = siteConfig;

  return (
    <section
      id="story"
      className="story-social"
      data-logo-gradient="grey-brown-black"
      data-header-tone="light"
      aria-label="Brand story and social community"
    >
      <div className="story-left">
        <h2 className="story-heading">
          {story.headingDesktop}
        </h2>
      </div>

      <div className="story-right">
        <p>{story.body}</p>
        <button
          type="button"
          className="story-learn-more"
          onClick={onLearnMore}
        >
          <img
            src="/images/front.png"
            alt=""
            className="cta-star"
            aria-hidden="true"
          />
          <span>{story.ctaText}</span>
        </button>
      </div>

      <a
        className="social-handle"
        href={siteConfig.contact.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${siteConfig.brand.name} on Instagram`}
      >
        {community.handle}
      </a>

      <h2 className="social-title">
        {community.titleBeforeAccent}
        <br />
        <span>{community.accentText}</span>
      </h2>

      <div className="social-row">
        {socialPosts.map((post) => (
          <a
            key={post.id}
            className="insta-card"
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Instagram community post by ${post.handle}`}
          >
            <div className="insta-dotline">
              <span className="insta-dot" />
              <span>{post.handle}</span>
            </div>
            <img
              className="insta-img"
              src={post.image}
              alt={post.caption || `Community feature ${post.handle}`}
              loading="lazy"
            />
          </a>
        ))}

        <a
          className="see-more-card"
          href={siteConfig.contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View more posts on Instagram"
        >
          <img
            src="/images/front.png"
            alt=""
            className="cta-star"
            aria-hidden="true"
          />
          <span>{community.seeMoreText}</span>
        </a>
      </div>
    </section>
  );
};
