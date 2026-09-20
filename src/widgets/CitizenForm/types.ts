import type {
    Gender,
} from '../../entities/citizen/types';

export type CitizenFormData = {
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    gender: Gender | '';
    citizenship: string;

    phone: string;
    email: string;
    region: string;
    city: string;
    address: string;

    inn: string;
    snils: string;
    maritalStatus: string;
    education: string;
    workplace: string;
};

export const initialCitizenForm: CitizenFormData = {
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    citizenship: '',

    phone: '',
    email: '',
    region: '',
    city: '',
    address: '',

    inn: '',
    snils: '',
    maritalStatus: '',
    education: '',
    workplace: '',
};

export type CitizenFormErrors = Partial<
    Record<keyof CitizenFormData, string>
>;