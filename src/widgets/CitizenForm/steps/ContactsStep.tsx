import type {CitizenFormData, CitizenFormErrors} from '../types';

type ContactsStepProps = {
    formData: CitizenFormData;
    errors: CitizenFormErrors;
    onChange: (
        field: keyof CitizenFormData,
        value: string,
    ) => void;
};

export function ContactsStep({formData, errors, onChange,}: ContactsStepProps) {
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
                        className={errors.phone ? 'form-field__input--error' : ''}
                        type="tel"
                        value={formData.phone}
                        onChange={(event) =>
                            onChange('phone', event.target.value)
                        }
                        placeholder="+7 (___) ___-__-__"
                    />

                    {errors.phone && (
                        <span className="form-field__error">
                            {errors.phone}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Email</span>

                    <input
                        className={errors.email ? 'form-field__input--error' : ''}
                        type="email"
                        value={formData.email}
                        onChange={(event) =>
                            onChange('email', event.target.value)
                        }
                        placeholder="example@mail.ru"
                    />

                    {errors.email && (
                        <span className="form-field__error">
                            {errors.email}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Регион</span>

                    <select
                        className={errors.region ? 'form-field__input--error' : ''}
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

                    {errors.region && (
                        <span className="form-field__error">
                            {errors.region}
                        </span>
                    )}
                </label>

                <label className="form-field">
                    <span>Город</span>

                    <input
                        className={errors.city ? 'form-field__input--error' : ''}
                        type="text"
                        value={formData.city}
                        onChange={(event) =>
                            onChange('city', event.target.value)
                        }
                        placeholder="Введите город"
                    />

                    {errors.city && (
                        <span className="form-field__error">
                            {errors.city}
                        </span>
                    )}
                </label>

                <label className="form-field form-field--full">
                    <span>Адрес</span>

                    <input
                        className={errors.address ? 'form-field__input--error' : ''}
                        type="text"
                        value={formData.address}
                        onChange={(event) =>
                            onChange('address', event.target.value)
                        }
                        placeholder="Улица, дом, квартира"
                    />

                    {errors.address && (
                        <span className="form-field__error">
                            {errors.address}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
}