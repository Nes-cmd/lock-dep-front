export default function Signup() {
  return (
    <div className="min-h-screen bg-brandGray flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-brandNavy text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-2">
          Join us by creating a new account.
        </p>

        <form className="mt-8 space-y-5">

          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="youremail@email.com"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
            />
          </div>
          git status
          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brandNavy mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-brandCyan"
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