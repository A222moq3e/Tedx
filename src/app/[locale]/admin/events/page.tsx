"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

type Event = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  date: Date;
  capacity: number;
  presenterId: string | null;
};

type EventFormData = {
  name: string;
  description: string;
  type: string;
  date: string;
  capacity: number;
  presenterId: string;
};

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    type: "Talk",
    date: "",
    capacity: 50,
    presenterId: "",
  });

  // tRPC queries and mutations
  const { data: events, refetch, isLoading } = api.events.getAll.useQuery();
  const { data: users } = api.users.getAll.useQuery(); // For presenter dropdown
  const createEvent = api.events.create.useMutation({
    onSuccess: () => {
      refetch();
      setShowCreateForm(false);
      setFormData({ name: "", description: "", type: "Talk", date: "", capacity: 50, presenterId: "" });
    },
  });
  const updateEvent = api.events.update.useMutation({
    onSuccess: () => {
      refetch();
      setIsEditing(false);
      setSelectedEvent(null);
      setFormData({ name: "", description: "", type: "Talk", date: "", capacity: 50, presenterId: "" });
    },
  });
  const deleteEvent = api.events.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent.mutate({
      name: formData.name,
      description: formData.description || undefined,
      type: formData.type,
      date: new Date(formData.date),
      capacity: formData.capacity,
      presenterId: formData.presenterId || undefined,
    });
  };

  const handleUpdateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;
    
    updateEvent.mutate({
      id: selectedEvent.id,
      name: formData.name,
      description: formData.description || undefined,
      type: formData.type,
      date: new Date(formData.date),
      capacity: formData.capacity,
      presenterId: formData.presenterId || undefined,
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent.mutate({ id: eventId });
    }
  };

  const startEditing = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      name: event.name,
      description: event.description || "",
      type: event.type,
      date: event.date.toISOString().slice(0, 16), // Format for datetime-local input
      capacity: event.capacity,
      presenterId: event.presenterId || "",
    });
    setIsEditing(true);
    setShowCreateForm(false);
  };

  const startCreating = () => {
    setShowCreateForm(true);
    setIsEditing(false);
    setSelectedEvent(null);
    setFormData({ name: "", description: "", type: "Talk", date: "", capacity: 50, presenterId: "" });
  };

  const getEventTypeBadge = (type: string) => {
    const colors = {
      "Talk": "bg-blue-100 text-blue-800",
      "VR experience": "bg-purple-100 text-purple-800", 
      "Advice": "bg-green-100 text-green-800",
      "Workshop": "bg-yellow-100 text-yellow-800",
      "Panel": "bg-red-100 text-red-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getPresenterName = (presenterId: string | null) => {
    if (!presenterId) return "No Presenter";
    const presenter = users?.find(user => user.id === presenterId);
    return presenter ? presenter.name : "Unknown";
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Events Management</h1>
        <button
          onClick={startCreating}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Add New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Events ({events?.length || 0})
            </h2>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Loading events...</div>
            ) : (
              <>
                {events?.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{event.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.description || "No description"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeBadge(event.type)}`}>
                            {event.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            Capacity: {event.capacity}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <div>📅 {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString()}</div>
                          <div>👤 {getPresenterName(event.presenterId)}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => startEditing(event)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(!events || events.length === 0) && (
                  <div className="p-8 text-center text-gray-500">
                    <div className="text-4xl mb-2">📅</div>
                    <p>No events found</p>
                    <p className="text-sm">Create your first event to get started!</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white rounded-lg shadow-md">
          {showCreateForm && (
            <div>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Create New Event
                </h2>
              </div>
              <form onSubmit={handleCreateEvent} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
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
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Talk">Talk</option>
                    <option value="VR experience">VR Experience</option>
                    <option value="Advice">Advice</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Panel">Panel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Presenter (Optional)
                  </label>
                  <select
                    value={formData.presenterId}
                    onChange={(e) =>
                      setFormData({ ...formData, presenterId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No Presenter</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.type})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={createEvent.isPending}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
                  >
                    {createEvent.isPending ? "Creating..." : "Create Event"}
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

          {isEditing && selectedEvent && (
            <div>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Event
                </h2>
              </div>
              <form onSubmit={handleUpdateEvent} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
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
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Event description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Talk">Talk</option>
                    <option value="VR experience">VR Experience</option>
                    <option value="Advice">Advice</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Panel">Panel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Presenter (Optional)
                  </label>
                  <select
                    value={formData.presenterId}
                    onChange={(e) =>
                      setFormData({ ...formData, presenterId: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No Presenter</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.type})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={updateEvent.isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
                  >
                    {updateEvent.isPending ? "Updating..." : "Update Event"}
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

          {!showCreateForm && !isEditing && (
            <div className="p-8 text-center text-gray-500">
              <div className="text-4xl mb-2">🎪</div>
              <p>Select an action</p>
              <p className="text-sm">Create a new event or edit an existing one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}