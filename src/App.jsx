import { useState, useEffect } from "react";
import api from "./api";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import Header from "./components/Header";
import { X } from "lucide-react";

export default function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchAllUsers = async () => {
    const res = await api.get(`/user?limit=200`);
    setAllUsers(res.data.data);
  };

  const fetchUsers = async (page = 1) => {
    const res = await api.get(`/user?page=${page}&limit=5`);
    setUsers(res.data.data);
    setTotalPages(Math.ceil(res.data.total / 5));
  };

  useEffect(() => {
    fetchAllUsers();
    fetchUsers(page);
  }, [page]);

  const handleSave = async (data) => {
    try {
      if (editingUser) {
        await api.put(`/user/${editingUser.id}`, data);
        setEditingUser(null);
        
        setAllUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u))
        );
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u))
        );
      } else {
        const payload = { ...data, email: `default_${Date.now()}@mail.com` };
        const res = await api.post("/user/create", payload);

        alert(
          `Usuario creado con éxito:\n\n` +
          `Título: ${res.data.title}\n` +
          `Nombre: ${res.data.firstName}\n` +
          `Apellido: ${res.data.lastName}`
        );

        setAllUsers((prev) => [res.data, ...prev]);
        setUsers((prev) => [res.data, ...prev]);
      }

      setShowModal(false);
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Ha ocurrido un error al guardar el usuario, comuníquese con el administrador");
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/user/${id}`);
    setAllUsers((prev) => prev.filter((u) => u.id !== id));
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const UserFilter = search.trim()
    ? allUsers.filter((u) => {
      const term = search.toLowerCase();
      return (
        u.id.toLowerCase().includes(term) ||
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term)
      );
    })
    : users;

  return (
    <>
      <Header users={allUsers} />

      <div className="max-w-6xl mx-auto p-4 mt-4">
        {/* Filtro y botón crear */}
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Buscar Id, nombre o apellido"
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              if (/^[a-zA-Z0-9]{0,24}$/.test(val)) {
                setSearch(val);
              }
            }}
            className="border p-2 rounded w-1/2"
          />

          <button
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
            className="bg-greenSecondary text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Crear usuario
          </button>
        </div>

        {/* Lista de usuarios */}
        <UserList
          users={UserFilter}
          onUpdate={(u) => { setEditingUser(u); setShowModal(true); }}
          onDelete={handleDelete}
          onView={(u) => { setSelectedUser(u); setShowDetailsModal(true); }}
        />


        {/* Paginación solo si no hay búsqueda */}
        {search.trim() === "" && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-3 py-1">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Modal Crear/Editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
            <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editingUser ? "Editar Usuario" : "Crear Usuario"}
            </h2>
            <UserForm onSave={handleSave} editingUser={editingUser} />
          </div>
        </div>
      )}

      {/*Modal Ver Detalles */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
            <X size={24} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Detalles del Usuario</h2>
            <div className="flex flex-col items-center text-center">
              <img
                src={selectedUser.picture}
                alt={selectedUser.firstName}
                className="w-24 h-24 rounded-full mb-3"
              />
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Título:</strong> {selectedUser.title}
              </p>
              <p>
                <strong>Nombre:</strong> {selectedUser.firstName}
              </p>
              <p>
                <strong>Apellido:</strong> {selectedUser.lastName}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
