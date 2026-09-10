import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import type { UserTableData } from "../types/user.types";

interface RemoveUserModalProps {
  userData: UserTableData;
  isOpen: boolean;
  loadingConfirm?: boolean;
  onClose: () => void;
  onConfirm: (data: UserTableData) => Promise<void>;
}

export const RemoveUserModal = ({
  userData,
  isOpen,
  loadingConfirm,
  onClose,
  onConfirm,
}: RemoveUserModalProps) => (
  <Modal open={isOpen} title="Remover Usuário" onClose={onClose}>
    <div className="flex flex-col gap-4">
      <p>Tem certeza que deseja remover o usuário {userData?.name}?</p>
      <section className="flex justify-end gap-4">
        <Button
          variant="danger"
          size="md"
          type="button"
          onClick={() => onConfirm(userData)}
          loading={loadingConfirm}
        >
          Confirmar
        </Button>
        <Button variant="secondary" size="md" type="button" onClick={onClose}>
          Cancelar
        </Button>
      </section>
    </div>
  </Modal>
);
