import {Component} from 'strudel';

@Component('.component')
class Example {
	init() {
		this.element.text('Example strudel component');
	}
}