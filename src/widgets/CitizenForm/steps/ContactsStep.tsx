import type { CitizenFormData } from '../types';

type ContactsStepProps = {
    formData: CitizenFormData;
    onChange: (
        field: keyof CitizenFormData,
        value: string,
    ) => void;
};

export function ContactsStep({formData, onChange,}: ContactsStepProps) {
    return (
        <div className="citizen-form-step">
            <h3>Контактная информация</h3>

            <p>
                Укажите контактные данные и адрес гражданина
            </p>

            <div className="form-grid">
                <label className="form-field">
                    <span>Телефон</span>

                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(event) =>
                            onChange('phone', event.target.value)
                        }
                        placeholder="+7 (___) ___-__-__"
                    />
                </label>

                <label className="form-field">
                    <span>Email</span>

                    <input
                        type="email"
                        value={formData.email}
                        onChange={(event) =>
                            onChange('email', event.target.value)
                        }
                        placeholder="example@mail.ru"
                    />
                </label>

                <label className="form-field">
                    <span>Регион</span>

                    <select
                        value={formData.region}
                        onChange={(event) =>
                            onChange('region', event.target.value)
                        }
                    >
                        <option value="" disabled>
                            Выберите регион
                        </option>

                        <option value="Москва">Москва</option>

                        <option value="Санкт-Петербург">
                            Санкт-Петербург
                        </option>

                        <option value="Республика Татарстан">
                            Республика Татарстан
                        </option>
                    </select>
                </label>

                <label className="form-field">
                    <span>Город</span>

                    <input
                        type="text"
                        value={formData.city}
                        onChange={(event) =>
                            onChange('city', event.target.value)
                        }
                        placeholder="Введите город"
                    />
                </label>

                <label className="form-field form-field--full">
                    <span>Адрес</span>

                    <input
                        type="text"
                        value={formData.address}
                        onChange={(event) =>
                            onChange('address', event.target.value)
                        }
                        placeholder="Улица, дом, квартира"
                    />
                </label>
            </div>
        </div>
    );
}