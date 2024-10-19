export const handleSubscription = async (data) => {
  const { name, email } = data;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY_NEWS,
    },
    body: JSON.stringify({
      email: email,
      attributes: {
        NOMBRE: name,
      },
      listIds: [4],
      updateEnabled: false,
    }),
  };

  try {
    const response = await fetch("https://api.brevo.com/v3/contacts", options);

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Suscripción exitosa:", jsonResponse);
      return true;
    } else {
      const errorResponse = await response.json();
      console.error("Error al suscribir:", errorResponse);
      return false;
    }
  } catch (error) {
    console.error("Error de red o en la solicitud:", error);
    return false;
  }
};
