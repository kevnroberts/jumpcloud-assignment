import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

export const ListPagination = ({
    currentPage,
    pageSize,
    onChangePage,
    systemUserCount,
}) => {
    const totalPages = Math.ceil(systemUserCount / pageSize);

    const paginationItems = [];
    const maxItems = Math.min(totalPages, 5);

    const getStart = (currentPage, totalPages) => {
        if (currentPage <= 3) {
            return 1;
        } else if (currentPage > totalPages - 3) {
            return Math.max(totalPages - 4, 1);
        }

        return currentPage - 2;
    }

    const start = getStart(currentPage, totalPages);
    for(let i = start; i < maxItems + start; i += 1) {
        paginationItems.push(
            <Pagination.Item
                active={i === currentPage}
                key={`page-item-${i}`}
                onClick={() => { onChangePage(i); }}
            >{i}</Pagination.Item>
        );
    }

    return (
        <Pagination>
            <Pagination.First disabled={currentPage === 1} onClick={() => { onChangePage(1); }} />
            <Pagination.Prev disabled={currentPage === 1} onClick={() => { onChangePage(currentPage - 1); }} />

            {currentPage - 2 > 1 ? (
                <Pagination.Ellipsis onClick={() => { onChangePage(start - 1); }} />
            ) : null}
            {paginationItems}
            {currentPage + 2 < totalPages ? (
                <Pagination.Ellipsis onClick={() => { onChangePage(start + maxItems); }} />
            ) : null}

            <Pagination.Next disabled={currentPage === totalPages} onClick={() => { onChangePage(currentPage + 1); }} />
            <Pagination.Last disabled={currentPage === totalPages} onClick={() => { onChangePage(totalPages); }} />
        </Pagination>
    );
}

export default ListPagination;
