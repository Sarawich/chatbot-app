const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // จาก URL ของ Google Sheets
const RANGE = 'Sheet1!A2:J'; // แก้ตาม sheet ของคุณ

// Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
});

app.post('/api/campaigns', async (req, res) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];
    const campaigns = rows.map(row => ({
      campaign_id: row[0] || '',
      name: row[1] || '',
      status: (row[2] || 'UNKNOWN').toUpperCase(),
      channel_type: row[3] || '',
      impressions: Number(row[4] || 0),
      interactions: Number(row[5] || 0),
      conversions: Number(row[6] || 0),
      cost_micros: Number(row[7] || 0),
      stat_date: row[8] || ''
    }));

    res.json(campaigns);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));