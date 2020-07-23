namespace gameUtils {
    let totalScore = 0
    enum EnemyType {
		Hole, // 黑洞
		Mask, // 口罩
		Boom, // 炸弹
		Batman, // 小坏蛋
		BatmanKing, // 大坏蛋
		Logo // xwlogo
    }
    
	// 计算是否碰撞到墙体
	/**
	 * 
	 * @param p1 墙体一头坐标
	 * @param p2 墙体另一头坐标
	 * @param c 朱望仔位置
	 * @param r 墙体厚度
	 */
	export function intersect(p1, p2, c, r){
		var flag1 = (p1.x - c.x) * (p1.x - c.x) + (p1.y - c.y) * (p1.y - c.y) <= r * r;
		var flag2 = (p2.x - c.x) * (p2.x - c.x) + (p2.y - c.y) * (p2.y - c.y) <= r * r;
		if (flag1 && flag2)
			return false;
		else if (flag1 || flag2)
			return true;
		else
		{
			var A, B, C, dist1, dist2, angle1, angle2;
			A = p1.y - p2.y;
			B = p2.x - p1.x;
			C = p1.x * p2.y - p2.x * p1.y;
			dist1 = A * c.x + B * c.y + C;
			dist1 *= dist1;
			dist2 = (A * A + B * B) * r * r;
			if (dist1 > dist2)
				return false;
			angle1 = (c.x - p1.x) * (p2.x - p1.x) + (c.y - p1.y) * (p2.y - p1.y);
			angle2 = (c.x - p2.x) * (p1.x - p2.x) + (c.y - p2.y) * (p1.y - p2.y);
			return (angle1 > 0 && angle2 > 0);
		}
	}

	// 计算碰撞后的弹射矢量
	export function reflect(p1, p2, p0, dx, dy){
		var A = p2.y - p1.y;
		var B = p1.x - p2.x;
		var C = p2.x * p1.y - p1.x * p2.y;
		var D = 1 / (A * A + B * B);
		var x = (B * B * p0.x - A * B * p0.y - A * C) * D;
		var y = (A * A * p0.y - A * B * p0.x - B * C) * D;
		var nx = p0.x - x;
		var ny = p0.y - y;
		var r = 1 / Math.sqrt(nx*nx+ny*ny);
		nx *= r;
		ny *= r;
		var d = dx * nx + dy * ny;
		var vx = dx - 2 * nx * d;
		var vy = dy - 2 * ny * d;
		return [vx, vy];
    }
    
    // 创建朱望仔
	export function createPlayer(stage:ez.Stage) {
		var sprite = new ez.SubStageSprite(stage);
		var p1 = new ez.ImageSprite(sprite); // 移动的朱望仔
		var p2 = new ez.ImageSprite(sprite); // 静止的朱望仔
		p1.src = "game/playerlight";
		p2.src = "game/player";
		p1.anchorX = 0.5;
		p2.anchorX = 0.5;
		p1.anchorY = 0.66;
		p1.scale = 0.9;
		p2.anchorY = 0.7;
		sprite.scale = 0.7;
		new ez.Tween(p1).move({ opacity: [0.5, 1] }, 1000).to({ opacity: 0.5 }, 1000).config({ loop: true }).play();
		return sprite;
    }
    
    // 创建得分点,障碍物,墙体等
	export function createEnemy(e, stage: ez.Stage) {
		var s = new ez.ImageSprite(stage);
		s.anchorX = 0.5;
		s.anchorY = 0.5;
		s.x = e.x;
		s.y = e.y;
		let data:any = {};
		s["data"] = data;
		data.type = e.type;
		switch (e.type){
			case EnemyType.Hole:
				s.src = "game/hole";
				data.radius = 60;
				break;
			case EnemyType.Mask:
				s.src = "game/mask";
				data.score = 30;
				data.radius = 20;
				ez.setTimer(Math.random() * 1000, () => ez.Tween.add(s).move({scale:[0.9, 1.1]}, 1000).to({scale:0.9}, 1000).config({loop:true}).play());
				break;
			case EnemyType.Boom:
				s.src = "game/boom";
				data.score = -10;
				data.radius = 20;
				break;
			case EnemyType.Logo:
				s.src = "game/logo";
				data.score = 20;
				data.radius = 13;
				break;
			case EnemyType.Batman:
				s.src = "game/batman";
				s.scale = 0.7;
				data.score = 10;
				data.radius = 13;
				ez.setTimer(Math.random() * 1000, () => ez.Tween.add(s).move({ scale: [1, 1.2] }, 2000).to({ scale: 1 }, 2000).config({ loop: true }).play());
				ez.setTimer(Math.random() * 1000, () => ez.Tween.add(s).move({ y: [s.y, s.y + 5 * Math.random() + 5] }, 3000).to({ y: s.y }, 3000).config({ loop: true }).play());
				break;
			case EnemyType.BatmanKing:
				s.src = "game/batman";
				s.scale = 1.8;
				data.score = 100;
				data.radius = 36;
				ez.Tween.add(s).move({ scale: [1.8, 2.1] }, 2000).to({ scale: 1.8 }, 1000).config({ loop: true }).play();
				break;
		}
		return s;
    }
    
    //吃掉口罩随机消灭2个小蝙蝠
	export function shulffle(arr) {
		var seed = Date.now();
		function rand(max: number) {
			seed = (seed * 22695477 + 1) & 0x7ffffff;
			return (seed >> 16) % (max + 1);
		}
		for(var i = 0; i < arr.length; i++){
			var idx = rand(arr.length - 1);
			var t = arr[i];
			arr[i] = arr[idx];
			arr[idx] = t;
		}
    }
    
	// 游戏过程中,实时计算得分
	export async function addScore(s, n) {
		var s1 = totalScore;
		totalScore += s;
		var d = (s / 10)|0;
		for(let i = 0; i < 10; i++){
			s1 += d;
			n.score.text = `得分 ${s1}`;
			await ez.delay(30);
		}
        n.score.text = `得分 ${totalScore}`;
    }
    
    // 开始游戏
	export async function startGame(stage: ez.Stage, n, options:any = {}) {
		async function showClock() {
			n.clock.visible = true;
			var time = 10;
			n.time.text = `${time}s`;
			while(time > 0){
				n.time.text = `${time}s`;
				await ez.delay(1000);
				time--;
			}

			n.clock.visible = false;
			getMask = false;
		}
        var enemies = [];
        var player = options.player
		//ajax(`http://chenshuwei.free.idcfengye.com/openapi/statistics/add?openid=${PlayerInfo.openid}&fps=${ez.fps}`, function(){});
		var getMask = false;
		for (let i = 0; i < options.enemiesData.length; i++) {
			enemies[i] = createEnemy(options.enemiesData[i], stage);
		}
		player.x = 104;
		player.y = 144;
		var circle = new ez.ImageSprite(stage);
		circle.src = "game/circle";
		circle.anchorX = circle.anchorY = 0.5;
		circle.x = 104;
		circle.y = 144;
		new ez.Tween(circle).move({scale:[0.4, 1.2], opacity:[0.1, 0.6]}, 800).config({loop:true}).play();
		var lastPos = [104, 144];
		var chance = 5;
		// 每次循环表示玩家执行了一次拖拽操作
		while(true) {
			if (chance-- <= 0)
				break;
			let launch = new Promise<number[]>((r) => {
				options.launchResovleStatusChange && options.launchResovleStatusChange(r);
			});
			lastPos = [player.x, player.y];
			let r = await launch;
			if (circle){
				circle.dispose();
				circle = null;
			}
			n.chance.text = `机会 ${chance}`;
			options.launchResovleStatusChange && options.launchResovleStatusChange(null);
			let dx = r[0] * 0.25;
			let dy = r[1] * 0.25;
			// 每次循环表示一帧
			while(true){
				player.x += dx;
				player.y += dy;
				// 没有速度了, 朱望仔停止
				if (Math.abs(dx) < 1 && Math.abs(dy) < 1)
					break;
				// 判断是否碰到得分点
				for(let i = 0; i < enemies.length; i++){
					let e = enemies[i];
					let data = e.data;
					let dx = e.x - player.x;
					let dy = e.y - player.y;
					if (dx * dx + dy * dy < (30 + data.radius) * (30 + data.radius)) {
						let score = data.score;
						let s = new ez.LabelSprite(stage);
						s.align = ez.AlignMode.Center;
						s.anchorX = 0.5;
						s.anchorY = 1;
						s.width = 200;
						s.height = 30;
						s.x = e.x;
						s.font = "Arial 30px";
						if (data.type == EnemyType.BatmanKing && !getMask)
							score = 30;
							
						if(score > 0){
							s.text = "+" + score;
							s.gradient = {y1:30, colors:["#ff8", "#fa8"]};
						}
						else{
							s.text = "" + score;
							s.gradient = { y1: 30, colors: ["#8ff", "#8af"] };
						}
						ez.Tween.add(s).move({y:[e.y, e.y - 30], opacity: [0.5, 1]}, 300, ez.Ease.bounceOut).move({opacity:[1, 0]}, 2000).disposeTarget().play();
						addScore(score, n);
						ez.playSFX(score > 0 ? "sound/add" : "sound/lose");
						e.dispose();
						enemies.splice(i, 1);
						if (data.type == EnemyType.Mask){
							getMask = true;
							//吃掉口罩随机消灭2个小蝙蝠
							var arr = enemies.concat();
							shulffle(arr);
							for(let j = 0; j < 2; j++){
								let idx = arr.findIndex(t => t.data.type == EnemyType.Batman);
								if(idx >= 0) {
									ez.Tween.add(arr[idx]).move({opacity:[1,0]}, 800).disposeTarget().play();
									enemies.splice(enemies.indexOf(arr[idx]), 1);
									arr.splice(idx, 1);
								}
							}
							showClock();
						}
						break;
					}
				}
				// 判断是否撞到墙体
				for(let i = 0; i < options.lines.length; i++){
					let line = options.lines[i];
					if(intersect(line[0], line[1], player, 30)){
						player.x -= dx;
						player.y -= dy;
						let r = reflect(line[0], line[1], player, dx, dy);
						dx = r[0] * 0.9;
						dy = r[1] * 0.9;
						break;
					}
				}
				let hx = options.hole[0] - player.x;
				let hy = options.hole[1] - player.y;
				let dr = hx * hx + hy * hy;
				if(dr < 500){
					//掉入黑洞
					dx = 0;
					dy = 0;
					for(let i = 0; i < 30; i++){
						player.opacity = 1 - i / 30;
						await ez.nextFrame();
					}
					chance = Math.max(0, chance - 1);
					player.x = lastPos[0];
					player.y = lastPos[1];
					for (let i = 0; i <= 30; i++) {
						player.opacity = i / 30;
						await ez.nextFrame();
					}
				}
				else if(dr < 50000) {
					//黑洞引力
					dr = 1 / dr;
					hx = hx * Math.sqrt(dr);
					hy = hy * Math.sqrt(dr);
					dx += hx * 1000 * dr;
					dy += hy * 1000 * dr;
				}
				if(dx > 0.15)	
					dx -= 0.1;
				else if(dx < 0.15)
					dx += 0.1;

				if (dy > 0.15)
					dy -= 0.1;
				else if (dy < 0.15)
					dy += 0.1;
				await ez.nextFrame();
			}
		}
		options.gameOver && options.gameOver();
	}
    
    // 游戏结束执行回调,显示结束弹窗
	export async function showResult(ctx) {
		function commitScore(score) {
			return new Promise((resolve, reject) =>{
				// var key = "zxdqw";
				// var timestamp = Date.now();
				// var sign = md5.hex(`${key}openid${PlayerInfo.openid}score${score}${timestamp}`);
				// ajax(`https://xwfintech.qingke.io/openapi/pinball/add/measy?key=${key}&sign=${sign}&openid=${PlayerInfo.openid}&score=${score}&timestamp=${timestamp}`, function (e, r) {
				// 	if (r.code) {
				// 		alert(r.msg);
				// 		reject();
				// 	}
				// 	else
				// 		resolver(r.data);
				// });
				resolve() 
			});
		}
		var page = ctx.parent.createChild(game.ResultPage);
		var n = page.namedChilds;
		n.score.text = "" + totalScore;
		var data = await commitScore(totalScore);
		game.getRank(n.rankPage);
		if (data)
			n.info.text = `超过了${data}的玩家`;
		page.addEventHandler("click", function(e){
			switch (e.sender.id) {
				case "rank":
					n.rankPage.visible = true;
					break;
				case "closeRank":
					n.rankPage.visible = false;
					break;
				case "replay":
					page.parent.createChild(game.GamePage2);
					page.dispose();
					break;
				case "result":
					//ajax(`http://chenshuwei.free.idcfengye.com/openapi/statistics/add?openid=${PlayerInfo.openid}&playTime=${Date.now() - startTime}`, function () { });
					var share = page.parent.createChild(game.SharePage);
					page.dispose();
					var n1 = share.namedChilds;
					if (data)
						n1.info.text = `超过了${data}的玩家`;
					n1.name.text = "姓名：" + PlayerInfo.nickname;
					n1.score.text = "成绩：" + totalScore;
					ez.setTimer(100, function () {

						var div = document.getElementById("game");
						
						var canvas = div.getElementsByTagName("canvas")[0];
                        var png = canvas.toDataURL("image/png");
                        
						window.parent.postMessage({ msg: "show", src: png }, "*");
					});
					break;
			}

		});
		ctx.dispose();
	}
}