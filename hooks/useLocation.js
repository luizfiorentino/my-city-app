export async function userLocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return [{ message: "Geolocation is not supported by this browser." }, null];
  }

  try {
    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (location) => resolve(location),
        (error) => reject(error)
      );
    });

    if (!location) {
      return [{ message: "Geolocation not supported by this browser" }, null];
    }
    return [null, location.coords];
  } catch (error) {
    return [error, null];
  }
}
