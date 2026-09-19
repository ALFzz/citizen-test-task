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
                    {sortedCitizens.map((citizen) => (
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

                {citizens.length === 0 && (
                    <div className="citizen-list-empty">
                        По заданным условиям ничего не найдено
                    </div>
                )}
            </div>
        </div>
    );
}