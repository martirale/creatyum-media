import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail({ to, htmlContent, sender }) {
  try {
    const smtpEmail = new brevo.SendSmtpEmail();
    smtpEmail.subject = "Nuevo mensaje de Creatyum Studio";
    smtpEmail.to = to;
    smtpEmail.htmlContent = `<html><body>${htmlContent}</body></html>`;
    smtpEmail.sender = {
      name: "Creatyum Studio",
      email: "studio@creatyum.com",
    };

    if (sender) {
      smtpEmail.replyTo = {
        name: sender.name,
        email: sender.email,
      };
    }

    await apiInstance.sendTransacEmail(smtpEmail);
  } catch (error) {
    console.error(error);
  }
}
