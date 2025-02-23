import { useUserProfile } from '../hooks/use-auth';

const ProfilePage = () => {
  const { data: user, isLoading, error } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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