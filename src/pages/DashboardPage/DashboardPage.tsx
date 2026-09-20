import { useMemo } from 'react';

import { citizens } from '../../entities/citizen/data';

import './DashboardPage.css';
import {PageHeader} from "../../widgets/PageHeader/PageHeader.tsx";
import {CitizensByRegion} from "../../widgets/CitizensByRegion/CitizensByRegion.tsx";
import {CitizensByStatus} from "../../widgets/CitizensByStatus/CitizensByStatus.tsx";
import {CitizensByAge} from "../../widgets/CitizensByAge/CitizensByAge.tsx";

export function DashboardPage() {
    const statistics = useMemo(() => {
        const active = citizens.filter(
            (citizen) => citizen.status === 'active',
        ).length;

        const verification = citizens.filter(
            (citizen) => citizen.status === 'verification',
        ).length;

        const blocked = citizens.filter(
            (citizen) => citizen.status === 'blocked',
        ).length;

        return {
            total: citizens.length,
            active,
            verification,
            blocked,
        };
    }, []);

    return (
        <div className="dashboard-page">
            <PageHeader
                breadcrumb="Рабочая область / Обзор"
                title="Панель управления"
                description="Основные показатели картотеки граждан"
            />

            <div className="dashboard-stats">
                <div className="dashboard-stat">
                    <span className="dashboard-stat__label">
                        Всего граждан
                    </span>

                    <strong className="dashboard-stat__value">
                        {statistics.total}
                    </strong>
                </div>

                <div className="dashboard-stat">
                    <span className="dashboard-stat__label">
                        Активные
                    </span>

                    <strong className="dashboard-stat__value">
                        {statistics.active}
                    </strong>
                </div>

                <div className="dashboard-stat">
                    <span className="dashboard-stat__label">
                        На проверке
                    </span>

                    <strong className="dashboard-stat__value">
                        {statistics.verification}
                    </strong>
                </div>

                <div className="dashboard-stat">
                    <span className="dashboard-stat__label">
                        Заблокированные
                    </span>

                    <strong className="dashboard-stat__value">
                        {statistics.blocked}
                    </strong>
                </div>
            </div>

            <div className="dashboard-charts">
                <CitizensByRegion citizens={citizens}/>
                <CitizensByStatus citizens={citizens}/>
                <CitizensByAge citizens={citizens}/>
            </div>
        </div>
    );
}