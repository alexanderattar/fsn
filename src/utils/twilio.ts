import 'dotenv/config';
import { Twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const myNumber = process.env.MY_NUMBER;

export async function sendTwilioMessage(msg: string) {
  if (accountSid && authToken && myNumber && twilioNumber) {
    const client = new Twilio(accountSid, authToken);
    const message = await client.messages.create({
      from: twilioNumber,
      to: myNumber,
      body: msg,
    });
    console.log(message.sid);
  } else {
    console.error(
      'Environment variables are missing to send the SMS via Twilio'
    );
  }
}
