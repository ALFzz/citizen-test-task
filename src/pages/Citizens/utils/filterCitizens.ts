import type {
    Citizen,
    CitizenStatus,
    Gender,
} from '../../../entities/citizen/types.ts';

type FilterCitizensParams = {
    citizens: Citizen[];
    search: string;
    region: string;
    status: CitizenStatus | '';
    gender: Gender | '';
};

export function filterCitizens({
                                   citizens,
                                   search,
                                   region,
                                   status,
                                   gender,
                               }: FilterCitizensParams) {
    const normalizedSearch = search.trim().toLowerCase();

    return citizens.filter((citizen) => {
        const fullName = [
            citizen.lastName,
            citizen.firstName,
            citizen.middleName,
        ]
            .join(' ')
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
}