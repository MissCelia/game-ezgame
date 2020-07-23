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
var PlayerInfo = {};
function ajax(url, cb) {
    var x = new XMLHttpRequest();
    x.open("GET", url);
    x.onload = function () {
        var is_error = x.status >= 400 || (!x.status && !x.responseText);
        if (is_error) {
            alert("failed: " + x.status + " " + x.responseText);
            cb(false);
        }
        else
            cb(true, JSON.parse(x.responseText));
    };
    try {
        x.send();
    }
    catch (_a) {
        cb(false);
    }
}
var mainFrame;
window.onmessage = function (ev) {
    console.log(ev.data);
    var data = ev.data;
    if (data.msg == "login" && data.info)
        PlayerInfo = JSON.parse(data.info);
    if (data.msg == "back") {
        mainFrame.clearChilds();
        mainFrame.createChild(game.GamePage1);
    }
};
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    window.parent.postMessage({ msg: "login" }, "*");
                    ez.initialize({
                        width: 710,
                        height: 1280,
                        minHeight: 1100,
                        maxHeight: 1400,
                        highDPI: true,
                        wglOptions: { preserveDrawingBuffer: true },
                        scaleMode: 3
                    });
                    ez.loadEZMDecoder(typeof (WebAssembly) === "undefined" ? "ezm.asm.js" : "ezm.wasm.js", 1);
                    if (!PUBLISH) return [3, 1];
                    ez.loadResPackage(game.resData, "res/", game.resGroups);
                    ez.loadGroup(["ui", "start", "image/bg"], function (progress, total) {
                        if (progress >= total) {
                            var t = Date.now() - startTime;
                            mainFrame = ez.getRoot().createChild(game.MainFrame);
                            var loading = document.getElementById("loading");
                            if (loading)
                                document.body.removeChild(loading);
                            ez.loadGroup(["game", "image/活动规则", "image/说明", "share"]);
                        }
                    });
                    return [3, 3];
                case 1: return [4, ez.loadJSONPackageAsync("assets/resource.json", "assets/res/")];
                case 2:
                    _a.sent();
                    ez.loadGroup(["ui", "start", "image/bg"], function (progress, total) {
                        if (progress >= total) {
                            var t = Date.now() - startTime;
                            mainFrame = ez.getRoot().createChild(game.MainFrame);
                            var loading = document.getElementById("loading");
                            if (loading)
                                document.body.removeChild(loading);
                            ez.loadGroup(["game", "image/活动规则", "image/说明", "share"]);
                        }
                    });
                    _a.label = 3;
                case 3: return [2];
            }
        });
    });
}
//# sourceMappingURL=main.js.map