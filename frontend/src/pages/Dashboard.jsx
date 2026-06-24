import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">

        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h2>
        <p className="text-gray-500 mb-2">Hello, <span className="font-bold text-blue-500">{user?.username}</span>!</p>
        <p className="text-gray-400 text-sm mb-6">Role: <span className="font-bold text-purple-500">{user?.role}</span></p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <p className="text-blue-600 font-medium">✅ Authentication Successful</p>
          <p className="text-gray-500 text-sm mt-1">Your session is active and secure</p>
        </div>

        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-200 mb-3"
          >
            👑 Go to Admin Panel
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;