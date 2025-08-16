"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import type { User, UserType } from "~/types/user";

type UserFormData = {
  name: string;
  email: string;
  type: UserType;
  // Speaker-specific fields
  position?: string;
  specialization?: string;
};

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    type: "visitor",
    position: "",
    specialization: "",
  });

  // tRPC queries and mutations
  const { data: users, refetch, isLoading } = api.users.getAll.useQuery();
  const createUser = api.users.create.useMutation({
    onSuccess: () => {
      void refetch();
      setShowCreateForm(false);
      setFormData({ name: "", email: "", type: "visitor", position: "", specialization: "" });
    },
  });
  const updateUser = api.users.update.useMutation({
    onSuccess: () => {
      void refetch();
      setIsEditing(false);
      setSelectedUser(null);
    },
  });
  const deleteUser = api.users.delete.useMutation({
    onSuccess: () => {
      void refetch();
      setSelectedUser(null);
    },
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    createUser.mutate(formData);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      updateUser.mutate({
        id: selectedUser.id,
        name: formData.name,
        email: formData.email,
        type: formData.type,
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate({ id: userId });
    }
  };

  const startEditing = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name ?? "",
      email: user.email,
      type: (user.type as UserType) ?? "visitor",
      position: "",
      specialization: "",
    });
    setIsEditing(true);
    setShowCreateForm(false);
  };

  const startCreating = () => {
    setShowCreateForm(true);
    setIsEditing(false);
    setSelectedUser(null);
    setFormData({ name: "", email: "", type: "visitor", position: "", specialization: "" });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={startCreating}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add New User
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
            <p className="text-sm text-gray-600">
              {users?.length ?? 0} users total
            </p>
          </div>
          <div className="p-4 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading users...</div>
            ) : (
              <>
                {users?.map((user) => (
              <div
                key={user.id}
                className={`p-3 border rounded-lg mb-3 cursor-pointer transition-colors ${
                  selectedUser?.id === user.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {user.name ?? "No Name"}
                    </h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex gap-2 mt-1">
                                      <span className={`text-xs px-2 py-1 rounded ${
                      user.type === "admin" 
                        ? "bg-red-100 text-red-700" 
                        : user.type === "speaker" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                        {user.type ?? "visitor"}
                    </span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(user);
                      }}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user.id);
                      }}
                      className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
                {users?.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No users found. Create your first user!
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* User Details / Form */}
        <div className="bg-white rounded-lg shadow-md">
          {showCreateForm && (
            <div>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Create New User
                </h2>
              </div>
              <form onSubmit={handleCreateUser} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as UserType })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="visitor">Visitor</option>
                    <option value="speaker">Speaker</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                {/* Speaker-specific fields */}
                {formData.type === "speaker" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        value={formData.position ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, position: e.target.value })
                        }
                        placeholder="e.g., CEO, Researcher, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={formData.specialization ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, specialization: e.target.value })
                        }
                        placeholder="e.g., AI, Technology, Business, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={createUser.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
                  >
                    {createUser.isPending ? "Creating..." : "Create User"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {isEditing && selectedUser && (
            <div>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit User
                </h2>
              </div>
              <form onSubmit={handleUpdateUser} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as UserType })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="visitor">Visitor</option>
                    <option value="speaker">Speaker</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                {/* Speaker-specific fields */}
                {formData.type === "speaker" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        value={formData.position ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, position: e.target.value })
                        }
                        placeholder="e.g., CEO, Researcher, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={formData.specialization ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, specialization: e.target.value })
                        }
                        placeholder="e.g., AI, Technology, Business, etc."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={updateUser.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
                  >
                    {updateUser.isPending ? "Updating..." : "Update User"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {selectedUser && !isEditing && !showCreateForm && (
            <div>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  User Details
                </h2>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedUser.name ?? "No Name"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <p className="text-gray-900">{selectedUser.type ?? "visitor"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Joined At
                  </label>
                  <p className="text-gray-900">
                    {new Date(selectedUser.joiningAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <p className="text-gray-600 text-sm font-mono">
                    {selectedUser.id}
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => startEditing(selectedUser)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Edit User
                  </button>
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )}

          {!selectedUser && !showCreateForm && !isEditing && (
            <div className="p-4 text-center text-gray-500">
              <div className="py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No user selected
                </h3>
                <p className="text-gray-600 mb-4">
                  Select a user from the list to view details, or create a new user.
                </p>
                <button
                  onClick={startCreating}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Create First User
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading States */}
      {(createUser.isPending || updateUser.isPending || deleteUser.isPending) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-700">Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}