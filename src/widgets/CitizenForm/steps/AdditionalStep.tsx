import type {
    CitizenFormData,
    CitizenFormErrors,
} from '../types';

import type {
    Education,
    FamilyMember,
} from '../../../entities/citizen/types.ts';

type AdditionalStepProps = {
    formData: CitizenFormData;
    errors: CitizenFormErrors;
    onChange: (
        field: keyof CitizenFormData,
        value: string,
    ) => void;
    onFamilyChange: (family: FamilyMember[]) => void;
    onEducationChange: (education: Education[]) => void;
};

export function AdditionalStep({
                                   formData,
                                   errors,
                                   onChange,
                                   onFamilyChange,
                                   onEducationChange,
                               }: AdditionalStepProps) {
    return (
        <div className="citizen-form-step">
            <h3>Дополнительные сведения</h3>

            <p>
                Укажите документы, образование и сведения о работе
            </p>

            <div className="form-grid">
                <label className="form-field">
                    <span>ИНН</span>

                    <input
                        className={
                            errors.inn
                                ? 'form-field__input--error'
                                : ''
                        }
                        type="text"
                        value={formData.inn}
                        onChange={(event) =>
                            onChange(
                                'inn',
                                event.target.value,
                            )
                        }
                        placeholder="Введите ИНН"
                    />

                    {errors.inn && (
                        <span className="form-field__error">
                            {errors.inn}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>СНИЛС</span>

                    <input
                        className={
                            errors.snils
                                ? 'form-field__input--error'
                                : ''
                        }
                        type="text"
                        value={formData.snils}
                        onChange={(event) =>
                            onChange(
                                'snils',
                                event.target.value,
                            )
                        }
                        placeholder="Введите СНИЛС"
                    />

                    {errors.snils && (
                        <span className="form-field__error">
                            {errors.snils}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Семейное положение</span>

                    <select
                        className={
                            errors.maritalStatus
                                ? 'form-field__input--error'
                                : ''
                        }
                        value={formData.maritalStatus}
                        onChange={(event) =>
                            onChange(
                                'maritalStatus',
                                event.target.value,
                            )
                        }
                    >
                        <option value="" disabled>
                            Выберите статус
                        </option>

                        <option value="single">
                            Не состоит в браке
                        </option>

                        <option value="married">
                            Состоит в браке
                        </option>

                        <option value="divorced">
                            Разведён(а)
                        </option>

                        <option value="widowed">
                            Вдовец / вдова
                        </option>
                    </select>

                    {errors.maritalStatus && (
                        <span className="form-field__error">
                            {errors.maritalStatus}
                        </span>
                    )}
                </label>

                <label className="form-field form-field--full">
                    <span>Место работы</span>

                    <input
                        className={
                            errors.workplace
                                ? 'form-field__input--error'
                                : ''
                        }
                        type="text"
                        value={formData.workplace}
                        onChange={(event) =>
                            onChange(
                                'workplace',
                                event.target.value,
                            )
                        }
                        placeholder="Название организации"
                    />

                    {errors.workplace && (
                        <span className="form-field__error">
                            {errors.workplace}
                        </span>
                    )}
                </label>
            </div>

            {/* Семья */}

            <div className="family-section">
                <div className="family-section__header">
                    <div>
                        <h4>Члены семьи</h4>
                        <p>
                            Добавьте родственников гражданина
                        </p>
                    </div>

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => {
                            const newMember: FamilyMember = {
                                id: `FAM-${Date.now()}`,
                                fullName: '',
                                relationship: '',
                                birthDate: '',
                            };

                            onFamilyChange([
                                ...formData.family,
                                newMember,
                            ]);
                        }}
                    >
                        + Добавить
                    </button>
                </div>

                {formData.family.length === 0 ? (
                    <div className="family-section__empty">
                        Члены семьи не добавлены
                    </div>
                ) : (
                    <div className="family-list">
                        {formData.family.map((member) => {
                            const memberErrors =
                                errors.family?.[member.id];

                            return (
                                <div
                                    className="family-item"
                                    key={member.id}
                                >
                                    <div
                                        className={`form-field ${
                                            memberErrors?.fullName
                                                ? 'form-field--error'
                                                : ''
                                        }`}
                                    >
                                        <input
                                            type="text"
                                            value={member.fullName}
                                            className={
                                                memberErrors?.fullName
                                                    ? 'form-field__input--error'
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                onFamilyChange(
                                                    formData.family.map(
                                                        (item) =>
                                                            item.id ===
                                                            member.id
                                                                ? {
                                                                    ...item,
                                                                    fullName:
                                                                    event
                                                                        .target
                                                                        .value,
                                                                }
                                                                : item,
                                                    ),
                                                );
                                            }}
                                            placeholder="ФИО"
                                        />

                                        {memberErrors?.fullName && (
                                            <span className="form-field__error">
                                                {
                                                    memberErrors.fullName
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`form-field ${
                                            memberErrors?.relationship
                                                ? 'form-field--error'
                                                : ''
                                        }`}
                                    >
                                        <input
                                            type="text"
                                            value={
                                                member.relationship
                                            }
                                            className={
                                                memberErrors?.relationship
                                                    ? 'form-field__input--error'
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                onFamilyChange(
                                                    formData.family.map(
                                                        (item) =>
                                                            item.id ===
                                                            member.id
                                                                ? {
                                                                    ...item,
                                                                    relationship:
                                                                    event
                                                                        .target
                                                                        .value,
                                                                }
                                                                : item,
                                                    ),
                                                );
                                            }}
                                            placeholder="Степень родства"
                                        />

                                        {memberErrors?.relationship && (
                                            <span className="form-field__error">
                                                {
                                                    memberErrors
                                                        .relationship
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`form-field ${
                                            memberErrors?.birthDate
                                                ? 'form-field--error'
                                                : ''
                                        }`}
                                    >
                                        <input
                                            type="date"
                                            value={
                                                member.birthDate
                                            }
                                            className={
                                                memberErrors?.birthDate
                                                    ? 'form-field__input--error'
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                onFamilyChange(
                                                    formData.family.map(
                                                        (item) =>
                                                            item.id ===
                                                            member.id
                                                                ? {
                                                                    ...item,
                                                                    birthDate:
                                                                    event
                                                                        .target
                                                                        .value,
                                                                }
                                                                : item,
                                                    ),
                                                );
                                            }}
                                        />

                                        {memberErrors?.birthDate && (
                                            <span className="form-field__error">
                                                {
                                                    memberErrors.birthDate
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="danger-button"
                                        onClick={() => {
                                            onFamilyChange(
                                                formData.family.filter(
                                                    (item) =>
                                                        item.id !==
                                                        member.id,
                                                ),
                                            );
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Образование */}

            <div className="family-section education-section">
                <div className="family-section__header">
                    <div>
                        <h4>Образование</h4>
                        <p>
                            Добавьте сведения об образовании
                        </p>
                    </div>

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => {
                            const newEducation: Education = {
                                id: `EDU-${Date.now()}`,
                                institution: '',
                                degree: '',
                                graduationYear:
                                    new Date().getFullYear(),
                                specialty: '',
                            };

                            onEducationChange([
                                ...formData.education,
                                newEducation,
                            ]);
                        }}
                    >
                        + Добавить
                    </button>
                </div>

                {formData.education.length === 0 ? (
                    <div className="family-section__empty">
                        Сведения об образовании не добавлены
                    </div>
                ) : (
                    <div className="family-list">
                        {formData.education.map((education) => {
                            const educationErrors =
                                errors.education?.[education.id];

                            return (
                                <div
                                    className="family-item"
                                    key={education.id}
                                >
                                    <div
                                        className={`form-field ${
                                            educationErrors?.institution
                                                ? 'form-field--error'
                                                : ''
                                        }`}
                                    >
                                        <input
                                            type="text"
                                            value={
                                                education.institution
                                            }
                                            className={
                                                educationErrors?.institution
                                                    ? 'form-field__input--error'
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                onEducationChange(
                                                    formData.education.map(
                                                        (item) =>
                                                            item.id ===
                                                            education.id
                                                                ? {
                                                                    ...item,
                                                                    institution:
                                                                    event
                                                                        .target
                                                                        .value,
                                                                }
                                                                : item,
                                                    ),
                                                );
                                            }}
                                            placeholder="Учебное заведение"
                                        />

                                        {educationErrors?.institution && (
                                            <span className="form-field__error">
                                                {
                                                    educationErrors
                                                        .institution
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`form-field ${
                                            educationErrors?.degree
                                                ? 'form-field--error'
                                                : ''
                                        }`}
                                    >
                                        <input
                                            type="text"
                                            value={education.degree}
                                            className={
                                                educationErrors?.degree
                                                    ? 'form-field__input--error'
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                onEducationChange(
                                                    formData.education.map(
                                                        (item) =>
                                                            item.id ===
                                                            education.id
                                                                ? {
                                                                    ...item,
                                                                    degree:
                                                                    event
                                                                        .target
                                                                        .value,
                                                                }
                                                                : item,
                                                    ),
                                                );
                                            }}
                                            placeholder="Степень / уровень"
                                        />

                                        {educationErrors?.degree && (
                                            <span className="form-field__error">
                                                {
                                                    educationErrors
                                                        .degree
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`form-field ${
                                            educationErrors?.specialty
                                                ? 'form-field--error'
                                                : ''
                                        }`}
                                    >
                                        <input
                                            type="text"
                                            value={
                                                education.specialty
                                            }
                                            className={
                                                educationErrors?.specialty
                                                    ? 'form-field__input--error'
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                onEducationChange(
                                                    formData.education.map(
                                                        (item) =>
                                                            item.id ===
                                                            education.id
                                                                ? {
                                                                    ...item,
                                                                    specialty:
                                                                    event
                                                                        .target
                                                                        .value,
                                                                }
                                                                : item,
                                                    ),
                                                );
                                            }}
                                            placeholder="Специальность"
                                        />

                                        {educationErrors?.specialty && (
                                            <span className="form-field__error">
                                                {
                                                    educationErrors
                                                        .specialty
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <div
                                        className={`form-field ${
                                            educationErrors?.graduationYear
                                                ? 'form-field--error'
                                                : ''
                                        }`}
                                    >
                                        <input
                                            type="number"
                                            value={
                                                education.graduationYear
                                            }
                                            className={
                                                educationErrors?.graduationYear
                                                    ? 'form-field__input--error'
                                                    : ''
                                            }
                                            onChange={(event) => {
                                                onEducationChange(
                                                    formData.education.map(
                                                        (item) =>
                                                            item.id ===
                                                            education.id
                                                                ? {
                                                                    ...item,
                                                                    graduationYear:
                                                                        Number(
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        ),
                                                                }
                                                                : item,
                                                    ),
                                                );
                                            }}
                                            placeholder="Год окончания"
                                        />

                                        {educationErrors?.graduationYear && (
                                            <span className="form-field__error">
                                                {
                                                    educationErrors
                                                        .graduationYear
                                                }
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="danger-button"
                                        onClick={() => {
                                            onEducationChange(
                                                formData.education.filter(
                                                    (item) =>
                                                        item.id !==
                                                        education.id,
                                                ),
                                            );
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}