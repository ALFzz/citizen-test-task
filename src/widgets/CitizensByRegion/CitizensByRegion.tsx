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

import './CitizensByRegion.css';

type CitizensByRegionProps = {
    citizens: Citizen[];
};

export function CitizensByRegion({
                                     citizens,
                                 }: CitizensByRegionProps) {
    const data = useMemo(() => {
        const regions = new Map<string, number>();

        citizens.forEach((citizen) => {
            regions.set(
                citizen.region,
                (regions.get(citizen.region) ?? 0) + 1,
            );
        });

        return Array.from(regions.entries())
            .map(([region, count]) => ({
                region,
                count,
            }))
            .sort((a, b) => b.count - a.count);
    }, [citizens]);

    return (
        <section className="citizens-by-region">
            <div className="citizens-by-region__header">
                <div>
                    <h2>Граждане по регионам</h2>
                    <p>Количество зарегистрированных граждан</p>
                </div>
            </div>

            <div className="citizens-by-region__chart">
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 0,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="region"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis allowDecimals={false} />

                        <Tooltip />

                        <Bar
                            dataKey="count"
                            name="Граждане"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}