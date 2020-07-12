import Asteroid from '../src/asteroid.js'
import Score from '../src/score.js'


//Клас керує всіма астероїдами
export default class Asteroids {
	
	constructor() {
		
		this.canv = document.getElementById('canvas');
		this.ctx = this.canv.getContext('2d');
		
        this.ROID_NUM = 5;
        this.ROID_SIZE = 100;
		
		this.roids = [];
		this.createAsteroids();
		
		this.score = new Score();
		
	}

	//Створюєм астероїди
	createAsteroids() {	
	
		this.roids = [];
		let x, y, del;
		for (let i = 0; i < this.ROID_NUM; i++) {
			
			del = Math.round(Math.random()) == 0 ? 1 : Math.round(Math.random()) == 0 ? 2 : 4;
			x =  Math.floor(Math.random() * 2) == 0 ? 0 - this.ROID_SIZE / del : this.canv.width + this.ROID_SIZE / del;
			y =  Math.floor(Math.random() * 2) == 0 ? 0 - this.ROID_SIZE / del : this.canv.height + this.ROID_SIZE / del;
			
			this.roids.push(new Asteroid(x, y, this.ROID_SIZE / del));
		}
		
	}

	update() {
		for (var i = 0; i < this.roids.length; i++) {
			this.roids[i].draw();
			this.roids[i].move();
			this.roids[i].handleEdge();	
		}
		
		this.score.draw();
	}

	//Великі астероїди розпадаються на уламки, маленькі астероїди знищуються
	destroyAsteroid(index) {
		
		let x = this.roids[index].x;
		let y = this.roids[index].y;
		let ROID_SIZE = this.roids[index].ROID_SIZE;

		if (ROID_SIZE == this.ROID_SIZE) {
			this.roids.push(new Asteroid(x, y, Math.ceil(this.ROID_SIZE / 2)));
			this.roids.push(new Asteroid(x, y, Math.ceil(this.ROID_SIZE / 2)));
			
			this.score.rating += 40;
		} else if (ROID_SIZE == this.ROID_SIZE / 2) {
			this.roids.push(new Asteroid(x, y, Math.ceil(this.ROID_SIZE / 4)));
			this.roids.push(new Asteroid(x, y, Math.ceil(this.ROID_SIZE / 4)));
			
			this.score.rating += 20;
		} else {	
			let x, y;
			
			x =  Math.floor(Math.random() * 2) == 0 ? 0 - this.ROID_SIZE / 2 : this.canv.width + this.ROID_SIZE / 2;
			y =  Math.floor(Math.random() * 2) == 0 ? 0 - this.ROID_SIZE / 2 : this.canv.height + this.ROID_SIZE / 2;
			
			this.roids.push(new Asteroid(x, y, Math.ceil(this.ROID_SIZE)));
			
			this.score.rating += 10;
		}
		
		this.roids.splice(index, 1);
		
	}
	
	//Рестарт астероїдів і обнулення балів
	restart() {
		this.createAsteroids();
		this.score.restart();
	}
	
}