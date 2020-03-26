let data = require("../../data-feed/data");

const model = {
     get title() {
        return data.title;
    },
    get description() {
        return data.description;
    },
    get heading() {
        return data.heading;
    },
    get css() {
        return data.css;
    },
    get ampLibraries() {
        return data.ampLibraries;
    },
    get productDetail() {
        return data.productDetail;
    },
    get canonical() {
        return data.canonical;
    },
    set __data(d) {
        data = d;
    },

};
module.exports = model;
