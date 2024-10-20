import React from "react";

export default function SidebarContainer({ children }) {
  return (
    <div className="rounded-2xl border border-black bg-black text-yellow mb-8 p-4 dark:border-yellow dark:bg-yellow dark:text-black md:rounded-3xl">
      {children}
    </div>
  );
}
