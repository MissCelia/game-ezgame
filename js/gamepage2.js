var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var game;
(function (game) {
    var EnemyType;
    (function (EnemyType) {
        EnemyType[EnemyType["Hole"] = 0] = "Hole";
        EnemyType[EnemyType["Mask"] = 1] = "Mask";
        EnemyType[EnemyType["Boom"] = 2] = "Boom";
        EnemyType[EnemyType["Batman"] = 3] = "Batman";
        EnemyType[EnemyType["BatmanKing"] = 4] = "BatmanKing";
        EnemyType[EnemyType["Logo"] = 5] = "Logo";
    })(EnemyType || (EnemyType = {}));
    var enemiesData = [
        { type: EnemyType.Batman, x: 77, y: 852 },
        { type: EnemyType.Batman, x: 77, y: 536 },
        { type: EnemyType.Batman, x: 435, y: 398 },
        { type: EnemyType.Batman, x: 589, y: 217 },
        { type: EnemyType.Batman, x: 189, y: 551 },
        { type: EnemyType.Logo, x: 617, y: 497 },
        { type: EnemyType.Logo, x: 222, y: 361 },
        { type: EnemyType.Logo, x: 337, y: 765 },
        { type: EnemyType.BatmanKing, x: 265, y: 785 },
        { type: EnemyType.Mask, x: 87.5, y: 696 },
        { type: EnemyType.Boom, x: 166, y: 260 }
    ];
    var hole = [318, 578];
    var lines = [
        [0, 70, 490, 70],
        [490, 70, 710, 205],
        [710, 205, 710, 524],
        [710, 524, 446, 695],
        [446, 695, 466, 723],
        [466, 723, 710, 564],
        [710, 564, 710, 1280],
        [0, 70, 0, 1280],
        [120, 902, 361, 902],
        [361, 902, 361, 934],
        [361, 934, 120, 939],
        [120, 902, 120, 939],
        [710, 1280, 0, 1280]
    ].map(function (l) { return [{ x: l[0], y: l[1] }, { x: l[2], y: l[3] }]; });
    var launchResovle = null;
    var GamePage2 = (function (_super) {
        __extends(GamePage2, _super);
        function GamePage2(parent) {
            var _this = _super.call(this, parent) || this;
            var lastLine = lines[lines.length - 1];
            lastLine[0].y = lastLine[1].y = parent.getBound().height - 0;
            var n = _this.namedChilds;
            var sound = localStorage.getItem("sound");
            if (sound == null)
                sound = "1";
            n.sound.state = sound == "1" ? "check" : "uncheck";
            var stage = n.game.stage;
            var player = gameUtils.createPlayer(stage);
            n.touch.hitTest = function () { return true; };
            var arrow = new ez.ImageSprite(stage);
            arrow.src = "game/arrow";
            arrow.anchorY = 0.5;
            arrow.visible = false;
            arrow.zIndex = 1;
            var arrowWidth = arrow.width;
            var ctx = _this;
            var lastPt;
            if (PlayerInfo) {
                n.name.text = PlayerInfo.nickname;
                n.avatar.src = PlayerInfo.headimgurl;
            }
            n.touch.onTouchBegin = function (e) {
                if (!launchResovle)
                    return;
                var x = e.screenX;
                var y = e.screenY;
                lastPt = [x, y];
                n.disk.x = x;
                n.disk.y = y;
                n.disk.visible = true;
                e.capture();
            };
            n.touch.onTouchMove = function (e) {
                if (!lastPt)
                    return;
                var dx = e.screenX - lastPt[0];
                var dy = e.screenY - lastPt[1];
                var r = Math.sqrt(dx * dx + dy * dy);
                var len = Math.max(12, Math.min(60, r));
                arrow.width = arrowWidth * len / 60;
                arrow.visible = true;
                arrow.x = player.x;
                arrow.y = player.y;
                if (dy >= 0)
                    arrow.angle = Math.acos(dx / r) * (180 / Math.PI) + 180;
                else
                    arrow.angle = 180 - Math.acos(dx / r) * (180 / Math.PI);
            };
            n.touch.onTouchEnd = function (e) {
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
            };
            gameUtils.startGame(stage, n, {
                enemiesData: enemiesData,
                lines: lines,
                hole: hole,
                player: player,
                gameOver: function () {
                    gameUtils.showResult(ctx);
                },
                launchResovleStatusChange: function (val) {
                    launchResovle = val;
                }
            });
            _this.addEventHandler("click", function (e) {
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
                        var state = e.sender.state;
                        game.soundEnable(state == "check");
                        break;
                }
            });
            return _this;
        }
        return GamePage2;
    }(game._GamePage2));
    game.GamePage2 = GamePage2;
})(game || (game = {}));
//# sourceMappingURL=gamepage2.js.map