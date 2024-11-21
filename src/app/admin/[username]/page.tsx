'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({ isOpen: false, user: null });

  // Combined useEffect for user authentication and fetching users
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const tokenData = JSON.parse(atob(token.split(".")[1]));
    setUser({ role: tokenData.role, username: tokenData.username });

    if (tokenData.role === "Admin") {
      fetchUsers();
    }
  }, [router]);

  // Function to fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsersList(data);
    } catch (error) {
      console.error("Failed to fetch users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
  };

  // Handle editing user and setting modal state
  const handleModalOpen = (user = null) => {
    setModalState({
      isOpen: true,
      user: user || { name: "", email: "", role: "User" },
    });
  };

  // Handle deleting user
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setUsersList(usersList.filter(user => user._id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error.message);
    }
  };

  // Handle user update (edit user)
  const handleUpdateUser = async (updatedData) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: modalState.user._id, ...updatedData }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsersList(usersList.map(user => (user._id === updatedUser._id ? updatedUser : user)));
        setModalState({ ...modalState, isOpen: false });
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Failed to update user:", error.message);
    }
  };

  // Handle form input changes for editing user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalState({
      ...modalState,
      user: { ...modalState.user, [name]: value },
    });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">Starlit&apos;s Admin</div>
        <button 
          onClick={handleLogout} 
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all duration-200">
          Logout
        </button>
        <Link href = '/admin/posts'>Posts</Link>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center h-full py-12">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-gray-200 mb-4">Welcome, Admin {user.username}!</h1>
          <p className="text-lg text-gray-400">Your role: <span className="font-semibold text-blue-300">{user.role}</span></p>

          {/* Display list of users */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Users List</h2>

            {/* Loading Spinner */}
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Joined</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-700">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <button 
                          onClick={() => handleModalOpen(user)} 
                          className="text-blue-400 hover:text-blue-500 mr-4">Edit</button>
                        <button 
                          onClick={() => handleDeleteUser(user._id)} 
                          className="text-red-400 hover:text-red-500">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal for editing user */}
          {modalState.isOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-gray-800 p-6 rounded-lg w-96">
                <h2 className="text-2xl font-semibold text-gray-200 mb-4">Edit User</h2>
                <input 
                  type="text" 
                  name="name" 
                  value={modalState.user.name} 
                  onChange={handleInputChange} 
                  className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                  placeholder="Name" 
                />
                <input 
                  type="email" 
                  name="email" 
                  value={modalState.user.email} 
                  onChange={handleInputChange} 
                  className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                  placeholder="Email" 
                />
                <select 
                  name="role" 
                  value={modalState.user.role} 
                  onChange={handleInputChange} 
                  className="w-full p-2 mb-4 border rounded bg-gray-700 text-white">
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <div className="flex justify-end">
                  <button 
                    onClick={() => handleUpdateUser(modalState.user)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4">
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setModalState({ ...modalState, isOpen: false })} 
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
