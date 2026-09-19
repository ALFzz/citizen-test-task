import { useState } from 'react';

import './CitizenForm.css';
import {PersonalStep} from "./steps/PersonalStep.tsx";
import {ContactsStep} from "./steps/ContactsStep.tsx";
import {AdditionalStep} from "./steps/AdditionalStep.tsx";

type CitizenFormProps = {
    onClose: () => void;
};

const steps = [
    'Основные сведения',
    'Контакты',
    'Дополнительно',
];

export function CitizenForm({
                                onClose,
                            }: CitizenFormProps) {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep((current) => Math.min(current + 1, 3));
    };

    const handleBack = () => {
        if (step === 1) {
            onClose();
            return;
        }

        setStep((current) => current - 1);
    };

    return (
        <div className="citizen-form-overlay">
            <div className="citizen-form">
                <header className="citizen-form__header">
                    <div>
            <span className="citizen-form__eyebrow">
              Добавление гражданина
            </span>

                        <h2>Новый гражданин</h2>
                    </div>

                    <button
                        className="citizen-form__close"
                        type="button"
                        onClick={onClose}
                        aria-label="Закрыть"
                    >
                        ×
                    </button>
                </header>

                <nav className="citizen-form__steps">
                    {steps.map((label, index) => {
                        const stepNumber = index + 1;

                        return (
                            <div
                                key={label}
                                className={`citizen-form__step ${
                                    stepNumber === step
                                        ? 'citizen-form__step--active'
                                        : ''
                                } ${
                                    stepNumber < step
                                        ? 'citizen-form__step--completed'
                                        : ''
                                }`}
                            >
                <span className="citizen-form__step-number">
                  {stepNumber}
                </span>
                                <span>{label}</span>
                            </div>
                        );
                    })}
                </nav>

                <main className="citizen-form__content">
                    {step === 1 && <PersonalStep />}

                    {step === 2 && <ContactsStep />}

                    {step === 3 && <AdditionalStep />}
                </main>

                <footer className="citizen-form__footer">
                    <button
                        className="secondary-button"
                        type="button"
                        onClick={handleBack}
                    >
                        {step === 1 ? 'Отмена' : 'Назад'}
                    </button>

                    {step < 3 ? (
                        <button
                            className="primary-button"
                            type="button"
                            onClick={handleNext}
                        >
                            Далее
                        </button>
                    ) : (
                        <button
                            className="primary-button"
                            type="button"
                            onClick={onClose}
                        >
                            Создать гражданина
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
}