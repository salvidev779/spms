const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 1. USSD Callback Route (Iyi ni yo Africa's Talking izajya yoherezaho ubutumwa)
app.post('/ussd-callback', (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = '';

    if (text === '') {
        // Menu y'ibanze (Main Menu)
        response = `CON Murakaza neza kuri SPMS\n`;
        response += `1. Kwinjiza Amafaranga\n`;
        response += `2. Kubikuza cyangwa Gukoresha\n`;
        response += `3. Reba Konti (Balance)`;
    } else if (text === '1') {
        response = `CON Hitamo ubwoko bwa konti:\n`;
        response += `1. Pocket Money\n`;
        response += `2. Canteen Money`;
    } else if (text === '1*1') {
        response = `CON Shyiramo umubare w'amafaranga ushaka kwinjiza:`;
    } else {
        response = `END Murakoze gukoresha SPMS.`;
    }

    res.set('Content-Type: text/plain');
    res.send(response);
});

// 2. Payment Webhook Route (Iyi ni yo yakira amakuru y'amafaranga yohererejwe)
app.post('/payment-callback', (req, res) => {
    const paymentData = req.body;
    console.log("Payment received:", paymentData);
    
    // Hano hazaza uburyo bwo kuvugurura ubwizigame bw'umunyeshuri
    res.status(200).send({ status: 'Success' });
});

// Gufungura Server ku cyambu (Port) cyangwa se iya Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SPMS Server irimo gukora kuri port ${PORT}`);
});
