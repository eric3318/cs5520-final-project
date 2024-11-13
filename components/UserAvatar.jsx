import * as React from "react";
import { Avatar } from "react-native-paper";

const UserAvatar = () => (
  <Avatar.Image
    size={72}
    source={{
      uri: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    }}
  />
);

export default UserAvatar;
