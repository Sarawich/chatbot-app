import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';

export default function GoogleAdsDashboard() {
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  // แทนที่ด้วย Spreadsheet ID ของคุณ
  const SPREADSHEET_ID = '1Yf796ArGYEbjEkew8pqFO-Do-xYmBVKBcalSFBWp7tA';
  const SHEET_NAME = 'buuny';
  const RANGE = 'A2:J';
  
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}&range=${RANGE}`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Fetching from Google Sheets...');
      
      const response = await fetch(SHEET_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const csvText = await response.text();
      console.log('📄 CSV Data received:', csvText.substring(0, 200));

      const rows = csvText.split('\n').filter(row => row.trim());
      
      if (rows.length === 0) {
        throw new Error('No data in Google Sheets');
      }

      const campaigns = rows.map((row, index) => {
        const cols = row.split(',').map(col => col.replace(/^"|"$/g, '').trim());
        
        return {
          campaign_id: String(cols[0] || `temp-${index}`),
          name: String(cols[1] || 'No Name'),
          status: String(cols[2] || 'UNKNOWN').toUpperCase(),
          channel_type: String(cols[3] || '-'),
          impressions: Number(cols[4] || 0),
          interactions: Number(cols[5] || 0),
          conversions: Number(cols[6] || 0),
          cost_micros: Number(cols[7] || 0),
          stat_date: String(cols[8] || '-')
        };
      });

      console.log('✅ Parsed campaigns:', campaigns);
      setCampaigns(campaigns);
      
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [SHEET_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const microsToCurrency = (micros) => {
    return (Number(micros) / 1_000_000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const summary = React.useMemo(() => {
    const totals = campaigns.reduce((acc, c) => ({
      cost: acc.cost + c.cost_micros,
      conv: acc.conv + c.conversions,
      imp: acc.imp + c.impressions,
      int: acc.int + c.interactions,
      active: acc.active + (['ENABLED', 'ACTIVE'].includes(c.status) ? 1 : 0)
    }), { cost: 0, conv: 0, imp: 0, int: 0, active: 0 });

    return {
      totalCost: microsToCurrency(totals.cost),
      totalConversions: totals.conv,
      totalImpressions: totals.imp,
      totalInteractions: totals.int,
      avgCTR: totals.imp > 0 ? ((totals.int / totals.imp) * 100).toFixed(2) : '0.00',
      activeCampaigns: totals.active
    };
  }, [campaigns]);

  if (loading && campaigns.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white mb-4"></div>
        <p className="text-gray-400">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Google Ads Dashboard</h1>
            <p className="text-gray-500">Real-time data from Google Sheets</p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Updating...' : 'Refresh'}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-200">
            <AlertCircle size={20} />
            <div>
              <p><strong>Error:</strong> {error}</p>
              <p className="text-sm mt-1">Make sure your Google Sheet is public (Anyone with the link can view)</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <SummaryCard label="Total Spend" value={`฿${summary.totalCost}`} />
          <SummaryCard label="Conversions" value={summary.totalConversions.toLocaleString()} />
          <SummaryCard label="Impressions" value={summary.totalImpressions.toLocaleString()} />
          <SummaryCard label="Interactions" value={summary.totalInteractions.toLocaleString()} />
          <SummaryCard label="Avg. CTR" value={`${summary.avgCTR}%`} />
          <SummaryCard label="Active" value={summary.activeCampaigns} color="text-green-400" />
        </div>

        <div className="bg-gray-900/20 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-6 py-4">Campaign Name</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4 text-right">Spend</th>
                  <th className="px-6 py-4 text-right">Conv.</th>
                  <th className="px-6 py-4 text-center">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {campaigns.map((c) => (
                  <tr key={c.campaign_id} className="hover:bg-gray-800/30 transition-all">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{c.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{c.campaign_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{c.channel_type}</td>
                    <td className="px-6 py-4 text-right font-mono text-blue-400">฿{microsToCurrency(c.cost_micros)}</td>
                    <td className="px-6 py-4 text-right">{c.conversions}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">{c.stat_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {campaigns.length === 0 && !loading && (
            <div className="p-20 text-center text-gray-600">
              <p>No Data Available</p>
              <p className="text-sm mt-2">Check if your Google Sheet is public and has data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color = "text-white" }) {
  return (
    <div className="bg-gray-900/40 p-5 rounded-lg border border-gray-800 hover:border-gray-700 transition-all">
      <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    ENABLED: 'bg-green-500/10 text-green-400 border-green-500/20',
    ACTIVE: 'bg-green-500/10 text-green-400 border-green-500/20',
    PAUSED: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${styles[status] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
      {status}
    </span>
  );
}