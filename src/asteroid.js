export default class Asteroid {
	
	constructor(x, y, ROID_SIZE) {
		
		this.canv = document.getElementById('canvas');
		this.ctx = this.canv.getContext('2d');
		
        this.FPS = 30; 
        this.ROID_JAG = 0.4; 
        this.ROID_SIZE = ROID_SIZE;
        this.ROID_SPD = 50;
        this.ROID_VERT = 10;
        this.SHIP_SIZE = 30;
		this.TURN_SPEED = 45;

 		this.SHOW_BOUNDING = false;

		this.x = x;
		this.y = y;
		this.rog = 0;
		this.side = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
		this.xv = Math.random() * this.ROID_SPD / this.FPS * (Math.random() < 0.5 ? 1 : -1);
		this.yv = Math.random() * this.ROID_SPD / this.FPS * (Math.random() < 0.5 ? 1 : -1);
		this.r = this.ROID_SIZE / 2;
		this.a = Math.random() * Math.PI * 2;
		this.vert = Math.floor(Math.random() * (this.ROID_VERT + 1) + this.ROID_VERT / 2);
		this.offs = [];

		for (let i = 0; i < this.vert; i++)
			this.offs.push(Math.random() * this.ROID_JAG * 2 + 1 - this.ROID_JAG);
		
	}
	
	//Малюєм астероїд
	draw() {
	
		this.ctx.strokeStyle = "slategrey";
		this.ctx.lineWidth = 1.5;
		
		this.ctx.beginPath();
		this.ctx.moveTo(
			this.x + this.r * this.offs[0] * Math.cos(this.a),
			this.y + this.r * this.offs[0] * Math.sin(this.a)
		);

		for (let j = 1; j < this.vert; j++) {
			this.ctx.lineTo(
				this.x + this.r * this.offs[j] * Math.cos(this.a + j * Math.PI * 2 / this.vert),
				this.y + this.r * this.offs[j] * Math.sin(this.a + j * Math.PI * 2 / this.vert)
			);
		}
		this.ctx.closePath();
		this.ctx.stroke();
		
		if(this.SHOW_BOUNDING) {
			this.ctx.strokeStyle = "lime";
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
			this.ctx.stroke();
		}
	
	}
	
	//Рух астроїда
	move() {
		this.x += this.xv;
		this.y += this.yv;
		this.a += (this.r * this.side) / 180 * Math.PI / this.FPS;
	}
	
	//Обробка подій якщо астероїд вилетить за межі
	handleEdge() {
		
		if (this.x < 0 - this.r)
			this.x = this.canv.width + this.r;
		else if (this.x > this.canv.width + this.r)
			this.x = 0 - this.r
			
		if (this.y < 0 - this.r) 
			this.y = this.canv.height + this.r;
		else if (this.y > this.canv.height + this.r)
			this.y = 0 - this.r
		
	}

}