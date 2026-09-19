type TablePaginationProps = {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
};

export function TablePagination({
                                    page,
                                    pageSize,
                                    totalItems,
                                    totalPages,
                                    onPageChange,
                                    onPageSizeChange,
                                }: TablePaginationProps) {
    const firstItem =
        totalItems === 0
            ? 0
            : (page - 1) * pageSize + 1;

    const lastItem = Math.min(
        page * pageSize,
        totalItems,
    );

    return (
        <div className="table-pagination">
            <div className="table-pagination-info">
                Показано {firstItem}–{lastItem} из {totalItems}
            </div>

            <div className="table-pagination-controls">
                <button
                    type="button"
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    ←
                </button>

                <span>
                    {page} / {totalPages || 1}
                </span>

                <button
                    type="button"
                    disabled={
                        page === totalPages ||
                        totalPages === 0
                    }
                    onClick={() => onPageChange(page + 1)}
                >
                    →
                </button>
            </div>

            <select
                value={pageSize}
                onChange={(event) =>
                    onPageSizeChange(
                        Number(event.target.value),
                    )
                }
            >
                <option value={10}>10 / стр.</option>
                <option value={25}>25 / стр.</option>
                <option value={50}>50 / стр.</option>
            </select>
        </div>
    );
}