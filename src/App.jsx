import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "./features/usersSlice";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateUser({ id: editingId, name, email }));
      setEditingId(null);
    } else {
      dispatch(addUser({ name, email }));
    }
    setName("");
    setEmail("");
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Redux CRUD App
        </h2>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className={`w-full text-white py-2 rounded-lg ${
                editingId ? "bg-green-500 hover:bg-green-600" : "bg-indigo-500 hover:bg-indigo-600"
              }`}
            >
              {editingId ? "Update User" : "Add User"}
            </button>
          </div>
        </form>

        {/* User List */}
        <ul className="space-y-3">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="bg-gray-200 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No users added yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
