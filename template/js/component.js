import {Component} from 'strudel';

@Component('.component')
class Example {
	init() {
		this.element.html(`
			<img src="assets/strudel.png">
			<p>Strudel component</p>
		`);
	}
}