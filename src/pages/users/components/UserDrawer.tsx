import { Drawer } from "../../../components/Drawer";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import type { UserTableData } from "../types/user.types";

interface UserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: UserTableData;
}

export const UserDrawer = ({ isOpen, onClose, userData }: UserDrawerProps) => {
  const isEditMode = Boolean(userData);

  return (
    <Drawer open={isOpen} title={isEditMode ? "Editar Usuário" : "Cadastrar Usuário"} onClose={onClose}>
      <form className="flex flex-col gap-4">
        <TextField
          label="Nome"
          placeholder="Digite o nome do usuário"
          defaultValue={userData?.name}
        />
        <TextField
          label="Telefone"
          placeholder="Digite o telefone do usuário"
          defaultValue={userData?.phone}
        />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{isEditMode ? "Editar" : "Cadastrar"}</Button>
        </div>
      </form>
    </Drawer>
  );
};
