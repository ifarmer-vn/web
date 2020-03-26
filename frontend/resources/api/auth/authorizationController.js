let authorizationController = async (req, res) => {
    console.log("authorizationCont1roller");
    return res.json({"test": true});
};

module.exports = authorizationController;