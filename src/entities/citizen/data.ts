import type {Citizen} from "./types.ts";

export const citizens: Citizen[] = [
    {
        id: 'C-000001',
        firstName: 'Иван',
        lastName: 'Петров',
        middleName: 'Иванович',
        birthDate: '',
        gender: 'male',
        citizenship: 'Российская Федерация',
        phone: '+7 (910) 423-55-55',
        email: 'iv.petrov@example.com',
        region: 'Москва',
        city: 'Москва',
        address: 'Арбатская улица, 33, кв. 22',
        inn: '771234467830',
        snils: '422-554-999 00',
        status: 'active',

        family: [
            {
                id: 'D-002',
                fullName: 'Петрова Мария Андреевна',
                relationship: 'Супруга',
                birthDate: '1988-04-12',
            },
            {
                id: 'H-003',
                fullName: 'Петров Алексей Иванович',
                relationship: 'Сын',
                birthDate: '2015-03-22',
            },
        ],
        education: [
            {
                id: 'E-001',
                institution: 'Московский государственный университет',
                degree: 'Высшее',
                graduationYear: 2010,
                specialty: 'Экономика',
            },
        ],
        documents: [
            {
                id: 'D-001',
                type: 'Паспорт',
                number: '4512 123456',
                issueDate: '2019-05-12',
                status: 'Действует',
            },
        ],
    },

    {
        id: 'C-000002',
        firstName: 'Анна',
        lastName: 'Смирнова',
        middleName: 'Сергеевна',
        birthDate: '1992-07-18',
        gender: 'female',
        citizenship: 'Российская Федерация',
        phone: '+7 (921) 555-12-34',
        email: 'anna.smirnova@example.com',
        region: 'Санкт-Петербург',
        city: 'Санкт-Петербург',
        address: 'Невский проспект, 45, кв. 18',
        inn: '781234567890',
        snils: '123-456-789 01',
        status: 'active',

        family: [
            {
                id: 'H-004',
                fullName: 'Смирнов Дмитрий Алексеевич',
                relationship: 'Супруг',
                birthDate: '1990-11-03',
            },
        ],
        education: [
            {
                id: 'E-002',
                institution: 'Санкт-Петербургский государственный университет',
                degree: 'Высшее',
                graduationYear: 2014,
                specialty: 'Юриспруденция',
            },
        ],
        documents: [
            {
                id: 'D-003',
                type: 'Паспорт',
                number: '4011 654321',
                issueDate: '2022-08-20',
                status: 'Действует',
            },
        ],
    },

    {
        id: 'C-000003',
        firstName: 'Александр',
        lastName: 'Соколов',
        middleName: 'Дмитриевич',
        birthDate: '1985-02-09',
        gender: 'male',
        citizenship: 'Российская Федерация',
        phone: '+7 (903) 777-45-67',
        email: 'alex.sokolov@example.com',
        region: 'Московская область',
        city: 'Химки',
        address: 'Ленинградская улица, 12, кв. 45',
        inn: '504712345678',
        snils: '234-567-890 12',
        status: 'verification',

        family: [
            {
                id: 'D-004',
                fullName: 'Соколова Елена Викторовна',
                relationship: 'Супруга',
                birthDate: '1987-06-25',
            },
            {
                id: 'H-005',
                fullName: 'Соколов Максим Александрович',
                relationship: 'Сын',
                birthDate: '2012-09-14',
            },
        ],
        education: [
            {
                id: 'E-003',
                institution: 'Национальный исследовательский университет',
                degree: 'Высшее',
                graduationYear: 2008,
                specialty: 'Информационные технологии',
            },
        ],
        documents: [
            {
                id: 'D-005',
                type: 'Паспорт',
                number: '4610 987654',
                issueDate: '2020-03-15',
                status: 'Действует',
            },
        ],
    },
];