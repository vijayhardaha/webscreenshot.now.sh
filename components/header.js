/**
 * Internal dependancies
 */

const Header = () => {
	const text =
		"Create fast #Screenshots with #WebScreenshot by @vijayhardaha";
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
		<header className="site-header text-center mt-4">
			<div className="site-info">
				<h1 className="site-title">Web Screenshot</h1>
				<p className="site-tagline">
					Capture free screenshot of any public websites or
					Twitter&apos;s public tweets in HD quality.
				</p>
				<div>
					<a
						href="https://github.com/vijayhardaha/webscreenshot.now.sh"
						target="_blank"
						title="Vijay Hardaha"
						className="btn btn-outline-dark"
						rel="noopener noreferrer"
					>
						View on Github
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
