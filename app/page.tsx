'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code, Smartphone, Rocket, Menu, X, Globe, Shield, Zap } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              oatedit
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">บริการของเรา</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">ผลงาน</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">ราคา</Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">ติดต่อเรา</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200 shadow-lg">
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">บริการของเรา</Link>
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">ผลงาน</Link>
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">ราคา</Link>
          <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">ติดต่อเรา</Link>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-[#f8f9fa] text-gray-900 pt-32 pb-32">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-100/50 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-600 text-sm font-semibold shadow-sm mb-8">
            <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
            ยกระดับธุรกิจของคุณสู่โลกดิจิทัล
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-gray-900">
            รับทำเว็บไซต์และแอพพลิเคชั่น <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ด้วยเทคโนโลยีทันสมัย</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            oatedit คือทีมพัฒนาซอฟต์แวร์มืออาชีพ ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นจริง
            ด้วยการออกแบบที่สะอาดตา (Fluent Design) ใช้งานง่าย และทรงพลัง
          </p>
        </motion.div>

        {/* MOCKUP CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative w-full max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden aspect-video group">
            {/* Window Controls */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-50 border-b border-gray-200 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>

            {/* Inner Content Placeholder */}
            <div className="pt-10 h-full flex flex-col items-center justify-center bg-white">
              <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-sm">
                <Globe className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">เชื่อมต่อไร้พรมแดน</h3>
              <p className="text-gray-500">Fast. Secure. Reliable.</p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-10 -z-10" />
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed font-normal">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "พัฒนาเว็บไซต์แบบครบวงจร",
      description: "บริการออกแบบและพัฒนาเว็บไซต์ที่ทันสมัย รองรับ SEO และการแสดงผลบนทุกอุปกรณ์ (Responsive Design)"
    },
    {
      icon: Smartphone,
      title: "โมบายแอพพลิเคชั่น",
      description: "สร้างแอพพลิเคชั่นสำหรับ iOS และ Android ด้วยเทคโนโลยีล่าสุด เพื่อประสบการณ์การใช้งานที่ลื่นไหล"
    },
    {
      icon: Rocket,
      title: "ระบบและการตลาดออนไลน์",
      description: "พัฒนาระบบหลังบ้าน (Back-office) และให้คำปรึกษาด้านการตลาดออนไลน์ เพื่อขับเคลื่อนธุรกิจให้เติบโต"
    }
  ];

  return (
    <div className="bg-white py-24 relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">ทำไมต้องเลือก oatedit?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            เรามุ่งมั่นส่งมอบผลงานคุณภาพ ที่ช่วยแก้ปัญหาและตอบโจทย์ธุรกิจของคุณอย่างแท้จริง
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
      <p>&copy; 2026 oatedit Inc. สงวนลิขสิทธิ์.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <Link href="#" className="hover:text-blue-600 transition-colors">นโยบายความเป็นส่วนตัว</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">เงื่อนไขการใช้งาน</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">ติดต่อเรา</Link>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
