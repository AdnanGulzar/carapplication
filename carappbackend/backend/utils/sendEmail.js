const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'cassandra34@ethereal.email',
        pass: '9ZjKthnUJqkSGmND7x'
    },
  });

  const mailOptions = {
    from: '"noreply at" <carappp@example.com>', // sender address
    to: options.email, // list of receivers
    subject:options.subject, // Subject line
    text:options.message 
  };

 const info= await transporter.sendMail(mailOptions);
 console.log(info);
};

module.exports = sendEmail;
