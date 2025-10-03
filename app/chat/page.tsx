//TODO

"use client";
import Chat from "@/components/custom/Chat";
import React from "react";
import { useAllUsersQuery, useMeQuery } from "@/features/auth/authApi";
import { User } from "@/components/custom/chat/types/User.types";

export type Props = {
  data: User[];
};

const ChatRoom = () => {
  const { data: user, isLoading } = useMeQuery(null);
  const { data: allUsers } = useAllUsersQuery(null);

  if (isLoading || !user) return <div>Loading...</div>;

  console.log(user)

  const filteredUsers = allUsers?.filter((x) => x.email !== user.email);

  return (
    <div>
      <Chat user={user} allUsers={filteredUsers} />
    </div>
  );
};

export default ChatRoom;
