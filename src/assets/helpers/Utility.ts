import { Regexes } from "./Constants";

export default class Utility {
    static parseTime = (content: string): number => {
        if (!content) return 0;
        const { time } = Regexes;

        content = " " + content;

        const matches = {
            months: time.month.exec(content)?.groups?.months,
            weeks: time.week.exec(content)?.groups?.weeks,
            days: time.day.exec(content)?.groups?.days,
            hours: time.hours.exec(content)?.groups?.hours,
            minutes: time.minutes.exec(content)?.groups?.minutes,
            seconds: time.seconds.exec(content)?.groups?.seconds,
        };

        let minutes: number = parseInt(matches.minutes || "0");
        if (matches.seconds) minutes += parseInt(matches.seconds || "0") / 60;
        if (matches.hours) minutes += parseInt(matches.hours || "0") * 60;
        if (matches.days) minutes += parseInt(matches.days || "0") * 1440;
        if (matches.weeks) minutes += parseInt(matches.weeks || "0") * 10080;
        if (matches.months) minutes += parseInt(matches.months || "0") * 43800;
      
        return minutes;
    }

    static titleCase = (string: string) =>
        string
        .toLowerCase()
        .split(" ")
        .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join(" ");
}