import { useState, useEffect } from "react";

export default function UserForm({ onSave, editingUser }) {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: ""
  });

  const validTitles = ["mr", "ms", "mrs", "miss", "dr", "prof"];

  useEffect(() => {
    if (editingUser) {
      setFormData({
        title: editingUser.title,
        firstName: editingUser.firstName,
        lastName: editingUser.lastName
      });
    } else {
      setFormData({
        title: "",
        firstName: "",
        lastName: ""
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    
    if (!editingUser) {
      setFormData({ title: "", firstName: "", lastName: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 rounded-xl shadow-md flex flex-col gap-2">
      {editingUser && (
        <p className="text-sm">
          <strong>ID:</strong> {editingUser.id}
        </p>
      )}

      <select
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border rounded p-2"
        required
      >
        <option value="">Seleccione un título</option>
        {validTitles.map((t) => (
          <option key={t} value={t}>
            {t.toUpperCase()}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={formData.firstName}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={formData.lastName}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />

      <button className="bg-greenPrimary text-white py-2 rounded hover:bg-greenSecondary transition">
        {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
      </button>
    </form>
  );
}
