import React, { useContext } from "react";

export const useContextOrThrow = <ContextType extends unknown>(
  Context: React.Context<ContextType | null>,
  nullErrorMessage: string
) => {
  const context = useContext<ContextType | null>(Context);

  if (context == null) {
    throw new Error(nullErrorMessage);
  }

  return context;
};
