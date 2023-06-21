import React from "react";
import { DOMAttributes } from "@react-types/shared";

export const WindowContext = React.createContext<{
  isActive: boolean;
  movable: boolean;
  titleProps: DOMAttributes;
}>({ isActive: false, movable: true, titleProps: {} });
