import React from "react";

// Redeclare forwardRef to fix the generic type removal problem.
// See more: https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
