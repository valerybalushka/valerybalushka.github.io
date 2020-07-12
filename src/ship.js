import Laser from '../src/laser.js'

export default class Ship {
	
	constructor() {
		
		this.canv = document.getElementById('canvas');
		this.ctx = this.canv.getContext('2d');
		
		this.FPS = 30; 
        this.FRICTION = 0.5; 
        this.SHIP_SIZE = 30; 
        this.SHIP_THRUST = 5; 
        this.TURN_SPEED = 180; 
		this.SHIP_BLINK_DUR = 0.3;

		this.LASER_MAX = 5;
		this.canShoot = true;
		this.lasers = [];
		
		this.SHOW_BOUNDING = false;
		
		this.restart();
		
		this.init();

	}
	
	//Старт кораблика
	restart() {
		
		this.x = this.canv.width / 2;
		this.y = this.canv.height / 2;
		this.r = this.SHIP_SIZE / 2;
		this.a = 90 / 180 * Math.PI;
		this.rot = 0;
		this.thrusting = {
			forward: false,
			back: false
		};
		this.thrust = {
			x: 0,
			y: 0
		};
		
		this.exploading = true;
		this.blinkNum = 5;
		this.blinkTime = Math.ceil(this.SHIP_BLINK_DUR * this.FPS);
		
		this.blinkShip();
		
	}
	
	//Ініціалізація подій
	init() {
		window.addEventListener('keydown', e => this.keydown(e));
		window.addEventListener('keyup', e => this.keyup(e));
	}
	
	// Управління корабликом
	keydown(e) {
		
		switch (e.keyCode) {
			case 32: 
				this.shootLaser();
				break;
			case 37:
				this.rot = this.TURN_SPEED / 180 * Math.PI / this.FPS;
				break;
			case 38:
				this.thrusting.forward = true;
				break;
			case 39:
				this.rot = -this.TURN_SPEED / 180 * Math.PI / this.FPS;
				break;
			case 40:
				this.thrusting.back = true;
				break;
        }
		
	}
	
	//Постріли кораблика
	shootLaser() {
		if (this.canShoot && this.lasers.length < this.LASER_MAX) {
			this.lasers.push(new Laser(this.x, this.y, this.r, this.a));
			this.canShoot = false;
		}
	}
	
	//Зупинка кораблика
	keyup(e) {
		
		switch(e.keyCode) {
			case 32:
				this.canShoot = true;
				break;
			case 37:
				this.rot = 0;
				break;
			case 38:
				this.thrusting.forward = false;
				break;
			case 39:
				this.rot = 0;
				break;
			case 40:
				this.thrusting.back = false;
				break;
        }
		
	}
	
	update() {
		
		if (!this.exploading)
			this.draw();
		else 
			this.blinkShip();
		this.move();
		this.rotate();
		this.handleEdge();
		
		this.drawLaser();
		this.destroyLaser();
	
	}
	
	//Малюєм кораблик
	draw() {

		this.ctx.fillStyle = "white";
		this.ctx.lineWidth = this.SHIP_SIZE / 20;
		this.ctx.beginPath();
		this.ctx.moveTo( 
			this.x + 4 / 3 * this.r * Math.cos(this.a),
			this.y - 4 / 3 * this.r * Math.sin(this.a)
		);
		this.ctx.lineTo( 
			this.x - this.r * (2 / 3 * Math.cos(this.a) + Math.sin(this.a)),
			this.y + this.r * (2 / 3 * Math.sin(this.a) - Math.cos(this.a))
		);
		this.ctx.lineTo(
			this.x - this.r * (2 / 3 * Math.cos(this.a) - Math.sin(this.a)),
			this.y + this.r * (2 / 3 * Math.sin(this.a) + Math.cos(this.a))
		);
		this.ctx.closePath();
		this.ctx.fill();
		
		if (this.SHOW_BOUNDING) {
			this.ctx.strokeStyle = "lime";
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
			this.ctx.stroke();
		}
		
	}
	
	//Рух
	move() {
		
		if (this.thrusting.forward) {
			this.thrust.x += this.SHIP_THRUST * Math.cos(this.a) / this.FPS;
			this.thrust.y -= this.SHIP_THRUST * Math.sin(this.a) / this.FPS;
		} else {
			this.thrust.x -= this.FRICTION * this.thrust.x / this.FPS;
			this.thrust.y -= this.FRICTION * this.thrust.y / this.FPS;
		}
		
		if (this.thrusting.back) {
			this.thrust.x -= (this.SHIP_THRUST * Math.cos(this.a) / this.FPS) * 0.75;
			this.thrust.y += (this.SHIP_THRUST * Math.sin(this.a) / this.FPS) * 0.75;
		} else {
			this.thrust.x -= this.FRICTION * this.thrust.x / this.FPS;
			this.thrust.y -= this.FRICTION * this.thrust.y / this.FPS;
		}
		
		this.x += this.thrust.x;
		this.y += this.thrust.y;
		
	}
	
	//Поворот
	rotate() {
		this.a += this.rot;	
	}
	
	//Малюєм лазер
	drawLaser() {
		for (let i = 0; i < this.lasers.length; i++)
			this.lasers[i].update();
	}
	
	//Знищуєм лазер за межами вікна
	destroyLaser() {
		for (let i = this.lasers.length-1; i > -1; i--)
		if (this.lasers[i].dist > this.canv.width) {
			this.lasers.splice(i, 1);
			continue;
		}
	}

	//Обробка події якщо кораблик вилетить за межі вікна
	handleEdge() {
		
		if (this.x < 0 - this.r)
			this.x = this.canv.width + this.r;
		else if (this.x > this.canv.width + this.r)
			this.x = 0 - this.r;
		
		if (this.y < 0 - this.r)
			this.y = this.canv.height + this.r;
		else if (this.y > this.canv.height + this.r)
			this.y = 0 - this.r;
		
	}
	
	//Блимання кораблика на старті і при зіткнені
	blinkShip() {
		
		this.blinkTime--;
		
		if (this.blinkTime == 0) {
			this.blinkTime = Math.ceil(this.SHIP_BLINK_DUR * this.FPS);
			this.blinkNum--;
		}
		
		if(this.blinkNum % 2 == 0)
			this.draw();
		
		if(this.blinkNum == 0)
			this.exploading = false;
		
	}
  
}