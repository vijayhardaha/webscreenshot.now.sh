/**
 * External dependancies
 */
import Head from "next/head";
import Script from "next/script";

/**
 * Internal dependancies
 */
import Main from "../components/main";
import Footer from "../components/footer";

export default function Home() {
	const title = "Web Screenshot — Online Screen Capture for Websites";
	const description =
		"Web Screenshot is an online screen capture tool to websites that takes beautiful and high-quality screenshot of websites and Twitter tweets.";
	const url = "https://webscreenshot.vercel.app";
	const author = "Vijay Hardaha";
	const thumbnail = "https://webscreenshot.vercel.app/thumbnail.png";

	return (
		<div id="page">
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta name="title" content={title} />
				<meta name="description" content={description} />
				<meta name="robots" content="index, follow" />
				<meta name="language" content="English" />
				<meta name="author" content={author} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={url} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={thumbnail} />
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="628" />
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={url} />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={description} />
				<meta property="twitter:image" content={thumbnail} />
			</Head>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=UA-100426446-4"
				strategy="afterInteractive"
			/>
			<Script
				id="google-analytics"
				strategy="afterInteractive"
			>{`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments)}gtag("js",new Date());gtag("config","UA-100426446-4");`}</Script>
			<Main />
			<Footer />
		</div>
	);
}
