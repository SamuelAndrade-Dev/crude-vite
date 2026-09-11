import { useState } from "react";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { SearchBar } from "./components/SearchBar";
import { UserList } from "./components/UserList";
import type { UserSearchField, UserTableData } from "./types/user.types";
import { RemoveUserModal } from "./components/RemoveUserModal";
import { useVisibility } from "../../hooks/useVisibility";
import { useDeleteUsers } from "../../hooks/useDeleteUsers";
import { UserDrawer } from "./components/UserDrawer";
import { Button } from "../../components/Button";

export const UserPage = () => {
  const [filter, setFilter] = useState<UserSearchField>();
  const { users, isFetching, error, refetch } = useFetchUsers(filter);
  const { deleteUser, isDeleting } = useDeleteUsers();
  const removeUserModal = useVisibility<UserTableData>();
  const userDrawer = useVisibility<UserTableData | undefined>();

  const handleFilter = (fields: UserSearchField) => {
    setFilter(fields);
  };

  const handleRemoveUser = async (userData: UserTableData) => {
    await deleteUser(userData.id);
    await refetch();
    removeUserModal.hide();
  };

  return (
    <section className="flex flex-col gap-4 w-7xl h-lvh bg-gray-200">
      <article className="w-full flex items-center justify-between">
        <h2 className="text-xl font-bold">Gestão de usuários</h2>
      </article>
      <div className="flex justify-between items-end gap-2">
        <SearchBar onFilter={handleFilter} />
        <Button type="button" size="md" onClick={userDrawer.show}>
          Cadastrar usuário
        </Button>
      </div>
      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </p>
      )}

      <UserList
        users={users}
        isFetching={isFetching}
        onChangeUser={userDrawer.showWithParams}
        onRemoveUser={removeUserModal.showWithParams}
      />
      <RemoveUserModal
        userData={removeUserModal.params!}
        isOpen={removeUserModal.isVisible}
        onClose={removeUserModal.hide}
        loadingConfirm={isDeleting}
        onConfirm={handleRemoveUser}
      />
      <UserDrawer
        isOpen={userDrawer.isVisible}
        onClose={userDrawer.hide}
        userData={userDrawer.params}
      />
    </section>
  );
};
