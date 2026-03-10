import { teamStandings, batterStats, pitcherStats, teamColors } from "@/data/mockData";
import { Trophy, TrendingUp, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  year: number;
}

export function Dashboard({ year }: DashboardProps) {
  const standings = teamStandings[year] || [];
  const batters = batterStats[year] || [];
  const pitchers = pitcherStats[year] || [];

  const champion = standings[0];
  const topBatter = batters[0];
  const topPitcher = pitchers[0];

  if (!champion) {
    return <div className="p-8 text-center text-slate-500">해당 연도의 데이터가 없습니다.</div>;
  }

  // Prepare chart data
  const chartData = standings.map(team => ({
    name: team.team,
    wins: team.w,
    color: teamColors[team.team] ? teamColors[team.team].replace('bg-', '') : 'slate-500'
  }));

  // Helper to map tailwind color classes to hex for recharts
  const getHexColor = (colorClass: string) => {
    const colorMap: Record<string, string> = {
      'red-600': '#dc2626',
      'blue-600': '#2563eb',
      'pink-700': '#be185d',
      'slate-800': '#1e293b',
      'black': '#000000',
      'red-500': '#ef4444',
      'red-800': '#991b1b',
      'orange-500': '#f97316',
      'blue-800': '#1e40af',
      'red-900': '#7f1d1d',
      'slate-500': '#64748b'
    };
    return colorMap[colorClass] || '#64748b';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Champion Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
            <Trophy size={32} />
          </div>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">정규시즌 우승</h3>
          <p className="text-3xl font-bold text-slate-900 mb-2">{champion.team}</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-blue-600">{champion.w}승</span>
            <span className="text-slate-400">{champion.d}무</span>
            <span className="text-red-600">{champion.l}패</span>
            <span className="text-slate-500 ml-2">승률 {champion.pct.toFixed(3)}</span>
          </div>
        </div>

        {/* Top Batter Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <TrendingUp size={32} />
          </div>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">타율 1위</h3>
          <p className="text-3xl font-bold text-slate-900 mb-2">{topBatter?.player || '-'}</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className={cn("px-2 py-0.5 rounded-full text-xs text-white", teamColors[topBatter?.team || ""] || "bg-slate-500")}>
              {topBatter?.team || '-'}
            </span>
            <span className="text-slate-700">타율 {(topBatter?.avg || 0).toFixed(3)}</span>
            <span className="text-slate-500 ml-2">{topBatter?.hr || 0}홈런</span>
          </div>
        </div>

        {/* Top Pitcher Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Activity size={32} />
          </div>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">평균자책점 1위</h3>
          <p className="text-3xl font-bold text-slate-900 mb-2">{topPitcher?.player || '-'}</p>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className={cn("px-2 py-0.5 rounded-full text-xs text-white", teamColors[topPitcher?.team || ""] || "bg-slate-500")}>
              {topPitcher?.team || '-'}
            </span>
            <span className="text-slate-700">ERA {(topPitcher?.era || 0).toFixed(2)}</span>
            <span className="text-slate-500 ml-2">{topPitcher?.w || 0}승</span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">{year} 정규시즌 팀 승수</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="wins" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getHexColor(entry.color)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6">{year} 정규시즌 팀 승률</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.map(d => ({ ...d, pct: standings.find(s => s.team === d.name)?.pct || 0 }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis domain={[0, 0.7]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [value.toFixed(3), '승률']}
                />
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getHexColor(entry.color)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Standings Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800">팀 순위 (Top 5)</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">순위</th>
                  <th className="px-6 py-3 font-medium">팀명</th>
                  <th className="px-6 py-3 font-medium text-right">승률</th>
                  <th className="px-6 py-3 font-medium text-right">승차</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {standings.slice(0, 5).map((team) => (
                  <tr key={team.team} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{team.rank}</td>
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <div className={cn("w-3 h-3 rounded-full", teamColors[team.team] || "bg-slate-300")} />
                      {team.team}
                    </td>
                    <td className="px-6 py-4 text-right font-mono">{team.pct.toFixed(3)}</td>
                    <td className="px-6 py-4 text-right text-slate-500">{team.gb.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Players Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800">주요 기록 리더</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase mb-3 border-b pb-2">타자 부문</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">홈런</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{[...batters].sort((a,b) => b.hr - a.hr)[0]?.player}</span>
                    <span className="text-blue-600 font-mono font-bold">{[...batters].sort((a,b) => b.hr - a.hr)[0]?.hr}개</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">타점</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{[...batters].sort((a,b) => b.rbi - a.rbi)[0]?.player}</span>
                    <span className="text-blue-600 font-mono font-bold">{[...batters].sort((a,b) => b.rbi - a.rbi)[0]?.rbi}점</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">도루</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{[...batters].sort((a,b) => b.sb - a.sb)[0]?.player}</span>
                    <span className="text-blue-600 font-mono font-bold">{[...batters].sort((a,b) => b.sb - a.sb)[0]?.sb}개</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-slate-500 uppercase mb-3 border-b pb-2">투수 부문</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">다승</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{[...pitchers].sort((a,b) => b.w - a.w)[0]?.player}</span>
                    <span className="text-blue-600 font-mono font-bold">{[...pitchers].sort((a,b) => b.w - a.w)[0]?.w}승</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">탈삼진</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900">{[...pitchers].sort((a,b) => b.so - a.so)[0]?.player}</span>
                    <span className="text-blue-600 font-mono font-bold">{[...pitchers].sort((a,b) => b.so - a.so)[0]?.so}개</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
