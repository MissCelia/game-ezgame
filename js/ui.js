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
    var ui = ez.ui;
    var UI = ["Image", "Label", "UIStage", "Control", "Group", "RectFill", "game.Button", "game.Checkbox", "game.StartPage", "game.RankPage", "ScrollView", "ListView"];
    var RES = ["R:G503ILGF8S28", "R:O123T11GLFK9", "R:CTDCID13AB9F", "R:JCF2OQOGMT7O", "R:B0LVRU4VENJS", "R:1EF948RMIQRD", "R:HA8GLOB3BT28", "R:4PGJIM7IPCOV", "R:QJ204MMAGROF", "R:LAO8Q29LE1TO", "R:4LVSPIK3B203", "R:S9IQLHG3U700", "R:INH1T34JAHE4", "R:U7VJ9SGIHTNO", "R:P637DGG88RRB", "R:307B8VJHSQ38", "R:O18PU18DTSMO", "R:85GD560O0A62", "R:RGDNTIFOJEJ1", "R:PQF1C511M1BQ", "R:5A1F5RDNRR3D", "R:SPMG8J9324MB", "R:6VBE1JLANTMV", "R:UFGMTQLP3H5J", "R:52OMU7AEFJE8", "R:MFP4S2F9MF7F", "R:F45FD2M7NRMS", "R:EN6PH70VD7LV", "R:M3F90V7UJL03", "R:EJRRQ2IU0JS0", "R:LMIPDLENLMJG", "R:VCP8LGVCL71S"];
    ui.registerTextStyle([
        { id: "normal", font: "28px", color: "#bbadfb" },
        { id: "normalCenter", font: "28px", color: "#bbadfb", align: 1 },
        { id: "rankPage", font: "28px", color: "#757981" },
        { id: "gameHead", font: "28px", color: "#fff" },
    ]);
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(parent, template) {
            var _this = _super.call(this, parent) || this;
            _this._init(Button);
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(Button._childs);
            var n = _this.namedChilds;
            _this._initStates("normal", Button.States);
            _this.bind("label", n.label, "text");
            _this.width = 194;
            _this.height = 70;
            return _this;
        }
        Object.defineProperty(Button.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        Button.ClassName = "game.Button";
        Button.Styles = {
            blue: { childsProperty: { bk: { src: RES[0] } } },
            purple: { childsProperty: { bk: { src: RES[1] } } },
            yellow: { childsProperty: { bk: { src: RES[2] }, label: { gradient: { y0: 0, y1: 30, colors: ['#a54800', '#ce7300'] } } } }
        };
        Button.Properties = [
            { name: "label", type: "string" },
            { name: "style", type: "string", customProperty: true }
        ];
        Button.States = {
            normal: {},
            down: {}
        };
        Button._childs = [
            [UI[0], { src: RES[0] }, "bk", , , , , "100%", "100%"],
            [UI[1], { font: "30px", color: "#fff", align: 1 }, "label", , , , , "100%", 30, , "50%"]
        ];
        return Button;
    }(ui.Control));
    game.Button = Button;
    ui.initUIClass(Button, ui.Control);
    ui.addButtonEventHandler(Button, 0.8);
    var Checkbox = (function (_super) {
        __extends(Checkbox, _super);
        function Checkbox(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(Checkbox._childs);
            var n = _this.namedChilds;
            _this._initStates("uncheck", Checkbox.States);
            return _this;
        }
        Object.defineProperty(Checkbox.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        Checkbox.ClassName = "game.Checkbox";
        Checkbox.States = {
            check: { props: { childsProperty: { checkImg: { visible: true } } } },
            uncheck: { props: { childsProperty: { checkImg: { visible: false } } } }
        };
        Checkbox._childs = [
            [UI[0], , "icon", , , , , "100%", "100%"],
            [UI[0], , "checkImg", , , , , "100%", "100%"]
        ];
        return Checkbox;
    }(ui.Control));
    game.Checkbox = Checkbox;
    ui.initUIClass(Checkbox, ui.Control);
    ui.addCheckboxEventHandler(Checkbox, 0.8);
    var _GamePage1 = (function (_super) {
        __extends(_GamePage1, _super);
        function _GamePage1(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(_GamePage1._childs);
            var n = _this.namedChilds;
            _this.width = "100%";
            _this.height = "100%";
            return _this;
        }
        Object.defineProperty(_GamePage1.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        _GamePage1.ClassName = "game.GamePage1";
        _GamePage1._childs = [
            [UI[2], , "game", 0, 0, , , 710, 1280, , , , , , , , , , , , , [
                    { type: "Image", src: RES[3] },
                    { type: "Image", src: RES[4], anchorX: 0.5, anchorY: 0.5, x: 242, y: 920.5 },
                    { type: "Image", src: RES[5], angle: -33, x: 738, y: 535, anchorX: 0.5, anchorY: 0.5 },
                    { type: "Image", src: RES[5], angle: 32, x: 562, y: 95, anchorX: 0.5, anchorY: 0.5 },
                    { type: "Image", src: RES[6], anchorX: 0.5, anchorY: 0.5, x: 318, y: 578.5, width: 246, height: 119 },
                ]],
            [UI[3], , "touch", , , , , "100%", "100%"],
            [UI[4], , "intro", , , , , "100%", "100%", , , , , , , , , , , , , [
                    [UI[5], { color: "#000" }, , , , , , "100%", "100%", , , 0.3],
                    [UI[4], , , , , , , "100%", 600, , "50%", , , , , , , , , , , [
                            [UI[0], { src: RES[7] }, , , , , , , , "50%"],
                            [UI[6], { label: "确定" }, "ok2Btn", , 400, , , 195, 70, "50%"],
                        ]],
                ]],
            [UI[4], , "helpPage", , , , , "100%", "100%", , , , false, , , , , , , , , [
                    [UI[5], { color: "#000" }, , , , , , "100%", "100%", , , 0.3],
                    [UI[0], { src: RES[8] }, , , 160, , , , , "50%"],
                    [UI[4], , , , 900, , 0, "100%", , , , , , , , , , , , , , [
                            [UI[6], { label: "已知晓" }, "okBtn", , "30%", , , 195, 70, "50%"],
                        ]],
                ]],
            [UI[4], , "clock", , , , , 66, 66, 611, 127, , false, , , , , , , , , [
                    [UI[0], { src: RES[9] }],
                    [UI[1], { font: "34px", color: "#fff", align: 5 }, "time", , , , , "100%", "100%"],
                ]],
            [UI[0], { src: RES[10] }, "disk", , , , , , , , , , false],
            [UI[4], { textStyle: "gameHead" }, , , , , , "100%", 70, , , , , , , , , , , , , [
                    [UI[5], { color: "#2c296e" }, , , , , , "100%", 70],
                    [UI[5], { color: "#6854aa" }, , , 70, , , "100%", 2],
                    [UI[0], , "avatar", 28, 13, , , 50, 50],
                    [UI[1], { format: 8 }, "name", 87, 24, , , 200, 27],
                    [UI[1], { text: "得分 0" }, "score", 290, 24, , , 140, 27],
                    [UI[1], { text: "机会 5" }, "chance", 430, 24, , , 120, 27],
                    [UI[6], { label: "说明" }, "help", 510, 24, , , 130, 30, , , , , , , , , , , { bk: { src: "" }, label: { color: "#5186ff" } }],
                    [UI[7], , "sound", 630, 8, , , 56, , , , , , , , , , , , { icon: { src: RES[11] }, checkImg: { src: RES[12] } }],
                ]]
        ];
        return _GamePage1;
    }(ui.Container));
    game._GamePage1 = _GamePage1;
    ez.initCall(function () { ui.initUIClass(game.GamePage1, ui.Container); });
    var _GamePage2 = (function (_super) {
        __extends(_GamePage2, _super);
        function _GamePage2(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(_GamePage2._childs);
            var n = _this.namedChilds;
            _this.width = "100%";
            _this.height = "100%";
            return _this;
        }
        Object.defineProperty(_GamePage2.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        _GamePage2.ClassName = "game.GamePage2";
        _GamePage2._childs = [
            [UI[2], , "game", 0, 0, , , 710, 1280, , , , , , , , , , , , , [
                    { type: "Image", src: RES[3] },
                    { type: "Image", src: RES[4], anchorX: 0.5, anchorY: 0.5, x: 242, y: 920.5 },
                    { type: "Image", src: RES[5], angle: -33, x: 738, y: 535, anchorX: 0.5, anchorY: 0.5 },
                    { type: "Image", src: RES[5], angle: 32, x: 562, y: 95, anchorX: 0.5, anchorY: 0.5 },
                    { type: "Image", src: RES[6], anchorX: 0.5, anchorY: 0.5, x: 318, y: 578.5, width: 246, height: 119 },
                ]],
            [UI[3], , "touch", , , , , "100%", "100%"],
            [UI[4], , "intro", , , , , "100%", "100%", , , , , , , , , , , , , [
                    [UI[5], { color: "#000" }, , , , , , "100%", "100%", , , 0.3],
                    [UI[4], , , , , , , "100%", 600, , "50%", , , , , , , , , , , [
                            [UI[0], { src: RES[7] }, , , , , , , , "50%"],
                            [UI[6], { label: "确定" }, "ok2Btn", , 400, , , 195, 70, "50%"],
                        ]],
                ]],
            [UI[4], , "helpPage", , , , , "100%", "100%", , , , false, , , , , , , , , [
                    [UI[5], { color: "#000" }, , , , , , "100%", "100%", , , 0.3],
                    [UI[0], { src: RES[8] }, , , 160, , , , , "50%"],
                    [UI[4], , , , 900, , 0, "100%", , , , , , , , , , , , , , [
                            [UI[6], { label: "已知晓" }, "okBtn", , "30%", , , 195, 70, "50%"],
                        ]],
                ]],
            [UI[4], , "clock", , , , , 66, 66, 611, 127, , false, , , , , , , , , [
                    [UI[0], { src: RES[9] }],
                    [UI[1], { font: "34px", color: "#fff", align: 5 }, "time", , , , , "100%", "100%"],
                ]],
            [UI[0], { src: RES[10] }, "disk", , , , , , , , , , false],
            [UI[4], { textStyle: "gameHead" }, , , , , , "100%", 70, , , , , , , , , , , , , [
                    [UI[5], { color: "#2c296e" }, , , , , , "100%", 70],
                    [UI[5], { color: "#6854aa" }, , , 70, , , "100%", 2],
                    [UI[0], , "avatar", 28, 13, , , 50, 50],
                    [UI[1], { format: 8 }, "name", 87, 24, , , 200, 27],
                    [UI[1], { text: "得分 0" }, "score", 290, 24, , , 140, 27],
                    [UI[1], { text: "机会 5" }, "chance", 430, 24, , , 120, 27],
                    [UI[6], { label: "说明" }, "help", 510, 24, , , 130, 30, , , , , , , , , , , { bk: { src: "" }, label: { color: "#5186ff" } }],
                    [UI[7], , "sound", 630, 8, , , 56, , , , , , , , , , , , { icon: { src: RES[11] }, checkImg: { src: RES[12] } }],
                ]]
        ];
        return _GamePage2;
    }(ui.Container));
    game._GamePage2 = _GamePage2;
    ez.initCall(function () { ui.initUIClass(game.GamePage2, ui.Container); });
    var MainFrame = (function (_super) {
        __extends(MainFrame, _super);
        function MainFrame(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(MainFrame._childs);
            var n = _this.namedChilds;
            _this.width = "100%";
            _this.height = "100%";
            return _this;
        }
        Object.defineProperty(MainFrame.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        MainFrame.ClassName = "game.MainFrame";
        MainFrame._childs = [
            [UI[5], { gradient: { y1: 1280, colors: ['#010036', '#4e004f'] } }, "bg", , , , , "100%", "100%"],
            [UI[4], , "frame", , , , , "100%", "100%", , , , , , , , , , , , , [
                    [UI[8]],
                ]]
        ];
        return MainFrame;
    }(ui.Container));
    game.MainFrame = MainFrame;
    ui.initUIClass(MainFrame, ui.Container);
    var ResultPage = (function (_super) {
        __extends(ResultPage, _super);
        function ResultPage(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(ResultPage._childs);
            var n = _this.namedChilds;
            _this.width = "100%";
            _this.height = "100%";
            _this.textStyle = "normalCenter";
            return _this;
        }
        Object.defineProperty(ResultPage.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        ResultPage.ClassName = "game.ResultPage";
        ResultPage._childs = [
            [UI[0], { src: RES[13] }, , 198, 77, , , 336, 322],
            [UI[1], { text: "本局得分", align: 1 }, , , 462, , , 119, 29, "50%"],
            [UI[1], { text: "1000", strokeWidth: 4, strokeColor: "#9b8ddd", font: "50px", gradient: { y1: 50, colors: ['#a995ff', '#8670f4'] } }, "score", , 395, , , 280, 58, "50%"],
            [UI[1], , "info", , 530, , , 283, 32, "50%"],
            [UI[0], { src: RES[14] }, , 177, 503, , , 360, 2],
            [UI[0], { src: RES[14] }, , 177, 579, , , 360, 2],
            [UI[6], { label: "查看排行榜", style: "blue" }, "rank", , 669, , , 195, 70, "50%"],
            [UI[6], { label: "生成成绩单", style: "blue" }, "result", , 769, , , 195, 70, "50%"],
            [UI[4], , , , 840, , 0, "100%", , , , , , , , , , , , , , [
                    [UI[6], { label: "再玩一次", style: "purple" }, "replay", , , , , 195, 70, "50%", "50%"],
                ]],
            [UI[9], , "rankPage", , , , , , , , , , false]
        ];
        return ResultPage;
    }(ui.Container));
    game.ResultPage = ResultPage;
    ui.initUIClass(ResultPage, ui.Container);
    var SharePage = (function (_super) {
        __extends(SharePage, _super);
        function SharePage(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(SharePage._childs);
            var n = _this.namedChilds;
            _this.width = "100%";
            _this.height = "100%";
            _this.textStyle = "normal";
            _this.ownerBuffer = true;
            return _this;
        }
        Object.defineProperty(SharePage.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        SharePage.ClassName = "game.SharePage";
        SharePage._childs = [
            [UI[5], { gradient: { y1: 1280, colors: ['#010036', '#4e004f'] } }, "bg", , , , , "100%", "100%"],
            [UI[0], { src: RES[15] }, , 64, 92, , , 323, 46],
            [UI[0], { src: RES[16] }, , 81, 300, , , 522, 231],
            [UI[1], { text: "姓名：" }, "name", 114, 337, , , 383, 37],
            [UI[1], { text: "成绩：10000" }, "score", 114, 387, , , 383, 37],
            [UI[1], , "info", 114, 439, , , 383, 37],
            [UI[0], { src: RES[17] }, , 65, 165],
            [UI[1], { font: "28px", color: "#bbadfb", lineHeight: 48, format: 2, text: "2020“创青春 交子杯”新网银行金融科技挑战赛\n47万奖金池，最高 10 万奖金等你来拿！\n是时候展现你真正的技术了！" }, , 68, 575, , , 585, 137],
            [UI[4], , , , 700, , 0, 300, , "50%", , , , , , , , , , , , [
                    [UI[4], , , , , , , 300, 332, , "50%", , , , , , , , , , , [
                            [UI[0], { src: RES[18] }, "share", , , , , 300, 332],
                        ]],
                ]]
        ];
        return SharePage;
    }(ui.Container));
    game.SharePage = SharePage;
    ui.initUIClass(SharePage, ui.Container);
    var Splash = (function (_super) {
        __extends(Splash, _super);
        function Splash(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(Splash._childs);
            _this.width = "100%";
            _this.height = "100%";
            return _this;
        }
        Splash.ClassName = "game.Splash";
        Splash._childs = [
            [UI[0], { src: RES[19] }, , , , , , , , "50%", "50%"]
        ];
        return Splash;
    }(ui.Container));
    game.Splash = Splash;
    ui.initUIClass(Splash, ui.Container);
    var _RankItem = (function (_super) {
        __extends(_RankItem, _super);
        function _RankItem(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(_RankItem._childs);
            var n = _this.namedChilds;
            _this.width = 530;
            _this.height = 88;
            return _this;
        }
        Object.defineProperty(_RankItem.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        _RankItem.ClassName = "game.RankItem";
        _RankItem._childs = [
            [UI[1], { color: "#42464d", align: 1, format: 8 }, "name", 217, 24, , , 180, 25],
            [UI[1], { color: "#42464d", align: 1 }, "rank", 20, 23, , , 50, 17, , , , false],
            [UI[1], { color: "#e04f00", align: 1 }, "score", 409, 24, , , 112, 25],
            [UI[0], { effect: "mask", effectParams: { mask: 'mask' } }, "avatar", 127, 7, , , 74, 74],
            [UI[5], { color: "#F0F0F0" }, , 0, 86, , , 530, 2],
            [UI[0], { src: RES[20] }, "rankIcon", 27, 15, , , 44, 48]
        ];
        return _RankItem;
    }(ui.Container));
    game._RankItem = _RankItem;
    ez.initCall(function () { ui.initUIClass(game.RankItem, ui.Container); });
    var RankPage = (function (_super) {
        __extends(RankPage, _super);
        function RankPage(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(RankPage._childs);
            var n = _this.namedChilds;
            _this.width = 640;
            _this.height = 1300;
            _this.left = 33;
            _this.top = 0;
            _this.textStyle = "rankPage";
            return _this;
        }
        Object.defineProperty(RankPage.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        RankPage.ClassName = "game.RankPage";
        RankPage._childs = [
            [UI[0], { src: RES[21] }, , 0, 0, , , 640, 1300],
            [UI[0], { src: RES[22] }, , 45, 219, , , 540, 806],
            [UI[6], , "closeRank", 566, 200, , , 39, 38, , , , , , , , , , , { bk: { src: RES[23] } }],
            [UI[5], { color: "#F2F2F4" }, , 45, 319, , , 540, 78],
            [UI[1], { text: "排行" }, , 74, 344, , , 58, 28],
            [UI[1], { text: "头像" }, , 190, 344, , , 58, 28],
            [UI[1], { text: "昵称" }, , 334, 344, , , 58, 28],
            [UI[1], { text: "成绩" }, , 478, 344, , , 58, 28],
            [UI[1], { font: "32px", text: "排行榜TOP100", color: "#494b59" }, , 246, 253, , , 220, 34],
            [UI[0], { src: RES[24] }, , 187, 246, , , 44, 49],
            [UI[10], { scrollMode: 2 }, , 50, 402, , , 532, 617, , , , , , , , , , , , , [
                    [UI[11], { itemClass: "game.RankItem", culling: true }, "rankList", , , , , 532],
                ]]
        ];
        return RankPage;
    }(ui.Container));
    game.RankPage = RankPage;
    ui.initUIClass(RankPage, ui.Container);
    var _StartPage = (function (_super) {
        __extends(_StartPage, _super);
        function _StartPage(parent, template) {
            var _this = _super.call(this, parent) || this;
            if (template) {
                _this._createChilds(template.childs);
                template.init(_this);
            }
            else
                _this._createChilds(_StartPage._childs);
            var n = _this.namedChilds;
            _this.width = "100%";
            _this.height = "100%";
            return _this;
        }
        Object.defineProperty(_StartPage.prototype, "namedChilds", {
            get: function () { return this._namedChilds; },
            enumerable: false,
            configurable: true
        });
        _StartPage.ClassName = "game.StartPage";
        _StartPage._childs = [
            [UI[0], { src: RES[3] }],
            [UI[4], , "mainPage", , , , , "100%", "100%", , , , , , , , , , , , , [
                    [UI[2], , "stage", , , , , "100%", 1280, , "50%", , , , , , , , , , , [
                            { type: "Image", id: "蝙蝠侠", src: RES[25], x: 515, y: 812, anchorX: 0.5, anchorY: 0.5 },
                            { type: "Image", id: "猪", src: RES[26], x: 38, y: 112 },
                            { type: "Image", src: RES[27], x: 132, y: 538 },
                            { type: "Image", src: RES[28], x: 103, y: 402 },
                        ]],
                    [UI[0], { src: RES[29] }, , , , , "10%", 237, 34, "50%"],
                    [UI[6], , "help", 80, , , "15%", 218, 85, , , , , , , , , , , { bk: { src: RES[30] } }],
                    [UI[6], , "start", , , 80, "15%", 218, 85, , , , , , , , , , , { bk: { src: RES[31] } }],
                    [UI[6], { style: "yellow", label: "排行榜" }, "rank", 44, 92, , , 146, 54],
                ]],
            [UI[7], , "sound", 570, 92, , , 56, 59, , , , , , , , , , , { icon: { src: RES[11] }, checkImg: { src: RES[12] } }],
            [UI[4], , "helpPage", , , , , "100%", "100%", , , , false, , , , , , , , , [
                    [UI[0], { src: RES[8] }, , , 160, , , , , "50%"],
                    [UI[4], , , , 900, , 0, "100%", , , , , , , , , , , , , , [
                            [UI[6], { label: "已知晓" }, "okBtn", , "30%", , , 195, 70, "50%"],
                        ]],
                ]],
            [UI[9], , "rankPage", , , , , , , , , , false]
        ];
        return _StartPage;
    }(ui.Container));
    game._StartPage = _StartPage;
    ez.initCall(function () { ui.initUIClass(game.StartPage, ui.Container); });
})(game || (game = {}));
//# sourceMappingURL=ui.js.map