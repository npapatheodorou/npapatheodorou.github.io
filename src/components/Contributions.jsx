import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { generateContributionData, getContributionColor } from '../utils/helpers';

var Contributions = () => {
  var data = useMemo(() => generateContributionData(), []);
  var weeks = useMemo(() => { var r = []; for (var i = 0; i < data.length; i += 7) r.push(data.slice(i, i + 7)); return r; }, [data]);
  var total = data.reduce((s, d) => s + d.count, 0);
  var streak = useMemo(() => { var c = 0; for (var i = data.length - 1; i >= 0; i--) { if (data[i].count > 0) c++; else break; } return c; }, [data]);
  var monthly = useMemo(() => {
    var m = {}; data.forEach(d => { var k = new Date(d.date).toLocaleDateString('en', { month: 'short', year: '2-digit' }); m[k] = (m[k] || 0) + d.count; });
    return Object.entries(m).map(([month, contributions]) => ({ month, contributions }));
  }, [data]);

  return (
    <section id="contributions" className="py-24 bg-surface-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">Activity</span>
          <h2 className="text-4xl lg:text-5xl font-black text-heading mb-4 tracking-tight">Contributions</h2>
          <p className="text-surface-500 text-lg max-w-2xl mx-auto">Consistent commitment to quality and continuous improvement.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[{ v: total.toLocaleString(), l: 'Total Contributions', s: 'Past year' }, { v: streak, l: 'Current Streak', s: '🟢 Active' }, { v: Math.round(total / 52), l: 'Weekly Average', s: 'Contributions' }, { v: Math.round(total / 365), l: 'Daily Average', s: 'Contributions' }].map(s => (
            <div key={s.l} className="card bg-surface-800/60 border border-surface-700/50 rounded-xl p-5">
              <div className="text-3xl font-extrabold text-heading">{s.v}</div>
              <div className="text-surface-500 text-sm font-medium mt-1">{s.l}</div>
              <div className="text-surface-600 text-xs mt-0.5">{s.s}</div>
            </div>
          ))}
        </div>

        <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-heading font-bold">Contribution Activity</h3>
            <div className="flex items-center gap-1.5 text-xs text-surface-500">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(l => <div key={l} className="w-3 h-3 rounded-sm" style={{ backgroundColor: getContributionColor(l) }} />)}
              <span>More</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[780px]">
              <div className="flex gap-[3px]">
                {weeks.map((w, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {w.map((d, di) => (
                      <div key={wi + '-' + di} className="w-[11px] h-[11px] rounded-sm hover:ring-1 hover:ring-primary-400/50 transition-all cursor-pointer"
                        style={{ backgroundColor: getContributionColor(d.level) }} title={d.count + ' contributions on ' + d.date} />
                    ))}
                    {w.length < 7 && Array(7 - w.length).fill(null).map((_, i) => <div key={'p' + i} className="w-[11px] h-[11px]" />)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-surface-800/60 border border-surface-700/50 rounded-2xl p-6">
          <h3 className="text-heading font-bold mb-6">Monthly Activity</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgb(var(--s-500))', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'rgb(var(--s-500))', fontSize: 11 }} width={35} />
                <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--s-800))', border: '1px solid rgb(var(--s-700))', borderRadius: '8px', color: 'rgb(var(--heading))', fontSize: '12px' }} />
                <Bar dataKey="contributions" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contributions;