const pdpService = require("./services/pdpService");

let pdpController = async (req, res) => {
    let productID = req.params.productID;
    console.time("Prepare data for pdp");
    pdpService.prepareData(productID).then(data => {
        console.timeEnd("Prepare data for pdp");
        res.render("pages/pdp/views/pdp", data);

    }).catch(error => {
        console.error(error.message);
        if (error.message === "Not Found") {
            res.status(404).send(error.message);
        }

    });
};

module.exports = pdpController;
