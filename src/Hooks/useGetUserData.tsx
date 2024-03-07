import { useState } from "react";

const useGetUserData = () => {
  const [user] = useState(() => {
    const localData = localStorage.getItem("profile");
    if (localData) {
      return JSON.parse(localData);
    } else {
      return "";
    }
  });
  return { user };
};

export default useGetUserData;
