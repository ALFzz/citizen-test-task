import type { Citizen } from '../../../entities/citizen/types';
import type { SortConfig } from '../types';

export function sortCitizens(
    citizens: Citizen[],
    sortConfig: SortConfig,
) {
    return [...citizens].sort((a, b) => {
        let first = '';
        let second = '';

        switch (sortConfig.key) {
            case 'fullName':
                first = `${a.lastName} ${a.firstName} ${a.middleName}`;
                second = `${b.lastName} ${b.firstName} ${b.middleName}`;
                break;

            case 'birthDate':
                first = a.birthDate;
                second = b.birthDate;
                break;

            case 'region':
                first = a.region;
                second = b.region;
                break;

            case 'status':
                first = a.status;
                second = b.status;
                break;

            case 'phone':
                first = a.phone;
                second = b.phone;
                break;
        }

        const result = first.localeCompare(second, 'ru');

        return sortConfig.direction === 'asc'
            ? result
            : -result;
    });
}