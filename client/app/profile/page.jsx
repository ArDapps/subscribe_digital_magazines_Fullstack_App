"use client";

import UserSubescribeMembership from "@/components/UserSubescribeMembership/UserSubescribeMembership";
import { UserCard } from "@/components/userCard/userCard";
import { useGetSingleUserQuery } from "@/redux/slices/RTK/userSlice";

const ProfilePage = () => {
  const { data: userData, error, isLoading } = useGetSingleUserQuery();
  console.log(userData);
  return (
    <>
      <div>{userData && userData.me && <UserCard data={userData.me} />}</div>
      <UserSubescribeMembership />
    </>
  );
};

export default ProfilePage;
