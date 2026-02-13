import { useState } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function EditEmployee() {
  const [id, setId] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    id: "",
    name: "",
    email: "",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();

    let errors = { id: "", name: "", email: "" };

    if (!id.trim()) {
      errors.id = "Employee ID is required";
    }

    if (!form.name.trim()) {
      errors.name = "Name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = "Invalid email format";
    }

    setFieldErrors(errors);

    if (errors.id || errors.name || errors.email) return;

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await axios.put(`/employees/${id}`, form);

      setSuccess("Employee updated successfully ✅");

      setForm({
        name: "",
        email: "",
        role: "EMPLOYEE",
      });

      setId("");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        `Error ${err.response?.status}` ||
        "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="main-content">
        <div className="card">
          <h2>Edit Employee</h2>

          {error && <div className="error-box">{error}</div>}
          {success && (
            <div style={{
              background: "#dcfce7",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #86efac",
              color: "#166534",
              marginBottom: "15px"
            }}>
              {success}
            </div>
          )}

          <form onSubmit={handleUpdate} className="form-row">

            {/* Employee ID */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                placeholder="Employee ID"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setFieldErrors({ ...fieldErrors, id: "" });
                }}
                style={{
                  border: fieldErrors.id
                    ? "1px solid #ef4444"
                    : "1px solid #d1d5db",
                }}
              />
              {fieldErrors.id && (
                <small style={{ color: "#ef4444", marginTop: "4px" }}>
                  {fieldErrors.id}
                </small>
              )}
            </div>

            {/* Name */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setFieldErrors({ ...fieldErrors, name: "" });
                }}
                style={{
                  border: fieldErrors.name
                    ? "1px solid #ef4444"
                    : "1px solid #d1d5db",
                }}
              />
              {fieldErrors.name && (
                <small style={{ color: "#ef4444", marginTop: "4px" }}>
                  {fieldErrors.name}
                </small>
              )}
            </div>

            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setFieldErrors({ ...fieldErrors, email: "" });
                }}
                style={{
                  border: fieldErrors.email
                    ? "1px solid #ef4444"
                    : "1px solid #d1d5db",
                }}
              />
              {fieldErrors.email && (
                <small style={{ color: "#ef4444", marginTop: "4px" }}>
                  {fieldErrors.email}
                </small>
              )}
            </div>

            {/* Role */}
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

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Employee"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}