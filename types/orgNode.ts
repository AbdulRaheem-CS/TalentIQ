export interface OrgNode {
  id: string;
  name: string;
  title: string;
  department: string;
  children: OrgNode[];
}
