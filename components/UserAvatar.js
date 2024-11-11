import * as React from "react";
import { Avatar } from "react-native-paper";

const UserAvatar = () => (
  <Avatar.Image
    size={24}
    source={{ uri: "https://api.dicebear.com/9.x/dylan/svg" }}
  />
);

export default UserAvatar;
