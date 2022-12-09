export type ControlledStateProps<Type> = Partial<Type> & {
  [Property in keyof Type as `default${Capitalize<
    string & Property
  >}`]?: Type[Property];
} & {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    value: Type[Property]
  ) => void;
};
