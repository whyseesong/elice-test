export type TreeType = Node[];

type Node = {
  name: string;
  dir: string;
  type: "file" | "folder";
  childNode?: TreeType;
};
