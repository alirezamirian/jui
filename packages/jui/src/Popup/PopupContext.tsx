import { DOMAttributes } from "@react-types/shared";
import { createContext } from "react";

export const PopupContext = createContext<{
  isActive: boolean;
  movable: boolean;
  titleProps: DOMAttributes;
}>({ isActive: false, movable: true, titleProps: {} });
