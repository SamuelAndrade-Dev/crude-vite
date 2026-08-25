import axios from "axios";
import { useState, useEffect, useCallback } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

const URL_API = "https://jsonplaceholder.typicode.com/users";

interface SearchField {
  name: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<SearchField>({
    name: "",
  });
  const fetchUsers = useCallback(
    async (filterParams: SearchField | undefined) => {
      const queryParams = filterParams?.name
        ? `?name=${filterParams.name}`
        : "";

      try {
        const response = await axios.get(URL_API + queryParams);
        setUsers(response.data);
      } finally {
        console.log("finalizado");
      }
    },
    [],
  );

  const removeUser = useCallback(
    async (id: number) => {
      try {
        await axios.delete(`${URL_API}/${id}`);
      } finally {
        fetchUsers(filter);
        console.log("Removido");
      }
    },
    [fetchUsers, filter],
  );

  const updateUser = useCallback(
    async (id: number) => {
      try {
        await axios.put(`${URL_API}/${id}`, {
          name: "Novo nome",
          phone: "6199999999999",
        });
      } finally {
        fetchUsers(filter);
        console.log("Alterado");
      }
    },
    [fetchUsers, filter],
  );

  useEffect(() => {
    fetchUsers(filter);
  }, [fetchUsers, filter]);

  console.log(users);

  const handleEdit = (user: User) => {
    updateUser(user.id);
    console.log("Editar usuário", user);
  };

  const handleDelete = (user: User) => {
    removeUser(user.id);
    console.log("Excluir usuário", user);
  };

  const handleSearch = () => {
    fetchUsers(filter);
  };

  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <section className="user-filter border-1">
        <h3>Filtro de usuários</h3>

        <label htmlFor="name">Nome</label>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setFilter({ name: e.target.value })}
        />

        <button
          className="cursor-pointer border-1"
          onClick={() => handleSearch()}
        >
          Pesquisar
        </button>
        <aside className="flex w-full ">
          <button
            onClick={openDrawer}
            className="bg-white-500 cursor-pointer border-1 hover:bg-gray-500"
          >
            Abrir drawer
          </button>

          {isOpen && (
            <form className="flex flex-col gap-4 px-10 h-full fixed right-0 bg-gray-500  ">
              <h3 className="">Cadastrar usuário</h3>
              <label htmlFor="name">Nome</label>
              <input type="text" placeholder="Nome completo" />
              <label htmlFor="email">E-mail</label>
              <input type="email" placeholder="Digite um e-mail válido" />
              <label htmlFor="number">Telefone</label>
              <input type="tel" placeholder="Digite um número válido" />
              <button
                className="text-white border-1 cursor-pointer"
                onClick={closeDrawer}
              >
                Fechar
              </button>
            </form>
          )}
        </aside>
      </section>
      <section className="flex justify-center">
        <h4>Listagem de usuários</h4>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="flex gap-3 p-2">
                  <button
                    className="cursor-pointer text-white bg-gray-500 hover:bg-gray-800 rounded-sm p-1"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="cursor-pointer border-1 bg-red-500 text-white hover:bg-gray-800 rounded-sm p-1"
                    onClick={() => handleDelete(user)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
