let data = require("../../data-feed/adp");

const adpModel = {
    get title() {
        return data.title;
    },
    get heading() {
        return data.heading;
    },
    get css() {
        return data.css;
    },
    get topArticles() {
        return data.topArticles;
    },
    get articleDetail() {
        return data.articleDetail;
    },
    get structuredData() {
        return data.structuredData;
    },
    get topArticlesADP() {
        return data.topArticlesADP;
    },
    get canonical() {
        return data.canonical;
    },
    set __data(d) {
        data = d;
    },

};
module.exports = adpModel;