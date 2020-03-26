
let loginController = async (req, res) => {
    console.log("loginController.js");
    oauthConfig.google = await getOAuthConfig(GOOGLE_CONFIG);
    console.log(oauthConfig.google);
    oauthConfig.google.tokenUrl = GOOGLE_CONFIG.tokenUrl(oauthConfig.google);
    await callbackForConfig(
        req,
        res,
        oauthConfig.google,
        GOOGLE_CONFIG.provider
    );
    // return res.json({"test": true});

};

module.exports = loginController;

