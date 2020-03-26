const request = require("request");
const contentName = "customers";
const contentType = require("../_base/content-type");
const update = contentType.update(contentName);
const deleteByID = contentType.deleteByID(contentName);
const get = contentType.getByColumnName(contentName, "customer_id");

const create = customer => {
    return new Promise(async (resolve, reject) => {
        request.post({
            url: `http://cms:1337/${contentName}`,
        }, async function callback(error, response, body) {
            if (error) {
                console.log("error", error);
            }
            const info = JSON.parse(body);
            resolve(info);
        }).form(customer);
    });
};
const createMapping = customer => {
    return new Promise(async (resolve, reject) => {
        const mapped = mapping(customer);
        request.post({
            url: `http://cms:1337/${contentName}`,
        }, async function callback(error, response, body) {
            console.log(body);
            if (error) {
                console.log(error);
            }
            const info = JSON.parse(body);
            resolve(info);
        }).form(mapped);
    });
};

const mapping = customer => {
    return {
        phone: customer.phone || "0918111111",
        address: customer.address || "abc",
        email: customer.email || "test@gmail.com",
        name: customer.displayName,
        status: "moi",
        gender: "khong-xac-dinh",
        address1: customer.address1,
        provider: "google",
        picture: customer.picture,
        customer_id: customer.id
    };
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
