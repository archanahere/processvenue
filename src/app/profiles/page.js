"use client";
import { useEffect, useState } from "react";

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch profiles
  const fetchProfiles = async () => {
    const res = await fetch("/api/profiles");
    const data = await res.json();
    setProfiles(data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Add new profile
  const addProfile = async () => {
    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, details }),
    });
    if (res.ok) {
      setName("");
      setEmail("");
      setDetails("");
      fetchProfiles();
    }
  };

  // Update profile
  const updateProfile = async (id) => {
    const res = await fetch("/api/profiles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, email, details }),
    });
    if (res.ok) {
      setEditingId(null);
      setName("");
      setEmail("");
      setDetails("");
      fetchProfiles();
    }
  };

  // Delete profile
  const deleteProfile = async (id) => {
    const res = await fetch("/api/profiles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetchProfiles();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Profiles</h1>

      {/* Form */}
      <div className="mb-6 space-y-2">
        <input
          className="w-full border rounded p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Education"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />

        {editingId ? (
          <button
            onClick={() => updateProfile(editingId)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        ) : (
          <button
            onClick={addProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        )}
      </div>

      {/* Profiles List */}
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex justify-between items-center border p-3 rounded shadow-sm"
          >
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-gray-600 italic">{profile.details}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditingId(profile.id);
                  setName(profile.name);
                  setEmail(profile.email);
                  setDetails(profile.details);
                }}
                className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProfile(profile.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
