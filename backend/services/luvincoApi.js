const axios = require("axios");

const api = axios.create({
    baseURL: process.env.LUVINCO_API,
    headers: {
        Authorization: process.env.LUVINCO_TOKEN,
    },
});

async function getProducts() {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (err) {
        console.error("Erro da API (getProducts):", err.message);
        throw err; 
    }
}

async function createOrder(orderData) {
    try {
        const response = await api.post("/orders", orderData);
        return response.data;
    } catch (err) {
        console.error("Erro da API (createOrder):", err.message);
        throw err;
    }
}

module.exports = { getProducts, createOrder };