import * as React from 'react';
import { Avatar } from 'react-native-paper';

const UserAvatar = () => (
  <Avatar.Image
    size={72}
    source={{
      uri: 'https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid',
    }}
  />
);

export default UserAvatar;
