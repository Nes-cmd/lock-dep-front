import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-brandGray text-brandNavy font-sans flex flex-col justify-between">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black tracking-tight text-brandNavy flex items-center gap-2">
            <span className="text-brandCyan">Birr</span>Bazaar
          </Link>

          {/* Nav Links - Corrected Anchors */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a href="#features" className="hover:text-brandCyan transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brandCyan transition-colors">How It Works</a>
            <a href="#about-us" className="hover:text-brandCyan transition-colors">About Us</a>
          </div>

          {/* Auth CTA Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-bold border-2 border-brandNavy rounded-lg hover:bg-brandNavy hover:text-white transition-all duration-200"
            >
              Log In
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 text-sm font-bold bg-brandNavy text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Hero Text */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            Shop with Ease, <br />
            <span className="text-brandCyan">Pay with Confidence.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Welcome to BirrBazaar, Ethiopia's ultimate hybrid marketplace. Securely store your funds in your integrated wallet, shop your favorite items, and checkout in a single tap. 
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link 
              to="/signup" 
              className="w-full sm:w-auto text-center px-8 py-4 font-bold text-white bg-brandOrange rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-orange-500/20"
            >
              Get Started Now
            </Link>
            <a 
              href="#features" 
              className="w-full sm:w-auto text-center px-8 py-4 font-bold border-2 border-gray-200 rounded-xl hover:bg-white transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Hero Graphic */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative w-full max-w-md h-96 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brandCyan/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brandOrange/10 rounded-full blur-2xl"></div>
            
            <div className="text-center p-8 space-y-4 z-10">
              <div className="text-6xl animate-bounce">📱 🛒</div>
              <h3 className="text-xl font-bold">Your Wallet + Marketplace</h3>
              <p className="text-sm text-gray-500">Fast digital deposits and checkout unified on a single secure platform.</p>
            </div>
          </div>
        </div>
      </header>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="bg-white py-20 border-t border-gray-100 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black">Everything you need in one place</h2>
            <p className="text-gray-500 mt-2">A simpler, safer way to buy goods online without leaving your primary wallet application.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Wallet */}
            <div className="p-8 rounded-2xl bg-brandGray border border-gray-150 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brandCyan/10 text-brandCyan flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Digital Wallet</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Deposit money securely into your personal balance. Track transaction ledgers with full transparency.
              </p>
            </div>

            {/* Feature 2: Checkout */}
            <div className="p-8 rounded-2xl bg-brandGray border border-gray-150 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brandOrange/10 text-brandOrange flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Checkout</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                No external payment routing. Complete your shopping directly inside BirrBazaar using your secure in-app funds.
              </p>
            </div>

            {/* Feature 3: Security */}
            <div className="p-8 rounded-2xl bg-brandGray border border-gray-150 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-brandNavy/10 text-brandNavy flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Role-Based Access</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Clean separation of portals. Administrators get isolated catalog control dashboards while customers get clean shopping loops.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION (NEW) */}
      <section id="how-it-works" className="bg-brandGray py-20 border-t border-gray-150 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black">How BirrBazaar Works</h2>
            <p className="text-gray-500 mt-2">Three simple steps to start shopping with your secure digital wallet.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brandNavy text-white flex items-center justify-center text-xl font-extrabold mx-auto shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold">Create Account</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Sign up as a customer in seconds. Your secure personal wallet is automatically generated instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brandCyan text-white flex items-center justify-center text-xl font-extrabold mx-auto shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold">Deposit Funds</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Load money directly into your balance. Track your updated deposits live on your dashboard.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-brandOrange text-white flex items-center justify-center text-xl font-extrabold mx-auto shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold">Browse & Buy</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Explore items added by admins, click buy, and funds are automatically deducted with zero hassle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT US SECTION (NEW) */}
      <section id="about-us" className="bg-white py-20 border-t border-gray-100 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <div className="inline-block px-4 py-1.5 bg-brandCyan/10 text-brandCyan text-xs font-bold tracking-wider uppercase rounded-full">
            Our Mission
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Bridging E-Commerce & Financial Inclusion
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            BirrBazaar was built to solve a simple challenge: making online shopping immediate and trustworthy. By pairing a robust e-commerce catalog with an append-only digital wallet transaction engine, we keep your balance safe and your checkouts fast. 
          </p>
          <div className="pt-4">
            <Link 
              to="/signup" 
              className="inline-block px-8 py-4 font-bold text-white bg-brandNavy rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              Join BirrBazaar Today
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-brandNavy text-white py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© 2026 BirrBazaar. Built for dual-repository training architectures.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}