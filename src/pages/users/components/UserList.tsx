import { Pagination } from "../../../components/Pagination";
import { Table } from "../../../components/Table";
import { UserTableColumns } from "../constants/user.constant";
import type { UserTableData } from "../types/user.types";

interface UserListProps {
  isFetching: boolean;
  users: {
    id: number;
    name: string;
    phone: string;
  }[];
  onPageChange?: (page: number) => void;
  onRemoveUser?: (user: UserTableData) => void;
}

export const UserList = ({
  users,
  isFetching,
  onPageChange,
  onRemoveUser,
}: UserListProps) => (
  <article className="flex flex-col gap-4">
    <Table
      data={users}
      columns={UserTableColumns({ onRemoveUser, onChangeUser: undefined })}
      rowKey={(row) => row.id}
      loading={isFetching}
    />
    <Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
  </article>
);
