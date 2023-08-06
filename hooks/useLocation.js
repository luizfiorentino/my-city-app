export async function userLocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return [{ message: "Geolocation is not supported by this browser." }, null];
  }

  const location = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (location) => resolve(location),
      (error) => reject(error)
    );
  });

  if (!location) {
    console.log("Error when getting your geolocation");

    return [{ message: "Geolocation is not supported by this browser." }, null];
  }
  return [null, location.coords];
}
