
//Бали за знищення астероїдів
export default class Score {
	
	constructor() {
		
		this.canv = document.getElementById('canvas');
		this.ctx = this.canv.getContext('2d');
		
		this.rating = 0;
		
	}
	
	//Малюєм табло балів
	draw() {
		this.ctx.font = "40px serif";
		this.ctx.strokeStyle = 'white';
		this.ctx.strokeText(this.rating, 25, 50);
	}
	
	//Обнуляємо бали
	restart() {
		this.rating = 0;
	}
	
}