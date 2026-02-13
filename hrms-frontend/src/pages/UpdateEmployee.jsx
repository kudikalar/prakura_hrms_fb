import { useState } from "react";
import axios from "../api/axios";

export default function UpdateEmployee() {

  const [id, setId] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`/employees/${id}`, form);
    alert("Employee Updated Successfully");
  };

  return (
    <div>
      <h2>Update Employee</h2>

      <form onSubmit={handleUpdate}>
        <input
          placeholder="Employee ID"
          onChange={(e) => setId(e.target.value)}
        />

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <select
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="HR">HR</option>
          <option value="EMPLOYEE">EMPLOYEE</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
