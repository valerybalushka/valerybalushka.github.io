export default class container {
	constructor(name) {
		
		this.canvas = document.getElementById(name);
		this.canvas.style.width = '500px';
		this.canvas.style.height = '500px';
		this.ctx = this.canvas.getContext('2d');
	}
}