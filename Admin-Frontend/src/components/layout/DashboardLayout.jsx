// \dsubh\Desktop\Nail Site\Admin-Frontend\src\components\layout\DashboardLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
// import Header from './Header';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: "url('https://videos.openai.com/vg-assets/assets%2Ftask_01jxs89pfpef3b6rsrb0kv0t2q%2F1749973039_img_1.webp?st=2025-07-01T05%3A26%3A00Z&se=2025-07-07T06%3A26%3A00Z&sks=b&skt=2025-07-01T05%3A26%3A00Z&ske=2025-07-07T06%3A26%3A00Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=NORuWEoQUjR5lzMLTH85INsDeq1Wm8uL8ZyeY5qbRTU%3D&az=oaivgprodscus')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="lg:pl-72">
        {/* <Header onMenuClick={() => setSidebarOpen(true)} /> */}
        <main className="p-4 sm:p-6 lg:p-8 bg-white/80 rounded-2xl min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;