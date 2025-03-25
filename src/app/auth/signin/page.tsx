import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="flex justify-center w-full my-20 p-8">
      <div className="w-full sm:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-10 rounded-lg shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6">
          Login as <span className="text-blue-600">Medical Center</span>
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter your email or mobile number"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="w-4 h-4" />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-600 text-sm">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account?
          <Link
            href="/auth/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
