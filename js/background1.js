var background1;
(function (background1) {
    background1.hole = [318, 578];
    background1.lines = [
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
    ].map(l => [{ x: l[0], y: l[1] }, { x: l[2], y: l[3] }]);
})(background1 || (background1 = {}));
//# sourceMappingURL=background1.js.map