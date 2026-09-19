import type { Citizen } from '../../../entities/citizen/types';
import type { Column, ColumnKey, SortConfig } from '../types';

type CitizenTableProps = {
    citizens: Citizen[];
    columns: Column[];
    visibleColumns: ColumnKey[];
    selectedCitizenId: string | null;
    sortConfig: SortConfig;
    onSelect: (citizen: Citizen) => void;
    onSort: (key: ColumnKey) => void;
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

function renderCell(citizen: Citizen, key: ColumnKey) {
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
}

export function CitizenTable({
                                 citizens,
                                 columns,
                                 visibleColumns,
                                 selectedCitizenId,
                                 sortConfig,
                                 onSelect,
                                 onSort,
                             }: CitizenTableProps) {
    const displayedColumns = columns.filter((column) =>
        visibleColumns.includes(column.key),
    );

    return (
        <table className="citizen-table">
            <thead>
            <tr>
                {displayedColumns.map((column) => (
                    <th key={column.key}>
                        {column.sortable ? (
                            <button
                                type="button"
                                onClick={() => onSort(column.key)}
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
            {citizens.map((citizen) => (
                <tr
                    key={citizen.id}
                    className={
                        citizen.id === selectedCitizenId
                            ? 'citizen-row--selected'
                            : ''
                    }
                    onClick={() => onSelect(citizen)}
                >
                    {displayedColumns.map((column) => (
                        <td key={column.key}>
                            {renderCell(citizen, column.key)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}