export function PersonalStep() {
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
                        placeholder="Введите фамилию"
                    />
                </label>

                <label className="form-field">
                    <span>Имя</span>
                    <input
                        type="text"
                        placeholder="Введите имя"
                    />
                </label>

                <label className="form-field">
                    <span>Отчество</span>
                    <input
                        type="text"
                        placeholder="Введите отчество"
                    />
                </label>

                <label className="form-field">
                    <span>Дата рождения</span>
                    <input type="date" />
                </label>

                <label className="form-field">
                    <span>Пол</span>

                    <select defaultValue="">
                        <option value="" disabled>
                            Выберите пол
                        </option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                </label>

                <label className="form-field">
                    <span>Гражданство</span>

                    <select defaultValue="">
                        <option value="" disabled>
                            Выберите гражданство
                        </option>
                        <option value="russia">
                            Российская Федерация
                        </option>
                        <option value="other">
                            Другое
                        </option>
                    </select>
                </label>
            </div>
        </div>
    );
}