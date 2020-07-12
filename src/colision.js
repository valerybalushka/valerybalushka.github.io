
//Клас обробляє події зіткнення
export default class Colision {
	
	
	//Обробка події зіткнення кораблика і астероїда
	collisionsShip(ship, asteroids) {
		
		if(!ship.exploading)
		for(let i = 0; i < asteroids.roids.length; i++) {
			if(this.distBetweenPoints(ship.x, ship.y, asteroids.roids[i].x,
			asteroids.roids[i].y) < ship.r + asteroids.roids[i].r) {
				ship.restart();
				asteroids.restart();
			}
		}
		
	}
	
	//Обробка події зіткнення пулі і астероїда
	collisionsLaser(lasers, asteroids) {

		let ax, ay, ar, lx, ly;
		for(let i = asteroids.roids.length - 1; i > -1; i--) {

			ax = asteroids.roids[i].x;
			ay = asteroids.roids[i].y;
			ar = asteroids.roids[i].r;

			for(let j = lasers.length - 1; j > -1; j--) {

				lx = lasers[j].x;
				ly = lasers[j].y;

				if (this.distBetweenPoints(ax, ay, lx, ly) < ar) {
					lasers.splice(j,1);
					asteroids.destroyAsteroid(i);
					break;
					
				}
				
			}
		}
		
	}
	
	
	//Визначаєм відстань між двома точками
	distBetweenPoints(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}
	
}