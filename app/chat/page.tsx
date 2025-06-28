"use client";
import Chat from "@/components/custom/Chat";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useAllUsersQuery } from "@/features/auth/authApi";

interface UserPayload {
  user_id: string;
  email: string;
  exp: number;
}

const ChatRoom = () => {
  const [user, setUser] = React.useState<UserPayload | null>(null);
  const { data: allUsers } = useAllUsersQuery(undefined);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
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
      <Chat user={user} allUsers={allUsers}/>
    </div>
  );
};

export default ChatRoom;
