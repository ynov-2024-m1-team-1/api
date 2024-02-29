const SibApiV3Sdk = require('@getbrevo/brevo');

module.exports = function senderEmail(user) {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];
    console.log(process.env.BREVO_KEY)
    apiKey.apiKey = process.env.BREVO_KEY;
    
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 
    
    sendSmtpEmail.subject = "New user";
    sendSmtpEmail.sender = {"name":"John Doe","email":"example@gmail.com"};
  sendSmtpEmail.to = [{ "email": `${user.mail}`, "name": `${user.name} ${user.surname}`}, {"email":"admin@gmail.com","name":`Admin ADMIN`}];
    sendSmtpEmail.htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Registration Notification</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
    
      <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
          <td>
            <h2 style="color: #333333;">User Registration Notification</h2>
            <p style="color: #666666;">Hello,</p>
            <p style="color: #666666;">User <strong>${user.mail}</strong> has just registered on your website/application.</p>
            <p style="color: #666666;">Here are some details:</p>
            <ul style="color: #666666;">
              <li><strong>Firstname:</strong> ${user.name}</li>
              <li><strong>Lastname:</strong> ${user.surname}</li>
              <!-- Add more user details as needed -->
            </ul>
            <p style="color: #666666;">Thank you for your attention.</p>
            <p style="color: #666666;">Best regards,</p>
            <p style="color: #666666;"><em>Your Company Name</em></p>
          </td>
        </tr>
      </table>
    
    </body>
    </html>`;
    
    
    
    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    
    }, function(error) {
        console.error(error);
    });
}
