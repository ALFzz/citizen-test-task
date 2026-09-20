import { useMemo, useState } from 'react';
import type { Citizen } from '../../entities/citizen/types';
import type { Column, SortConfig, ColumnKey } from './types';
import {sortCitizens} from "./utils/sortCitizens.ts";
import {TablePagination} from "./components/TablePagination.tsx";
import {ColumnSelector} from "./components/ColumnSelector.tsx";
import {CitizenTable} from "./components/CitizenTable.tsx";
import './CitizenList.css';



const columns: Column[] = [
    {
        key: 'fullName',
        label: 'Гражданин',
        sortable: true,
    },
    {
        key: 'birthDate',
        label: 'Дата рождения',
        sortable: true,
    },
    {
        key: 'region',
        label: 'Регион',
        sortable: true,
    },
    {
        key: 'phone',
        label: 'Телефон',
    },
    {
        key: 'status',
        label: 'Статус',
        sortable: true,
    },
];

type CitizenListProps = {
    citizens: Citizen[];
    selectedCitizenId: string | null;
    onSelect: (citizen: Citizen) => void;
};


export function CitizenList({
                                citizens,
                                selectedCitizenId,
                                onSelect,
                            }: CitizenListProps) {

    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'fullName',
        direction: 'asc',
    });

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
        columns.map((column) => column.key),
    );

    const handleSort = (key: ColumnKey) => {
        setSortConfig((current) => ({
            key,
            direction:
                current.key === key && current.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        }));
    };

    const sortedCitizens = useMemo(() => {
        return sortCitizens(citizens, sortConfig);
    }, [citizens, sortConfig]);

    const totalPages = Math.ceil(
        sortedCitizens.length / pageSize,
    );

    const paginatedCitizens = useMemo(() => {
        const start = (page - 1) * pageSize;

        return sortedCitizens.slice(
            start,
            start + pageSize,
        );
    }, [sortedCitizens, page, pageSize]);

    return (
        <div className="citizen-list">

            <ColumnSelector
                columns={columns}
                visibleColumns={visibleColumns}
                onChange={setVisibleColumns}
            />

            <div className="citizen-table-wrapper">


                <CitizenTable
                    citizens={paginatedCitizens}
                    columns={columns}
                    visibleColumns={visibleColumns}
                    selectedCitizenId={selectedCitizenId}
                    sortConfig={sortConfig}
                    onSelect={onSelect}
                    onSort={handleSort}
                />

                <TablePagination
                    page={page}
                    pageSize={pageSize}
                    totalItems={sortedCitizens.length}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                        setPageSize(size);
                        setPage(1);
                    }}
                />

                {citizens.length === 0 && (
                    <div className="citizen-list-empty">
                        По заданным условиям ничего не найдено
                    </div>
                )}
            </div>
        </div>
    );
}