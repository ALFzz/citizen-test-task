import { useMemo, useState } from 'react';

import { citizens } from '../../entities/citizen/data';
import type {
    Citizen,
    CitizenStatus,
    Gender,
} from '../../entities/citizen/types';

import { CitizenList } from '../../widgets/CitizenList/CitizenList';
import { CitizenProfile } from '../../widgets/CitizenProfile/CitizenProfile';

import './CitizensPage.css';

console.log(citizens)
export function CitizensPage() {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');
    const [status, setStatus] =
        useState<CitizenStatus | ''>('');
    const [gender, setGender] =
        useState<Gender | ''>('');

    const [selectedCitizenId, setSelectedCitizenId] =
        useState<string | null>(citizens[0]?.id ?? null);

    const filteredCitizens = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return citizens.filter((citizen) => {
            const fullName =
                `${citizen.lastName} ${citizen.firstName} ${citizen.middleName}`
                    .toLowerCase();

            const matchesSearch =
                !normalizedSearch ||
                fullName.includes(normalizedSearch) ||
                citizen.id.toLowerCase().includes(normalizedSearch) ||
                citizen.phone.includes(normalizedSearch);

            const matchesRegion =
                !region || citizen.region === region;

            const matchesStatus =
                !status || citizen.status === status;

            const matchesGender =
                !gender || citizen.gender === gender;

            return (
                matchesSearch &&
                matchesRegion &&
                matchesStatus &&
                matchesGender
            );
        });
    }, [search, region, status, gender]);

    const selectedCitizen =
        filteredCitizens.find(
            (citizen) => citizen.id === selectedCitizenId,
        ) ?? null;

    const handleSelectCitizen = (citizen: Citizen) => {
        setSelectedCitizenId(citizen.id);
    };

    const handleResetFilters = () => {
        setSearch('');
        setRegion('');
        setStatus('');
        setGender('');
    };

    return (
        <div className="citizens-page">
            <div className="citizens-page-header">
                <div>
          <span className="page-breadcrumb">
            Рабочая область / Картотека
          </span>

                    <h1>Граждане</h1>

                    <p>
                        Управление и просмотр информации о гражданах
                    </p>
                </div>

                <button
                    className="primary-button"
                    type="button"
                >
                    + Добавить гражданина
                </button>
            </div>

            <section className="citizens-toolbar">
                <div className="citizens-search">
                    <span>⌕</span>

                    <input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Поиск по ФИО, ID или телефону"
                    />
                </div>

                <select
                    value={region}
                    onChange={(event) =>
                        setRegion(event.target.value)
                    }
                >
                    <option value="">Все регионы</option>
                    <option value="Москва">Москва</option>
                    <option value="Санкт-Петербург">
                        Санкт-Петербург
                    </option>
                    <option value="Республика Татарстан">
                        Республика Татарстан
                    </option>
                </select>

                <select
                    value={status}
                    onChange={(event) =>
                        setStatus(
                            event.target.value as CitizenStatus | '',
                        )
                    }
                >
                    <option value="">Все статусы</option>
                    <option value="active">Активен</option>
                    <option value="verification">Проверка</option>
                    <option value="blocked">Заблокирован</option>
                </select>

                <select
                    value={gender}
                    onChange={(event) =>
                        setGender(
                            event.target.value as Gender | '',
                        )
                    }
                >
                    <option value="">Любой пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>

                {(search || region || status || gender) && (
                    <button
                        className="reset-button"
                        type="button"
                        onClick={handleResetFilters}
                    >
                        Сбросить
                    </button>
                )}
            </section>

            <div className="citizens-summary">
                <div>
                    <strong>
                        {filteredCitizens.length.toLocaleString('ru-RU')}
                    </strong>

                    <span>найдено граждан</span>
                </div>

                <span className="citizens-summary-total">
          Всего в системе:{' '}
                    {citizens.length.toLocaleString('ru-RU')}
        </span>
            </div>

            <div className="citizens-workspace">
                <CitizenList
                    citizens={filteredCitizens}
                    selectedCitizenId={selectedCitizenId}
                    onSelect={handleSelectCitizen}
                />

                <CitizenProfile citizen={selectedCitizen} />
            </div>
        </div>
    );
}