import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const page = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const pages = Array.from(
    { length: Math.max(totalPages, 1) },
    (_, index) => index + 1,
  );

  const goToPage = (nextPage: number) => {
    if (nextPage >= 1 && nextPage <= totalPages && nextPage !== page) {
      onPageChange?.(nextPage);
    }
  };

  return (
    <nav
      aria-label="Paginação"
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label="Página anterior"
        disabled={page === 1 || totalPages < 1}
        onClick={() => goToPage(page - 1)}
      >
        Anterior
      </Button>

      <div className="flex items-center gap-1" role="list">
        {pages.map((pageNumber) => (
          <Button
            key={pageNumber}
            type="button"
            variant={pageNumber === page ? "primary" : "ghost"}
            size="sm"
            aria-current={pageNumber === page ? "page" : undefined}
            aria-label={`Ir para a página ${pageNumber}`}
            onClick={() => goToPage(pageNumber)}
            className="min-w-9"
          >
            {pageNumber}
          </Button>
        ))}
      </div>

      <Button
        type="button"
        variant="secondary"
        size="sm"
        aria-label="Próxima página"
        disabled={page === totalPages || totalPages < 1}
        onClick={() => goToPage(page + 1)}
      >
        Próxima
      </Button>
    </nav>
  );
}
