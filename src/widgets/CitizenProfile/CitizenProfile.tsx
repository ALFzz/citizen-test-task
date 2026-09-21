import { useState } from 'react';

import type { Citizen } from '../../entities/citizen/types';

import './CitizenProfile.css';

type CitizenProfileProps = {
    citizen: Citizen;
    onEdit: () => void;
    onDelete: () => void;
};

type ProfileTab = 'general' | 'family' | 'education' | 'documents';

const tabs: Array<{ id: ProfileTab; label: string; }> = [
    {
        id: 'general',
        label: 'Основное',
    },
    {
        id: 'family',
        label: 'Семья',
    },
    {
        id: 'education',
        label: 'Образование',
    },
    {
        id: 'documents',
        label: 'Документы',
    },
];

export function CitizenProfile({citizen, onEdit, onDelete}: CitizenProfileProps) {
    const [activeTab, setActiveTab] = useState<ProfileTab>('general');

    if (!citizen) {
        return (
            <aside className="citizen-profile citizen-profile--empty">
                <div className="profile-empty-icon">○</div>

                <strong>Выберите гражданина</strong>

                <span>
          Выберите запись в списке, чтобы посмотреть
          подробную информацию
        </span>
            </aside>
        );
    }

    return (
        <aside className="citizen-profile">
            <div className="profile-header">
                <div className="profile-person">
                    <div className="profile-avatar">
                        {citizen.firstName[0]}
                        {citizen.lastName[0]}
                    </div>

                    <div>
                        <h2>
                            {citizen.firstName} {citizen.lastName}
                        </h2>

                        <span>
                            {citizen.id} · {getAge(citizen.birthDate)} лет
                        </span>
                    </div>
                </div>

                <button
                    className="profile-edit-button"
                    type="button"
                    onClick={onEdit}
                >
                    Редактировать
                </button>

                <button
                    className="danger-button"
                    type="button"
                    onClick={onDelete}
                >
                    Удалить
                </button>
            </div>

            <div className="profile-meta">
                <span>{citizen.city}</span>

                <span>•</span>

                <span>{citizen.citizenship}</span>

                <span
                    className={`status status--${citizen.status}`}
                >
          {getStatusLabel(citizen.status)}
        </span>
            </div>

            <div className="profile-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        className={
                            activeTab === tab.id
                                ? 'profile-tab profile-tab--active'
                                : 'profile-tab'
                        }
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="profile-content">
                {activeTab === 'general' && (
                    <GeneralTab citizen={citizen} />
                )}

                {activeTab === 'family' && (
                    <FamilyTab citizen={citizen} />
                )}

                {activeTab === 'education' && (
                    <EducationTab citizen={citizen} />
                )}

                {activeTab === 'documents' && (
                    <DocumentsTab citizen={citizen} />
                )}
            </div>
        </aside>
    );
}

function GeneralTab({ citizen }: { citizen: Citizen }) {
    return (
        <>
            <ProfileSection title="Основные сведения">
                <InfoGrid>
                    <InfoItem
                        label="Фамилия"
                        value={citizen.lastName}
                    />

                    <InfoItem
                        label="Имя"
                        value={citizen.firstName}
                    />

                    <InfoItem
                        label="Отчество"
                        value={citizen.middleName}
                    />

                    <InfoItem
                        label="Дата рождения"
                        value={formatDate(citizen.birthDate)}
                    />

                    <InfoItem
                        label="Пол"
                        value={
                            citizen.gender === 'male'
                                ? 'Мужской'
                                : 'Женский'
                        }
                    />

                    <InfoItem
                        label="Гражданство"
                        value={citizen.citizenship}
                    />
                </InfoGrid>
            </ProfileSection>

            <ProfileSection title="Контактная информация">
                <InfoGrid>
                    <InfoItem
                        label="Телефон"
                        value={citizen.phone}
                    />

                    <InfoItem
                        label="Email"
                        value={citizen.email}
                    />
                </InfoGrid>
            </ProfileSection>

            <ProfileSection title="Документы">
                <InfoGrid>
                    <InfoItem
                        label="ИНН"
                        value={citizen.inn}
                    />

                    <InfoItem
                        label="СНИЛС"
                        value={citizen.snils}
                    />
                </InfoGrid>
            </ProfileSection>

            <ProfileSection title="Адрес">
                <InfoGrid>
                    <InfoItem
                        label="Регион"
                        value={citizen.region}
                    />

                    <InfoItem
                        label="Город"
                        value={citizen.city}
                    />

                    <InfoItem
                        label="Адрес"
                        value={citizen.address}
                        fullWidth
                    />
                </InfoGrid>
            </ProfileSection>
        </>
    );
}

function FamilyTab({ citizen }: { citizen: Citizen }) {
    return (
        <ProfileSection
            title={`Члены семьи (${citizen.family.length})`}
        >
            {citizen.family.length > 0 ? (
                <div className="related-list">
                    {citizen.family.map((member) => (
                        <div
                            className="related-item"
                            key={member.id}
                        >
                            <div>
                                <strong>{member.fullName}</strong>

                                <span>{member.relationship}</span>
                            </div>

                            <span>
                {formatDate(member.birthDate)}
              </span>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState text="Данные о членах семьи отсутствуют" />
            )}
        </ProfileSection>
    );
}

function EducationTab({citizen,}: { citizen: Citizen; }) {
    return (
        <ProfileSection title="Образование">
            {citizen.education.length > 0 ? (
                <div className="related-list">
                    {citizen.education.map((item) => (
                        <div
                            className="related-item related-item--column"
                            key={item.id}
                        >
                            <strong>{item.institution}</strong>

                            <span>{item.degree}</span>

                            <span>{item.specialty}</span>

                            <span>
                Окончание: {item.graduationYear}
              </span>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState text="Данные об образовании отсутствуют" />
            )}
        </ProfileSection>
    );
}

function DocumentsTab({citizen,}: { citizen: Citizen; }) {
    return (
        <ProfileSection title="Документы">
            {citizen.documents.length > 0 ? (
                <div className="related-list">
                    {citizen.documents.map((document) => (
                        <div
                            className="related-item"
                            key={document.id}
                        >
                            <div>
                                <strong>{document.type}</strong>

                                <span>{document.number}</span>
                            </div>

                            <span>{document.status}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState text="Документы отсутствуют" />
            )}
        </ProfileSection>
    );
}

function ProfileSection({title, children,}: { title: string; children: React.ReactNode; }) {
    return (
        <section className="profile-section">
            <h3>{title}</h3>

            {children}
        </section>
    );
}

function InfoGrid({children,}: { children: React.ReactNode; }) {
    return <div className="info-grid">{children}</div>;
}

function InfoItem({label, value, fullWidth = false,}: { label: string; value: string; fullWidth?: boolean; }) {
    return (
        <div
            className={`info-item ${
                fullWidth ? 'info-item--full' : ''
            }`}
        >
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

function EmptyState({ text }: { text: string }) {
    return <div className="profile-empty-state">{text}</div>;
}

function getStatusLabel(status: Citizen['status']) {
    const labels = {
        active: 'Активен',
        verification: 'Проверка',
        blocked: 'Заблокирован',
    };

    return labels[status];
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat('ru-RU').format(
        new Date(`${value}T00:00:00`),
    );
}

function getAge(birthDate: string) {
    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff =
        today.getMonth() - birth.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 &&
            today.getDate() < birth.getDate())
    ) {
        age--;
    }

    return age;
}