import { FileCodeIcon, FileTextIcon, FolderOpenIcon } from "lucide-react";
import { useMemo } from "react";

function buildTree(paths) {
  const root = [];

  for (const filePath of [...paths].sort()) {
    const parts = filePath.split("/").filter(Boolean);

    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const isLast = i === parts.length - 1;

      const fullPath = "/" + parts.slice(0, i + 1).join("/");

      let existing = current.find((node) => node.name === name);

      if (!existing) {
        existing = {
          name,
          path: fullPath,
          isDir: !isLast,
          children: [],
        };

        current.push(existing);
      }

      current = existing.children;
    }
  }

  return root;
}

function getFileIcon(name) {
  if (name.endsWith(".css")) {
    return <FileTextIcon size={14} className="text-sky-500 shrink-0" />;
  }

  if (
    name.endsWith(".js") ||
    name.endsWith(".jsx") ||
    name.endsWith(".ts") ||
    name.endsWith(".tsx")
  ) {
    return <FileCodeIcon size={14} className="text-amber-500 shrink-0" />;
  }

  if (name.endsWith(".json")) {
    return <FileTextIcon size={14} className="text-emerald-500 shrink-0" />;
  }

  return <FileTextIcon size={14} className="text-zinc-400 shrink-0" />;
}

function TreeItem({ node, activeFile, onFileSelect, depth = 0 }) {
  const isActive = node.path === activeFile;

  if (node.isDir) {
    return (
      <div>
        <div
          className="flex items-center gap-2 py-1.5 px-2 text-xs text-zinc-600 select-none"
          style={{
            paddingLeft: `${depth * 12 + 8}px`,
          }}
        >
          <FolderOpenIcon size={15} className="text-zinc-500 shrink-0" />

          <span className="truncate">{node.name}</span>
        </div>

        {node.children.map((child) => (
          <TreeItem
            key={child.path}
            node={child}
            activeFile={activeFile}
            onFileSelect={onFileSelect}
            depth={depth + 1}
          />
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => onFileSelect(node.path)}
      className={`w-full flex items-center gap-2 py-1.5 px-2 text-xs rounded-md transition-colors cursor-pointer ${
        isActive
          ? "bg-zinc-100 text-zinc-950 font-medium"
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
      }`}
      style={{
        paddingLeft: `${depth * 12 + 8}px`,
      }}
    >
      {getFileIcon(node.name)}

      <span className="truncate">{node.name}</span>
    </button>
  );
}

const FileExplorer = ({ files = {}, activeFile, onFileSelect }) => {
  const tree = useMemo(() => {
    return buildTree(Object.keys(files));
  }, [files]);

  return (
    <div className="h-full py-2 overflow-y-auto hide-scrollbar">
      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
        Files
      </p>

      {tree.length === 0 ? (
        <p className="px-3 py-4 text-xs text-zinc-400">No files available</p>
      ) : (
        tree.map((node) => (
          <TreeItem
            key={node.path}
            node={node}
            activeFile={activeFile}
            onFileSelect={onFileSelect}
            depth={0}
          />
        ))
      )}
    </div>
  );
};

export default FileExplorer;
