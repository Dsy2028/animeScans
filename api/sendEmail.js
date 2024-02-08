
import notifications from './models/email.model.js';
import Mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (req, res, next) => {
    const all = req.body;
 const email = req.body.email;
  const mailjet = Mailjet.apiConnect(process.env.MAIL_API, process.env.MAIL_SECRET)

const request = mailjet.post('send', {'version': 'v3.1'})
  .request({
    "Messages":[
      {
        "From": {
          "Email": "htooe220@gmail.com",
          "Name": "htooe220@gmail.com"
        },
        "To": [
          {
            "Email": email,
            "Name": email
          }
        ],
        "Subject": "Signed up for notifications",
        "TextPart": `Hello ${email}!`,
        "HTMLPart": "<h3>You are now signed up for notifications</a>!</h3><br />You will be notified via email whenever leaks/spoilers are out"
      }
    ]
  })

request
  .then((result) => {
  //  console.log(result.body)
    res.status(200).json({success: "Succesfully signed up for notifications"})
  })
  .catch((err) => {
    console.log(err.statusCode)
  });
  const saveReq =  new  notifications({email: email, phone: all.phone});
  await saveReq.save();
}