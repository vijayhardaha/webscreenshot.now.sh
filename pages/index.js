/**
 * External dependancies
 */
import Head from "next/head";

/**
 * Internal dependancies
 */
import Main from "../components/main";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div id="page">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Web Screenshot — Online Screen Capture for Websites</title>
        <meta
          name="title"
          content="Web Screenshot — Online Screen Capture for Websites"
        />
        <meta
          name="description"
          content="Web Screenshot is an online screen capture tool to websites that takes beautiful and high-quality screenshot of websites and Twitter tweets."
        />
        <meta
          name="keywords"
          content="free online website screenshot,full page screenshot,hd screenshot,how to screenshot a tweet,online free screenshot capture,online page screenshot,online screenshot,online screenshot tool,online screenshot url,screenshot,screenshot capture,screenshot from url,screenshot generator,screenshot of webpage,screenshot of website,screenshot of whole page,screenshot tweet,screenshot with url,screenshot youtube,take online screenshot of website,tweet screenshot online,twitter screenshot tool"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Vijay Hardaha" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webscreenshot.now.sh/" />
        <meta
          property="og:title"
          content="Web Screenshot — Online Screen Capture for Websites"
        />
        <meta
          property="og:description"
          content="Web Screenshot is an online screen capture tool to websites that takes beautiful and high-quality screenshot of websites and Twitter tweets."
        />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton&family=Poppins:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://webscreenshot.now.sh/" />
        <meta
          property="twitter:title"
          content="Web Screenshot — Online Screen Capture for Websites"
        />
        <meta
          property="twitter:description"
          content="Web Screenshot is an online screen capture tool to websites that takes beautiful and high-quality screenshot of websites and Twitter tweets."
        />
        <meta property="twitter:image" content="/thumbnail.png" />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#2d8ffa" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#2d8ffa" />
        <meta
          name="google-site-verification"
          content="9T8_EMb6UiUZR6CeIs8Dd6687D-o48lwZEjb6cPPckg"
        />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-100426446-4"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){window.dataLayer.push(arguments)}
							gtag("js", new Date());
							gtag("config", "UA-100426446-4");
					`,
          }}
        />
      </Head>
      <Main />
      <Footer />
    </div>
  );
}
