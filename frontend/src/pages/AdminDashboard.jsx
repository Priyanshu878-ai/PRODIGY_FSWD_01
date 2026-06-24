import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">

        <div className="text-6xl mb-4">👑</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h2>
        <p className="text-gray-500 mb-6">Welcome, <span className="font-bold text-red-500">{user?.username}</span>!</p>

        <div className="bg-red-50 rounded-xl p-4 mb-6">
          <p className="text-red-600 font-medium">👑 Admin Access Granted</p>
          <p className="text-gray-500 text-sm mt-1">You have full system access</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-500">👥</p>
            <p className="text-gray-600 text-sm mt-1">Manage Users</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-orange-500">⚙️</p>
            <p className="text-gray-600 text-sm mt-1">Settings</p>
          </div>
        </div>

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

export default AdminDashboard;