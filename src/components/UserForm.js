import React, { useState } from "react";
import { createUser, updateUser } from "../services/userService";

const UserForm = ({ onClose, onSave, user = null }) => {
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    // username: user ? user.username : "",
    street: user ? user.address.street : "",
    city: user ? user.address.city : "",
    company: user ? user.company?.name : "",
    website: user ? user.website : "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let errors = {};

    // Name validation
    if (!formData.name || formData.name.length < 3) {
      valid = false;
      errors.name = "Name is required and must be at least 3 characters.";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      valid = false;
      errors.email = "A valid email is required.";
    }

    // Phone validation
    const phonePattern = /^\d{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      valid = false;
      errors.phone = "A valid 10-digit phone number is required.";
    }

    // Street validation
    if (!formData.street) {
      valid = false;
      errors.street = "Street is required.";
    }

    // City validation
    if (!formData.city) {
      valid = false;
      errors.city = "City is required.";
    }

    // Company name validation (optional but if provided, must be at least 3 characters)
    if (formData.company && formData.company.length < 3) {
      valid = false;
      errors.company = "Company name must be at least 3 characters.";
    }

    // Website validation (optional but if provided, must be a valid URL)
    if (formData.website && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(formData.website)) {
      valid = false;
      errors.website = "Please provide a valid URL.";
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const userPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      username: formData.username, // Username is autofilled and non-editable
      address: {
        street: formData.street,
        city: formData.city,
      },
      company: {
        name: formData.company,
      },
      website: formData.website,
    };

    try {
      if (user) {
        // Update user
        const { data } = await updateUser(user.id, userPayload);
        onSave(data);
      } else {
        // Create user
        const { data } = await createUser(userPayload);
        onSave(data);
      }
      onClose();
    } catch (error) {
      alert("Error while saving user data");
    }
  };

  return (
    <div className="modal">
      <h2>{user ? "Edit User" : "Add New User"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            readOnly
            disabled
          />
        </div> */}

        <div>
          <label>Street:</label>
          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div>
          <label>Company:</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          {errors.company && <p className="error">{errors.company}</p>}
        </div>

        <div>
          <label>Website:</label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
          {errors.website && <p className="error">{errors.website}</p>}
        </div>

        <button type="submit">{user ? "Update User" : "Create User"}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;
