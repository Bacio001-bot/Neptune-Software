"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
class Utility {
}
exports.default = Utility;
Utility.parseTime = (content) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (!content)
        return 0;
    const { time } = Constants_1.Regexes;
    content = " " + content;
    const matches = {
        months: (_b = (_a = time.month.exec(content)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.months,
        weeks: (_d = (_c = time.week.exec(content)) === null || _c === void 0 ? void 0 : _c.groups) === null || _d === void 0 ? void 0 : _d.weeks,
        days: (_f = (_e = time.day.exec(content)) === null || _e === void 0 ? void 0 : _e.groups) === null || _f === void 0 ? void 0 : _f.days,
        hours: (_h = (_g = time.hours.exec(content)) === null || _g === void 0 ? void 0 : _g.groups) === null || _h === void 0 ? void 0 : _h.hours,
        minutes: (_k = (_j = time.minutes.exec(content)) === null || _j === void 0 ? void 0 : _j.groups) === null || _k === void 0 ? void 0 : _k.minutes,
        seconds: (_m = (_l = time.seconds.exec(content)) === null || _l === void 0 ? void 0 : _l.groups) === null || _m === void 0 ? void 0 : _m.seconds,
    };
    let minutes = parseInt(matches.minutes || "0");
    if (matches.seconds)
        minutes += parseInt(matches.seconds || "0") / 60;
    if (matches.hours)
        minutes += parseInt(matches.hours || "0") * 60;
    if (matches.days)
        minutes += parseInt(matches.days || "0") * 1440;
    if (matches.weeks)
        minutes += parseInt(matches.weeks || "0") * 10080;
    if (matches.months)
        minutes += parseInt(matches.months || "0") * 43800;
    return minutes;
};
Utility.titleCase = (string) => string
    .toLowerCase()
    .split(" ")
    .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
    .join(" ");
