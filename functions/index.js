
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")
    ("sk_test_51IBNwQEO26XSMkVnTd5ayGZj4iYem7x4aBcosdNei19zcoufdjUGcXdQVycHvAnsDM0921bhsoIK0HqBggQ3vywx00Nq2r7Sbj");
// const {response} = require("express")


const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log("Payment Request Recieved!!!", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "gbp",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

exports.api = functions.https.onRequest(app);

