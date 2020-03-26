const request = require("request");
const contentName = "oderdetails";
const contentType = require("../_base/content-type");
const update = contentType.update(contentName);
const deleteByID = contentType.deleteByID(contentName);
const get = contentType.getByColumnName(contentName,"_id");

const create = orderDetail => {
    return new Promise(async (resolve, reject) => {
        request.post({
            url: `http://cms:1337/${contentName}`,
        }, async function callback(error, response, body) {
            if (error) {
                console.log("error", error);
            }
            const info = JSON.parse(body);
            resolve(info);
        }).form(orderDetail);
    });
};

const getName = () => {
    return contentName;
};

const revealed = {
    getName,
    deleteByID,
    create,
    get,
    update
};
module.exports = revealed;
