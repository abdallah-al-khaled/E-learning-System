import React, { useState } from "react";
import axios from "axios";
import "../styles/LoginPage.css";
import "../styles/add-class.css";

const AddClass = () => {
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddClass = async () => {
    try {
      await axios.post("http://localhost:8080/class/add", {
        name: className,
        description,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token")
        },
      }
    );
      alert("Class added successfully");
      setClassName("");
    } catch (error) {
      console.error("Error adding class:", error);
    }
  };

  return (
    <div className="add-class classes">
      <h2>Add Class</h2>
      <input
        type="text"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Class Name"
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Class Description"
      />
      <button onClick={handleAddClass}>Add Class</button>
    </div>
  );
};

export default AddClass;
