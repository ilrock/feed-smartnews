"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SNFFeed = undefined;

var _smartnewsRss = require("./smartnewsRss20");

var _smartnewsRss2 = _interopRequireDefault(_smartnewsRss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SNFFeed = exports.SNFFeed = function SNFFeed(options) {
    var _this = this;

    _classCallCheck(this, SNFFeed);

    this.items = [];
    this.categories = [];
    this.addItem = function (item) {
        return _this.items.push(item);
    };
    this.addCategory = function (category) {
        return _this.categories.push(category);
    };
    /**
     * Returns a Atom 1.0 feed
     */
    // public atom1 = (): string => renderAtom(this);
    /**
     * Returns a RSS 2.0 feed
     */
    this.rss2 = function () {
        return (0, _smartnewsRss2.default)(_this);
    };
    this.options = options;
};