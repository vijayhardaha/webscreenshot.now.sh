/**
 * External dependancies
 */
import { FaTwitter } from "react-icons/fa";

/**
 * Internal dependancies
 */

const Header = () => {
  const text = "Create fast #Screenshots with #WebScreenshot by @vijayhardaha";
  const url = "https://webscreenshot.now.sh";

  const params = {
    url: url,
    text: encodeURI(text),
    original_referer: url,
  };

  const args = Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

  const shareUrl = `http://twitter.com/intent/tweet?${args}`;

  return (
    <header className="site-header">
      <div className="site-info">
        <h1 className="site-title">Web Screenshot</h1>
        <p className="site-tagline">
          Capture free screenshot of any public websites or Twitter's public
          tweets in HD quality.
        </p>
      </div>
      <div className="share">
        <a href={shareUrl} type="button">
          <span className="text">Share on Twitter</span>
          <span className="icon">
            <FaTwitter />
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
