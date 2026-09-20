import { useMemo } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import type { Citizen } from '../../entities/citizen/types';

import './CitizensByAge.css';

type CitizensByAgeProps = {
    citizens: Citizen[];
};

const ageGroups = [
    { label: '18–25', min: 18, max: 25 },
    { label: '26–35', min: 26, max: 35 },
    { label: '36–45', min: 36, max: 45 },
    { label: '46–55', min: 46, max: 55 },
    { label: '56–65', min: 56, max: 65 },
    { label: '65+', min: 66, max: Infinity },
];

function getAge(birthDate: string) {
    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const hasBirthdayPassed =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() &&
            today.getDate() >= birth.getDate());

    if (!hasBirthdayPassed) {
        age -= 1;
    }

    return age;
}

export function CitizensByAge({
                                  citizens,
                              }: CitizensByAgeProps) {
    const data = useMemo(() => {
        return ageGroups.map((group) => {
            const count = citizens.filter((citizen) => {
                const age = getAge(citizen.birthDate);

                return age >= group.min && age <= group.max;
            }).length;

            return {
                age: group.label,
                count,
            };
        });
    }, [citizens]);

    return (
        <section className="citizens-by-age">
            <div className="citizens-by-age__header">
                <h2>Возрастная структура</h2>
                <p>Распределение граждан по возрастным группам</p>
            </div>

            <div className="citizens-by-age__chart">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="age" />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            name="Граждане"
                            fill="#93c5fd"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}