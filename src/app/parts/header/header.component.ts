import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { environment } from './../../../environments/environment';
import { NotyService } from './noty.service';

const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
const facebookRegex = /^https?:\/\/?(?:www.)?facebook.com\/(?:#!\/)?(\w+)\/post(s)?\/(\d+)(\?(.*))?$/;
const twitterRegex = /^https?:\/\/?(?:www.)?twitter.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(\?(.*))?$/;

declare var ElastiStack: any;

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	submitted: boolean = false;
	processing: boolean = false;
	isLoading: boolean = true;
	apiUrl = environment.apiUrl;
	screenshot: any = null;

	screens: any = [
		{
			group: 'Common',
			items: [
				{ id: 'meta', name: 'Meta Thumbnail', w: 1200, h: 628 },
				{ id: 'desktop', name: 'Desktop', w: 1440, h: 1024 },
				{ id: 'mackbook', name: 'Mackbook Pro', w: 1152, h: 700 },
				{ id: 'mackbookpro', name: 'Mackbook Pro', w: 1140, h: 900 },
				{ id: 'surfacebook', name: 'Surface Book', w: 1500, h: 1000 },
				{ id: 'imac', name: 'iMac', w: 1280, h: 720 },
				{ id: 'android', name: 'Android', w: 480, h: 1024 },
				{ id: 'ipad', name: 'iPad', w: 414, h: 736 },
				{ id: 'iphone', name: 'iPhone', w: 480, h: 1024 },
			]
		},
		{
			group: 'Desktop/Laptop',
			items: [
				{ id: '24desktop', name: '24" Desktop', w: 1920, h: 1200 },
				{ id: '23desktop', name: '23" Desktop', w: 1920, h: 1080 },
				{ id: '22desktop', name: '22" Desktop', w: 1680, h: 1050 },
				{ id: '20desktop', name: '20" Desktop', w: 1600, h: 900 },
				{ id: '19desktop', name: '19" Desktop', w: 1440, h: 900 },
				{ id: '15notebook', name: '15" Notebook', w: 1366, h: 768 },
				{ id: '13notebook', name: '13" Notebook', w: 1024, h: 800 },
				{ id: '10notebook', name: '10" Notebook', w: 1024, h: 600 },
			]
		},
		{
			group: 'iPad/Tablet',
			items: [
				{ id: 'ipadpro', name: 'iPad Pro', w: 1024, h: 1366 },
				{ id: 'ipadmini', name: 'iPad Mini/Air', w: 768, h: 1024 },
				{ id: 'galaxy10', name: 'Samsumg Galaxy 10', w: 800, h: 1280 },
				{ id: 'nexus7', name: 'Nexus 7', w: 600, h: 960 },
				{ id: 'nexus9', name: 'Nexus 9', w: 768, h: 1024 },
			]
		},
		{
			group: 'Mobile',
			items: [
				{ id: 'pixel', name: 'Google Pixel', w: 411, h: 731 },
				{ id: 'iphonex', name: 'iPhone X', w: 375, h: 812 },
				{ id: 'iphone8', name: 'iPhone 6+, 6s+, 7+, 8+', w: 414, h: 736 },
				{ id: 'iphone7', name: 'iPhone 7, 8, 6, 6s', w: 375, h: 667 },
				{ id: 'iphone5', name: 'iPhone 5', w: 320, h: 568 },
				{ id: 'iphone4', name: 'iPhone 4,3', w: 320, h: 480 },
			]
		}
	];

	constructor(private http: HttpClient, public fb: FormBuilder, public Noty: NotyService) {
		this.form.get('width').disable();
		this.form.get('height').disable();
	}

	form = this.fb.group({
		url: ['', [Validators.required, Validators.pattern(urlRegex)]],
		full: ['0'],
		quality: ['1'],
		screen: ['desktop'],
		width: [1440],
		height: [1024],
	});

	ngOnInit(): void {
		window.onload = () => {
      this.isLoading = false;
      new ElastiStack( document.getElementById( 'stacks' ) );
		};
	}

	disableSort() {
		return 0;
	}

	onScreenChange(): void {
		const screenValue = this.form.get('screen').value;
		if (screenValue === 'custom') {
			this.form.get('width').enable();
			this.form.get('height').enable();
		} else {
			this.form.get('width').disable();
			this.form.get('height').disable();
		}
	}

	maxLimitCheck(name: any): void {
		const field = this.form.get(name);
		if (field.value !== null) {
			if (parseInt(field.value) > 2048) {
				field.setValue(2048);
			}
			if (parseInt(field.value) < 300) {
				field.setValue(300);
			}
		} else {
			field.setValue(1440);
		}
	}

	get url() {
		return this.form.get('url');
	}

	screenSize(type: string = 'w') {
		const screen = this.form.get('screen').value;
		if (screen === 'custom') {
			return type === 'h' ? this.form.get('height').value : this.form.get('width').value;
		} else {
			let size = this.screens.map(
				(data: any) => {
					return data.items.filter((s: { id: string; }) => {
						return s.id === screen;
					});
				}
			).reduce((last: string | any[], now: any) => last.concat(now));
			if (size.length) {
				size = size.reduce((now: any) => now);
				return size[type];
			}
			return type === 'h' ? 1024 : 1440;
		}
	}

	formSubmit() {
		this.screenshot = null;
		if (this.form.valid) {
			this.processing = true;
			const args = {
				url: this.form.get('url').value,
				full: this.form.get('full').value,
				quality: this.form.get('quality').value,
				width: this.screenSize('w'),
				height: this.screenSize('h'),
				type: this.urlType(),
			};
			this.showScreenShot(args);
		} else {
			this.submitted = true;
			if (this.url.value === '') {
				this.Noty.show({ 'text': 'Please enter website/tweet url to continue!' });
			} else {
				this.Noty.show({ 'text': 'Please enter a valid website/tweet url!' });
			}
			setTimeout(() => {
				this.submitted = false;
			}, 1000);
		}
	}

	handleError(error: HttpErrorResponse) {
		this.screenshot = null;
		this.processing = false;
		this.Noty.show({ 'text': 'Something bad happened; please try again later!' });
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	};

	getScreenShot(options: any): Observable<any> {
		return this.http.post(this.apiUrl, options)
			.pipe(
				catchError(this.handleError.bind(this))
			);
	}

	showScreenShot(args: any) {
		this.getScreenShot(args)
			.subscribe((data: any) => {
				this.screenshot = data.image;
				this.processing = false;
				this.toggleModal();
			});
	}

	toggleModal(): void {
		if (this.screenshot != null) {
			document.getElementById('modal').classList.add("md-show");
			setTimeout(() => {
				document.documentElement.classList.add("md-perspective");
			}, 25);
		} else {
			document.getElementById('modal').classList.remove("md-show");
			document.documentElement.classList.remove("md-perspective");
		}
	}

	closeModal(): void {
		this.screenshot = null;
		this.toggleModal();
	}

	dataURItoBlob(dataURI: string) {
		// convert base64 to raw binary data held in a string
		// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
		var byteString = atob(dataURI.split(',')[1]);

		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

		// write the bytes of the string to an ArrayBuffer
		var ab = new ArrayBuffer(byteString.length);

		// create a view into the buffer
		var ia = new Uint8Array(ab);

		// set the bytes of the buffer to the correct values
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}

		// write the ArrayBuffer to a blob, and you're done
		var blob = new Blob([ab], { type: mimeString });
		return blob;

	}

	downloadImage(): void {
		const blob = this.dataURItoBlob(this.screenshot);
		saveAs(blob, "ezy-screenshot.png");
	}

	urlType(): string {
		if (twitterRegex.test(this.url.value)) {
			return 'twitter';
		} else {
			return 'web';
		}
	}
}
