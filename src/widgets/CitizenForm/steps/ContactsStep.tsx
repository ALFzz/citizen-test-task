export function ContactsStep() {
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
                        placeholder="+7 (___) ___-__-__"
                    />
                </label>

                <label className="form-field">
                    <span>Email</span>
                    <input
                        type="email"
                        placeholder="example@mail.ru"
                    />
                </label>

                <label className="form-field">
                    <span>Регион</span>

                    <select defaultValue="">
                        <option value="" disabled>
                            Выберите регион
                        </option>
                        <option value="Москва">Москва</option>
                        <option value="Санкт-Петербург">
                            Санкт-Петербург
                        </option>
                        <option value="Татарстан">
                            Республика Татарстан
                        </option>
                    </select>
                </label>

                <label className="form-field">
                    <span>Город</span>
                    <input
                        type="text"
                        placeholder="Введите город"
                    />
                </label>

                <label className="form-field form-field--full">
                    <span>Адрес</span>
                    <input
                        type="text"
                        placeholder="Улица, дом, квартира"
                    />
                </label>
            </div>
        </div>
    );
}