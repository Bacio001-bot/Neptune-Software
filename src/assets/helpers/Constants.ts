const emojiRegex = require("emoji-regex")() as RegExp;
const emojiRegexStr = emojiRegex.toString();

export const Emojis = {
    CHECK: "",
    CROSS: ""
}

export const Regexes = {
    maskedLink: /\[(?<name>.+)\]\((?<link>https?:\/\/.+)\)/gim,
    symbol: /<|>|\`|\*|~|#|!|"|\(|\)|\[|]|\{|\}|;|\'|/gim,
    spoilerAbuse: /(?:\|\|?[\u180E\u2000-\u2009\u200A-\u200F\u202F\u2028\u2060\uFEFF]?){20,}/gim,
    zws: /[\u1CBC\u180E\u2000-\u2009\u200A-\u200F\u202F\u2028\u2060\uFEFF]/gim,
    customEmoji: /<a?:(?<name>[a-zA-Z0-9\_]+):(?<id>\d{15,21})>/gim,
    unicodeEmoji: emojiRegex,
    allEmoji: new RegExp(
      "(" +
        emojiRegexStr.slice(1, emojiRegexStr.length - 2) +
        "|<a?:(?<name>[a-zA-Z0-9\\_]+):(?<id>\\d{15,21})>)",
      "gim"
    ),
    time: {
        phrasing: [
          /(?:me to (?<reminder>.+) in | ?me in | ?in )? (?:(?<months>\d+)(?: ?months?| ?mos?))(?: ?about | ?that | ?to )?/im,
          /(?:me to (?<reminder>.+) in | ?me in | ?in )? (?:(?<weeks>\d+)(?: ?w(?:ee)?k?s?))(?: ?about | ?that | ?to )?/im,
          /(?:me to (?<reminder>.+) in | ?me in | ?in )? (?:(?<days>\d+)(?: ?d(?:ay)?s?))(?: ?about | ?that | ?to )?/im,
          /(?:me to (?<reminder>.+) in | ?me in | ?in )? (?:(?<hours>\d+)(?: ?h(?:(?:ou)?rs?)?))(?: ?about | ?that | ?to )?/im,
          /(?:me to (?<reminder>.+) in | ?me in | ?in )? (?:(?<minutes>\d+)(?: ?m(?:in)?(?:utes?)?))(?: ?about | ?that | ?to )?/im,
          /(?:me to (?<reminder>.+) in | ?me in | ?in )? (?:(?<seconds>\d+)(?: ?s(?:ec)?(?:onds?)?))(?: ?about | ?that | ?to )?/im,
        ],
        month: / (?<months>\d+)(?: ?months?| ?mos?)/im,
        week: / (?<weeks>\d+)(?: ?w(?:ee)?k?s?)/im,
        day: / (?<days>\d+)(?: ?d(?:ay)?s?)/im,
        hours: / (?<hours>\d+)(?: ?h(?:(?:ou)?rs?)?)/im,
        minutes: / (?<minutes>\d+)(?: ?m(?:in)?(?:utes?)?)/im,
        seconds: / (?<seconds>\d+)(?: ?s(?:ec)?(?:onds?)?)/im,
      },
} 