"use server";

import { sendEmail } from "../lib/brevo";

export async function handleForm(formData) {
  const name = formData.name;
  const email = formData.email;
  const company = formData.company;
  const content = formData.content;

  if (!name || !email || !content) {
    console.log("Por favor, llena todos los campos necesarios");
    return false;
  }

  if (
    name.length > 50 ||
    email.length > 100 ||
    company.length > 50 ||
    content.length > 500
  ) {
    console.log("Los campos exceden el límite de caracteres permitidos.");
    return false;
  }

  const emailContent = `
    <p><strong>Nombre:</strong> ${name}<br>
    <strong>Email:</strong> ${email}<br>
    <strong>Compañía:</strong> ${company || "No especificado"}</p>
    <p><strong>Mensaje:</strong><br>${content}</p>
  `;

  try {
    await sendEmail({
      to: [
        {
          email: "studio@creatyum.com",
          name: "Creatyum Studio",
        },
      ],
      htmlContent: emailContent,
      sender: {
        name: name,
        email: email,
      },
    });
    return true;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return false;
  }
}
