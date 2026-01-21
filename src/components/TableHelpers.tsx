export function Th({ children }: { children: React.ReactNode }) {
  return <th className="p-2 text-left font-medium text-gray-600">{children}</th>;
}

export function Td({
  children,
  colSpan,
  className = "",
}: {
  children: React.ReactNode;
  colSpan?: number;
  className?: string;
}) {
  return (
    <td colSpan={colSpan} className={`p-2 ${className}`}>
      {children}
    </td>
  );
}
