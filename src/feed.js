import renderRSS from "./smartnewsRss20";
export class SNFFeed {
    constructor(options) {
        this.items = [];
        this.categories = [];
        this.addItem = (item) => this.items.push(item);
        this.addCategory = (category) => this.categories.push(category);
        /**
         * Returns a Atom 1.0 feed
         */
        // public atom1 = (): string => renderAtom(this);
        /**
         * Returns a RSS 2.0 feed
         */
        this.rss2 = () => renderRSS(this);
        this.options = options;
    }
}
