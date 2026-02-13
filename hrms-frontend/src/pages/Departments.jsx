import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`/departments/${editId}`, { name });
      } else {
        await axios.post("/departments", { name });
      }

      setName("");
      setEditId(null);
      fetchDepartments();
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (dept) => {
    setName(dept.name);
    setEditId(dept.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await axios.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-6">

      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-bold text-slate-800">
          Department Management
        </h2>
        <p className="text-slate-500 mt-1">
          Create and manage company departments
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Enter department name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg 
                       hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editId
              ? "Update Department"
              : "Add Department"}
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <tr
                    key={dept.id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {dept.id}
                    </td>

                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {dept.name}
                    </td>

                    <td className="px-4 py-3 text-slate-500">
                      {new Date(dept.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(dept)}
                        className="px-3 py-1 bg-yellow-400 text-slate-800 
                                   rounded-md hover:bg-yellow-300 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="px-3 py-1 bg-red-500 text-white 
                                   rounded-md hover:bg-red-400 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-slate-500"
                  >
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}