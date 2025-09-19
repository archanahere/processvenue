"use client";
import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [newProject, setNewProject] = useState({
    pname: "",
    description: "",
    profileid: "",
    links: "",
  });
  const [editingProject, setEditingProject] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    if (res.ok) {
      setProjects(await res.json());
    }
  };

  // Fetch profiles
  const fetchProfiles = async () => {
    const res = await fetch("/api/profiles");
    if (res.ok) {
      setProfiles(await res.json());
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchProfiles();
  }, []);

  // Create project
  const createProject = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });
    if (res.ok) {
      alert("Project created!");
      setNewProject({ pname: "", description: "", profileid: "", links: "" });
      fetchProjects();
    } else {
      alert("Create failed");
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Deleted!");
      fetchProjects();
    } else {
      alert("Delete failed");
    }
  };

  // Save edit
  const saveEdit = async () => {
    const res = await fetch(`/api/projects/${editingProject.pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingProject),
    });

    if (res.ok) {
      alert("Updated!");
      setEditingProject(null);
      fetchProjects();
    } else {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Projects</h1>

      {/* ✅ Create Project Form */}
      <form onSubmit={createProject} className="mb-6 space-y-3 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold">Add New Project</h2>
        <div>
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.pname}
            onChange={(e) => setNewProject({ ...newProject, pname: e.target.value })}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <select
            value={newProject.profileid}
            onChange={(e) => setNewProject({ ...newProject, profileid: e.target.value })}
            className="border p-2 w-full"
            required
          >
            <option value="">Select Profile</option>
            {profiles.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Project Links"
            value={newProject.links}
            onChange={(e) => setNewProject({ ...newProject, links: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Create Project
        </button>
      </form>

      {/* ✅ Projects Table */}
      <table className="w-full text-sm text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Profile</th>
            <th className="px-4 py-2">Links</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) =>
            editingProject?.pid === p.pid ? (
              <tr key={p.pid} className="bg-gray-50">
                <td className="px-4 py-2">
                  <input
                    value={editingProject.pname}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, pname: e.target.value })
                    }
                    className="border p-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    className="border p-1"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    value={editingProject.profileid}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, profileid: e.target.value })
                    }
                    className="border p-1"
                  >
                    <option value="">Select profile</option>
                    {profiles.map((prof) => (
                      <option key={prof.id} value={prof.id}>
                        {prof.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    value={editingProject.links}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, links: e.target.value })
                    }
                    className="border p-1"
                  />
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={saveEdit}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={p.pid} className="border-t">
                <td className="px-4 py-2">{p.pname}</td>
                <td className="px-4 py-2">{p.description}</td>
                <td className="px-4 py-2">{p.profile_name || "-"}</td>
                <td className="px-4 py-2">{p.links}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => setEditingProject(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(p.pid)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
