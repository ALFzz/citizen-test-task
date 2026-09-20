import type {CitizenFormData, CitizenFormErrors} from '../types';

type PersonalStepProps = {
    formData: CitizenFormData;
    errors: CitizenFormErrors;
    onChange: (
        field: keyof CitizenFormData,
        value: string,
    ) => void;
};

export function PersonalStep({formData, errors, onChange,}: PersonalStepProps) {
    return (
        <div className="citizen-form-step">
            <h3>Основные сведения</h3>

            <p>
                Укажите персональные данные гражданина
            </p>

            <div className="form-grid">
                <label className="form-field">
                    <span>Фамилия</span>

                    <input
                        className={errors.lastName ? 'form-field__input--error' : ''}
                        type="text"
                        value={formData.lastName}
                        onChange={(event) =>
                            onChange('lastName', event.target.value)
                        }
                        placeholder="Введите фамилию"
                    />

                    {errors.lastName && (
                        <span className="form-field__error">
                            {errors.lastName}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Имя</span>

                    <input
                        className={errors.firstName ? 'form-field__input--error' : ''}
                        type="text"
                        value={formData.firstName}
                        onChange={(event) =>
                            onChange('firstName', event.target.value)
                        }
                        placeholder="Введите имя"
                    />

                    {errors.firstName && (
                        <span className="form-field__error">
                            {errors.firstName}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Отчество</span>

                    <input
                        className={errors.lastName ? 'form-field__input--error' : ''}
                        type="text"
                        value={formData.middleName}
                        onChange={(event) =>
                            onChange('middleName', event.target.value)
                        }
                        placeholder="Введите отчество"
                    />

                    {errors.middleName && (
                        <span className="form-field__error">
                            {errors.middleName}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Дата рождения</span>

                    <input
                        className={errors.birthDate ? 'form-field__input--error' : ''}
                        type="date"
                        value={formData.birthDate}
                        onChange={(event) =>
                            onChange('birthDate', event.target.value)
                        }
                    />

                    {errors.birthDate && (
                        <span className="form-field__error">
                            {errors.birthDate}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Пол</span>

                    <select
                        className={errors.gender ? 'form-field__input--error' : ''}
                        value={formData.gender}
                        onChange={(event) =>
                            onChange('gender', event.target.value)
                        }
                    >
                        <option value="" disabled>
                            Выберите пол
                        </option>

                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>

                    {errors.gender && (
                        <span className="form-field__error">
                            {errors.gender}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Гражданство</span>

                    <select
                        className={errors.citizenship ? 'form-field__input--error' : ''}
                        value={formData.citizenship}
                        onChange={(event) =>
                            onChange('citizenship', event.target.value)
                        }
                    >
                        <option value="" disabled>
                            Выберите гражданство
                        </option>

                        <option value="Российская Федерация">
                            Российская Федерация
                        </option>

                        <option value="Другое">
                            Другое
                        </option>
                    </select>
                </label>

                {errors.citizenship && (
                    <span className="form-field__error">
                            {errors.citizenship}
                        </span>
                )}
            </div>
        </div>
    );
}