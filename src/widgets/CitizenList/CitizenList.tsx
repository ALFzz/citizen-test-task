import { useMemo, useState } from 'react';
import type { Citizen } from '../../entities/citizen/types';
import type { Column, SortConfig, ColumnKey } from './types';
import './CitizenList.css';
import {sortCitizens} from "./utils/sortCitizens.ts";
import {TablePagination} from "./components/TablePagination.tsx";
import {ColumnSelector} from "./components/ColumnSelector.tsx";



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

function formatDate(value: string) {
    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return '—';
    }

    return new Intl.DateTimeFormat('ru-RU').format(date);
}

function getStatusLabel(status: Citizen['status']) {
    const labels = {
        active: 'Активен',
        verification: 'На проверке',
        blocked: 'Заблокирован',
    };

    return labels[status];
}

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

    const [visibleColumns, setVisibleColumns] = useState<string[]>(
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

    const renderCell = (citizen: Citizen, key: ColumnKey) => {
        switch (key) {
            case 'fullName':
                return (
                    <div className="citizen-name-cell">
                        <div className="citizen-avatar">
                            {citizen.firstName[0]}
                            {citizen.lastName[0]}
                        </div>

                        <div>
                            <strong>
                                {citizen.lastName} {citizen.firstName}{' '}
                                {citizen.middleName}
                            </strong>

                            <span>{citizen.id}</span>
                        </div>
                    </div>
                );

            case 'birthDate':
                return formatDate(citizen.birthDate);

            case 'region':
                return citizen.region;

            case 'phone':
                return citizen.phone;

            case 'status':
                return (
                    <span className={`status status--${citizen.status}`}>
          {getStatusLabel(citizen.status)}
        </span>
                );
        }
    };


    return (
        <div className="citizen-list">

            <ColumnSelector
                columns={columns}
                visibleColumns={visibleColumns}
                onChange={setVisibleColumns}
            />

            <div className="citizen-table-wrapper">


                <table className="citizen-table">
                    <thead>
                    <tr>
                        {columns
                            .filter((column) => visibleColumns.includes(column.key))
                            .map((column) => (
                                <th key={column.key}>
                                    {column.sortable ? (
                                        <button
                                            type="button"
                                            onClick={() => handleSort(column.key)}
                                        >
                                            {column.label}

                                            {sortConfig.key === column.key && (
                                                <span>
                  {sortConfig.direction === 'asc' ? '↑' : '↓'}
                </span>
                                            )}
                                        </button>
                                    ) : (
                                        column.label
                                    )}
                                </th>
                            ))}
                    </tr>
                    </thead>

                    <tbody>
                    {paginatedCitizens.map((citizen) => (
                        <tr
                            key={citizen.id}
                            className={
                                citizen.id === selectedCitizenId
                                    ? 'citizen-row--selected'
                                    : ''
                            }
                            onClick={() => onSelect(citizen)}
                        >
                            {columns
                                .filter((column) => visibleColumns.includes(column.key))
                                .map((column) => (
                                    <td key={column.key}>
                                        {renderCell(citizen, column.key)}
                                    </td>
                                ))}
                        </tr>
                    ))}
                    </tbody>
                </table>

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