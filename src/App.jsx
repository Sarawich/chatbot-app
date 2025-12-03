import React from 'react';
import Chatbot from './Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">ทดสอบ Chatbot</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">ยินดีต้อนรับ</h2>
        <p className="text-gray-600">คลิกปุ่มมุมขวาล่างเพื่อเปิด chatbot 💬</p>
      </main>

      <Chatbot />
    </div>
  );
}

export default App;