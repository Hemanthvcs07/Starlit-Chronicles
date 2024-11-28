import React from "react";
import useUsers from "../hooks/useUsers";
import UserModal from "./UserModal";

const UsersList = () => {
  const { usersList, error, fetchUsers } = useUsers();
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    user: null,
  });

  const handleModalOpen = (user = null) => {
    setModalState({ isOpen: true, user });
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, user: null });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const result = await response.json();
      if (response.ok) {
        fetchUsers();
      } else {
        alert(result.message || "Error deleting user");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the user.");
    }
  };

  return (
    <div className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Manage Users</h2>
        <button
          onClick={() => handleModalOpen()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Add User
        </button>
      </div>

      {error && (
        <div className="text-center text-red-400 font-medium mb-4">{error}</div>
      )}

      <div className="overflow-hidden rounded-lg border border-gray-700 shadow-md">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-900">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400 uppercase">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400 uppercase">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400 uppercase">
                Role
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {usersList.length > 0 ? (
              usersList.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-700 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm">{user.name}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">{user.role}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleModalOpen(user)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md mr-2 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalState.isOpen && (
        <UserModal
          user={modalState.user}
          onClose={handleModalClose}
          onUpdate={fetchUsers}
        />
      )}
    </div>
  );
};

export default UsersList;
