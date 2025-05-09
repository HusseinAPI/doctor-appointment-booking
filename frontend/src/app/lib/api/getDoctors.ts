export async function getDoctorsFromAPI() {
  try {
    const response = await fetch(
      'http://localhost:5000/api/appointment/doctors',
      {
        cache: 'no-store',
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
}
