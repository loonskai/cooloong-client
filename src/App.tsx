import { useQuery } from "@apollo/client";
import { RegistrationForm } from "./RegistrationForm";
import { UserItem } from "./UserItem";
import GetUsers from "./graphql/GetUsers.query.graphql";

export type User = {
  id: number;
  email: string;
  login: string;
  name?: string;
};

function App() {
  const { loading, data: { users = [] } = { users: [] } } =
    useQuery<{ users: User[] }>(GetUsers);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
      <hr />
      <RegistrationForm />
    </div>
  );
}

export default App;
