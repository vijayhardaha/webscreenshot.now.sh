/**
 * External dependancies
 */
import { useReducer } from "react";
import Select from "react-select";
import { IoMdExpand } from "react-icons/io";

/**
 * Internal dependancies
 */
import SettingRow from "./controls/setting";
import SwitchInput from "./controls/switch";
import TextInput from "./controls/input";
import Loader from "./controls/loader";
import Preview from "./controls/preview";
import { defaultData, screenOptions } from "../lib/constant";
import { isValidUrl, isTwitterUrl, validPx, formatUrl } from "../lib/util";
import { getImage } from "../lib/api";

const Form = () => {
  const [
    {
      url,
      full,
      scale,
      custom,
      width,
      height,
      screen,
      valid,
      ready,
      loading,
      error,
      image,
    },
    setData,
  ] = useReducer((state, newState) => ({ ...state, ...newState }), defaultData);

  const setUrl = (url) => {
    const isValid = isValidUrl(url);
    setData({ valid: isValid });
    if (isValid) {
      setData({ url: formatUrl(url) });
    } else {
      setData({ url });
    }
    readyToSubmit(url);
  };

  const readyToSubmit = (url) => {
    setData({ error: false });

    if (isValidUrl(url)) {
      setData({ ready: true });
    } else {
      setData({ ready: false });
      setData({
        error: "Please insert a valid URL of the web page to capture.",
      });
    }
  };

  const handleSubmit = async () => {
    readyToSubmit(url);

    if (ready) {
      setData({ loading: true });

      const args = {
        url: url,
        width: custom ? width : screen.w,
        height: custom ? height : screen.h,
        scale: scale ? 2 : 1,
        full: full,
        isTweet: isTwitterUrl(url),
      };

      const response = await getImage(args);
      const json = await response.json();

      if (response.ok) {
        setData({ image: json.image });
      } else {
        const defaultMessage = "Something went wrong, Please try later.";
        const errorMessage = json.message
          ? json.message.match(/Error:/g)
            ? defaultMessage
            : json.message
          : defaultMessage;
        setData({ error: errorMessage });
      }
      setData({ loading: false });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : image ? (
        <Preview image={image} url={url} reset={() => setData(defaultData)} />
      ) : (
        <></>
      )}
      <div className="search-form main-form">
        {url.length && error ? <p className="error">{error}</p> : <></>}

        <h5>Enter the webpage or twitter feed url here:</h5>

        <div className="form-field url-field">
          <TextInput
            type="text"
            id="url-input"
            className="text-input"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary submit-btn"
            disabled={!ready || loading}
            onClick={() => handleSubmit()}
            aria-label={
              !ready || loading
                ? "Enter website url to enable the button"
                : "Press to generate screenshot"
            }
            data-microtip-position="top"
            role="tooltip"
          >
            <IoMdExpand />
          </button>
        </div>

        <div className="advance-options">
          <SettingRow
            id="full-screen-field"
            label="Full Screen"
            desc="Capture full page screenshot."
          >
            <SwitchInput
              id="full-screen-field"
              checked={full}
              onChange={(e) => {
                setData({ full: e.target.checked });
              }}
            />
          </SettingRow>

          <SettingRow
            id="scale-quality-field"
            label="HD Quality"
            desc="Capture screenshot in high resolution."
          >
            <SwitchInput
              id="scale-quality-field"
              checked={scale}
              onChange={(e) => {
                setData({ scale: e.target.checked });
              }}
            />
          </SettingRow>

          <SettingRow
            id="custom-size-field"
            label="Use Custom Size"
            desc="Custom width and height units for screenshot output."
          >
            <SwitchInput
              id="custom-size-field"
              checked={custom}
              onChange={(e) => {
                setData({ custom: e.target.checked });
              }}
            />
          </SettingRow>

          {custom ? (
            <>
              <SettingRow
                id="custom-width-field"
                label="Width"
                desc="Set the width(px) for screenshot output."
              >
                <TextInput
                  id="custom-width-field"
                  type="number"
                  value={width}
                  placeholder="1024"
                  onChange={(e) => {
                    setData({ width: e.target.value });
                  }}
                  onBlur={(e) => {
                    setData({ width: validPx(e.target.value) });
                  }}
                />
              </SettingRow>

              <SettingRow
                id="custom-height-field"
                label="Height"
                desc="Set the height(px) for screenshot output."
              >
                <TextInput
                  id="custom-height-field"
                  type="number"
                  value={height}
                  onChange={(e) => {
                    setData({ height: e.target.value });
                  }}
                  onBlur={(e) => {
                    setData({ height: validPx(e.target.value) });
                  }}
                  placeholder="1024"
                />
              </SettingRow>
            </>
          ) : (
            <SettingRow
              id="screen-size-field"
              label="Screen Size"
              desc="Preferred units of screenshot output."
            >
              <Select
                instanceId="screen-size-field"
                classNamePrefix="input-control"
                options={screenOptions}
                value={screen}
                onChange={(value) => {
                  setData({ screen: value });
                }}
              />
            </SettingRow>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
