import { useMemo } from 'react';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';

import type { Citizen } from '../../entities/citizen/types';

import './CitizensByStatus.css';

type CitizensByStatusProps = {
    citizens: Citizen[];
};

const statusLabels = {
    active: 'Активные',
    verification: 'На проверке',
    blocked: 'Заблокированные',
} as const;

const statusColors = {
    active: '#5ff395',
    verification: '#f1d751',
    blocked: '#fc7e7e',
} as const;

export function CitizensByStatus({
                                     citizens,
                                 }: CitizensByStatusProps) {
    const data = useMemo(() => {
        const statuses = new Map<string, number>();

        citizens.forEach((citizen) => {
            statuses.set(
                citizen.status,
                (statuses.get(citizen.status) ?? 0) + 1,
            );
        });

        return Array.from(statuses.entries()).map(
            ([status, count]) => ({
                name:
                    statusLabels[
                        status as keyof typeof statusLabels
                        ],
                value: count,
                color:
                    statusColors[
                        status as keyof typeof statusColors
                        ],
            }),
        );
    }, [citizens]);

    return (
        <section className="citizens-by-status">
            <div className="citizens-by-status__header">
                <h2>Статусы граждан</h2>
                <p>Распределение граждан по текущему статусу</p>
            </div>

            <div className="citizens-by-status__chart">
                <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {data.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}