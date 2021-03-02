/**
 * External dependancies
 */
import { useState, useEffect } from "react";
import { useAsyncCallback } from "actionsack";
import {
  AiOutlineCamera,
  AiOutlineDownload,
  AiOutlineCopy,
} from "react-icons/ai";

/**
 * Internal dependancies
 */
import { copyImage, saveImage } from "../../lib/util";

const Preview = ({ image, url, reset }) => {
  const clipboardSupported = () => {
    const [isClipboardSupports, setClipboardSupport] = useState(false);

    useEffect(() => {
      setClipboardSupport(
        window.navigator &&
          window.navigator.clipboard &&
          typeof ClipboardItem === "function"
      );
    }, []);

    return isClipboardSupports;
  };

  const [showCopied, { loading: copied }] = useAsyncCallback(
    () => new Promise((res) => setTimeout(res, 500))
  );

  const [showSaved, { loading: saved }] = useAsyncCallback(
    () => new Promise((res) => setTimeout(res, 500))
  );

  const [copy, { loading: loading }] = useAsyncCallback(async (...args) => {
    await copyImage(image);
    showCopied();
  });

  const [save, { loading: saving }] = useAsyncCallback(async (...args) => {
    await saveImage(image);
    showSaved();
  });

  return (
    <div className="search-form">
      <p>
        Your screenshot is ready! Just click the Download button and download
        the image!
      </p>
      <div className="preview-image">
        <img src={image} alt={url} />
      </div>
      <div className="text-center actions-group">
        <button
          type="button"
          className="btn btn-primary"
          disabled={saving}
          onClick={save}
        >
          <span className="icon">
            <AiOutlineDownload />
          </span>
          <span className="text">
            {saving ? "Downloading..." : saved ? "Downloaded!" : "Download"}
          </span>
        </button>
        <button
          type="button"
          className="btn btn-light"
          disabled={!clipboardSupported || loading}
          onClick={copy}
        >
          <span className="icon">
            <AiOutlineCopy />
          </span>
          <span className="text">
            {loading ? "Copying..." : copied ? "Copied!" : "Copy"}
          </span>
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => reset()}
        >
          <span className="icon">
            <AiOutlineCamera />
          </span>
          <span className="text">Capture Another</span>
        </button>
      </div>
    </div>
  );
};

export default Preview;
