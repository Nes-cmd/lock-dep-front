import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handles typing in the input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const API_URL = "http://team1-api.primetrustx.com/api/auth/signup";

try {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("Account created successfully!");
    console.log(data);
  } else {
    alert(data.message || "Signup failed.");
  }
} catch (error) {
  console.error(error);
  alert("Failed to connect to the server.");
}

    // Backend integration goes here once CORS is fixed
    /*
    const API_URL = "http://team1-api.primetrustx.com/api/auth/signup";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the server.");
    }
    */
  };

  return (
    <div className="min-h-screen bg-brandGray flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-brandNavy text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Join us by creating a new account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@email.com"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brandOrange text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-brandCyan font-medium">
            Log in
          </a>
        </p>

      </div>
    </div>
  );
}