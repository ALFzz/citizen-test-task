import './Header.css';

export function Header() {
    return (
        <header className="header">
            <div>
                <span className="header-label">Рабочая область</span>
            </div>

            <div className="header-user">
                <button className="header-icon-button" type="button">
                    ♢
                </button>

                <div className="header-avatar">ФЛ</div>

                <div className="header-user-info">
                    <strong>Фёдор Лаврентьев</strong>
                    <span>Администратор</span>
                </div>
            </div>
        </header>
    );
}