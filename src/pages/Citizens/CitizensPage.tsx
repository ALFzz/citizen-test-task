import { useMemo, useState } from 'react';
import { citizens as initialCitizens  } from '../../entities/citizen/data';
import type {
    Citizen,
    CitizenStatus,
    Gender,
} from '../../entities/citizen/types';
import {filterCitizens} from "./utils/filterCitizens.ts";
import { CitizenList } from '../../widgets/CitizenList/CitizenList';
import { CitizenProfile } from '../../widgets/CitizenProfile/CitizenProfile';
import {CitizenFilters} from "../../widgets/CitizenFilters/CItizenFilters.tsx";
import {PageHeader} from "../../widgets/PageHeader/PageHeader.tsx";
import './CitizensPage.css';
import {CitizenForm} from "../../widgets/CitizenForm/CitizenForm.tsx";
import type {CitizenFormData} from "../../widgets/CitizenForm/types.ts";


export function CitizensPage() {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('');
    const [status, setStatus] = useState<CitizenStatus | ''>('');
    const [gender, setGender] = useState<Gender | ''>('');
    const [notification, setNotification] = useState('');

    const [citizens, setCitizens] = useState(initialCitizens);
    const [selectedCitizenId, setSelectedCitizenId] =
        useState<string | null>(citizens[0]?.id ?? null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleCreateCitizen = (formData: CitizenFormData) => {
        const newCitizen: Citizen = {
            id: `CIT-${Date.now()}`,

            firstName: formData.firstName,
            lastName: formData.lastName,
            middleName: formData.middleName,

            birthDate: formData.birthDate,
            citizenship: formData.citizenship,
            gender: formData.gender as Gender,

            phone: formData.phone,
            email: formData.email,

            region: formData.region,
            city: formData.city,
            address: formData.address,

            inn: formData.inn,
            snils: formData.snils,

            status: 'verification',

            family: [],
            education: [],
            documents: [],
        };

        setCitizens((current) => [newCitizen, ...current]);
        setSelectedCitizenId(newCitizen.id);
        setIsFormOpen(false);
        setNotification('Гражданин успешно добавлен');
    };

    const filteredCitizens = useMemo(() => {
        return filterCitizens({
            citizens,
            search,
            region,
            status,
            gender,
        });
    }, [citizens, search, region, status, gender]);

    const selectedCitizen =
        filteredCitizens.find(
            (citizen) => citizen.id === selectedCitizenId,
        ) ??
        filteredCitizens[0] ??
        null;

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
            <PageHeader
                breadcrumb="Рабочая область / Картотека"
                title="Граждане"
                description="Управление и просмотр информации о гражданах"
                actionLabel="Добавить гражданина"
                onAction={() => setIsFormOpen(true)}
            />

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}

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

            {isFormOpen && (
                <CitizenForm
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleCreateCitizen}
                />
            )}
        </div>
    );
}