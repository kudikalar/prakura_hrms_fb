import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function CreateEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
  });

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // FETCH EMPLOYEES FROM DATABASE
  // ===============================
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/employees");

      console.log("GET /employees response:", res.data);

      // Handle all possible response structures
      let data = [];

      if (Array.isArray(res.data)) {
        data = res.data;
      } else if (Array.isArray(res.data.data)) {
        data = res.data.data;
      } else if (Array.isArray(res.data.employees)) {
        data = res.data.employees;
      } else {
        data = [];
      }

      setEmployees(data);

    } catch (err) {
      console.error("Fetch error:", err.response || err);
      setError(
        err.response?.data?.message ||
        `Error ${err.response?.status}` ||
        "Failed to fetch employees"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ===============================
  // CREATE EMPLOYEE
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await axios.post("/employees", form);

      // Always refetch from DB
      await fetchEmployees();

      setForm({
        name: "",
        email: "",
        role: "EMPLOYEE",
      });

    } catch (err) {
      console.error("Create error:", err.response || err);
      setError(
        err.response?.data?.message ||
        `Error ${err.response?.status}` ||
        "Create failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI" }}>
      <h2>Create Employee</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </div>
      )}

      {loading && <p>Loading employees...</p>}

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "25px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="ADMIN">ADMIN</option>
          <option value="HR">HR</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
        </select>

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </button>
      </form>

      {/* TABLE */}
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4">No employees found</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
