const plpService = require("./services/plpService");

let plpController = async (req, res) => {
    let categoryID = req.params.categoryID;
    if (!categoryID) {
        return;
    }
    console.time("Prepare data for plp");
    let data = await plpService.prepareData(categoryID);
    console.timeEnd("Prepare data for plp");
    if (!data.products.length) {
        res.status(404);
        res.type('txt').send('Not found');
        return;
    }
    return res.render("pages/plp/views/plp", data);
};

module.exports = plpController;