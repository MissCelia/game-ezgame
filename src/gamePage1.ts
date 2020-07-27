/// <reference path = "./gameUtils.ts" /> 
/// <reference path ="./background1.ts" />
namespace game {
	import ui = ez.ui;
	enum EnemyType {
		Hole, // 黑洞
		Mask, // 口罩
		Boom, // 炸弹
		Batman, // 小坏蛋
		BatmanKing, // 大坏蛋
		Logo // xwlogo
	}

	// 设置所有得分点,黑洞等的位置
	var enemiesData = [
		{ type: EnemyType.Batman, x: 77, y: 852  },
		{ type: EnemyType.Batman, x: 77, y: 536  },
		{ type: EnemyType.Batman, x: 435, y: 398 },
		{ type: EnemyType.Batman, x: 589, y: 217 },
		{ type: EnemyType.Batman, x: 286, y: 283 },
		{ type: EnemyType.Batman, x: 358, y: 157 },
		{ type: EnemyType.Batman, x: 493, y: 140 },
		{ type: EnemyType.Batman, x: 575, y: 415 },
		{ type: EnemyType.Batman, x: 464, y: 283 },
		{ type: EnemyType.Batman, x: 271, y: 432 },
		{ type: EnemyType.Batman, x: 393, y: 534 },
		{ type: EnemyType.Batman, x: 369, y: 640 },
		{ type: EnemyType.Batman, x: 604, y: 921 },
		{ type: EnemyType.Batman, x: 464, y: 965 },
		{ type: EnemyType.Batman, x: 247, y: 835 },
		{ type: EnemyType.Batman, x: 422, y: 820 },
		{ type: EnemyType.Batman, x: 189, y: 551 },
		{ type: EnemyType.Batman, x: 347, y: 835 },
		{ type: EnemyType.Batman, x: 482, y: 820 },
		{ type: EnemyType.Batman, x: 289, y: 521 },
		{ type: EnemyType.Logo, x: 617, y: 497 },
		{ type: EnemyType.Logo, x: 222, y: 361 },
		{ type: EnemyType.Logo, x: 337, y: 765 },
		{ type: EnemyType.Logo, x: 622, y: 261 },
		{ type: EnemyType.Logo, x: 137, y: 265 },
		{ type: EnemyType.BatmanKing, x: 375, y: 185 },
		{ type: EnemyType.BatmanKing, x: 575, y: 785 },
		{ type: EnemyType.Mask, x: 87.5, y: 356 },
	]
	var hole = background1.hole
	var lines = background1.lines
    // var hole = [-100, -100] 

	// // 设置墙体位置
	// var lines = [
	// 	[0,  70, 710, 70],
	// 	[710, 70, 710, 1280],
	// 	[0, 70, 0, 1280],
	// 	[120, 902, 361, 902],
	// 	[361, 902, 361, 934],
	// 	[361, 934, 120, 939],
	// 	[120, 902, 120, 939],
	// 	[710, 1280, 0, 1280]
	// ].map(l => [{ x: l[0], y: l[1] }, { x: l[2], y: l[3] }] );

	var launchResovle = null; // 是否可以发射（发射中不可再发射）


	// 导出构造函数, 用于创建游戏UI和交互逻辑
	export class GamePage1 extends _GamePage1 {

		constructor(parent: ui.Container) {
			super(parent);
			var lastLine = lines[lines.length - 1];
			lastLine[0].y = lastLine[1].y = parent.getBound().height - 0;
			const n = this.namedChilds;
			var sound = localStorage.getItem("sound");
			if (sound == null)
				sound = "1";
			n.sound.state = sound == "1" ? "check" : "uncheck";
			var stage = n.game.stage;
			const player = gameUtils.createPlayer(stage);
			n.touch.hitTest = function(){ return true; }
			var arrow = new ez.ImageSprite(stage);
			arrow.src = "game/arrow";
			arrow.anchorY = 0.5;
			arrow.visible = false;
			arrow.zIndex = 1;
			var arrowWidth = arrow.width;
			var ctx = this;
			var lastPt;
			if (PlayerInfo){
				n.name.text = PlayerInfo.nickname;
				n.avatar.src = PlayerInfo.headimgurl;
			}

			n.touch.onTouchBegin = function(e:ez.TouchData){
				if (!launchResovle)
					return;
				var x = e.screenX;
				var y = e.screenY;
				lastPt = [x,y];
				n.disk.x = x;
				n.disk.y = y;
				n.disk.visible = true;
				e.capture();
			}
			n.touch.onTouchMove = function (e: ez.TouchData) {
				if(!lastPt)
					return;
				var dx = e.screenX - lastPt[0];
				var dy = e.screenY - lastPt[1];
				var r = Math.sqrt(dx * dx + dy * dy);
				var len = Math.max(12, Math.min(60, r));

				arrow.width = arrowWidth * len / 60;
				arrow.visible = true;
				arrow.x = player.x;
				arrow.y = player.y;
				if(dy >= 0)
					arrow.angle = Math.acos(dx / r) * (180 / Math.PI)  + 180;
				else
					arrow.angle = 180 - Math.acos(dx / r) * (180 / Math.PI);
			}
			n.touch.onTouchEnd = function (e: ez.TouchData) {
				if (!lastPt)
					return;
				var dx = e.screenX - lastPt[0];
				var dy = e.screenY - lastPt[1];
				var r = Math.sqrt(dx * dx + dy * dy) + 0.01;
				var len = Math.max(10, Math.min(60, r));
				arrow.visible = false;
				var angle = arrow.angle;
				lastPt = null;
				n.disk.visible = false;
				if (launchResovle)
					launchResovle([-dx * len / r, -dy * len / r]);
			}

			gameUtils.startGame(stage, n, {
				enemiesData,
				lines,
				hole,
				player,
				gameOver () {
					gameUtils.showResult(ctx, 'GamePage2');
				},
				launchResovleStatusChange (val) {
					launchResovle = val
				}
			})

			this.addEventHandler("click", function (e) {
				switch (e.sender.id) {
					case "help":
						n.helpPage.visible = true;
						break;
					case "okBtn":
						n.helpPage.visible = false;
						break;
					case "ok2Btn":
						n.intro.visible = false;						
						break;
					case "sound":
						var state = (<ui.Control>e.sender).state;
						soundEnable(state == "check");
						break;
				}
			});
		}
	}
}
