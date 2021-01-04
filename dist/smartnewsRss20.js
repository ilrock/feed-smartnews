"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _xmlJs = require("xml-js");

var convert = _interopRequireWildcard(_xmlJs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (ins) {
    var options = ins.options;

    var isAtom = false;
    var isContent = false;
    var base = {
        _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
        rss: {
            _attributes: { version: "2.0" },
            channel: {
                title: { _text: options.title },
                link: { _text: options.link },
                description: { _text: options.description },
                pubDate: { _text: options.pubDate ? options.pubDate.toUTCString() : new Date().toUTCString() }
            }
        }
    };
    /**
     * Channel language
     */
    if (options.language) {
        base.rss.channel.language = { _text: options.language };
    }
    /**
     * Channel Copyright
     */
    if (options.copyright) {
        base.rss.channel.copyright = { _text: options.copyright };
    }
    /**
     * Channel TTL
     */
    if (options.ttl) {
        base.rss.channel.ttl = { _text: options.ttl };
    }
    /**
     * Channel Logo
     */
    if (options["snf:logo"] !== undefined && options["snf:logo"].url) {
        base.rss.channel["snf:logo"] = {
            _attributes: {
                url: options["snf:logo"].url
            }
        };
    }
    /**
     * Channel Items
     * http://cyber.law.harvard.edu/rss/rss.html#hrelementsOfLtitemgt
     */
    base.rss.channel.item = [];
    ins.items.map(function (entry) {
        var item = {
            title: {
                _cdata: entry.title
            },
            link: {
                _text: entry.link
            },
            pubDate: {
                _text: entry.pubDate ? entry.pubDate.toUTCString() : new Date().toUTCString()
            },
            "content:encoded": {
                _cdata: entry["content:encoded"]
            }
        };
        if (entry.guid) {
            item.guid = { _text: entry.guid };
        }
        if (entry.description) {
            item.description = { _text: entry.description };
        }
        if (entry.category) {
            item.category = { _text: entry.category };
        }
        if (entry["dc:creator"]) {
            item["dc:creator"] = { _text: entry["dc:creator"] };
        }
        if (entry["dc:language"]) {
            item["dc:language"] = { _text: entry["dc:language"] };
        }
        if (entry["media:thumbnail"] !== undefined && entry["media:thumbnail"].url) {
            item["media:thumbnail"] = {
                _attributes: {
                    url: entry["media:thumbnail"].url
                }
            };
        }
        if (entry["snf:video"] !== undefined && entry["snf:video"].url) {
            item["snf:video"] = {
                _attributes: {
                    url: entry["snf:video"].url,
                    caption: entry["snf:video"].caption
                }
            };
        }
        if (entry["media:status"]) {
            item["media:status"] = { _text: entry["media:status"] };
        }
        if (entry["snf:advertisement"] !== undefined && entry["snf:advertisement"]["snf:sponsoredLink"] !== undefined && entry["snf:advertisement"]["snf:sponsoredLink"].length !== 0) {
            item["snf:advertisement"] = {
                "snf:sponsoredLink": []
            };
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = entry["snf:advertisement"]["snf:sponsoredLink"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var adv = _step.value;

                    var sponsoredLink = {
                        _attributes: {
                            link: adv.link,
                            advertiser: adv.advertiser
                        }
                    };
                    if (adv.title) {
                        sponsoredLink._attributes.title = adv.title;
                    }
                    if (adv.thumbnail) {
                        sponsoredLink._attributes.thumbnail = adv.thumbnail;
                    }
                    item["snf:advertisement"]["snf:sponsoredLink"].push(sponsoredLink);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        base.rss.channel.item.push(item);
    });
    if (isContent) {
        base.rss._attributes["xmlns:content"] = "http://purl.org/rss/1.0/modules/content/";
    }
    if (isAtom) {
        base.rss._attributes["xmlns:atom"] = "http://www.w3.org/2005/Atom";
    }
    return convert.js2xml(base, { compact: true, ignoreComment: true, spaces: 4 });
};