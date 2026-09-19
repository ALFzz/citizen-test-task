import type { Citizen } from '../../entities/citizen/types';

import './CitizenList.css';

interface CitizenListProps {
    citizens: Citizen[];
    selectedCitizenId: string | null;
    onSelect: (citizen: Citizen) => void;
}

function getFullName(citizen: Citizen) {
    return `${citizen.lastName} ${citizen.firstName} ${citizen.middleName}`;
}

function getStatusLabel(status: Citizen['status']) {
    const labels = {
        active: 'Активен',
        verification: 'Проверка',
        blocked: 'Заблокирован',
    };

    return labels[status];
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat('ru-RU').format(
        new Date(`${value}T00:00:00`),
    );
}

export function CitizenList({
                                citizens,
                                selectedCitizenId,
                                onSelect,
                            }: CitizenListProps) {
    return (
        <div className="citizen-list">
            <div className="citizen-list-header">
                <div>Гражданин</div>
                <div>Дата рождения</div>
                <div>Регион</div>
                <div>Статус</div>
            </div>

            <div className="citizen-list-body">
                {citizens.map((citizen) => (
                    <button
                        key={citizen.id}
                        type="button"
                        className={`citizen-row ${
                            selectedCitizenId === citizen.id
                                ? 'citizen-row--selected'
                                : ''
                        }`}
                        onClick={() => onSelect(citizen)}
                    >
                        <div className="citizen-name-cell">
                            <div className="citizen-avatar">
                                {citizen.firstName[0]}
                                {citizen.lastName[0]}
                            </div>

                            <div>
                                <strong>{getFullName(citizen)}</strong>

                                <span>{citizen.id}</span>
                            </div>
                        </div>

                        <span>{formatDate(citizen.birthDate)}</span>

                        <span>{citizen.region}</span>

                        <span
                            className={`status status--${citizen.status}`}
                        >
              {getStatusLabel(citizen.status)}
            </span>
                    </button>
                ))}

                {citizens.length === 0 && (
                    <div className="citizen-list-empty">
                        По заданным параметрам граждане не найдены
                    </div>
                )}
            </div>
        </div>
    );
}

