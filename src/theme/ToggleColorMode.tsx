import * as React from "react";

import { PaletteMode } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import DarkMode from "@mui/icons-material/DarkMode";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";

interface ToggleColorModeProps extends IconButtonProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export default function ToggleColorMode({ mode, toggleColorMode, ...props }: ToggleColorModeProps) {
  return (
    <IconButton onClick={toggleColorMode} size="medium" color="primary" aria-label="Theme toggle button" {...props}>
      {mode === "dark" ? <WbSunnyOutlined fontSize="medium" /> : <DarkMode fontSize="medium" />}
    </IconButton>
  );
}
