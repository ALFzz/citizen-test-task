import { useState } from 'react';

import './CitizenForm.css';
import {PersonalStep} from "./steps/PersonalStep.tsx";
import {ContactsStep} from "./steps/ContactsStep.tsx";
import {AdditionalStep} from "./steps/AdditionalStep.tsx";
import {type CitizenFormData, type CitizenFormErrors, initialCitizenForm} from "./types.ts";
import {validateCitizenFormStep} from "./utils/validateCitizenForm.ts";

type CitizenFormProps = {
    onClose: () => void;
    onSubmit: (formData: CitizenFormData) => void;
};

const steps = [
    'Основные сведения',
    'Контакты',
    'Дополнительно',
];

export function CitizenForm({onClose, onSubmit}: CitizenFormProps) {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<CitizenFormData>(initialCitizenForm);
    const [errors, setErrors] = useState<CitizenFormErrors>({});

    const handleChange = (
        field: keyof CitizenFormData,
        value: string,
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleNext = () => {
        const validationErrors =
            validateCitizenFormStep(step, formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setStep((current) => Math.min(current + 1, 3));
    };

    const handleBack = () => {
        if (step === 1) {
            onClose();
            return;
        }

        setStep((current) => current - 1);
    };

    const handleSubmit = () => {
        const validationErrors =
            validateCitizenFormStep(step, formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
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
                    {step === 1 && (
                        <PersonalStep
                            formData={formData}
                            errors={errors}
                            onChange={handleChange}
                        />
                    )}

                    {step === 2 && (
                        <ContactsStep
                            formData={formData}
                            errors={errors}
                            onChange={handleChange}
                        />
                    )}

                    {step === 3 && (
                        <AdditionalStep
                            formData={formData}
                            errors={errors}
                            onChange={handleChange}
                        />
                    )}
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
                            onClick={handleSubmit}
                        >
                            Создать гражданина
                        </button>
                    )}
                </footer>
            </div>
        </div>
    );
}