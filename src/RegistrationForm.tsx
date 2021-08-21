import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import GetUsersQuery from "./graphql/GetUsers.query.graphql";
import CreateUserMutation from "./graphql/CreateUser.mutation.graphql";
import produce from "immer";

export function RegistrationForm() {
  const { register, handleSubmit } = useForm();
  const [createUser] = useMutation(CreateUserMutation, {
    update(cache, result) {
      const getUsersQueryResult = cache.readQuery<any>({
        query: GetUsersQuery,
      });
      const newUserQueryResult = produce(getUsersQueryResult, (draft: any) => {
        draft.users.push(result.data.createUser);
      });
      cache.writeQuery({ query: GetUsersQuery, data: newUserQueryResult });
    },
  });

  const onSubmit = (createUserInput: any) => {
    createUser({
      variables: {
        createUserInput,
      },
      optimisticResponse: {
        createUser: {
          id: Math.random(),
          login: createUserInput.login,
          name: createUserInput.name,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <span>Email:</span>
          <input
            defaultValue={`test-${Math.random()}@mail.foo`}
            {...register("email")}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Login:</span>
          <input defaultValue="testuser" {...register("login")} />
        </label>
      </div>
      <div>
        <label>
          <span>Name:</span>
          <input defaultValue="John Doe" {...register("name")} />
        </label>
      </div>
      <div>
        <label>
          <span>Password:</span>
          <input
            type="password"
            defaultValue="test123"
            {...register("password")}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Confirm password:</span>
          <input
            type="password"
            defaultValue="test123"
            {...register("confirmPassword")}
          />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
