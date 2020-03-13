import { Component, OnInit } from "@angular/core";
declare var lightGallery: any;
declare var Masonry: any;

@Component({
	selector: "app-examples",
	templateUrl: "./examples.component.html",
	styleUrls: ["./examples.component.scss"]
})
export class ExamplesComponent implements OnInit {
	numbers: any;

	constructor() {
		this.numbers = Array(15).fill(0).map((x, i) => i + 1);
	}

	ngOnInit(): void {

		window.addEventListener("load", () => {
			const elem = document.querySelector(".example-images .row");
			new Masonry(elem, {
				itemSelector: ".grid-item",
				percentPosition: true,
			});

			lightGallery(document.querySelector(".example-images"), {
				selector: "a"
			});
		});

	}

}
