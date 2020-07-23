var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var gameUtils;
(function (gameUtils) {
    let totalScore = 0;
    let EnemyType;
    (function (EnemyType) {
        EnemyType[EnemyType["Hole"] = 0] = "Hole";
        EnemyType[EnemyType["Mask"] = 1] = "Mask";
        EnemyType[EnemyType["Boom"] = 2] = "Boom";
        EnemyType[EnemyType["Batman"] = 3] = "Batman";
        EnemyType[EnemyType["BatmanKing"] = 4] = "BatmanKing";
        EnemyType[EnemyType["Logo"] = 5] = "Logo";
    })(EnemyType || (EnemyType = {}));
    function intersect(p1, p2, c, r) {
        var flag1 = (p1.x - c.x) * (p1.x - c.x) + (p1.y - c.y) * (p1.y - c.y) <= r * r;
        var flag2 = (p2.x - c.x) * (p2.x - c.x) + (p2.y - c.y) * (p2.y - c.y) <= r * r;
        if (flag1 && flag2)
            return false;
        else if (flag1 || flag2)
            return true;
        else {
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
    gameUtils.intersect = intersect;
    function reflect(p1, p2, p0, dx, dy) {
        var A = p2.y - p1.y;
        var B = p1.x - p2.x;
        var C = p2.x * p1.y - p1.x * p2.y;
        var D = 1 / (A * A + B * B);
        var x = (B * B * p0.x - A * B * p0.y - A * C) * D;
        var y = (A * A * p0.y - A * B * p0.x - B * C) * D;
        var nx = p0.x - x;
        var ny = p0.y - y;
        console.log(x, y);
        var r = 1 / Math.sqrt(nx * nx + ny * ny);
        nx *= r;
        ny *= r;
        console.log(nx, ny);
        var d = dx * nx + dy * ny;
        var vx = dx - 2 * nx * d;
        var vy = dy - 2 * ny * d;
        return [vx, vy];
    }
    gameUtils.reflect = reflect;
    function createPlayer(stage) {
        var sprite = new ez.SubStageSprite(stage);
        var p1 = new ez.ImageSprite(sprite);
        var p2 = new ez.ImageSprite(sprite);
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
    gameUtils.createPlayer = createPlayer;
    function createEnemy(e, stage) {
        var s = new ez.ImageSprite(stage);
        s.anchorX = 0.5;
        s.anchorY = 0.5;
        s.x = e.x;
        s.y = e.y;
        let data = {};
        s["data"] = data;
        data.type = e.type;
        switch (e.type) {
            case EnemyType.Hole:
                s.src = "game/hole";
                data.radius = 60;
                break;
            case EnemyType.Mask:
                s.src = "game/mask";
                data.score = 30;
                data.radius = 20;
                ez.setTimer(Math.random() * 1000, () => ez.Tween.add(s).move({ scale: [0.9, 1.1] }, 1000).to({ scale: 0.9 }, 1000).config({ loop: true }).play());
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
    gameUtils.createEnemy = createEnemy;
    function shulffle(arr) {
        var seed = Date.now();
        function rand(max) {
            seed = (seed * 22695477 + 1) & 0x7ffffff;
            return (seed >> 16) % (max + 1);
        }
        for (var i = 0; i < arr.length; i++) {
            var idx = rand(arr.length - 1);
            var t = arr[i];
            arr[i] = arr[idx];
            arr[idx] = t;
        }
    }
    gameUtils.shulffle = shulffle;
    function addScore(s, n, score) {
        return __awaiter(this, void 0, void 0, function* () {
            var s1 = score;
            score += s;
            var d = (s / 10) | 0;
            for (let i = 0; i < 10; i++) {
                s1 += d;
                n.score.text = `得分 ${s1}`;
                yield ez.delay(30);
            }
            n.score.text = `得分 ${score}`;
            totalScore = score;
        });
    }
    gameUtils.addScore = addScore;
    function startGame(stage, n, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            function showClock() {
                return __awaiter(this, void 0, void 0, function* () {
                    n.clock.visible = true;
                    var time = 10;
                    n.time.text = `${time}s`;
                    while (time > 0) {
                        n.time.text = `${time}s`;
                        yield ez.delay(1000);
                        time--;
                    }
                    n.clock.visible = false;
                    getMask = false;
                });
            }
            var enemies = [];
            var player = options.player;
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
            new ez.Tween(circle).move({ scale: [0.4, 1.2], opacity: [0.1, 0.6] }, 800).config({ loop: true }).play();
            var lastPos = [104, 144];
            var chance = 5;
            while (true) {
                if (chance-- <= 0)
                    break;
                let launch = new Promise((r) => {
                    options.launchResovleStatusChange && options.launchResovleStatusChange(r);
                });
                lastPos = [player.x, player.y];
                let r = yield launch;
                if (circle) {
                    circle.dispose();
                    circle = null;
                }
                n.chance.text = `机会 ${chance}`;
                options.launchResovleStatusChange && options.launchResovleStatusChange(null);
                let dx = r[0] * 0.25;
                let dy = r[1] * 0.25;
                while (true) {
                    player.x += dx;
                    player.y += dy;
                    if (Math.abs(dx) < 1 && Math.abs(dy) < 1)
                        break;
                    for (let i = 0; i < enemies.length; i++) {
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
                            if (score > 0) {
                                s.text = "+" + score;
                                s.gradient = { y1: 30, colors: ["#ff8", "#fa8"] };
                            }
                            else {
                                s.text = "" + score;
                                s.gradient = { y1: 30, colors: ["#8ff", "#8af"] };
                            }
                            ez.Tween.add(s).move({ y: [e.y, e.y - 30], opacity: [0.5, 1] }, 300, ez.Ease.bounceOut).move({ opacity: [1, 0] }, 2000).disposeTarget().play();
                            addScore(score, n, totalScore);
                            ez.playSFX(score > 0 ? "sound/add" : "sound/lose");
                            e.dispose();
                            enemies.splice(i, 1);
                            if (data.type == EnemyType.Mask) {
                                getMask = true;
                                var arr = enemies.concat();
                                shulffle(arr);
                                for (let j = 0; j < 2; j++) {
                                    let idx = arr.findIndex(t => t.data.type == EnemyType.Batman);
                                    if (idx >= 0) {
                                        ez.Tween.add(arr[idx]).move({ opacity: [1, 0] }, 800).disposeTarget().play();
                                        enemies.splice(enemies.indexOf(arr[idx]), 1);
                                        arr.splice(idx, 1);
                                    }
                                }
                                showClock();
                            }
                            break;
                        }
                    }
                    for (let i = 0; i < options.lines.length; i++) {
                        let line = options.lines[i];
                        if (intersect(line[0], line[1], player, 30)) {
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
                    if (dr < 500) {
                        dx = 0;
                        dy = 0;
                        for (let i = 0; i < 30; i++) {
                            player.opacity = 1 - i / 30;
                            yield ez.nextFrame();
                        }
                        chance = Math.max(0, chance - 1);
                        player.x = lastPos[0];
                        player.y = lastPos[1];
                        for (let i = 0; i <= 30; i++) {
                            player.opacity = i / 30;
                            yield ez.nextFrame();
                        }
                    }
                    else if (dr < 50000) {
                        dr = 1 / dr;
                        hx = hx * Math.sqrt(dr);
                        hy = hy * Math.sqrt(dr);
                        dx += hx * 1000 * dr;
                        dy += hy * 1000 * dr;
                    }
                    if (dx > 0.15)
                        dx -= 0.1;
                    else if (dx < 0.15)
                        dx += 0.1;
                    if (dy > 0.15)
                        dy -= 0.1;
                    else if (dy < 0.15)
                        dy += 0.1;
                    yield ez.nextFrame();
                }
            }
            options.gameOver && options.gameOver();
        });
    }
    gameUtils.startGame = startGame;
    function showResult(ctx, score) {
        return __awaiter(this, void 0, void 0, function* () {
            function commitScore(score) {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            }
            var page = ctx.parent.createChild(game.ResultPage);
            var n = page.namedChilds;
            n.score.text = "" + score;
            console.log('score', score);
            var data = yield commitScore(score);
            console.log('score', score);
            game.getRank(n.rankPage);
            if (data)
                n.info.text = `超过了${data}的玩家`;
            page.addEventHandler("click", function (e) {
                console.log('e', e);
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
                        var share = page.parent.createChild(game.SharePage);
                        page.dispose();
                        var n1 = share.namedChilds;
                        if (data)
                            n1.info.text = `超过了${data}的玩家`;
                        n1.name.text = "姓名：" + PlayerInfo.nickname;
                        n1.score.text = "成绩：" + score;
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
        });
    }
    gameUtils.showResult = showResult;
})(gameUtils || (gameUtils = {}));
//# sourceMappingURL=gameUtils.js.map