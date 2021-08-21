const plpService = require("./services/plpService");

let plpController = async (req, res) => {
    let categoryID = req.params.categoryID;
    console.log("categoryID",categoryID);
    if (!categoryID) {
        return;
    }
    console.time("Prepare data for plp");
    plpService.prepareData(categoryID).then(data => {
        console.timeEnd("Prepare data for plp");
        return res.render("pages/plp/views/plp", data);
    }).catch(error => {
        console.error(error.message);
        if (error.message === "Not Found") {
            res.status(404).send(error.message);
        }
    });
};

module.exports = plpController;
