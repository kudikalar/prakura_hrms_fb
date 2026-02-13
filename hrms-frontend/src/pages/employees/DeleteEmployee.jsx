import { useState } from "react";
import axios from "../../api/axios";
import Layout from "../../components/Layout";

export default function DeleteEmployee() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!id.trim()) {
      setError("Employee ID is required");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`/employees/${id}`);
      setSuccess("Employee Deleted Successfully");
      setId("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          `Error ${err.response?.status}` ||
          "Delete failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="main-content">
        <div className="card" style={{ maxWidth: "500px", margin: "auto" }}>
          <h2 style={{ marginBottom: "20px" }}>Delete Employee</h2>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "15px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "15px",
              }}
            >
              {success}
            </div>
          )}

          <form onSubmit={handleDelete} className="form-row">
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <input
                placeholder="Employee ID"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setError("");
                }}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: error ? "1px solid #ef4444" : "1px solid #d1d5db",
                }}
              />
              {error && !id && (
                <small style={{ color: "#ef4444", marginTop: "5px" }}>
                  Employee ID cannot be empty
                </small>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                background: "#ef4444",
                marginTop: "15px",
                width: "100%",
              }}
            >
              {loading ? "Deleting..." : "Delete Employee"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}