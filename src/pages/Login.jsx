import API from '../services/api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Using your configured API instance (points to Render)
      const response = await API.post('/auth/login', { email, password });
      const data = response.data;

      // Store token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role || 'customer');

      // Role-based redirection
      if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-brandGray font-sans">
      
      {/* LEFT SIDE: Stages Panel */}
      <div className="hidden lg:flex lg:col-span-5 bg-brandNavy text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brandCyan/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brandOrange/20 rounded-full blur-3xl"></div>

        <div className="z-10">
          <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="text-brandCyan">Birr</span>Bazaar
          </Link>
        </div>

        <div className="space-y-10 z-10 my-auto">
          <div className="space-y-2">
            <h2 className="text-3xl font-black leading-tight">Welcome Back!</h2>
            <p className="text-gray-400 text-sm">Access your integrated dashboard and wallet balance securely.</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4 items-start opacity-60">
              <div className="w-8 h-8 rounded-full bg-white/10 text-gray-400 font-extrabold flex items-center justify-center shrink-0 border border-white/5">✓</div>
              <div>
                <h4 className="font-bold text-base text-gray-300">Stage 1: Secure Account Registration</h4>
                <p className="text-gray-500 text-sm mt-1">Your wallet environment is active and securely bound to your cryptographic keys.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-brandCyan text-brandNavy font-extrabold flex items-center justify-center shrink-0 shadow">2</div>
              <div>
                <h4 className="font-bold text-base text-white">Stage 2: Fund Your Wallet</h4>
                <p className="text-gray-400 text-sm mt-1">Review your current balance or load additional secure funds to keep shopping active.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-brandOrange text-white font-extrabold flex items-center justify-center shrink-0 shadow">3</div>
              <div>
                <h4 className="font-bold text-base text-white">Stage 3: Seamless Marketplace Checkouts</h4>
                <p className="text-gray-400 text-sm mt-1">Instantly purchase products with simple one-tap authorization directly from your ledger.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 z-10">© 2026 BirrBazaar. Secure Wallet Architecture.</p>
      </div>

      {/* RIGHT SIDE: Interactive Login Form */}
      <div className="lg:col-span-7 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          <div className="lg:hidden text-center">
            <Link to="/" className="text-3xl font-black text-brandNavy">
              <span className="text-brandCyan">Birr</span>Bazaar
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-black text-brandNavy">Log in to your account</h3>
            <p className="text-gray-500 text-sm">Please log in to manage your balance or access administration tables.</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-md">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
                <a href="#" className="text-xs text-brandCyan hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                'Log In to Dashboard'
              )}
            </button>
          </form>

          <p className="text-sm text-center lg:text-left text-gray-500">
            New to BirrBazaar?{' '}
            <Link to="/signup" className="text-brandCyan font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>

    </div>
  );
}