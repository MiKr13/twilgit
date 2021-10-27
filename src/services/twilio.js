const Twilio = require("twilio");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

class TwilioService {
  #twilioPhoneNumber = process.env.APP_TWILIO_PHONE_NUMBER;

  constructor() {
    this.client = Twilio(
      process.env.APP_TWILIO_ACCOUNT_SID,
      process.env.APP_TWILIO_ACCOUNT_AUTH_TOKEN
    );
    this.twiml = new MessagingResponse();
  }

  sendSMS = async (to, body) => {
    try {
      const response = await this.client.messages.create({
        body,
        from: this.#twilioPhoneNumber,
        to,
      });

      return response;
    } catch (error) {
      throw new Error(error.toString());
    }
  };

  recievedSMS = async (body) => {
    try {
      this.twiml.message(body);

      return this.twiml.toString();
    } catch (error) {
      throw new Error(error.toString());
    }
  };
}

module.exports = new TwilioService();
