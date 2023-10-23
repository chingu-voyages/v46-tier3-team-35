import { useEffect, useState } from "react";

export const Profile = ({ auth }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = () => {
    auth.getProfile((profile, error) => setProfile({ profile, error }));
  };

  return (
    profile && (
      <div>
        <h1>Profile</h1>
        <p>{profile.nickname}</p>
        <img
          style={{ maxWidth: 50, maxHeight: 50 }}
          src={profile.picture}
          alt="profile pic"
        />
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    )
  );
};
