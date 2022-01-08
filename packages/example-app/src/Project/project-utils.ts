import { FsItem } from "../fs/fs.state";

export const filterPath = ({ path }: FsItem) =>
  !path.split("/").includes(".git");
