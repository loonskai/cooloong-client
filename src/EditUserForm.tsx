import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { User } from "./App";
import UpdateUserMutation from "./graphql/UpdateUser.mutation.graphql";

type Props = {
  user: User;
  onSubmit?(): void;
};

export function EditUserForm({ user, onSubmit: onSubmitCallback }: Props) {
  const { register, handleSubmit } = useForm();
  const [updateUser, { data }] = useMutation(UpdateUserMutation);

  const onSubmit = (updateUserInput: any) => {
    updateUser({
      variables: {
        updateUserInput: {
          id: user.id,
          ...updateUserInput,
        },
      },
      optimisticResponse: {
        updateUser: {
          __typename: "User",
          id: user.id,
          ...updateUserInput,
        },
      },
    });
    if (typeof onSubmitCallback === "function") {
      onSubmitCallback();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <span>Email:</span>
          <input
            type="email"
            defaultValue={user.email}
            {...register("email")}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Login:</span>
          <input defaultValue={user.login} {...register("login")} />
        </label>
      </div>
      <div>
        <label>
          <span>Name:</span>
          <input defaultValue={user.name || ""} {...register("name")} />
        </label>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
