const API_URL = "http://localhost:5000";

// Test Backend
export async function testBackend() {
  const response = await fetch(`${API_URL}/api/test`);

  if (!response.ok) {
    throw new Error("Failed to connect to backend");
  }

  return response.json();
}

// Register User
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}

// Login User
export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response.json();
}
export const uploadPDF = async (file) => {
  const formData = new FormData();

  formData.append("pdf", file);

  const response = await fetch("http://localhost:5000/api/upload", {
    method: "POST",
    body: formData,
    headers: {
  Authorization: `Bearer ${localStorage.getItem("token")}`
}
  });

  return response.json();
};