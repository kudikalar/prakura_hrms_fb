import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

app.listen(5000, () => {
  console.log('🚀 HRMS Backend running on http://localhost:5000');
});
