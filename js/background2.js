var background2;
(function (background2) {
    background2.hole = [318, 635];
    background2.lines = [
        [0, 70, 710, 70],
        [710, 70, 710, 339],
        [710, 339, 446, 510],
        [446, 510, 466, 538],
        [466, 538, 710, 379],
        [710, 379, 710, 1280],
        [0, 70, 0, 1280],
        [120, 902, 361, 902],
        [361, 902, 361, 934],
        [361, 934, 120, 939],
        [120, 902, 120, 939],
        [710, 1280, 0, 1280]
    ].map(l => [{ x: l[0], y: l[1] }, { x: l[2], y: l[3] }]);
})(background2 || (background2 = {}));
//# sourceMappingURL=background2.js.map