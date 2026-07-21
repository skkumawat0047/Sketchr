const express = require('express');
const SibApiV3Sdk = require('sib-api-v3-sdk');

const router = express.Router();

// Brevo setup
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const mailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// POST /user/share
router.post('/', async (req, res) => {
  try {
    const email = req.body.email;

    // Mail object
    const mail = {
      sender: {
        name: 'Sketchr',
        email: process.env.SENDER_EMAIL
      },
      to: [{ email }],
      subject: 'PDF Shared',
      htmlContent: '<h3>A PDF has been shared with you from Sketchr</h3>'
    };

    // Send mail
    await mailApi.sendTransacEmail(mail);

    res.json({
      success: true,
      message: 'Mail sent'
    });

  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      success: false,
      message: 'Mail not sent'
    });
  }
});

module.exports = router;