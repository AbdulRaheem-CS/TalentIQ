import type { OrgNode } from "@/types/orgNode";

export function findPathToNode(root: OrgNode, predicate: (node: OrgNode) => boolean): string[] | null {
  if (predicate(root)) return [root.id];
  for (const child of root.children) {
    const path = findPathToNode(child, predicate);
    if (path) return [root.id, ...path];
  }
  return null;
}

export function countNodes(node: OrgNode): number {
  return 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);
}

export function maxDepth(node: OrgNode): number {
  if (node.children.length === 0) return 1;
  return 1 + Math.max(...node.children.map(maxDepth));
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}
