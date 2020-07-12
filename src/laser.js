
//Лазер
export default class Laser {
	
	constructor(x, y, r, a) {
		
		this.canv = document.getElementById('canvas');
		this.ctx = this.canv.getContext('2d');
		
		this.FPS = 30;
		this.LASER_SPD = 500;
		
		this.x = x + 4 / 3 * r * Math.cos(a);
		this.y = y - 4 / 3 * r * Math.sin(a);
		
		this.xv = this.LASER_SPD * Math.cos(a) / this.FPS;
		this.yv = -this.LASER_SPD * Math.sin(a) / this.FPS;
		this.dist = 0;

	}
	
	update() {
		this.draw();
		this.move();
		this.distance();
	}
	
	//Малюєм лазер
	draw() {
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc( this.x, this.y, 2, 0, Math.PI * 2, false);
		this.ctx.fill();
	}
	
	//Рух пострілу
	move() {
		this.x += this.xv;
		this.y += this.yv;
	}
	
	//Визначаєм відстань пострілу
	distance() {
		this.dist += Math.sqrt(Math.pow(this.xv, 2) + Math.pow(this.yv, 2));
	}
}