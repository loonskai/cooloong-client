import { useForm } from "react-hook-form";

export function RegistrationForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
