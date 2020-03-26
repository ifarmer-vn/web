const variantsService = require("../../../src/variants/variantsService");
const customerCMS = require("../../../src/strapi/customers/customers");
const orderDetailCMS = require("../../../src/strapi/orderDetails/orderDetails");
const ordersCMS = require("../../../src/strapi/orders/orders");
const searchProxy = require("../../../src/elasticsearch/searchProxy");
let orderController = async (req, res) => {
    const params = req.query;
    console.log("orderController");
    let ship = searchProxy.createShip();
    ship.addQuery("variants_v1", variantsService.getVariant(params.productID));
    let data = await ship.flush();
    const variant = data[0].hits.hits[0]; //for detail
    const price = variant._source.price;
    if (!variant || !variant._source.enableOrder || isNaN(price)) {
        return res.redirect("https://www.messenger.com/t/ifarmer.vn");
    }

    const customer = {
        name: params.customerName,
        status: "moi",
        gender: "khong-xac-dinh",
        email: params.customerEmail,
        phone: params.customerPhone,
        address: params.contactAddress,
        customer_id: +(new Date())
    };
    const product = `https://ifarmer.vn/san-pham/${params.productID}`;
    const orderDetail = {
        orderID: +(new Date()),
        quantity: parseInt(params.quantity),
        price: price,
        variantURL: product
    };
    const order = {
        product: product,
        customerID: customer.customer_id,
        totalPrice: price * parseInt(params.quantity),
        status: 'dang-cho',
        notes: params.notes,
        customer: customer,
        orderdetail:orderDetail
    };
    console.log("order",order);
    const createdOrder = await ordersCMS.create(order);

    console.log("createdOrder",createdOrder);

    res.redirect("/dat-hang-thanh-cong");
};

module.exports = orderController;

