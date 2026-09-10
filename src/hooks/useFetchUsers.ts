import { useCallback, useEffect, useRef, useState } from "react";
import { UserService } from "../services/users/users.service";
import type { UserDTO, UserSearchFieldDto } from "../services/users/users.dto";

export const useFetchUsers = (UserQueryParams?: UserSearchFieldDto) => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  const refetch = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);
      const data = await UserService.fetchUsers(UserQueryParams);

      if (isMounted.current) {
        setUsers(data);
      }
    } catch (requestError) {
      if (isMounted.current) {
        setError(
          requestError instanceof Error
            ? requestError
            : new Error("Não foi possível carregar os usuários."),
        );
      }
    } finally {
      if (isMounted.current) {
        setIsFetching(false);
      }
    }
  }, [UserQueryParams]);

  useEffect(() => {
    isMounted.current = true;
    void Promise.resolve().then(() => refetch());

    return () => {
      isMounted.current = false;
    };
  }, [refetch]);

  return { users, isFetching, error, refetch };
};
