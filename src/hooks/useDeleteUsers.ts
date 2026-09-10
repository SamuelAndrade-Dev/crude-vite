import { useState } from "react";
import { UserService } from "../services/users/users.service";

export const useDeleteUsers = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async (userId: number) => {
    try {
      setIsDeleting(true);
      await UserService.deleteUser(userId);
    } catch (requestError) {
      console.error(
        requestError instanceof Error
          ? requestError
          : new Error("Não foi possível deletar o usuário."),
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteUser, isDeleting };
};
