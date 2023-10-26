import { IsLogInContext } from "../lib/Contexts/LogInContext";
import React from "react";
import { CartCountContext } from "../lib/Contexts/CartContext";
import { Typography } from "../lib/mui";
export function CartIcons() {
  const Count = React.useContext(CartCountContext);
  return (
    <div>
      <Typography variant="h6" color="inherit" noWrap sx={{ ml: 1 }}>
        {Count}
      </Typography>
    </div>
  );
}
