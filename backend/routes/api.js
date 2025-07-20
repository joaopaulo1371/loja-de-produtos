const express = require("express");
const router = express.Router();
const { getProducts, createOrder } = require("../services/luvincoApi");

router.get("/products", async (req, res) => {
    try {
        const data = await getProducts();
        res.json(data);
    } catch (err) {
        console.error("Erro ao buscar produtos:", err.message);
        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(500).json({ error: "Erro ao buscar produtos." });
        }
    }
});

router.post("/orders", async (req, res) => {
    try {
        const data = await createOrder(req.body);
        res.status(201).json(data);
    } catch (err) {
        console.error("Erro ao enviar pedido:", err.message);
        if (err.response) {
            res.status(err.response.status).json(err.response.data);
        } else {
            res.status(500).json({ error: "Erro ao enviar pedido." });
        }
    }
});

module.exports = router;