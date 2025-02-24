import { useUserProfile } from '../hooks/use-auth';
import Loading from '../components/loading'
import Error from '../components/error';

const ProfilePage = () => {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
};

export default ProfilePage;