var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var gameUtils;
(function (gameUtils) {
    var totalScore = 0;
    var EnemyType;
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
        var r = 1 / Math.sqrt(nx * nx + ny * ny);
        nx *= r;
        ny *= r;
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
        var data = {};
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
                ez.setTimer(Math.random() * 1000, function () { return ez.Tween.add(s).move({ scale: [0.9, 1.1] }, 1000).to({ scale: 0.9 }, 1000).config({ loop: true }).play(); });
                break;
            case EnemyType.Boom:
                s.src = "game/boom";
                data.score = -30;
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
                ez.setTimer(Math.random() * 1000, function () { return ez.Tween.add(s).move({ scale: [1, 1.2] }, 2000).to({ scale: 1 }, 2000).config({ loop: true }).play(); });
                ez.setTimer(Math.random() * 1000, function () { return ez.Tween.add(s).move({ y: [s.y, s.y + 5 * Math.random() + 5] }, 3000).to({ y: s.y }, 3000).config({ loop: true }).play(); });
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
    function addScore(s, n) {
        return __awaiter(this, void 0, void 0, function () {
            var s1, d, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        s1 = totalScore;
                        totalScore += s;
                        d = (s / 10) | 0;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 10)) return [3, 4];
                        s1 += d;
                        n.score.text = "\u5F97\u5206 " + s1;
                        return [4, ez.delay(30)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        n.score.text = "\u5F97\u5206 " + totalScore;
                        return [2];
                }
            });
        });
    }
    gameUtils.addScore = addScore;
    function startGame(stage, n, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            function showClock() {
                return __awaiter(this, void 0, void 0, function () {
                    var time;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                n.clock.visible = true;
                                time = 10;
                                n.time.text = time + "s";
                                _a.label = 1;
                            case 1:
                                if (!(time > 0)) return [3, 3];
                                n.time.text = time + "s";
                                return [4, ez.delay(1000)];
                            case 2:
                                _a.sent();
                                time--;
                                return [3, 1];
                            case 3:
                                n.clock.visible = false;
                                getMask = false;
                                return [2];
                        }
                    });
                });
            }
            var enemies, player, getMask, i, circle, lastPos, chance, launch, r, dx, dy, i, e, data, dx_1, dy_1, score, s, arr, j, idx, i, line, r_1, hx, hy, dr, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        enemies = [];
                        player = options.player;
                        getMask = false;
                        for (i = 0; i < options.enemiesData.length; i++) {
                            enemies[i] = createEnemy(options.enemiesData[i], stage);
                        }
                        player.x = 104;
                        player.y = 144;
                        circle = new ez.ImageSprite(stage);
                        circle.src = "game/circle";
                        circle.anchorX = circle.anchorY = 0.5;
                        circle.x = 104;
                        circle.y = 144;
                        new ez.Tween(circle).move({ scale: [0.4, 1.2], opacity: [0.1, 0.6] }, 800).config({ loop: true }).play();
                        lastPos = [104, 144];
                        chance = 5;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3, 16];
                        if (chance-- <= 0)
                            return [3, 16];
                        launch = new Promise(function (r) {
                            options.launchResovleStatusChange && options.launchResovleStatusChange(r);
                        });
                        lastPos = [player.x, player.y];
                        return [4, launch];
                    case 2:
                        r = _a.sent();
                        if (circle) {
                            circle.dispose();
                            circle = null;
                        }
                        n.chance.text = "\u673A\u4F1A " + chance;
                        options.launchResovleStatusChange && options.launchResovleStatusChange(null);
                        dx = r[0] * 0.35;
                        dy = r[1] * 0.35;
                        _a.label = 3;
                    case 3:
                        if (!true) return [3, 15];
                        player.x += dx;
                        player.y += dy;
                        if (Math.abs(dx) < 1 && Math.abs(dy) < 1)
                            return [3, 15];
                        for (i = 0; i < enemies.length; i++) {
                            e = enemies[i];
                            data = e.data;
                            dx_1 = e.x - player.x;
                            dy_1 = e.y - player.y;
                            if (dx_1 * dx_1 + dy_1 * dy_1 < (30 + data.radius) * (30 + data.radius)) {
                                score = data.score;
                                s = new ez.LabelSprite(stage);
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
                                addScore(score, n);
                                ez.playSFX(score > 0 ? "sound/add" : "sound/lose");
                                e.dispose();
                                enemies.splice(i, 1);
                                if (data.type == EnemyType.Mask) {
                                    getMask = true;
                                    arr = enemies.concat();
                                    shulffle(arr);
                                    for (j = 0; j < 2; j++) {
                                        idx = arr.findIndex(function (t) { return t.data.type == EnemyType.Batman; });
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
                        for (i = 0; i < options.lines.length; i++) {
                            line = options.lines[i];
                            if (intersect(line[0], line[1], player, 30)) {
                                player.x -= dx;
                                player.y -= dy;
                                r_1 = reflect(line[0], line[1], player, dx, dy);
                                dx = r_1[0] * 0.9;
                                dy = r_1[1] * 0.9;
                                break;
                            }
                        }
                        hx = options.hole[0] - player.x;
                        hy = options.hole[1] - player.y;
                        dr = hx * hx + hy * hy;
                        if (!(dr < 500)) return [3, 12];
                        dx = 0;
                        dy = 0;
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < 30)) return [3, 7];
                        player.opacity = 1 - i / 30;
                        return [4, ez.nextFrame()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3, 4];
                    case 7:
                        chance = Math.max(0, chance - 1);
                        player.x = lastPos[0];
                        player.y = lastPos[1];
                        i = 0;
                        _a.label = 8;
                    case 8:
                        if (!(i <= 30)) return [3, 11];
                        player.opacity = i / 30;
                        return [4, ez.nextFrame()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        i++;
                        return [3, 8];
                    case 11: return [3, 13];
                    case 12:
                        if (dr < 50000) {
                            dr = 1 / dr;
                            hx = hx * Math.sqrt(dr);
                            hy = hy * Math.sqrt(dr);
                            dx += hx * 1000 * dr;
                            dy += hy * 1000 * dr;
                        }
                        _a.label = 13;
                    case 13:
                        if (dx > 0.15)
                            dx -= 0.1;
                        else if (dx < 0.15)
                            dx += 0.1;
                        if (dy > 0.15)
                            dy -= 0.1;
                        else if (dy < 0.15)
                            dy += 0.1;
                        return [4, ez.nextFrame()];
                    case 14:
                        _a.sent();
                        return [3, 3];
                    case 15: return [3, 1];
                    case 16:
                        options.gameOver && options.gameOver();
                        return [2];
                }
            });
        });
    }
    gameUtils.startGame = startGame;
    function showResult(ctx, nextStage) {
        return __awaiter(this, void 0, void 0, function () {
            function commitScore(score) {
                return new Promise(function (resolve, reject) {
                    var key = "zxdqw";
                    var timestamp = Date.now();
                    var sign = md5.hex(key + "openid" + PlayerInfo.openid + "score" + score + timestamp);
                    ajax("https://xwfintech.qingke.io/openapi/pinball/add/measy?key=" + key + "&sign=" + sign + "&openid=" + PlayerInfo.openid + "&score=" + score + "&timestamp=" + timestamp, function (e, r) {
                        if (r.code) {
                            alert(r.msg);
                            reject();
                        }
                        else
                            resolve(r.data);
                    });
                    resolve();
                });
            }
            var page, n, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = ctx.parent.createChild(game.ResultPage);
                        n = page.namedChilds;
                        n.score.text = "" + totalScore;
                        game.getRank(n.rankPage);
                        if (data)
                            n.info.text = "\u8D85\u8FC7\u4E86" + data + "\u7684\u73A9\u5BB6";
                        page.addEventHandler("click", function (e) {
                            switch (e.sender.id) {
                                case "rank":
                                    n.rankPage.visible = true;
                                    break;
                                case "closeRank":
                                    n.rankPage.visible = false;
                                    break;
                                case "replay":
                                    page.parent.createChild(game[nextStage]);
                                    page.dispose();
                                    break;
                                case "result":
                                    var share = page.parent.createChild(game.SharePage);
                                    page.dispose();
                                    var n1 = share.namedChilds;
                                    if (data)
                                        n1.info.text = "\u8D85\u8FC7\u4E86" + data + "\u7684\u73A9\u5BB6";
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
                        return [4, commitScore(totalScore)];
                    case 1:
                        data = _a.sent();
                        return [2];
                }
            });
        });
    }
    gameUtils.showResult = showResult;
})(gameUtils || (gameUtils = {}));
//# sourceMappingURL=gameUtils.js.map