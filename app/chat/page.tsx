"use client";
import Chat from "@/components/custom/Chat";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAllUsersQuery } from "@/features/auth/authApi";
import { User } from "@/components/custom/chat/types/User.types";


export type Props = {
  data: User[];
}

const ChatRoom = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const { data: allUsers } = useAllUsersQuery<Props>(undefined);

  const filteredUsers = allUsers?.filter((x) => x.email !== user?.email);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chat user={user} allUsers={filteredUsers}/>
    </div>
  );
};

export default ChatRoom;
