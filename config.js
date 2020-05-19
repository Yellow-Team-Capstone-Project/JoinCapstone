module.exports = {
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    apiKey: process.env.TWILIO_API_KEY_SID,
    apiSecret: process.env.TWILIO_API_KEY_SECRET,
    // chatService: process.env.TWILIO_CHAT_SERVICE_SID,
    // outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    // incomingAllow: process.env.TWILIO_ALLOW_INCOMING_CALLS === "true"
  },
  cloudinary: {
    // Has secret, name, and key
    cloudUrl: process.env.CLOUDINARY_URL
  }
};
