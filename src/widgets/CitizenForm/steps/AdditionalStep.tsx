export function AdditionalStep() {
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
                        placeholder="Введите ИНН"
                    />
                </label>

                <label className="form-field">
                    <span>СНИЛС</span>
                    <input
                        type="text"
                        placeholder="Введите СНИЛС"
                    />
                </label>

                <label className="form-field">
                    <span>Семейное положение</span>

                    <select defaultValue="">
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

                    <select defaultValue="">
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
                        placeholder="Название организации"
                    />
                </label>
            </div>
        </div>
    );
}