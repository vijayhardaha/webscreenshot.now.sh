/**
 * External dependancies
 */
import { useState, useEffect } from "react";
import { useAsyncCallback } from "actionsack";
import {
  AiOutlineClose,
  AiOutlineDownload,
  AiOutlineCopy,
  AiOutlineEllipsis,
  AiOutlineCheck,
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

  const [copy, { loading: copying }] = useAsyncCallback(async (...args) => {
    await copyImage(image);
    showCopied();
  });

  const [save, { loading: saving }] = useAsyncCallback(async (...args) => {
    await saveImage(image);
    showSaved();
  });

  return (
    <div className="preview-wrap">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">Preview</h3>
            <div className="actions-group">
              <button
                type="button"
                className="btn btn-primary"
                disabled={saving}
                onClick={save}
                aria-label={
                  saving ? "Downloading..." : saved ? "Downloaded!" : "Download"
                }
                data-microtip-position="top"
                role="tooltip"
              >
                {saving ? (
                  <AiOutlineEllipsis />
                ) : saved ? (
                  <AiOutlineCheck />
                ) : (
                  <AiOutlineDownload />
                )}
              </button>
              <button
                type="button"
                className="btn btn-light"
                disabled={!clipboardSupported || copying}
                onClick={copy}
                aria-label={
                  copying ? "Copying..." : copied ? "Copied!" : "Copy"
                }
                data-microtip-position="top"
                role="tooltip"
              >
                {copying ? (
                  <AiOutlineEllipsis />
                ) : copied ? (
                  <AiOutlineCheck />
                ) : (
                  <AiOutlineCopy />
                )}
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => reset()}
                aria-label="Close preview"
                data-microtip-position="top"
                role="tooltip"
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="preview">
              <img src={image} alt={url} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
