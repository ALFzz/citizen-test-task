export type CitizenStatus = 'active' | 'verification' | 'blocked'

export type Gender = 'male' | 'female'

export interface FamilyMember {
    id: string;
    fullName: string;
    relationship: string;
    birthDate: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    graduationYear: number;
    specialty: string;
}

export interface Document {
    id: string;
    type: string;
    number: string;
    issueDate: string;
    status: string;
}

export interface Citizen {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate: string;
    citizenship: string;
    gender: Gender;
    phone: string;
    email: string;
    region: string;
    city: string;
    address: string;
    inn: string;
    snils: string;
    status: CitizenStatus;

    family: FamilyMember[];
    education: Education[];
    documents: Document[];
}

