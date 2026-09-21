import type {
    CitizenFormData,
    CitizenFormErrors, DocumentErrors, EducationErrors, FamilyMemberErrors,
} from '../types';

export function validateCitizenFormStep(
    step: number,
    formData: CitizenFormData,
): CitizenFormErrors {
    const errors: CitizenFormErrors = {};

    if (step === 1) {
        if (!formData.lastName.trim()) {
            errors.lastName = 'Введите фамилию';
        }

        if (!formData.firstName.trim()) {
            errors.firstName = 'Введите имя';
        }

        if (!formData.birthDate) {
            errors.birthDate = 'Укажите дату рождения';
        }

        if (!formData.gender) {
            errors.gender = 'Выберите пол';
        }

        if (!formData.citizenship) {
            errors.citizenship =
                'Выберите гражданство';
        }
    }

    if (step === 2) {
        if (!formData.phone.trim()) {
            errors.phone = 'Введите номер телефона';
        }

        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email,
            )
        ) {
            errors.email = 'Введите корректный email';
        }

        if (!formData.region) {
            errors.region = 'Выберите регион';
        }

        if (!formData.city.trim()) {
            errors.city = 'Введите город';
        }

        if (!formData.address.trim()) {
            errors.address = 'Введите адрес';
        }
    }

    if (step === 3) {
        if (
            formData.inn &&
            !/^\d{10,12}$/.test(formData.inn)
        ) {
            errors.inn = 'ИНН должен содержать 10 или 12 цифр';
        }

        if (
            formData.snils &&
            !/^\d{11}$/.test(
                formData.snils.replace(/\D/g, ''),
            )
        ) {
            errors.snils = 'Введите корректный СНИЛС';
        }

        const familyErrors: Record<
            string,
            FamilyMemberErrors
        > = {};

        formData.family.forEach((member) => {
            const memberErrors: FamilyMemberErrors = {};

            if (!member.fullName.trim()) {
                memberErrors.fullName = 'Введите ФИО';
            }

            if (!member.relationship.trim()) {
                memberErrors.relationship =
                    'Укажите степень родства';
            }

            if (!member.birthDate) {
                memberErrors.birthDate =
                    'Укажите дату рождения';
            }

            if (Object.keys(memberErrors).length > 0) {
                familyErrors[member.id] = memberErrors;
            }
        });

        if (Object.keys(familyErrors).length > 0) {
            errors.family = familyErrors;
        }

        const educationErrors: Record<
            string,
            EducationErrors
        > = {};

        formData.education.forEach((education) => {
            const itemErrors: EducationErrors = {};

            if (!education.institution.trim()) {
                itemErrors.institution =
                    'Введите учебное заведение';
            }

            if (!education.degree.trim()) {
                itemErrors.degree =
                    'Укажите степень / уровень';
            }

            if (!education.specialty.trim()) {
                itemErrors.specialty =
                    'Укажите специальность';
            }

            if (
                !education.graduationYear ||
                education.graduationYear < 1900 ||
                education.graduationYear > new Date().getFullYear()
            ) {
                itemErrors.graduationYear =
                    'Укажите корректный год окончания';
            }

            if (Object.keys(itemErrors).length > 0) {
                educationErrors[education.id] = itemErrors;
            }
        });

        if (Object.keys(educationErrors).length > 0) {
            errors.education = educationErrors;
        }

        const documentErrors: Record<string, DocumentErrors> = {};

        formData.documents.forEach((document) => {
            const itemErrors: DocumentErrors = {};

            if (!document.type) {
                itemErrors.type = 'Выберите тип документа';
            }

            if (!document.number.trim()) {
                itemErrors.number = 'Введите номер документа';
            }

            if (!document.issueDate) {
                itemErrors.issueDate = 'Укажите дату выдачи';
            }

            if (Object.keys(itemErrors).length > 0) {
                documentErrors[document.id] = itemErrors;
            }
        });

        if (Object.keys(documentErrors).length > 0) {
            errors.documents = documentErrors;
        }
    }

    return errors;
}