"use client";

import { useEffect, useRef, useState } from "react";
import type { OrgNode } from "@/types/orgNode";
import { OrgTreeNode } from "./org-tree-node";
import { findPathToNode } from "./org-tree-utils";

export interface OrgTreeViewProps {
  root: OrgNode;
  searchQuery: string;
  onSelect: (node: OrgNode) => void;
}

export function OrgTreeView({ root, searchQuery, onSelect }: OrgTreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set([root.id, ...root.children.map((c) => c.id)])
  );
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  function registerRef(id: string, el: HTMLDivElement | null) {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  }

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setHighlightedId(null);
      return;
    }
    const path = findPathToNode(root, (n) => n.name.toLowerCase().includes(query));
    if (!path) {
      setHighlightedId(null);
      return;
    }
    setExpandedIds((prev) => new Set([...Array.from(prev), ...path]));
    const matchId = path[path.length - 1];
    setHighlightedId(matchId);
    const timer = setTimeout(() => {
      nodeRefs.current.get(matchId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, root]);

  return (
    <div className="overflow-x-auto">
      <OrgTreeNode
        node={root}
        expandedIds={expandedIds}
        highlightedId={highlightedId}
        onToggle={toggle}
        onSelect={onSelect}
        registerRef={registerRef}
      />
    </div>
  );
}
