import UserItem from "./UserTable";

export default function UserList({ users, onUpdate, onDelete, onView }) {
  if (users.length === 0) {
    return <p className="text-center text-gray-500">No se encontraron usuarios.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse grayPrimary rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">Id</th>
            <th className="p-2 border text-left">Nombres y apellidos</th>
            <th className="p-2 border text-center">Foto</th>
            <th className="p-2 border text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
