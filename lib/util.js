/**
 * External dependancies
 */
import { saveAs } from "file-saver";

// Used from StackOverflow
// https://stackoverflow.com/a/5717133
const urlRegex = new RegExp(
	"^(https?:\\/\\/)?" + // protocol
		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
		"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
		"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
		"(\\#[-a-z\\d_]*)?$", // fragment locator;
	"i"
);

const twitterRegex =
	/^https?:\/\/?(?:www.)?twitter.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(\?(.*))?$/;

// Taken from stackoverflow
// https://stackoverflow.com/a/24657561
export const addProtocol = (url, https = false) =>
	typeof url === "string" && url.length && !/^(?:f|ht)tps?\:\/\//.test(url)
		? https
			? `https://${url}`
			: `http://${url}`
		: url;

export const formatUrl = (url) => {
	if (typeof url === "string" && url.length) {
		url = url.toLowerCase();
		url = addProtocol(url, true);
		return url;
	}
	return false;
};

export const isTwitterUrl = (url) => twitterRegex.test(url);

export const isValidUrl = (url) => urlRegex.test(url);

export const copyImage = (image) => {
	const blob = dataURItoBlob(image);
	return navigator.clipboard.write([
		new window.ClipboardItem({
			"image/png": blob,
		}),
	]);
};

export const saveImage = (image) => {
	const blob = dataURItoBlob(image);
	return saveAs(blob, `web-screenshot-${Date.now()}.png`);
};

export const dataURItoBlob = (dataURI) => {
	// convert base64 to raw binary data held in a string
	// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
	const byteString = atob(dataURI.split(",")[1]);

	// separate out the mime component
	const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

	// write the bytes of the string to an ArrayBuffer
	let ab = new ArrayBuffer(byteString.length);

	// create a view into the buffer
	let ia = new Uint8Array(ab);

	// set the bytes of the buffer to the correct values
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	// write the ArrayBuffer to a blob, and you're done
	const blob = new Blob([ab], { type: mimeString });
	return blob;
};
