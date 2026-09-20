import type { CitizenFormData } from '../types';

type PersonalStepProps = {
    formData: CitizenFormData;
    onChange: (
        field: keyof CitizenFormData,
        value: string,
    ) => void;
};

export function PersonalStep({
                                 formData,
                                 onChange,
                             }: PersonalStepProps) {
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
                        type="text"
                        value={formData.lastName}
                        onChange={(event) =>
                            onChange('lastName', event.target.value)
                        }
                        placeholder="Введите фамилию"
                    />
                </label>

                <label className="form-field">
                    <span>Имя</span>

                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(event) =>
                            onChange('firstName', event.target.value)
                        }
                        placeholder="Введите имя"
                    />
                </label>

                <label className="form-field">
                    <span>Отчество</span>

                    <input
                        type="text"
                        value={formData.middleName}
                        onChange={(event) =>
                            onChange('middleName', event.target.value)
                        }
                        placeholder="Введите отчество"
                    />
                </label>

                <label className="form-field">
                    <span>Дата рождения</span>

                    <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(event) =>
                            onChange('birthDate', event.target.value)
                        }
                    />
                </label>

                <label className="form-field">
                    <span>Пол</span>

                    <select
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
                </label>

                <label className="form-field">
                    <span>Гражданство</span>

                    <select
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
            </div>
        </div>
    );
}