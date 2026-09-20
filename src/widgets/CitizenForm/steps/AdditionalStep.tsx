import type {CitizenFormData, CitizenFormErrors} from '../types';

type AdditionalStepProps = {
    formData: CitizenFormData;
    errors: CitizenFormErrors;
    onChange: (
        field: keyof CitizenFormData,
        value: string,
    ) => void;
};

export function AdditionalStep({formData, errors, onChange,}: AdditionalStepProps) {
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
                        className={errors.inn ? 'form-field__input--error' : ''}
                        type="text"
                        value={formData.inn}
                        onChange={(event) =>
                            onChange('inn', event.target.value)
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
                        className={errors.snils ? 'form-field__input--error' : ''}
                        type="text"
                        value={formData.snils}
                        onChange={(event) =>
                            onChange('snils', event.target.value)
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
                        className={errors.maritalStatus ? 'form-field__input--error' : ''}
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

                <label className="form-field">
                    <span>Образование</span>

                    <select
                        className={errors.education ? 'form-field__input--error' : ''}
                        value={formData.education}
                        onChange={(event) =>
                            onChange(
                                'education',
                                event.target.value,
                            )
                        }
                    >
                        <option value="" disabled>
                            Выберите образование
                        </option>

                        <option value="secondary">
                            Среднее
                        </option>

                        <option value="secondary-special">
                            Среднее специальное
                        </option>

                        <option value="higher">
                            Высшее
                        </option>
                    </select>

                    {errors.education && (
                        <span className="form-field__error">
                            {errors.education}
                        </span>
                    )}
                </label>

                <label className="form-field form-field--full">
                    <span>Место работы</span>

                    <input
                        className={errors.workplace ? 'form-field__input--error' : ''}
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
        </div>
    );
}