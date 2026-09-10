import { Button } from "../../../components/Button";
import type { TableColumn } from "../../../components/Table";
import type { UserTableData } from "../types/user.types";

interface UserTableColumnsProps {
  onChangeUser?: (user: UserTableData) => void;
  onRemoveUser?: (user: UserTableData) => void;
}

export const UserTableColumns: (
  props: UserTableColumnsProps,
) => TableColumn<UserTableData>[] = ({
  onChangeUser,
  onRemoveUser,
}: UserTableColumnsProps) => [
  { key: "name", header: "Nome", render: (row) => row.name },
  { key: "phone", header: "Telefone", render: (row) => row.phone },
  {
    key: "actions",
    header: "Ações",
    render: (row) => (
      <div className="flex gap-4">
        <Button onClick={() => onChangeUser?.(row)}>Editar</Button>
        <Button onClick={() => onRemoveUser?.(row)}>Excluir</Button>
      </div>
    ),
  },
];
