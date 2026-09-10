import type { UserSearchFieldDto } from "./users.dto";
import { api } from "../../lib/axios";

export const UserService = {
  fetchUsers: async (filterParams?: UserSearchFieldDto) => {
    const params = filterParams?.name?.trim()
      ? { name: filterParams.name.trim() }
      : undefined;
    const response = await api.get("/users", { params });
    return response.data;
  },
  deleteUser: async (userId: number) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  },
};
