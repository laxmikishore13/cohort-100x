import { useState } from "react";

// eslint-disable-next-line no-unused-vars
function useAuth(route, username, password) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const authenticationRequest = async () => {
    setLoading(true);
    try {
      const fetchRequest = await fetch("http://localhost:3000/admin/" + route, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const requestResponse = await fetchRequest.json();
      console.log("response.status: ", requestResponse);
      setToken(requestResponse);
      setLoading(false);
      if (requestResponse.message === "Admin already exists") {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };
  return { loading, error, token, authenticationRequest };
}

export default useAuth;
