window.onload = ()=> {
	
	var config = {
		type: Phaser.AUTO,
		parent: 'parent',
		width: 700,
		height: 800,
		scale: {
			autoCenter: Phaser.Scale.CENTER_BOTH,
			mode: Phaser.Scale.FIT,
			height: 800,
			width: 700
		},
		scene: {
			preload: preload,
			create: create,
			update: update
		}
	};
	
	var game = new Phaser.Game(config);
	var createThis,
	gameSize = 7,
	gameArray = [],	
	removeArray = [],	
	emitter = [],
	shadow = [],
	textScore, score,
	bgMute, bgSound, 
	bgScore, bgRestart,
	textTimer, timer,
	pickedOrb, selectedOrb,
	canPick, font;
	
	function preload () {
		
		this.load.image('background', 'assets/backgrounds/background.jpg');
		this.load.image('bg-black', 'assets/backgrounds/bg-black.png');
		this.load.image('bg-green', 'assets/backgrounds/bg-green.png');
		this.load.image('big-shadow', 'assets/backgrounds/big-shadow.png');
		this.load.image('donut', 'assets/backgrounds/donut.png');
		this.load.image('donuts_logo', 'assets/backgrounds/donuts_logo.png');
		this.load.image('text-timeup', 'assets/backgrounds/text-timeup.png');
		this.load.image('btn-play', 'assets/backgrounds/btn-play.png');
		
		this.load.image('bg-score', 'assets/bg-score.png');
		this.load.image('shadow', 'assets/game/shadow.png');
		this.load.image('btn-sfx', 'assets/btn-sfx.png');
		this.load.image('btn-restart', 'assets/btn-restart.png');
		this.load.image('bg-table', 'assets/bg-table.png');
		
		this.load.image('gem-01', 'assets/game/gem-01.png');
		this.load.image('gem-02', 'assets/game/gem-02.png');
		this.load.image('gem-03', 'assets/game/gem-03.png');
		this.load.image('gem-04', 'assets/game/gem-04.png');
		this.load.image('gem-05', 'assets/game/gem-05.png');
		this.load.image('gem-06', 'assets/game/gem-06.png');
		this.load.image('gem-07', 'assets/game/gem-07.png');
		this.load.image('gem-08', 'assets/game/gem-08.png');
		this.load.image('gem-09', 'assets/game/gem-09.png');
		this.load.image('gem-10', 'assets/game/gem-10.png');
		this.load.image('gem-11', 'assets/game/gem-11.png');
		this.load.image('gem-12', 'assets/game/gem-12.png');
	
		this.load.image('particle_ex1', 'assets/particles/particle_ex1.png');
		this.load.image('particle_ex2', 'assets/particles/particle_ex2.png');
		this.load.image('particle_ex3', 'assets/particles/particle_ex3.png');
		this.load.image('particle-1', 'assets/particles/particle-1.png');
		this.load.image('particle-2', 'assets/particles/particle-2.png');
		this.load.image('particle-3', 'assets/particles/particle-3.png');
		this.load.image('particle-4', 'assets/particles/particle-4.png');
		this.load.image('particle-5', 'assets/particles/particle-5.png');
	
		this.load.audio('background', 'audio/background.mp3');
		this.load.audio('kill', 'audio/kill.mp3');
		this.load.audio('select-1', 'audio/select-1.mp3');
		this.load.audio('select-2', 'audio/select-2.mp3');
		this.load.audio('select-3', 'audio/select-3.mp3');
		this.load.audio('select-4', 'audio/select-4.mp3');
		this.load.audio('select-5', 'audio/select-5.mp3');
		this.load.audio('select-6', 'audio/select-6.mp3');
	
	}

	font = {
		fontFamily: 'Times New Roman',
		fontSize: '50px',
		color: '#FFFFFF'
	}

	function create() {
		
		this.sound.setVolume(0.1);
		createThis = this;
		score = 0;
		
		bgSound = this.sound.add('background');
		bgSound.setLoop(true);
		bgSound.play()
		
		//Фон
		this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(100*gameSize, 100*gameSize+100);
		
		//Бали
		bgScore = this.add.image(0, 0, 'bg-score').setScale(0.6).setOrigin(0).setDepth(1);
		textScore = this.add.text(158.7, 32, score, font).setDepth(1);
		textScore.x -= textScore.width/2;
		
		//Музика
		bgMute = this.add.image(bgScore.x+bgScore.displayWidth, 8, 'btn-sfx').setScale(0.6).setOrigin(0).setDepth(1);
		bgMute.setInteractive().on('pointerdown', ()=>{
			if(bgSound.isPlaying) {
				bgMute.setTint(0xFF0000);
				bgSound.stop();
			} else {
				bgMute.setTint(0xFFFFFF);	
				bgSound.play();
			}
		});

		//Перезапуск
		bgRestart = this.add.image(bgMute.x+bgMute.displayWidth, 10, 'btn-restart').setScale(0.8).setAlpha(0.9).setOrigin(0).setDepth(1);
		bgRestart.setInteractive().on('pointerdown', ()=>{
		});
		
		//Таймер
		this.add.image(685, 15 , 'bg-table').setOrigin(1,0).setDepth(1);
		timer = this.time.delayedCall(60000, ()=> {});
		textTimer = this.add.text(570, 23, timer, font).setDepth(1);
		
		//Створення текстур
		drawGame();
		
		input();
	}
	
	function update(time, delta) {
		showTimer();
	}

	//Запуск
	function drawGame() {

		for(let i=0; i<gameSize; i++) {
			emitter[i] = [];
			shadow[i] = [];
			gameArray[i] = [];
		for(let j=0; j<gameSize; j++){
			emitter[i][j] = createThis.add.particles('particle-'+Phaser.Math.Between(1, 5)).createEmitter({
				x: 50+100*i, 
				y: 150+100*j,
				speed: 250,
				scale: {start: 0.5, end: 0},
				quantity: 50, 
				lifespan: 1000,
				blendMode: 'ADD'
			}).stop();
			shadow[i][j] = createThis.add.image(60+100*i, 160+100*j, 'shadow').setDisplaySize(100, 100);	
			gameArray[i][j] = createThis.add.image(50+100*i, 150+100*j, makeGem()).setDisplaySize(100, 100).setScale(1);
		}}
		
		for(let i=0; i<gameSize; i++)
		for(let j=0; j<gameSize; j++)
		while(isMatch(i, j)) gameArray[i][j].setTexture(makeGem());
		
		selectedOrb = null;
		canPick = true;
		
	}

	function makeGem() {
		
		let temp = Phaser.Math.Between(1, 100);
		if(temp<=5) {
			temp = Phaser.Math.Between(7, 12);
			return temp<10?'gem-0'+temp:'gem-'+temp;
		} else {
			temp = Phaser.Math.Between(1, 6);
			return 'gem-0'+temp;
		}
		
	}

	function isMatch(i, j) {
		return getColor(i, j)==getColor(i, j-1)&&getColor(i, j)==getColor(i, j+1)||
		getColor(i, j)==getColor(i-1, j)&&getColor(i, j)==getColor(i+1, j);
	}

	function getColor(i, j) {
		if(i<0||i>=gameSize||j<0||j>=gameSize) return false;
		return gameArray[i][j].frame.texture.key;
	}

	function input() {
		
		createThis.input.setDefaultCursor('url(assets/game/hand.cur) 18 5, pointer');
		createThis.input.on('pointerdown', (event)=>{
			gemDown(event);
		}).on('pointerup', (event)=>{
			gemUp(event);
		});
	}
	
	//Обирати пончик
	function gemDown(event) {

		if(canPick) {
			let orb = {
				x: Math.floor(event.downX/100),
				y: Math.floor(event.downY/100)-1
			};
			
			if(bord(orb)) {
				
				let sound = 'select-'+Phaser.Math.Between(1, 6);
				createThis.sound.add(sound).play();	
			
				if(selectedOrb==null) {
					selectedOrb = orb;
					
					createThis.add.tween({
						targets: [gameArray[selectedOrb.x][selectedOrb.y],shadow[selectedOrb.x][selectedOrb.y]],
						scale: 1.1,
						duration: 100
					});
				} else {
					pickedOrb = orb;
					
					if(areNext(selectedOrb, pickedOrb)) swap(selectedOrb, pickedOrb, true);

					createThis.add.tween({
						targets: [gameArray[selectedOrb.x][selectedOrb.y],shadow[selectedOrb.x][selectedOrb.y]],
						scale: 1,
						duration: 100
					});
					
					selectedOrb = null;
				}
			}
		}
		
	}
	
	function gemUp(event) {

		if(canPick) {
			let orb = {
				x: Math.floor(event.upX/100),
				y: Math.floor(event.upY/100)-1
			};
			
			if(selectedOrb&&bord(orb)) {
				
				pickedOrb = orb;
				
				if(areNext(selectedOrb, pickedOrb)) {
					swap(selectedOrb, pickedOrb, true);

					createThis.add.tween({
						targets: [gameArray[selectedOrb.x][selectedOrb.y],shadow[selectedOrb.x][selectedOrb.y]],
						scale: 1,
						duration: 100
					});
					
					selectedOrb = null;
				}
			}
		}
		
	}
	
	function bord(orb) {
		return orb.x>-1&&orb.x<gameSize&&orb.y>-1&&orb.y<gameSize;
	}
	
	function areNext(orb1, orb2) {
		return  Math.abs(orb1.x-orb2.x)+Math.abs(orb1.y-orb2.y)==1;
	}
	
	//Перестановка
	function swap(orb1, orb2, swapBack) {
		
		canPick = false;

		let temp;
		temp = {x: 50+100*orb1.x, y: 150+100*orb1.y};
		gameArray[orb1.x][orb1.y].setPosition(50+100*orb2.x, 150+100*orb2.y);
		gameArray[orb2.x][orb2.y].setPosition(temp.x, temp.y);
		
		shadow[orb1.x][orb1.y].setPosition(60+100*orb2.x, 160+100*orb2.y);
		shadow[orb2.x][orb2.y].setPosition(temp.x+10, temp.y+10);
		
		temp = gameArray[orb1.x][orb1.y].frame.texture.key;
		gameArray[orb1.x][orb1.y].setTexture(gameArray[orb2.x][orb2.y].frame.texture.key);
		gameArray[orb2.x][orb2.y].setTexture(temp);
		
		createThis.add.tween({			
			targets: shadow[orb1.x][orb1.y],
			x: 60+100*orb1.x,
			y: 160+100*orb1.y,
			duration: 500,
			ease: 'Power1'
		});
		createThis.add.tween({			
			targets: shadow[orb2.x][orb2.y],
			x: 60+100*orb2.x,
			y: 160+100*orb2.y,
			duration: 500,
			ease: 'Power1'
		});
		
		createThis.add.tween({			
			targets: gameArray[orb1.x][orb1.y],
			x: 50+100*orb1.x,
			y: 150+100*orb1.y,
			duration: 500,
			ease: 'Power1'
		});
		temp = createThis.add.tween({			
			targets: gameArray[orb2.x][orb2.y],
			x: 50+100*orb2.x,
			y: 150+100*orb2.y,
			duration: 500,
			ease: 'Power1',
			onComplete: ()=> {}
		});
		
		temp.callbacks.onComplete.func = ()=> {
			if(match(orb1, orb2)&&swapBack)
				swap(orb1, orb2, false);
		}
		
	}
	
	function gem7(orb1, orb2) {
		
		let temp; 
		if(getColor(orb1.x, orb1.y)=='gem-07') temp = getColor(orb2.x, orb2.y);
		else if(getColor(orb2.x, orb2.y)=='gem-07') temp = getColor(orb1.x, orb1.y);
		
		if(temp) {
			removeArray[orb1.x][orb1.y] = 1;
			removeArray[orb2.x][orb2.y] = 1;
			
			for(let i=0; i<gameSize; i++)
			for(let j=0; j<gameSize; j++)
				if(temp==getColor(i, j))
					removeArray[i][j] = 1;
		}
		
	}
	
	function gem8(orb1, orb2) {
		
		let temp = [];
		if(getColor(orb1.x, orb1.y)=='gem-08') temp.push(orb1);
		if(getColor(orb2.x, orb2.y)=='gem-08') temp.push(orb2);
		
		if(temp)
		for(let i=0; i<temp.length; i++) {
			removeHorizontal(temp[i]);
			removeVertical(temp[i]);
		}
		
	}

	function gem9(orb1, orb2) {
		
		let temp = [];
		if(getColor(orb1.x, orb1.y)=='gem-09') temp.push(orb1);
		if(getColor(orb2.x, orb2.y)=='gem-09') temp.push(orb2);
		
		if(temp)
		for(let i=0; i<temp.length; i++)
			removeVertical(temp[i]);
		
	}
	
	function gem10(orb1, orb2) {
		
		let temp = []
		if(getColor(orb1.x, orb1.y)=='gem-10') temp.push(orb1);
		if(getColor(orb2.x, orb2.y)=='gem-10') temp.push(orb2);
		
		if(temp)
		for(let i=0; i<temp.length; i++)
			removeHorizontal(temp[i]);
		
	}
	
	function removeVertical(temp) {
		for(let j=0; j<gameSize; j++)
			removeArray[temp.x][j] = 1;
	}

	function removeHorizontal(temp) {
		for(let i=0; i<gameSize; i++)
			removeArray[i][temp.y] = 1;
	}
	
	function gem11() {
		for(let i=0; i<gameSize; i++)
		for(let j=0; j<gameSize; j++)
		if(getColor(i, j)=='gem-11')
		if(removeArray[i-1][j]||removeArray[i+1][j]||removeArray[i][j-1]||removeArray[i][j+1]) {
			removeArray[i][j] = 1;
		
			timer.elapsed -= 5000;
		}
	}

	function gem12() {
		for(let i=0; i<gameSize; i++)
		for(let j=0; j<gameSize; j++)
		if(getColor(i, j)=='gem-12')
		if(removeArray[i-1][j]||removeArray[i+1][j]||removeArray[i][j-1]||removeArray[i][j+1]) {
			removeArray[i][j] = 1;
			
			for(let x=0; x<gameSize; x++)
			for(let y=0; y<gameSize; y++) {
				if(removeArray[x][y]) {
					score++;
					showScore();
				}
			}
		}
	}

	function match(orb1, orb2) {
		
		clearRemoveArray();
		vertical();
		horizontal();
		
		if(orb1&&orb2) {
			gem7(orb1, orb2);
			gem8(orb1, orb2);
			gem9(orb1, orb2);
			gem10(orb1, orb2);
		}
		gem11();
		gem12();
		
		for(let i=0; i<gameSize; i++)
		for(let j=0; j<gameSize; j++)
		if(removeArray[i][j]) { 
			refreshOrb();
			return;
		}
		
		canPick = true;
		return true;
		
	}
	
	function clearRemoveArray() {
		for(let i=-1; i<gameSize+1; i++){
			removeArray[i] = [];
			for(let j=-1; j<gameSize+1; j++)
				removeArray[i][j] = 0;
		}
	}
	
	function horizontal() {
		
		for(let j=0; j<gameSize; j++) {
			let currentColor = 0;
			let colorStreak = 0;
			let startStreak = 0;
			
			for(let i=0; i<gameSize; i++) {
				if(getColor(i, j)==currentColor) colorStreak++;
				if(getColor(i, j)!=currentColor||i==gameSize-1) {
					if(colorStreak>=3) {
						for(let k=0; k<colorStreak; k++)
						removeArray[startStreak+k][j] = 1;
					}
					startStreak = i;
					colorStreak = 1;
					currentColor = getColor(i, j);
				}
			}
		}
		
	}
	
	function vertical() {
		
		for(let i=0; i<gameSize; i++) {
			let currentColor = 0;
			let colorStreak = 0;
			let startStreak = 0;
			
			for(let j=0; j<gameSize; j++) {
				if(getColor(i, j)==currentColor) colorStreak++;
				if(getColor(i, j)!=currentColor||j==gameSize-1) {
					if(colorStreak>=3) {
						for(let k=0; k<colorStreak; k++)
						removeArray[i][startStreak+k] = 1;
					}
					startStreak = j;
					colorStreak = 1;
					currentColor = getColor(i, j);
				}
			}
		}
		
	}
	
	function refreshOrb() {
		
		createThis.sound.add('kill').play();
		
		let temp;
		for(let i=0; i<gameSize; i++)
		for(let j=0; j<gameSize; j++)
		if(removeArray[i][j]) {
			temp = createThis.add.tween({
				targets: [gameArray[i][j],shadow[i][j]],
				alpha: 0,
				duration: 250,
				onComplete: ()=> {}
			});
			
			createThis.add.tween({
				targets: emitter[i][j],
				duration: 1000,
				onStart: ()=> { emitter[i][j].start() },
				onComplete: ()=> { emitter[i][j].stop() }
			});
			
			score++;
			showScore();
		}
	
		temp.callbacks.onComplete.func = ()=> {
			for(let i=0; i<gameSize; i++)
			for(let j=0, k=1; j<gameSize; j++)
			if(removeArray[i][j]) {
				shadow[i][j].destroy();
				shadow[i].splice(j,1);
				shadow[i].unshift(createThis.add.image(60+100*i, 60-100*k, 'shadow'));
				
				gameArray[i][j].destroy();
				gameArray[i].splice(j,1);
				gameArray[i].unshift(createThis.add.image(50+100*i, 50-100*k++, makeGem()));
			}
			
			orbFall();
		}
		
	}
	
	function orbFall() {
		
		let temp;
		for(let i=0; i<gameSize; i++)
		for(let j=0; j<gameSize; j++) {
			createThis.add.tween({
				targets: shadow[i][j],
				y: 160+100*j,
				duration: 1000
			});
			
			temp = createThis.add.tween({
				targets: gameArray[i][j],
				y: 150+100*j,
				duration: 1000,
				onComplete: ()=> {}
			});
		}
		
		temp.callbacks.onComplete.func = ()=> {
			match();
		}
		
	}

	//--------------------------------------------------
	
	//Таймер
	function showTimer() {
		textTimer.setText(60-Math.floor(timer.getElapsedSeconds()));
		textTimer.x = 600-textTimer.width/2;
	}

	//Бали
	function showScore() {
		textScore.setText(score);
		textScore.x = 158.7-textScore.width/2;
	}
	
}