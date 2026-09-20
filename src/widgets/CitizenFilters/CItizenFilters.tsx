import type {
    CitizenStatus,
    Gender,
} from '../../entities/citizen/types';

type CitizenFiltersProps = {
    search: string;
    region: string;
    status: CitizenStatus | '';
    gender: Gender | '';

    onSearchChange: (value: string) => void;
    onRegionChange: (value: string) => void;
    onStatusChange: (value: CitizenStatus | '') => void;
    onGenderChange: (value: Gender | '') => void;
    onReset: () => void;
};

export function CitizenFilters({
                                   search,
                                   region,
                                   status,
                                   gender,
                                   onSearchChange,
                                   onRegionChange,
                                   onStatusChange,
                                   onGenderChange,
                                   onReset,
                               }: CitizenFiltersProps) {
    const hasFilters = search || region || status || gender;

    return (
        <section className="citizens-toolbar">
            <div className="citizens-search">
                <span>⌕</span>

                <input
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Поиск по ФИО, ID или телефону"
                />
            </div>

            <select
                value={region}
                onChange={(event) =>
                    onRegionChange(event.target.value)
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
                    onStatusChange(
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
                    onGenderChange(
                        event.target.value as Gender | '',
                    )
                }
            >
                <option value="">Любой пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
            </select>

            {hasFilters && (
                <button
                    className="reset-button"
                    type="button"
                    onClick={onReset}
                >
                    Сбросить
                </button>
            )}
        </section>
    );
}