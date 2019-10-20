const variantsService = require("../variants/variantsService");
const categoriesService = require("../categories/categoriesService");
const articlesService = require("../articles/articlesService");

const fs = require('fs');
let XMLWriter = require('xml-writer');
main();

function main() {
    productProcess();
    articleProcess();
}

async function productProcess() {
    let cats = await categoriesService.getAllCategories();
    cats.map(async category => {
        const products = await variantsService.getAllVariantsCategory(category._source.url);
        console.log(products.length);
        category.totalProducts = products.length;
        if (category.totalProducts > 0) {
            buildProductsSiteMap(category._source.url, products);
        }
    });

    buildCategorySiteMap("categories", cats);
}

function articleProcess() {
    return buildArticleSiteMapFile();
}

function buildCategorySiteMap(fileName, items) {
    const xw = new XMLWriter();
    xw.startDocument('1.0', 'UTF-8');
    xw.startElement('urlset');
    xw.writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    xw.writeAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    xw.writeAttribute('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');
    items.map(item => {
        xw.startElement('url');
        xw.startElement('loc');
        xw.text(`https://ifarmer.vn/${item._source.url}/`);
        xw.endElement('loc');
        xw.startElement('changefreq');
        xw.text("daily");
        xw.endElement('changefreq');
        xw.startElement('priority');
        xw.text(1);
        xw.endElement('priority');
        xw.endElement('url')
    });
    xw.endElement('urlset');
    xw.endDocument();
    writeFile("../frontend/resources/pages/robots/sitemap-" + fileName + ".xml", xw);
}

function buildProductsSiteMap(fileName, items) {
    const xw = new XMLWriter();
    xw.startDocument('1.0', 'UTF-8');
    xw.startElement('urlset');
    xw.writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    xw.writeAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
    xw.writeAttribute('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');
    items.map(item => {
        xw.startElement('url');
        xw.startElement('loc');
        xw.text(`https://ifarmer.vn/san-phan/${item._source.url}/`);
        xw.endElement('loc');
        xw.startElement('changefreq');
        xw.text("daily");
        xw.endElement('changefreq');
        xw.startElement('priority');
        xw.text(item.default ? 1 : 0.5);
        xw.endElement('priority');
        xw.endElement('url')
    });
    xw.endElement('urlset');
    xw.endDocument();
    writeFile("../frontend/resources/pages/robots/sitemap-" + fileName + ".xml", xw);
}

async function buildArticleSiteMapFile() {
    const allArticles = await articlesService.getAllArticles();
    const xw = new XMLWriter();
    xw.startDocument('1.0', 'UTF-8');
    xw.startElement('urlset');
    xw.writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    xw.writeAttribute('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9');
    allArticles.map(item => {
        xw.startElement('url');
        xw.startElement('loc');
        xw.text(`https://ifarmer.vn/bai-viet/${item._source.url}/`);
        xw.endElement('loc');
        xw.startElement('changefreq');
        xw.text("daily");
        xw.endElement('changefreq');
        xw.startElement('priority');
        xw.text(1);
        xw.endElement('priority');
        xw.endElement('url')
    });
    xw.endElement('urlset');
    xw.endDocument();
    writeFile("../frontend/resources/pages/robots/sitemap-articles.xml", xw);
}

function writeFile(out, result) {
    fs.writeFile(out, result, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Write file", out);
    });
}
