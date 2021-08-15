import { useCallback, useState } from "react";
import { User } from "./App";
import { EditUserForm } from "./EditUserForm";

type Props = {
  user: User;
};

export function UserItem({ user }: Props) {
  const [editMode, setEditMode] = useState(false);

  const enableEditMode = useCallback(() => {
    setEditMode(true);
  }, []);

  const cancelEditMode = useCallback(() => {
    setEditMode(false);
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
    </div>
  );
}
