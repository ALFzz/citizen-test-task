import type {
    Education,
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
    workplace: string;

    family: FamilyMember[],
    education: Education[]
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
    workplace: '',
    family: [],
    education: []
};

export type FamilyMemberErrors = {
    fullName?: string;
    relationship?: string;
    birthDate?: string;
};

export type EducationErrors = {
    institution?: string;
    degree?: string;
    specialty?: string;
    graduationYear?: string;
};

export type CitizenFormErrors = Partial<
    Record<
        Exclude<
            keyof CitizenFormData,
            'family' | 'education'
        >,
        string
    >
> & {
    family?: Record<string, FamilyMemberErrors>;
    education?: Record<string, EducationErrors>;
};