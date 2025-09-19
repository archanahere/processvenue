"use client";
import { useEffect, useState } from "react";

export default function WorkPage() {
  const [work, setWork] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [profileId, setProfileId] = useState("");

  // fetch work + profiles
  useEffect(() => {
    fetch("/api/work").then(res => res.json()).then(setWork);
    fetch("/api/profiles").then(res => res.json()).then(setProfiles);
  }, []);

  const addWork = async () => {
    const res = await fetch("/api/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role, work_experience: experience, profile_id: profileId }),
    });
    if (res.ok) {
      alert("Work experience added!");
      setCompany(""); setRole(""); setExperience(""); setProfileId("");
      const data = await fetch("/api/work").then(r => r.json());
      setWork(data);
    }
  };

  const deleteWork = async (id) => {
    await fetch(`/api/work/${id}`, { method: "DELETE" });
    setWork(work.filter(w => w.w_id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-blue-600">Work Experience</h1>

      {/* Add Form */}
      <div className="mb-6 flex gap-2">
        <input className="border p-2 rounded w-1/5" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
        <input className="border p-2 rounded w-1/5" placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
        <input className="border p-2 rounded w-1/5" placeholder="Experience" value={experience} onChange={e => setExperience(e.target.value)} />
        
        <select className="border p-2 rounded w-1/5" value={profileId} onChange={e => setProfileId(e.target.value)}>
          <option value="">Select Profile</option>
          {profiles.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <button onClick={addWork} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left border">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">Company</th>
            <th className="p-2">Role</th>
            <th className="p-2">Experience</th>
            <th className="p-2">Profile</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {work.map(w => (
            <tr key={w.w_id} className="border-t">
              <td className="p-2">{w.company}</td>
              <td className="p-2">{w.role}</td>
              <td className="p-2">{w.work_experience}</td>
              <td className="p-2">{w.profile_name}</td>
              <td className="p-2">
                <button onClick={() => deleteWork(w.w_id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
