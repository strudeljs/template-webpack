import {Component} from 'strudel';

@Component('.component')
class Example {
	init() {
		this.$element.html(`
			<p>Strudel component</p>
		`);
	}
}