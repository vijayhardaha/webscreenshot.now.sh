import { Injectable } from '@angular/core';
declare var Noty: any;
declare var mojs: any;

@Injectable({
	providedIn: 'root'
})
export class NotyService {

	defaults: any = {
		text: 'I\'m an example notification.',
		type: 'info',
		theme: 'mint',
		layout: 'topRight',
		timeout: 3000,
		animation: {
			open: function (promise) {
				var n = this;
				var Timeline = new mojs.Timeline();
				var body = new mojs.Html({
					el: n.barDom,
					x: { 500: 0, delay: 0, duration: 500, easing: 'elastic.out' },
					isForce3d: true,
					onComplete: function () {
						promise(function (resolve) {
							resolve();
						})
					}
				});

				var parent = new mojs.Shape({
					parent: n.barDom,
					width: 200,
					height: n.barDom.getBoundingClientRect().height,
					radius: 0,
					x: { [150]: -150 },
					duration: 1.2 * 500,
					isShowStart: true
				});

				n.barDom.style['overflow'] = 'visible';
				parent.el.style['overflow'] = 'hidden';

				var burst = new mojs.Burst({
					parent: parent.el,
					count: 10,
					top: n.barDom.getBoundingClientRect().height + 75,
					degree: 90,
					radius: 75,
					angle: { [-90]: 40 },
					children: {
						fill: '#fff',
						delay: 'stagger(500, -50)',
						radius: 'rand(8, 25)',
						direction: -1,
						isSwirl: true
					}
				});

				var fadeBurst = new mojs.Burst({
					parent: parent.el,
					count: 2,
					degree: 0,
					angle: 75,
					radius: { 0: 100 },
					top: '90%',
					children: {
						fill: '#fff',
						pathScale: [.65, 1],
						radius: 'rand(12, 15)',
						direction: [-1, 1],
						delay: .8 * 500,
						isSwirl: true
					}
				});

				Timeline.add(body, burst, fadeBurst, parent);
				Timeline.play();
			},
			close: function (promise) {
				var n = this;
				new mojs.Html({
					el: n.barDom,
					x: { 0: 500, delay: 10, duration: 500, easing: 'cubic.out' },
					skewY: { 0: 10, delay: 10, duration: 500, easing: 'cubic.out' },
					isForce3d: true,
					onComplete: function () {
						promise(function (resolve) {
							resolve();
						})
					}
				}).play();
			}
		}
	};

	constructor() { }

	extend(defaults: any, options: any) {
		var extended = {};
		var prop;
		for (prop in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
				extended[prop] = defaults[prop];
			}
		}
		for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	};

	show(args: any): void {
		args = args || {};
		args = this.extend(this.defaults, args);
		new Noty(args).show()
	}
}
