'use client';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { signIn } from '../../redux/userSlice';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const isLogged = useSelector((state) => state.userSlice.isLogged);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInfo = {
      email: email.current?.value,
      password: password.current?.value,
    };
    if (
      typeof userInfo.email === 'string' &&
      typeof userInfo.password === 'string' &&
      userInfo.email.length > 0 &&
      userInfo.password.length > 0
    ) {
      dispatch(signIn(userInfo));
      email.current.value = '';
      password.current.value = '';
    }
  };

  useEffect(() => {
    if (isLogged) {
      router.push('/user/dashboard');
    }
  }, [isLogged, router]);

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
            ref={email}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg"
            ref={password}
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

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?
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
