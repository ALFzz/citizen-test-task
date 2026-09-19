import type { Citizen } from '../../entities/citizen/types';
import './CitizenList.css';

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
    return (
        <div className="citizen-list">
            <div className="citizen-table-wrapper">
                <table className="citizen-table">
                    <thead>
                    <tr>
                        <th>Гражданин</th>
                        <th>Дата рождения</th>
                        <th>Регион</th>
                        <th>Телефон</th>
                        <th>Статус</th>
                    </tr>
                    </thead>

                    <tbody>
                    {citizens.map((citizen) => (
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