const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const events = req.body.events;

    events.forEach(event => {
        if (event.type === 'follow') {
            const userId = event.source.userId;
            console.log(`User followed: ${userId}`);
            // เก็บ userId ในฐานข้อมูลหรือ session ตามต้องการ
        }
    });

    res.status(200).send('OK');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
