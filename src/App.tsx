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
    }
  };
}

const URL_API = "https://jsonplaceholder.typicode.com/users";

interface SearchField {
  name: string
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<SearchField>({
    name: ""
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
  }

  return (
    <>
      <section className="user-filter">
        <h3>Filtro de usuários</h3>

        <label htmlFor="name">Nome</label>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setFilter({ name: e.target.value })}
        />

        <button className="btn-search" onClick={() => handleSearch()}>
          Pesquisar
        </button>
      </section>

      <section className="user-list">
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
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(user)}>
                    Editar
                  </button>
                  <button
                    className="btn-delete"
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
