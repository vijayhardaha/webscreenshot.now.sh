/**
 * External dependancies
 */
import { useReducer, useEffect } from "react";
/**
 * Internal dependancies
 */
import Loader from "./controls/loader";
import Preview from "./controls/preview";
import { getResolution, defaultData, screenOptions } from "../lib/constant";
import { isValidUrl, isTwitterUrl, formatUrl } from "../lib/util";
import { getImage } from "../lib/api";

const Form = () => {
	const [
		{
			error,
			format,
			full,
			height,
			image,
			loading,
			ready,
			scale,
			screen,
			url,
			width,
		},
		setData,
	] = useReducer(
		(state, newState) => ({ ...state, ...newState }),
		defaultData
	);

	useEffect(() => {
		const screenData = getResolution(screen);
		setData({ width: screenData.w, height: screenData.h });
	}, [screen]);

	useEffect(() => {
		setData({ error: false, ready: false });
		if (isValidUrl(url)) {
			setData({ ready: true, url: formatUrl(url) });
		} else {
			setData({
				ready: false,
				error: "Please insert a valid URL of the web page to capture.",
			});
		}
	}, [url]);

	const handleSubmit = async () => {
		if (ready) {
			setData({ loading: true });

			const args = {
				url: url,
				width: width,
				height: height,
				scale: scale ? 2 : 1,
				full: full,
				isTweet: isTwitterUrl(url),
				format: format,
			};

			const response = await getImage(args);
			const json = await response.json();

			if (response.ok) {
				setData({ image: json.image });
			} else {
				const defaultMessage =
					"Something went wrong, Please try later.";
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
			) : (
				image && (
					<Preview
						image={image}
						url={url}
						reset={() => setData({ loading: false, image: false })}
					/>
				)
			)}

			{url.length > 0 && error && (
				<p className="alert alert-danger" role="alert">
					{error}
				</p>
			)}

			<div className="card border-0 shadow search-form main-form ">
				<div className="card-header">
					<input
						type="text"
						id="url"
						className="form-control form-control-lg"
						placeholder="Enter URL like https://example.com"
						value={url}
						onChange={(e) => setData({ url: e.target.value })}
					/>
				</div>

				<div className="advance-options card-body">
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="form-field mb-4" id="screen-field">
								<label htmlFor="screen">Screen Size</label>
								<div className="field-input">
									<select
										id="screen"
										className="form-select"
										value={screen}
										onChange={(e) => {
											setData({ screen: e.target.value });
										}}
									>
										{screenOptions &&
											screenOptions.map((group, idx) => (
												<optgroup
													key={idx}
													label={group.label}
												>
													{group.options.map(
														(o, key) => (
															<option
																key={key}
																value={o.value}
															>
																{o.label}
															</option>
														)
													)}
												</optgroup>
											))}
									</select>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div className="form-field mb-4" id="format-field">
								<label htmlFor="format">Format</label>
								<div className="field-input">
									<select
										id="format"
										className="form-select"
										value={format}
										onChange={(e) => {
											setData({ format: e.target.value });
										}}
									>
										<option value="jpeg">.jpeg</option>
										<option value="png">.png</option>
									</select>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div
								className="form-field mb-4 mb-md-0"
								id="width-field"
							>
								<label htmlFor="width">Width</label>
								<div className="field-input d-flex align-items-center">
									<input
										type="range"
										className="form-range"
										min="300"
										max="1920"
										id="width"
										value={width}
										onChange={(e) => {
											setData({ width: e.target.value });
										}}
									/>
									<div
										className="ms-2"
										style={{ width: `90px` }}
									>
										<input
											type="text"
											className="form-control"
											value={width}
											disabled
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<div
								className="form-field mb-4 mb-md-0"
								id="height-field"
							>
								<label htmlFor="height">Height</label>
								<div className="field-input d-flex align-items-center">
									<input
										type="range"
										className="form-range"
										min="300"
										max="1920"
										id="height"
										value={height}
										onChange={(e) => {
											setData({ height: e.target.value });
										}}
										disabled={full}
									/>
									<div
										className="ms-2"
										style={{ width: `90px` }}
									>
										<input
											type="text"
											className="form-control"
											value={height}
											disabled
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="card-footer">
					<div className="row d-flex align-items-center">
						<div className="col-12 col-md-8 mb-3 text-md-start text-center mb-md-0">
							<div className="form-check form-check-inline form-switch">
								<label htmlFor="">Full Screen</label>
								<input
									checked={full}
									className="form-check-input"
									id="full-screen-field"
									type="checkbox"
									onChange={(e) => {
										setData({ full: e.target.checked });
									}}
								/>
							</div>
							<div className="form-check form-check-inline form-switch">
								<label htmlFor="quality">HD Quality</label>
								<input
									checked={scale}
									className="form-check-input"
									id="quality"
									type="checkbox"
									onChange={(e) => {
										setData({ scale: e.target.checked });
									}}
								/>
							</div>
						</div>
						<div className="col-12 col-md-4 text-md-end d-md-block d-grid">
							<button
								type="button"
								className="btn btn-primary btn-lg"
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
								Capture Screen
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Form;
