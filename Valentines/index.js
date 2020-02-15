const cron = require('node-cron');

const config = require('./config');
const accountSid = config.ACCOUNT_SID;
const authToken = config.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const messages = require('./messages');

let currentMessage = 0;

function sendMessage() {
  client.messages
        .create({
          body: messages[currentMessage],
          from: '+12569524781',
          to: config.PHONE_NR
        })
        .then(message => {
          currentMessage++;
          console.log(message.sid);
        });
}


cron.schedule('* * * * *', () => {
  console.log('Message sent !');
  sendMessage();
});
