import { useState } from "react";
import axios from "../../api/axios";

export default function DeleteEmployee() {
  const [id, setId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.delete(`/employees/${id}`);
    alert("Employee Deleted");
  };

  return (
    <div>
      <h2>Delete Employee</h2>

      <form onSubmit={handleDelete}>
        <input
          placeholder="Employee ID"
          onChange={(e) => setId(e.target.value)}
        />

        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
