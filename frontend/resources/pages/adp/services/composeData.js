const css = require("../../../../src/css/css");
const R = require("ramda");
const articles = require("../../../../src/articles/articlesService");
let data = require("../data-feed/adp");

const getData = async (articleID) => {
    let result = R.clone(data);
    result.topArticles = await articles.getTopArticles();
    result.articleDetail = await articles.getArticle(articleID);
    result.topArticlesADP = await articles.getTopArticles(5);
    result.structuredData = buildStructuredData(result.articleDetail);
    result.css = css.getFileContent("./assets/css/ifarmer-adp-min.css");
    return result;
};

const buildStructuredData = (article) => {
    let result = [];
    result.push(buildArticleStructuredData(article));
    return result;
};

const buildArticleStructuredData = (article) => {
    const articleDetail = article._source;
    const url = `http://ifarmer.vn/bai-viet/${articleDetail.url}/`;
    let result = {
        "@context": "http://schema.org",
        "@type": "Article",
        headline: articleDetail.title,
        url: url,
        dateModified: articleDetail.updatedAt,
        datePublished: articleDetail.createdAt,
        description: articleDetail.description,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url
        },
        author: {
            "@type": "Person",
            name: articleDetail.author,
        },

        publisher: {
            "@type": "Organization",
            name: "ifarmer.vn",
            logo: {
                "@type": "ImageObject",
                url: "http://ifarmer.vn/assets/img/icons/favicon-96x96.png",
                width: 57,
                height: 57,
                sameAs: [
                    "https://www.youtube.com/channel/UCWpNAh53Cy11hy693mMdHlQ",
                    "https://www.facebook.com/ifarmer.vn/"
                ]
            },
        },
    };
    //Todo article must have hero image
    if(articleDetail.images)
    {
        result.image = {
            "@type": "ImageObject",
            url: articleDetail.images[0].url,
            width: 1200,
            height: 675,

        };
    }
    return result;
};

const revealed = {
    getData,
};
module.exports = revealed;
