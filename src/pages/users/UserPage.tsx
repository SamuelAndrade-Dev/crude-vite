import { useState } from "react";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { SearchBar } from "./components/SearchBar";
import { UserList } from "./components/UserList";
import type { UserSearchField, UserTableData } from "./types/user.types";
import { RemoveUserModal } from "./components/RemoveUserModal";
import { useVisibility } from "../../hooks/useVisibility";
import { useDeleteUsers } from "../../hooks/useDeleteUsers";

export const UserPage = () => {
  const [filter, setFilter] = useState<UserSearchField>();
  const { users, isFetching, error, refetch } = useFetchUsers(filter);
  const { deleteUser, isDeleting } = useDeleteUsers();
  const removeUserModal = useVisibility<UserTableData>();

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
      <article className="w-full flex justify-center">
        <h2 className="text-xl font-bold">Gestão de usuários</h2>
      </article>
      <SearchBar onFilter={handleFilter} />
      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.message}
        </p>
      )}
      <UserList
        users={users}
        isFetching={isFetching}
        onRemoveUser={(user) => removeUserModal.showWithParams(user)}
      />
      <RemoveUserModal
        userData={removeUserModal.params!}
        isOpen={removeUserModal.isVisible}
        onClose={removeUserModal.hide}
        loadingConfirm={isDeleting}
        onConfirm={handleRemoveUser}
      />
    </section>
  );
};
