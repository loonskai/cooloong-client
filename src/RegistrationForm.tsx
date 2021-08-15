import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import CreateUser from "./graphql/CreateUser.mutation.graphql";

export function RegistrationForm() {
  const { register, handleSubmit } = useForm();
  const [createUser, { data }] = useMutation(CreateUser);

  const onSubmit = (createUserInput: any) => {
    createUser({
      variables: {
        createUserInput,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <span>Email:</span>
          <input defaultValue="test@mail.foo" {...register("email")} />
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
