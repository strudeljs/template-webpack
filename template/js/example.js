import { Component } from 'strudel';

@Component('.example')
class Example {
	init() {
		this.$element.html(`
			<p>Hello world!</p>
		`);
	}
}