import { useState } from 'react';
import Login from './Login';

function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="pt-20 relative min-h-screen">
      {/* Page Content */}
      <div className={`text-center transition duration-300 ${showLogin ? 'blur-sm' : ''}`}>
        <h1 className="text-3xl font-bold mb-6">Shared Expense Splitter (Homepage I2 😮)</h1>
        <button
          onClick={() => setShowLogin(true)}
          className="items-center px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Sign In
        </button>
      </div>

      {/* Login Modal Overlay */}
      {showLogin && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30">
          <div className="relative">
            <Login onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
