import React, { useState } from "react";

function JsonTable() {
  const [formData, setFormData] = useState({});

  const data = [
    {
      type: "dropdown",
      typ_opt: "{'a','b', 'c'}",
      short_desc: "text",
      category: "dropdown",
      cat_opt: "{'c','d', 'e'}",
      color: "text",
      brand: "text",
      ALu: "text",
      cost: "number",
      retail: "text",
    },
  ];

  // Handle form input changes
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert(`Form Data Submitted: ${JSON.stringify(formData, null, 2)}`);
  };

  // Parse dropdown options from strings like "{'a','b','c'}"
  const parseOptions = (optionsString) => {
    return optionsString
      .replace(/[{}']/g, "") // Remove braces and quotes
      .split(",") // Split into an array
      .map((opt) => opt.trim()); // Trim whitespace
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        {data.map((item, index) => (
          <div
            key={index}
            className="row p-3 border rounded mb-3"
            style={{
              border: "1px solid lightgrey",
              borderRadius: "10px",
              padding: "1rem",
            }}
          >
            {Object.entries(item).map(([key, value]) => {
              if (key.includes("_opt")) {
                // Render dropdown with floating label
                const options = parseOptions(value);
                return (
                  <div key={key} className="col-12 col-md-6 form-floating mb-3">
                    <select
                      id={key}
                      value={formData[key] || ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select {key}
                      </option>
                      {options.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <label className="ms-3" htmlFor={key}>{key}</label>
                  </div>
                );
              } else if (value === "text" || value === "number") {
                // Render text or number input with floating label
                return (
                  <div key={key} className="col-12 col-md-6 form-floating mb-3">
                    <input
                      id={key}
                      type={value}
                      value={formData[key] || ""}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder={`Enter ${key}`}
                      className="form-control"
                    />
                    <label className="ms-3" htmlFor={key}>{key}</label>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default JsonTable;
