"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { OrgNode } from "@/types/orgNode";
import { cn } from "@/lib/utils";
import { initials } from "./org-tree-utils";

export interface OrgTreeNodeProps {
  node: OrgNode;
  expandedIds: Set<string>;
  highlightedId: string | null;
  onToggle: (id: string) => void;
  onSelect: (node: OrgNode) => void;
  registerRef: (id: string, el: HTMLDivElement | null) => void;
}

export function OrgTreeNode({ node, expandedIds, highlightedId, onToggle, onSelect, registerRef }: OrgTreeNodeProps) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isHighlighted = highlightedId === node.id;

  return (
    <div>
      <div
        ref={(el) => registerRef(node.id, el)}
        className={cn(
          "flex items-center gap-1.5 rounded-md py-1.5 pr-2 transition-colors",
          isHighlighted ? "bg-primary/10 ring-2 ring-primary/40" : "hover:bg-secondary/60"
        )}
      >
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(node.id)}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-secondary"
          >
            <motion.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              <ChevronRight className="h-4 w-4" />
            </motion.span>
          </button>
        ) : (
          <span className="h-5 w-5 shrink-0" />
        )}

        <button
          type="button"
          onClick={() => onSelect(node)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-md py-1 text-left"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials(node.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{node.name}</p>
            <p className="truncate text-xs text-muted-foreground">{node.title}</p>
          </div>
          {hasChildren && (
            <span className="ml-1 shrink-0 rounded-full bg-secondary px-1.5 py-0.5 text-[11px] text-muted-foreground">
              {node.children.length}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="ml-[26px] overflow-hidden border-l border-border pl-3"
          >
            {node.children.map((child) => (
              <OrgTreeNode
                key={child.id}
                node={child}
                expandedIds={expandedIds}
                highlightedId={highlightedId}
                onToggle={onToggle}
                onSelect={onSelect}
                registerRef={registerRef}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
