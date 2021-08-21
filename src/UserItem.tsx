import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { User } from "./App";
import { EditUserForm } from "./EditUserForm";
import DeleteUserMutation from "./graphql/DeleteUser.mutation.graphql";

type Props = {
  user: User;
};

export function UserItem({ user }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [deleteUser] = useMutation(DeleteUserMutation, {
    update(cache, result) {
      cache.evict({
        id: cache.identify({
          __typename: "User",
          id: result.data.deleteUser.id,
        }),
      });
    },
  });

  const enableEditMode = useCallback(() => {
    setEditMode(true);
  }, []);

  const cancelEditMode = useCallback(() => {
    setEditMode(false);
  }, []);

  const handleUserDelete = useCallback(() => {
    deleteUser({
      variables: {
        deleteUserInput: {
          id: user.id,
        },
      },
    });
  }, []);

  if (editMode) {
    return (
      <div>
        <EditUserForm user={user} onSubmit={cancelEditMode} />
        <button onClick={cancelEditMode}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <div>{user.id}</div>
      <div>{user.email}</div>
      <div>{user.login}</div>
      <div>{user.name}</div>
      <button onClick={enableEditMode}>Edit</button>
      <button onClick={handleUserDelete}>Delete</button>
    </div>
  );
}
