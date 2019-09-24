const searchService = require("./services/searchService");

let plpController = async (req, res) => {
    let term = req.query.q;
    console.time("Prepare data for plp");
    let data = await searchService.prepareData(term);
    console.timeEnd("Prepare data for plp");
    return res.render("pages/plp/views/plp", data);
};

module.exports = plpController;