import './DeleteCitizenModal.css';

type DeleteCitizenModalProps = {
    citizenName: string;
    onClose: () => void;
    onConfirm: () => void;
};

export function DeleteCitizenModal({
                                       citizenName,
                                       onClose,
                                       onConfirm,
                                   }: DeleteCitizenModalProps) {
    return (
        <div className="delete-modal__overlay">
            <div className="delete-modal">
                <div className="delete-modal__header">
                    <h2>Удалить гражданина?</h2>

                    <button
                        type="button"
                        className="delete-modal__close"
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </div>

                <p className="delete-modal__description">
                    Вы действительно хотите удалить гражданина{' '}
                    <strong>{citizenName}</strong>?
                    <br />
                    Это действие нельзя отменить.
                </p>

                <div className="delete-modal__actions">
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={onClose}
                    >
                        Отмена
                    </button>

                    <button
                        type="button"
                        className="danger-button"
                        onClick={onConfirm}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
}