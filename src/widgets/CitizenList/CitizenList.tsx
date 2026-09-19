import { useMemo, useState } from 'react';
import type { Citizen } from '../../entities/citizen/types';
import type { Column, SortConfig, ColumnKey } from './types';
import './CitizenList.css';
import {sortCitizens} from "./utils/sortCitizens.ts";



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
            <div className="citizen-table-wrapper">
                <table className="citizen-table">
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.sortable ? (
                                    <button
                                        type="button"
                                        onClick={() => handleSort(column.key)}
                                    >
                                        {column.label}

                                        {sortConfig.key === column.key && (
                                            <span>
                                {sortConfig.direction === 'asc'
                                    ? ' ↑'
                                    : ' ↓'}
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
                                selectedCitizenId === citizen.id
                                    ? 'citizen-row--selected'
                                    : ''
                            }
                            onClick={() => onSelect(citizen)}
                        >
                            <td>
                                <div className="citizen-name-cell">
                                    <div className="citizen-avatar">
                                        {citizen.firstName[0]}
                                        {citizen.lastName[0]}
                                    </div>

                                    <div>
                                        <strong>
                                            {citizen.lastName}{' '}
                                            {citizen.firstName}{' '}
                                            {citizen.middleName}
                                        </strong>

                                        <span>{citizen.id}</span>
                                    </div>
                                </div>
                            </td>

                            <td>
                                {formatDate(citizen.birthDate)}
                            </td>

                            <td>{citizen.region}</td>

                            <td>{citizen.phone}</td>

                            <td>
                                    <span
                                        className={`status status--${citizen.status}`}
                                    >
                                        {getStatusLabel(citizen.status)}
                                    </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="table-pagination">
                    <div className="table-pagination-info">
                        Показано{' '}
                        {sortedCitizens.length === 0
                            ? 0
                            : (page - 1) * pageSize + 1}
                        {'–'}
                        {Math.min(
                            page * pageSize,
                            sortedCitizens.length,
                        )}
                        {' из '}
                        {sortedCitizens.length}
                    </div>

                    <div className="table-pagination-controls">
                        <button
                            type="button"
                            disabled={page === 1}
                            onClick={() => setPage((current) => current - 1)}
                        >
                            ←
                        </button>

                        <span>
            {page} / {totalPages || 1}
        </span>

                        <button
                            type="button"
                            disabled={page === totalPages || totalPages === 0}
                            onClick={() => setPage((current) => current + 1)}
                        >
                            →
                        </button>
                    </div>

                    <select
                        value={pageSize}
                        onChange={(event) => {
                            setPageSize(Number(event.target.value));
                            setPage(1);
                        }}
                    >
                        <option value={10}>10 / стр.</option>
                        <option value={25}>25 / стр.</option>
                        <option value={50}>50 / стр.</option>
                    </select>
                </div>

                {citizens.length === 0 && (
                    <div className="citizen-list-empty">
                        По заданным условиям ничего не найдено
                    </div>
                )}
            </div>
        </div>
    );
}