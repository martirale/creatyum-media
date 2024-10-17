export const handleSubscription = async (data) => {
  const { name, email } = data;

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        attributes: { FIRSTNAME: name },
        listIds: [3],
        updateEnabled: false,
      }),
    });

    if (response.ok) {
      return true;
    } else {
      console.error("Error al suscribir:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error de red o en la solicitud:", error);
    return false;
  }
};
