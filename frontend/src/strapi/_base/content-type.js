const request = require("request");


const getByColumnName = (contentName, columnName) => (value) => {
    const url = `http://cms:1337/${contentName}?${columnName}=${value}`;
    console.log("url", url);
    return new Promise(resolve => {
        request.get({
            url: url,
        }, async function callback(error, response, body) {
            if (error) {
                console.log(error);
            }
            let result = JSON.parse(body);
            resolve(result[0]);
        })
    });
};

const deleteByID = contentName => _id => {
    return new Promise(resolve => {
        console.log("Delete", _id);
        request.delete({
            url: `http://cms:1337/${contentName}/${_id}`
        }, async function callback(error, response, body) {
            const info = JSON.parse(body);
            resolve(info);
        });
    });
};

const update = contentName => data => {
    return new Promise(resolve => {
        console.log("Updated", data._id);
        request.put({
            url: `http://cms:1337/${contentName}/${data._id}`
        }, async function callback(error, response, body) {
            if (error) {
                console.log(error);
            }
            const info = JSON.parse(body);
            resolve(info);
        }).form(data);
    });
};

const revealed = {
    update,
    deleteByID,
    getByColumnName
};

module.exports = revealed;