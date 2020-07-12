import Ship from '../src/ship.js';
import Asteroids from '../src/asteroids.js'
import Colision from '../src/colision.js'


//Гра
export default class Game {
	
	constructor() {
		
		this.container = document.getElementById('content');
		this.container.style.width = '600px';
		this.container.style.height = '600px';
		
		this.canv = document.getElementById('canvas');
		this.ctx = this.canv.getContext('2d');
		
		this.init();
		
	}
  
  
	//Оголощуєм екземпляри класів
	init() {
		
		window.addEventListener('resize', () => this.onResize());
		this.onResize();

		this.ship = new Ship();
		this.asteroids = new Asteroids();
		this.colision = new Colision();

		requestAnimationFrame((time) => this.update(time));
		
	}
  
	
	//Адаптуєм розмір полотна
	onResize() {
		this.canv.width = this.container.clientWidth;
		this.canv.height = this.container.clientHeight;
	}

	update(time) {
		
		console.log('update!');
		
		this.background();
		this.ship.update();
		this.asteroids.update();
		this.colision.collisionsShip(this.ship, this.asteroids);
		this.colision.collisionsLaser(this.ship.lasers, this.asteroids);
		
		requestAnimationFrame((time) => this.update(time));
		
	}
	
	
	//Чоний фон
	background() {
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0,0,this.container.clientWidth,this.container.clientHeight);
	}
  
}