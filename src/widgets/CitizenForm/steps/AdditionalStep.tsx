import type { CitizenFormData } from '../types';

type AdditionalStepProps = {
    formData: CitizenFormData;
    onChange: (
        field: keyof CitizenFormData,
        value: string,
    ) => void;
};

export function AdditionalStep({formData, onChange,}: AdditionalStepProps) {
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
                        type="text"
                        value={formData.inn}
                        onChange={(event) =>
                            onChange('inn', event.target.value)
                        }
                        placeholder="Введите ИНН"
                    />
                </label>

                <label className="form-field">
                    <span>СНИЛС</span>

                    <input
                        type="text"
                        value={formData.snils}
                        onChange={(event) =>
                            onChange('snils', event.target.value)
                        }
                        placeholder="Введите СНИЛС"
                    />
                </label>

                <label className="form-field">
                    <span>Семейное положение</span>

                    <select
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
                </label>

                <label className="form-field">
                    <span>Образование</span>

                    <select
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
                </label>

                <label className="form-field form-field--full">
                    <span>Место работы</span>

                    <input
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
                </label>
            </div>
        </div>
    );
}