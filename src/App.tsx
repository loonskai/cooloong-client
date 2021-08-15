import { gql, useQuery } from "@apollo/client";
import { RegistrationForm } from "./RegistrationForm";

function App() {
  const { loading, data } = useQuery(gql``);

  if (loading) return <div>Loading...</div>;
  const { users } = data;
  return (
    <div>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
      <hr />
      <RegistrationForm />
    </div>
  );
}

export default App;
