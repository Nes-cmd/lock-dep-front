import API from '../services/api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  // 1. Form States matching Daniya's logic
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // 2. Form Submission Handler
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Send exact fields matching the User model
      await API.post('/auth/signup', {
        name,
        email,
        password,
        role: 'customer',
      });

      // Redirect to login page on success
      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-brandGray font-sans">
      
      {/* LEFT SIDE: The 3 Stages Panel (Visual Journey Breakdown) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brandNavy text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brandCyan/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brandOrange/20 rounded-full blur-3xl"></div>

        {/* Brand Logo */}
        <div className="z-10">
          <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="text-brandCyan">Birr</span>Bazaar
          </Link>
        </div>

        {/* Stages Timeline */}
        <div className="space-y-10 z-10 my-auto">
          <div className="space-y-2">
            <h2 className="text-3xl font-black leading-tight">Your Journey with BirrBazaar</h2>
            <p className="text-gray-400 text-sm">Get ready to experience seamless hybrid shopping in just three simple stages.</p>
          </div>

          <div className="space-y-8">
            {/* Stage 1 - Active */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-brandCyan text-brandNavy font-extrabold flex items-center justify-center shrink-0 shadow">
                1
              </div>
              <div>
                <h4 className="font-bold text-base text-white">Stage 1: Secure Account Registration</h4>
                <p className="text-gray-300 text-sm mt-1">Create your profile to automatically provision your private transaction wallet ledger.</p>
              </div>
            </div>

            {/* Stage 2 - Pending */}
            <div className="flex gap-4 items-start opacity-50">
              <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 font-extrabold flex items-center justify-center shrink-0 border border-white/5">
                2
              </div>
              <div>
                <h4 className="font-bold text-base text-gray-400">Stage 2: Fund Your Wallet</h4>
                <p className="text-gray-500 text-sm mt-1">Load Birr securely into your in-app balance to enable instant checkout pipelines.</p>
              </div>
            </div>

            {/* Stage 3 - Pending */}
            <div className="flex gap-4 items-start opacity-50">
              <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 font-extrabold flex items-center justify-center shrink-0 border border-white/5">
                3
              </div>
              <div>
                <h4 className="font-bold text-base text-gray-400">Stage 3: Seamless Marketplace Checkouts</h4>
                <p className="text-gray-400 text-sm mt-1">Browse catalogs and secure high-demand products with a single transaction tap.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <p className="text-xs text-gray-500 z-10">© 2026 BirrBazaar. Secure Wallet Architecture.</p>
      </div>

      {/* RIGHT SIDE: Fully Functional Form */}
      <div className="lg:col-span-7 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          <div className="lg:hidden text-center">
            <Link to="/" className="text-3xl font-black text-brandNavy">
              <span className="text-brandCyan">Birr</span>Bazaar
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-black text-brandNavy">Create your account</h3>
            <p className="text-gray-500 text-sm">Join us today to initialize your digital wallet ledger.</p>
          </div>

          {/* Form-Wide Validation and Submission Errors */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Doe" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brandCyan focus:ring-2 focus:ring-brandCyan/10 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brandCyan focus:ring-2 focus:ring-brandCyan/10 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brandCyan focus:ring-2 focus:ring-brandCyan/10 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brandCyan focus:ring-2 focus:ring-brandCyan/10 transition-all text-sm"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 text-white font-bold rounded-xl transition-all shadow-lg flex justify-center items-center ${
                isLoading ? 'bg-brandNavy/70 cursor-not-allowed' : 'bg-brandNavy hover:bg-opacity-90'
              }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Initialize My Wallet & Register'
              )}
            </button>
          </form>

          <p className="text-sm text-center lg:text-left text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brandCyan font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

