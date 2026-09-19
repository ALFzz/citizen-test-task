import { useMemo, useState } from 'react';

import { citizens } from '../../entities/citizen/data';
import type {
    Citizen,
    CitizenStatus,
    Gender,
} from '../../entities/citizen/types';
import {filterCitizens} from "./utils/filterCitizens.ts";
import { CitizenList } from '../../widgets/CitizenList/CitizenList';
import { CitizenProfile } from '../../widgets/CitizenProfile/CitizenProfile';

import './CitizensPage.css';
import {CitizenFilters} from "../../widgets/CitizenFilters/CItizenFilters.tsx";

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
        return filterCitizens({
            citizens,
            search,
            region,
            status,
            gender,
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

            <CitizenFilters
                search={search}
                region={region}
                status={status}
                gender={gender}
                onSearchChange={setSearch}
                onRegionChange={setRegion}
                onStatusChange={setStatus}
                onGenderChange={setGender}
                onReset={handleResetFilters}
            />

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