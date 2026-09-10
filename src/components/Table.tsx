import type { ReactNode } from "react";

export interface TableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: (row: T) => string | number;
  loading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
}

export function Table<T>({
  data,
  columns,
  rowKey,
  loading = false,
  loadingMessage = "Carregando registros...",
  emptyMessage = "Nenhum registro encontrado.",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="whitespace-nowrap px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-slate-500"
              >
                <div className="flex items-center justify-center gap-3">
                  <span
                    className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700"
                    aria-hidden="true"
                  />
                  <span role="status">{loadingMessage}</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-sm text-slate-500"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl text-slate-300" aria-hidden="true">
                    -
                  </span>
                  <span>{emptyMessage}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap px-6 py-4 text-sm text-slate-700"
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
