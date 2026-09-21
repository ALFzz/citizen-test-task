import type {
    FamilyMember,
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

    family: FamilyMember[]
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
    family: []
};

export type FamilyMemberErrors = {
    fullName?: string;
    relationship?: string;
    birthDate?: string;
};

export type CitizenFormErrors = Partial<
    Record<Exclude<keyof CitizenFormData, 'family'>, string>
> & {
    family?: Record<string, FamilyMemberErrors>;
};