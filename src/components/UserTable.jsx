import { Eye, Edit, Trash } from "lucide-react";

export default function UserItem({ user, onUpdate, onDelete, onView }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-2 border font-mono">{user.id}</td>
      <td className="p-2 border">{`${user.title}. ${user.firstName} ${user.lastName}`}</td>
      <td className="p-2 border text-center">
        <img
          className="w-10 h-10 rounded-full mx-auto"
          src={user.picture}
          alt={user.firstName}
        />
      </td>
      <td className="p-2 border text-center">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onView(user)}
            className="p-1 hover:text-blue-600"
            title="Ver detalles"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onUpdate(user)}
            className="p-1 hover:text-yellow-600"
            title="Editar"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-1 hover:text-red-600"
            title="Eliminar"
          >
            <Trash size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
