import { Component, trigger, state, style, transition, animate } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	animations: [
		trigger('divState', [
			state('normal', style({
				backgroundColor: 'red',
				transform: 'translateX(0)'
			})), // atlest two states (from to)
			state('highlighted', style({
				backgroundColor: 'blue',
				transform: 'translateX(100px)'
			})),
			transition('normal => highlighted', animate(300)),
			transition('highlighted => normal', animate(800))
		]),
		trigger('wildState', [
			state('normal', style({
				backgroundColor: 'red',
				transform: 'translateX(0) scale(1)'
			})), // atlest two states (from to)
			state('highlighted', style({
				backgroundColor: 'blue',
				transform: 'translateX(100px) scale(1)'
			})), // atlest two states (from to)
			state('shrunken', style({
				backgroundColor: 'green',
				transform: 'translateX(0) scale(0.5)'
			})),
			transition('normal => highlighted', animate(300)),
			transition('highlighted => normal', animate(800)),
			transition('shrunken <=> *', [
				style({
					backgroundColor: 'orange'
				}),
				animate(1000, style({
					borderRadius: '50px'
				})),
				animate(500)
			]) // to any state should play, array update
		]),

		//
		trigger('list1', [
			state('in', style({
				opacity: 1,
				transform: 'translateX(0)'
			})), // atlest two states (from to)
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-100px)'
				}),
				animate(300)
			]),
			transition('* => void', [
				animate(300, style({
					opacity: 0,
					transform: 'translateX(100px)'
				}))
			]),
		]),
	]
})
export class AppComponent {
	state = 'normal'
	wildState = 'normal'
	list = ['Milk', 'Sugar', 'Bread'];

	onAnimate() {
		this.state = this.state == 'normal' ? 'highlighted' : 'normal';
		this.wildState = this.wildState == 'normal' ? 'highlighted' : 'normal';

	}

	onShrink() {
		this.wildState = 'shrunken';
	}

	onAdd(item) {
		this.list.push(item);
	}

	onDelete(item) {
		this.list.splice(this.list.indexOf(item), 1);
	}
}
