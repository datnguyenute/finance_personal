import AvatarMUI from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0)}`,
  };
};

const ProfileAvatar = () => {
  const { data: session } = useSession();
  return <AvatarMUI {...stringAvatar(session?.user.name || "")} />;
};

export default ProfileAvatar;
