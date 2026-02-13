import { useEffect, useState } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

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

  /* ✅ NEW: Inline field errors */
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/employees");

      let data = [];

      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data.data)) data = res.data.data;
      else if (Array.isArray(res.data.employees)) data = res.data.employees;

      setEmployees(data);
    } catch (err) {
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

  /* ===============================
     UPDATED SUBMIT WITH VALIDATION
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = { name: "", email: "" };

    if (!form.name.trim()) {
      errors.name = "Full Name is required";
    }

    if (!form.email.trim()) {
      errors.email = "Email Address is required";
    }

    setFieldErrors(errors);

    // 🚨 Stop API call if validation fails
    if (errors.name || errors.email) return;

    setError("");
    setSubmitting(true);

    try {
      await axios.post("/employees", form);
      await fetchEmployees();

      setForm({
        name: "",
        email: "",
        role: "EMPLOYEE",
      });

      setFieldErrors({ name: "", email: "" });

    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Error ${err.response?.status}` ||
          "Create failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <Layout>
      <div className="main-content">
        <div className="card">
          <h2>Create Employee</h2>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} className="form-row">

            {/* Full Name */}
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
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Employee"}
            </button>
          </form>
        </div>

        <div className="card table-wrapper">
          <h3 style={{ marginBottom: "15px" }}>Employee List</h3>

          {loading ? (
            <p>Loading employees...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>
                {currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="4">No employees found</td>
                  </tr>
                ) : (
                  currentRows.map((emp) => (
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
          )}

          {employees.length > 0 && (
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>

              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}