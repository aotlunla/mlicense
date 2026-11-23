'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Layers,
  Users,
  Building2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Menu,
  Calculator,
  QrCode,
  Volume2,
  Activity,
  Award,
  PhoneCall,
  Compass,
  FileCheck2,
  RotateCcw
} from 'lucide-react';
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

// -------------------------------------------------------------
// Top Official Announcement Bar (Clean Navy Slate with Subtle Pink Accent)
// -------------------------------------------------------------
const TopGovBar = () => {
  return (
    <div className="w-[100%] bg-slate-900 text-slate-300 py-[0.35rem] px-[4%] text-[0.75rem] border-b-2 border-[#e7258a]">
      <div className="w-[92%] max-w-[96%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-[0.5rem]">
        <div className="flex items-center gap-[0.5rem]">
          <span className="inline-flex items-center justify-center px-[0.375rem] py-[0.0625rem] bg-[#e7258a] text-white rounded-[0.25rem] text-[0.6875rem] font-semibold tracking-wider">
            GOV TECH
          </span>
          <span className="text-[0.75rem] text-slate-300 tracking-tight">
            พอร์ทัลผลงานนวัตกรรมบริการดิจิทัลภาครัฐ | Digital Government Showcase
          </span>
        </div>
        <div className="hidden md:flex items-center gap-[1rem] text-[0.7rem] text-slate-400">
          <span className="flex items-center gap-[0.25rem]">
            <ShieldCheck className="w-[0.8rem] h-[0.8rem] text-slate-400" />
            ระบบความมั่นคงปลอดภัย SSL 256-Bit
          </span>
          <span className="w-[1px] h-[0.7rem] bg-slate-700" />
          <span className="flex items-center gap-[0.25rem]">
            <Award className="w-[0.8rem] h-[0.8rem] text-slate-400" />
            มาตรฐาน e-Government & PDPA
          </span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Navbar (Clean, Single Line, No Demo/Login Buttons, Reduced Font)
// -------------------------------------------------------------
const GovNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 w-[100%] z-50 transition-all duration-200 ${
        scrolled
          ? 'fluent-acrylic shadow-sm py-[0.5rem]'
          : 'bg-white/95 dark:bg-[#18111d]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-[0.625rem]'
      }`}
    >
      <div className="w-[92%] max-w-[96%] mx-auto px-[1%]">
        <div className="w-[100%] flex items-center justify-between">
          {/* Logo & Agency Title */}
          <Link href="/" className="flex items-center gap-[0.625rem] group shrink-0">
            <div className="w-[2.25rem] h-[2.25rem] rounded-[0.5rem] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-colors group-hover:border-[#e7258a]">
              <Building2 className="w-[1.25rem] h-[1.25rem] text-[#e7258a]" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-[0.375rem]">
                <span className="text-[0.9375rem] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                  ระบบงานดิจิทัล กรมบังคับคดี
                </span>
                <span className="px-[0.3125rem] py-[0.0625rem] bg-slate-100 dark:bg-slate-800 text-[#e7258a] border border-slate-200 dark:border-slate-700 rounded-[0.25rem] text-[0.625rem] font-bold">
                  GovTech
                </span>
              </div>
              <span className="text-[0.6875rem] text-slate-500 dark:text-slate-400 leading-tight">
                ระบบสารสนเทศและการบูรณาการบริการประชาชน
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Single line, no wrapping, clean neutral fonts */}
          <div className="hidden lg:flex items-center gap-[1.5rem] xl:gap-[2rem]">
            <Link
              href="#overview"
              className="text-[0.8125rem] font-medium text-slate-600 dark:text-slate-300 hover:text-[#e7258a] transition-colors whitespace-nowrap"
            >
              ภาพรวมโครงการ
            </Link>
            <Link
              href="#govt-queue"
              className="text-[0.8125rem] font-medium text-slate-600 dark:text-slate-300 hover:text-[#e7258a] transition-colors whitespace-nowrap flex items-center gap-[0.3rem]"
            >
              <Users className="w-[0.875rem] h-[0.875rem] text-slate-400 group-hover:text-[#e7258a]" />
              ระบบสมาร์ทติว
            </Link>
            <Link
              href="#property-valuation"
              className="text-[0.8125rem] font-medium text-slate-600 dark:text-slate-300 hover:text-[#e7258a] transition-colors whitespace-nowrap flex items-center gap-[0.3rem]"
            >
              <Calculator className="w-[0.875rem] h-[0.875rem] text-slate-400 group-hover:text-[#e7258a]" />
              ระบบประเมินราคาทรัพย์
            </Link>
            <Link
              href="#standards"
              className="text-[0.8125rem] font-medium text-slate-600 dark:text-slate-300 hover:text-[#e7258a] transition-colors whitespace-nowrap"
            >
              มาตรฐานความปลอดภัย
            </Link>
            <Link
              href="#contact"
              className="text-[0.8125rem] font-medium text-slate-600 dark:text-slate-300 hover:text-[#e7258a] transition-colors whitespace-nowrap"
            >
              ติดต่อหน่วยงาน
            </Link>
          </div>

          {/* Right Action Tools - No sys-login/demo buttons */}
          <div className="hidden md:flex items-center gap-[0.625rem]">
            <ModeToggle />
            <Button
              asChild
              size="sm"
              className="bg-[#e7258a] hover:bg-[#c81a73] text-white rounded-[0.375rem] text-[0.8125rem] h-[2.125rem] px-[0.875rem] font-medium shadow-sm"
            >
              <Link href="#contact">ติดต่อสอบถาม</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-[0.5rem]">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-slate-200 text-slate-700 rounded-[0.375rem] h-[2.125rem] w-[2.125rem]"
                >
                  <Menu className="w-[1.125rem] h-[1.125rem]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85%] max-w-[20rem]">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-[0.5rem] text-[0.9375rem] text-slate-900">
                    <Building2 className="w-[1.125rem] h-[1.125rem] text-[#e7258a]" />
                    ระบบงานดิจิทัล กรมบังคับคดี
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-[0.625rem] mt-[1.25rem]">
                  <Link href="#overview" className="text-[0.875rem] font-medium text-slate-700 dark:text-slate-200 py-[0.5rem]">
                    ภาพรวมโครงการ
                  </Link>
                  <Link
                    href="#govt-queue"
                    className="text-[0.875rem] font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between py-[0.5rem] border-b border-slate-100 dark:border-slate-800"
                  >
                    <span>ระบบสมาร์ทติว (Smart Queue)</span>
                    <ChevronRight className="w-[0.875rem] h-[0.875rem] text-slate-400" />
                  </Link>
                  <Link
                    href="#property-valuation"
                    className="text-[0.875rem] font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between py-[0.5rem] border-b border-slate-100 dark:border-slate-800"
                  >
                    <span>ระบบประเมินราคาทรัพย์ (Valuation)</span>
                    <ChevronRight className="w-[0.875rem] h-[0.875rem] text-slate-400" />
                  </Link>
                  <Link href="#standards" className="text-[0.875rem] font-medium text-slate-700 dark:text-slate-200 py-[0.5rem]">
                    มาตรฐานความปลอดภัยภาครัฐ
                  </Link>
                  <Link href="#contact" className="text-[0.875rem] font-medium text-slate-700 dark:text-slate-200 py-[0.5rem]">
                    ติดต่อหน่วยงาน
                  </Link>
                  <Separator className="my-[0.5rem]" />
                  <Button asChild className="w-[100%] bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.8125rem]">
                    <Link href="#contact">ติดต่อศูนย์บริการ</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

// -------------------------------------------------------------
// Hero Section (Scaled-down Typography, Minimal Clean Background)
// -------------------------------------------------------------
const GovHero = () => {
  return (
    <section id="overview" className="relative w-[100%] pt-[4%] pb-[5%] overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 dark:from-[#18111d] dark:via-[#0f0a12] dark:to-[#18111d]">
      <div className="w-[92%] max-w-[96%] mx-auto px-[1%]">
        <div className="w-[100%] flex flex-col items-center text-center">
          {/* Official Gov Tag */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-[0.375rem] px-[0.75rem] py-[0.25rem] rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-[0.75rem] mb-[1rem]">
              <Sparkles className="w-[0.8rem] h-[0.8rem] text-[#e7258a]" />
              <span>พอร์ทัลผลงานนวัตกรรมบริการดิจิทัลภาครัฐ</span>
              <span className="w-[1px] h-[0.625rem] bg-slate-300 dark:bg-slate-600" />
              <span className="text-slate-500 text-[0.6875rem]">ปีงบประมาณ 2569</span>
            </div>
          </motion.div>

          {/* Scaled-down Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[1.75rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[2.75rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.25] max-w-[90%] mb-[0.875rem]"
          >
            ขับเคลื่อนบริการภาครัฐสู่ดิจิทัล <br className="hidden sm:inline" />
            <span className="text-[#e7258a]">เพื่อประโยชน์สูงสุดของประชาชน</span>
          </motion.h1>

          {/* Scaled-down Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[0.9375rem] sm:text-[1rem] md:text-[1.0625rem] text-slate-600 dark:text-slate-300 max-w-[78%] leading-relaxed mb-[1.75rem]"
          >
            ศูนย์รวมนวัตกรรมซอฟต์แวร์บริการภาครัฐที่มุ่งเน้นความโปร่งใส รวดเร็ว และความถูกต้องแม่นยำสูง
            นำเสนอ 2 ผลงานเด่น: <span className="font-semibold text-slate-800 dark:text-slate-100">ระบบสมาร์ทติว (govt-queue-system)</span> และ{' '}
            <span className="font-semibold text-slate-800 dark:text-slate-100">ระบบประเมินราคาทรัพย์</span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-[0.75rem] w-[100%] mb-[2.5rem]"
          >
            <Button
              asChild
              className="bg-[#e7258a] hover:bg-[#c81a73] text-white rounded-[0.5rem] text-[0.875rem] h-[2.5rem] px-[1.25rem] font-medium shadow-sm transition-all"
            >
              <Link href="#govt-queue">
                <Users className="w-[0.9375rem] h-[0.9375rem] mr-[0.375rem]" />
                สำรวจระบบสมาร์ทติว
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-[0.5rem] text-[0.875rem] h-[2.5rem] px-[1.25rem] font-medium transition-all"
            >
              <Link href="#property-valuation">
                <Calculator className="w-[0.9375rem] h-[0.9375rem] mr-[0.375rem]" />
                ดูระบบประเมินราคาทรัพย์
              </Link>
            </Button>
          </motion.div>

          {/* Impact Stats Grid - Clean Neutral Cards with Pink Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-[100%] grid grid-cols-2 lg:grid-cols-4 gap-[1.5%]"
          >
            <div className="fluent-glass-card rounded-[0.75rem] p-[4%] text-center">
              <div className="text-[1.75rem] sm:text-[2rem] font-bold text-[#e7258a] mb-[0.125rem]">
                75%
              </div>
              <div className="text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300">
                ลดระยะเวลารอคอยเฉลี่ย
              </div>
              <div className="text-[0.6875rem] text-slate-500 mt-[0.125rem]">
                ระบบสมาร์ทติว
              </div>
            </div>

            <div className="fluent-glass-card rounded-[0.75rem] p-[4%] text-center">
              <div className="text-[1.75rem] sm:text-[2rem] font-bold text-[#e7258a] mb-[0.125rem]">
                99.8%
              </div>
              <div className="text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300">
                ความแม่นยำการประเมิน GIS
              </div>
              <div className="text-[0.6875rem] text-slate-500 mt-[0.125rem]">
                ระบบประเมินราคาทรัพย์
              </div>
            </div>

            <div className="fluent-glass-card rounded-[0.75rem] p-[4%] text-center">
              <div className="text-[1.75rem] sm:text-[2rem] font-bold text-slate-800 dark:text-slate-100 mb-[0.125rem]">
                3.8M+
              </div>
              <div className="text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300">
                ประชาชนผู้รับบริการ
              </div>
              <div className="text-[0.6875rem] text-slate-500 mt-[0.125rem]">
                ครอบคลุม 77 จังหวัด
              </div>
            </div>

            <div className="fluent-glass-card rounded-[0.75rem] p-[4%] text-center">
              <div className="text-[1.75rem] sm:text-[2rem] font-bold text-emerald-600 mb-[0.125rem]">
                100%
              </div>
              <div className="text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300">
                มาตรฐานความมั่นคงปลอดภัย
              </div>
              <div className="text-[0.6875rem] text-slate-500 mt-[0.125rem]">
                PDPA & ISO 27001
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// PROJECT 1: govt-queue-system (ระบบสมาร์ทติว)
// -------------------------------------------------------------
const GovtQueueProject = () => {
  const [currentQueue, setCurrentQueue] = useState(107);
  const [ticketNumber, setTicketNumber] = useState(112);
  const [activeCounter, setActiveCounter] = useState(3);
  const [statusMessage, setStatusMessage] = useState('กำลังให้บริการ');

  const handleNextQueue = () => {
    if (currentQueue < ticketNumber) {
      setCurrentQueue(prev => prev + 1);
      setActiveCounter(Math.floor(Math.random() * 4) + 1);
      setStatusMessage('เรียกคิวถัดไปสำเร็จ');
    } else {
      setStatusMessage('สิ้นสุดคิวบริการปัจจุบัน');
    }
  };

  const handleIssueTicket = () => {
    setTicketNumber(prev => prev + 1);
    setStatusMessage(`ออกบัตรคิวดิจิทัลใหม่หมายเลข A-${ticketNumber + 1} แล้ว`);
  };

  return (
    <section id="govt-queue" className="w-[100%] py-[5%] px-[4%] bg-white dark:bg-[#0f0a12] border-t border-slate-200 dark:border-slate-800">
      <div className="w-[92%] max-w-[96%] mx-auto">
        {/* Section Header */}
        <div className="w-[100%] text-center mb-[3%]">
          <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 px-[0.75rem] py-[0.25rem] text-[0.75rem] rounded-full mb-[0.5rem]">
            นวัตกรรมบริการประชาชน ภาครัฐ 4.0
          </Badge>
          <h2 className="text-[1.625rem] sm:text-[1.875rem] md:text-[2.125rem] font-bold text-slate-900 dark:text-white tracking-tight mb-[0.5rem]">
            ระบบสมาร์ทติว{' '}
            <span className="text-[1.125rem] font-medium text-slate-500">(govt-queue-system)</span>
          </h2>
          <p className="text-[0.875rem] sm:text-[0.9375rem] text-slate-600 dark:text-slate-400 max-w-[75%] mx-auto leading-relaxed">
            ระบบบริหารจัดการลำดับคิวและสายธารบริการประชาชนอัจฉริยะสำหรับหน่วยงานภาครัฐ
            ลดความแออัด เพิ่มประสิทธิภาพการทำงานของเจ้าหน้าที่ และยกระดับความพึงพอใจในการติดต่อราชการ
          </p>
        </div>

        {/* 2-Column Content: Feature Specs & Interactive Live Simulator */}
        <div className="w-[100%] grid grid-cols-1 lg:grid-cols-2 gap-[2.5%] items-stretch">
          {/* Left Column: Key Features */}
          <div className="w-[100%] flex flex-col justify-between">
            <div className="fluent-glass-card rounded-[0.875rem] p-[5%]">
              <h3 className="text-[1.125rem] font-bold text-slate-900 dark:text-white mb-[1rem] flex items-center gap-[0.5rem]">
                <Users className="w-[1.25rem] h-[1.25rem] text-[#e7258a]" />
                ฟังก์ชันหลักของระบบสมาร์ทติว
              </h3>

              <div className="space-y-[1rem]">
                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    1
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      การจองคิวออนไลน์ & บัตรคิวดิจิทัล (Smart Ticket)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      ประชาชนสามารถลงทะเบียนจองคิวล่วงหน้าผ่านสมาร์ทโฟน หรือกดรับบัตรคิวดิจิทัลที่ตู้ Kiosk ด้วยบัตรประชาชน Smart Card ได้ทันที
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    2
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      แจ้งเตือนสถานะคิวเรียลไทม์ (Live WebSocket Tracking)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      แจ้งเตือนผ่าน SMS และ Line Official เมื่อใกล้ถึงลำดับ ไม่จำเป็นต้องนั่งรอในห้องบริการ ช่วยลดความหนาแน่นในสถานที่ราชการ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    3
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      ระบบเรียกคิวเสียงภาษาไทยอัจฉริยะ (AI Voice Calling)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      สังเคราะห์เสียงเรียกคิวภาษาไทยที่ชัดเจน นุ่มนวล ระบุหมายเลขคิวและช่องบริการ พร้อมแสดงผลบนจอ LED ประจำแต่ละเคาน์เตอร์
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    4
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      แดชบอร์ดสถิติและการจัดสรรเจ้าหน้าที่ (Service Analytics)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      ผู้บริหารสามารถดูสถิติเวลารอคอยเฉลี่ย ปริมาณผู้รับบริการรายชั่วโมง เพื่อจัดสรรกำลังเจ้าหน้าที่ได้อย่างมีประสิทธิภาพสูงสุด
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="mt-[1.25rem] pt-[1rem] border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-[0.375rem]">
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  Next.js 16 App Router
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  WebSocket Real-time
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  PostgreSQL High-Availability
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  Kiosk Smart Card API
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Column: Live Simulator */}
          <div className="w-[100%] flex flex-col">
            <div className="fluent-glass-card rounded-[0.875rem] p-[5%] flex flex-col justify-between h-[100%]">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-[0.75rem] mb-[1.25rem]">
                  <div className="flex items-center gap-[0.375rem]">
                    <Activity className="w-[1rem] h-[1rem] text-[#e7258a] animate-pulse" />
                    <span className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      ระบบจำลองการทำงานจริง (Live Simulation)
                    </span>
                  </div>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50 text-[0.6875rem]">
                    สถานะ: ออนไลน์
                  </Badge>
                </div>

                {/* Digital Calling Display Mockup */}
                <div className="bg-slate-900 text-white rounded-[0.5rem] p-[4%] mb-[1.25rem] shadow-sm">
                  <div className="flex items-center justify-between text-[0.75rem] text-slate-400 mb-[0.5rem] border-b border-slate-800 pb-[0.375rem]">
                    <span className="flex items-center gap-[0.25rem]">
                      <Volume2 className="w-[0.875rem] h-[0.875rem] text-[#e7258a]" />
                      หน้าจอเรียกคิวอัจฉริยะ (Main Calling Display)
                    </span>
                    <span>ห้องบริการทะเบียนและใบอนุญาต</span>
                  </div>

                  <div className="grid grid-cols-2 gap-[3%] text-center py-[0.75rem]">
                    <div className="bg-black/30 rounded-[0.375rem] p-[3%] border border-white/5">
                      <div className="text-[0.75rem] text-slate-400 mb-[0.125rem]">หมายเลขคิว (Queue)</div>
                      <div className="text-[2rem] font-mono font-bold text-[#e7258a] tracking-wider">
                        A-{currentQueue}
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-[0.375rem] p-[3%] border border-white/5">
                      <div className="text-[0.75rem] text-slate-400 mb-[0.125rem]">ช่องบริการ (Counter)</div>
                      <div className="text-[2rem] font-mono font-bold text-emerald-400">
                        0{activeCounter}
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[0.75rem] text-slate-300 mt-[0.375rem] bg-white/5 py-[0.25rem] rounded-[0.25rem]">
                    {statusMessage}
                  </div>
                </div>

                {/* Digital Ticket Card Preview - Clean Slate instead of Pink */}
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[0.5rem] p-[3.5%] flex items-center justify-between mb-[1.25rem]">
                  <div>
                    <div className="text-[0.6875rem] font-medium text-slate-500 dark:text-slate-400">
                      บัตรคิวดิจิทัลของคุณ (Your Ticket)
                    </div>
                    <div className="text-[1.25rem] font-bold text-slate-900 dark:text-white">
                      A-{ticketNumber}
                    </div>
                    <div className="text-[0.75rem] text-slate-600 dark:text-slate-400">
                      รออีก: <span className="font-semibold text-[#e7258a]">{Math.max(0, ticketNumber - currentQueue)} คิว</span> (ประมาณ {(Math.max(0, ticketNumber - currentQueue) * 4)} นาที)
                    </div>
                  </div>
                  <div className="w-[3rem] h-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[0.375rem] flex items-center justify-center p-[0.25rem] text-slate-700 dark:text-slate-200">
                    <QrCode className="w-[100%] h-[100%]" />
                  </div>
                </div>
              </div>

              {/* Action Buttons for Simulator */}
              <div className="flex flex-col sm:flex-row gap-[2%] pt-[0.75rem] border-t border-slate-200 dark:border-slate-800">
                <Button
                  onClick={handleNextQueue}
                  className="w-[100%] sm:w-[49%] bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.8125rem] h-[2.375rem] rounded-[0.375rem]"
                >
                  <Volume2 className="w-[0.875rem] h-[0.875rem] mr-[0.25rem]" />
                  จำลองเรียกคิวถัดไป
                </Button>
                <Button
                  onClick={handleIssueTicket}
                  variant="outline"
                  className="w-[100%] sm:w-[49%] border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-[0.8125rem] h-[2.375rem] rounded-[0.375rem]"
                >
                  <Users className="w-[0.875rem] h-[0.875rem] mr-[0.25rem]" />
                  กดรับบัตรคิวใหม่
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// PROJECT 2: ประเมิณราคาทรัพย์ (Property Valuation)
// -------------------------------------------------------------
const PropertyValuationProject = () => {
  const [propertyType, setPropertyType] = useState('land');
  const [areaSize, setAreaSize] = useState(100);
  const [zoneRate, setZoneRate] = useState(25000);

  const calculateTotal = () => areaSize * zoneRate;
  const calculateTransferFee = () => calculateTotal() * 0.02;

  return (
    <section id="property-valuation" className="w-[100%] py-[5%] px-[4%] bg-slate-50/50 dark:bg-[#18111d] border-t border-slate-200 dark:border-slate-800">
      <div className="w-[92%] max-w-[96%] mx-auto">
        {/* Section Header */}
        <div className="w-[100%] text-center mb-[3%]">
          <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 px-[0.75rem] py-[0.25rem] text-[0.75rem] rounded-full mb-[0.5rem]">
            นวัตกรรมภูมิสารสนเทศและการประเมินทุนทรัพย์
          </Badge>
          <h2 className="text-[1.625rem] sm:text-[1.875rem] md:text-[2.125rem] font-bold text-slate-900 dark:text-white tracking-tight mb-[0.5rem]">
            ระบบประเมินราคาทรัพย์{' '}
            <span className="text-[1.125rem] font-medium text-slate-500">(Property Valuation System)</span>
          </h2>
          <p className="text-[0.875rem] sm:text-[0.9375rem] text-slate-600 dark:text-slate-400 max-w-[75%] mx-auto leading-relaxed">
            แพลตฟอร์มสืบค้นและคำนวณราคาประเมินทุนทรัพย์ที่ดิน สิ่งปลูกสร้าง และห้องชุดทั่วประเทศ
            เชื่อมโยงแผนที่ภูมิสารสนเทศ (GIS) เพื่อความโปร่งใส ถูกต้องตามเกณฑ์มาตรฐานกรม
          </p>
        </div>

        {/* 2-Column Content: Feature Breakdown & Interactive Calculator */}
        <div className="w-[100%] grid grid-cols-1 lg:grid-cols-2 gap-[2.5%] items-stretch">
          {/* Left Column: Feature Breakdown */}
          <div className="w-[100%] flex flex-col justify-between">
            <div className="fluent-glass-card rounded-[0.875rem] p-[5%]">
              <h3 className="text-[1.125rem] font-bold text-slate-900 dark:text-white mb-[1rem] flex items-center gap-[0.5rem]">
                <Compass className="w-[1.25rem] h-[1.25rem] text-[#e7258a]" />
                จุดเด่นของระบบประเมินราคาทรัพย์
              </h3>

              <div className="space-y-[1rem]">
                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    1
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      แผนที่แปลงที่ดินและภูมิสารสนเทศ (GIS Mapping)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      ค้นหาแปลงที่ดินด้วยเลขโฉนด, ระวาง หรือพิกัดภูมิศาสตร์ แสดงผลขอบเขตแปลงที่ดินและราคาประเมินรายโซนบนภาพถ่ายดาวเทียมความละเอียดสูง
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    2
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      การคำนวณภาษีและค่าธรรมเนียมอัตโนมัติ (Automated Tax Engine)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      คำนวณภาษีที่ดินและสิ่งปลูกสร้าง ค่าธรรมเนียมการโอนกรรมสิทธิ์ อากรแสตมป์ และภาษีเงินได้หัก ณ ที่จ่ายตามรอบบัญชีปัจจุบันอย่างแม่นยำ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    3
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      ดัชนีแนวโน้มราคาประเมินย้อนหลัง (Valuation Trends)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      เปรียบเทียบสถิติราคาประเมินย้อนหลัง 5 รอบบัญชี เพื่อประโยชน์ในการวางแผนผังเมือง การลงทุน และการประเมินภาษีอย่างเป็นธรรม
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-[0.75rem]">
                  <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 font-bold text-[0.75rem] border border-slate-200 dark:border-slate-700">
                    4
                  </div>
                  <div>
                    <h4 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      หนังสือรับรองราคาประเมินอิเล็กทรอนิกส์ (e-Certificate)
                    </h4>
                    <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 mt-[0.125rem] leading-relaxed">
                      ออกเอกสารรับรองราคาประเมินทางราชการพร้อม Digital Signature และ QR Code ตรวจสอบความถูกต้อง ป้องกันการปลอมแปลงเอกสาร
                    </p>
                  </div>
                </div>
              </div>

              {/* Tech Badges */}
              <div className="mt-[1.25rem] pt-[1rem] border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-[0.375rem]">
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  GeoServer / GIS Engine
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  PostGIS Spatial DB
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  e-Signature Standard
                </Badge>
                <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 text-[0.6875rem]">
                  RESTful Integration API
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Valuation Tool */}
          <div className="w-[100%] flex flex-col">
            <div className="fluent-glass-card rounded-[0.875rem] p-[5%] flex flex-col justify-between h-[100%]">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-[0.75rem] mb-[1.25rem]">
                  <div className="flex items-center gap-[0.375rem]">
                    <Calculator className="w-[1rem] h-[1rem] text-[#e7258a]" />
                    <span className="text-[0.9375rem] font-bold text-slate-900 dark:text-white">
                      เครื่องคำนวณราคาประเมินจำลอง (Valuation Demo)
                    </span>
                  </div>
                  <Badge variant="outline" className="border-slate-300 text-slate-600 text-[0.6875rem]">
                    รอบบัญชี พ.ศ. 2566 - 2569
                  </Badge>
                </div>

                {/* Property Type Selector */}
                <div className="mb-[1rem]">
                  <label className="block text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300 mb-[0.375rem]">
                    ประเภททรัพย์สิน
                  </label>
                  <div className="grid grid-cols-3 gap-[2%]">
                    <button
                      type="button"
                      onClick={() => { setPropertyType('land'); setZoneRate(25000); }}
                      className={`py-[0.375rem] px-[0.5rem] rounded-[0.375rem] text-[0.8125rem] font-medium transition-all ${
                        propertyType === 'land'
                          ? 'bg-[#e7258a] text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      ที่ดินเปล่า
                    </button>
                    <button
                      type="button"
                      onClick={() => { setPropertyType('house'); setZoneRate(45000); }}
                      className={`py-[0.375rem] px-[0.5rem] rounded-[0.375rem] text-[0.8125rem] font-medium transition-all ${
                        propertyType === 'house'
                          ? 'bg-[#e7258a] text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      บ้านพักอาศัย
                    </button>
                    <button
                      type="button"
                      onClick={() => { setPropertyType('condo'); setZoneRate(85000); }}
                      className={`py-[0.375rem] px-[0.5rem] rounded-[0.375rem] text-[0.8125rem] font-medium transition-all ${
                        propertyType === 'condo'
                          ? 'bg-[#e7258a] text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      อาคารพาณิชย์
                    </button>
                  </div>
                </div>

                {/* Input Area Size */}
                <div className="mb-[1rem]">
                  <div className="flex justify-between text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300 mb-[0.25rem]">
                    <span>ขนาดเนื้อที่ (ตารางวา):</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{areaSize} ตารางวา</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="10"
                    value={areaSize}
                    onChange={(e) => setAreaSize(Number(e.target.value))}
                    className="w-[100%] accent-[#e7258a] h-[0.375rem] bg-slate-200 rounded-[0.25rem] cursor-pointer"
                  />
                  <div className="flex justify-between text-[0.6875rem] text-slate-400 mt-[0.125rem]">
                    <span>20 ตร.ว.</span>
                    <span>500 ตร.ว.</span>
                    <span>1,000 ตร.ว.</span>
                  </div>
                </div>

                {/* Calculation Result Preview Box - Clean Slate instead of heavy pink */}
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[0.5rem] p-[4%] mb-[1rem]">
                  <div className="flex justify-between items-center text-[0.8125rem] text-slate-600 dark:text-slate-400 mb-[0.375rem]">
                    <span>ราคาประเมินต่อหน่วย:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {zoneRate.toLocaleString()} บาท / ตร.ว.
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[0.8125rem] text-slate-600 dark:text-slate-400 mb-[0.375rem]">
                    <span>ประมาณการค่าธรรมเนียมโอน (2%):</span>
                    <span className="font-medium text-emerald-600">
                      {calculateTransferFee().toLocaleString()} บาท
                    </span>
                  </div>

                  <Separator className="my-[0.375rem]" />

                  <div className="flex justify-between items-baseline pt-[0.25rem]">
                    <span className="text-[0.875rem] font-bold text-slate-900 dark:text-white">
                      รวมมูลค่าประเมินทุนทรัพย์:
                    </span>
                    <span className="text-[1.375rem] font-bold text-[#e7258a]">
                      {calculateTotal().toLocaleString()}{' '}
                      <span className="text-[0.75rem] font-normal text-slate-500">บาท</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Valuation */}
              <div className="flex flex-col sm:flex-row gap-[2%] pt-[0.75rem] border-t border-slate-200 dark:border-slate-800">
                <Button
                  onClick={() => alert(`จำลองการออกหนังสือรับรองราคาประเมินสำหรับเนื้อที่ ${areaSize} ตร.ว. รวมมูลค่า ${calculateTotal().toLocaleString()} บาท เรียบร้อยแล้ว`)}
                  className="w-[100%] sm:w-[49%] bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.8125rem] h-[2.375rem] rounded-[0.375rem]"
                >
                  <FileCheck2 className="w-[0.875rem] h-[0.875rem] mr-[0.25rem]" />
                  จำลองออกหนังสือรับรอง
                </Button>
                <Button
                  onClick={() => setAreaSize(100)}
                  variant="outline"
                  className="w-[100%] sm:w-[49%] border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-[0.8125rem] h-[2.375rem] rounded-[0.375rem]"
                >
                  <RotateCcw className="w-[0.875rem] h-[0.875rem] mr-[0.25rem]" />
                  รีเซ็ตค่าการคำนวณ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// GOVERNMENT STANDARDS & SECURITY
// -------------------------------------------------------------
const GovStandardsSection = () => {
  const standards = [
    {
      icon: ShieldCheck,
      title: "การคุ้มครองข้อมูลส่วนบุคคล (PDPA)",
      description: "ระบบปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 มีการเข้ารหัสข้อมูลสำคัญและสิทธิ์การเข้าถึงตามบทบาทหน้าที่อย่างเข้มงวด"
    },
    {
      icon: Award,
      title: "มาตรฐานความมั่นคงปลอดภัยสากล",
      description: "โครงสร้างพื้นฐานระบบสอดคล้องตามมาตรฐาน ISO/IEC 27001 และข้อกำหนดด้านความปลอดภัยทางไซเบอร์ของภาครัฐ (NCSA)"
    },
    {
      icon: Layers,
      title: "การบูรณาการเชื่อมโยงระบบ (Open API)",
      description: "รองรับการแลกเปลี่ยนข้อมูลผ่านมาตรฐาน Government Data Exchange (GDX) เพื่อเชื่อมโยงบริการภาครัฐอย่างไร้รอยต่อ"
    },
    {
      icon: Clock,
      title: "ความพร้อมใช้งานสูง (High Availability)",
      description: "สถาปัตยกรรมคลาวด์มาตรฐานภาครัฐ รับประกันความต่อเนื่องของบริการด้วยค่า Uptime สูงกว่า 99.99% พร้อมระบบสำรองข้อมูลอัตโนมัติ"
    }
  ];

  return (
    <section id="standards" className="w-[100%] py-[5%] px-[4%] bg-white dark:bg-[#0f0a12] border-t border-slate-200 dark:border-slate-800">
      <div className="w-[92%] max-w-[96%] mx-auto">
        <div className="w-[100%] text-center mb-[3%]">
          <Badge variant="outline" className="border-slate-300 text-slate-700 dark:text-slate-300 px-[0.75rem] py-[0.25rem] text-[0.75rem] rounded-full mb-[0.5rem]">
            ธรรมาภิบาลและความปลอดภัยข้อมูล
          </Badge>
          <h2 className="text-[1.625rem] sm:text-[1.875rem] font-bold text-slate-900 dark:text-white tracking-tight mb-[0.5rem]">
            มาตรฐานทางเทคโนโลยีและความมั่นคงปลอดภัย
          </h2>
          <p className="text-[0.875rem] sm:text-[0.9375rem] text-slate-600 dark:text-slate-400 max-w-[75%] mx-auto leading-relaxed">
            มั่นใจในทุกการทำธุรกรรมและการเข้าถึงข้อมูล ด้วยสถาปัตยกรรมความปลอดภัยระดับสูงตามแนวทางพัฒนารัฐบาลดิจิทัล
          </p>
        </div>

        <div className="w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5%]">
          {standards.map((item, idx) => (
            <div
              key={idx}
              className="fluent-glass-card rounded-[0.75rem] p-[5%] flex flex-col"
            >
              <div className="w-[2.25rem] h-[2.25rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center mb-[0.875rem] border border-slate-200 dark:border-slate-700">
                <item.icon className="w-[1.125rem] h-[1.125rem]" />
              </div>
              <h3 className="text-[0.9375rem] font-bold text-slate-900 dark:text-white mb-[0.375rem]">
                {item.title}
              </h3>
              <p className="text-[0.8125rem] text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// -------------------------------------------------------------
// GOVERNMENT FOOTER (No Demo/Login Links, Clean Government Style)
// -------------------------------------------------------------
const GovFooter = () => {
  return (
    <footer id="contact" className="w-[100%] bg-slate-900 text-slate-300 border-t border-slate-800 pt-[4%] pb-[3%] px-[4%]">
      <div className="w-[92%] max-w-[96%] mx-auto">
        <div className="w-[100%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3%] mb-[3%]">
          {/* Col 1: Identity */}
          <div className="space-y-[0.75rem]">
            <div className="flex items-center gap-[0.5rem]">
              <div className="w-[1.75rem] h-[1.75rem] rounded-[0.375rem] bg-[#e7258a] flex items-center justify-center text-white">
                <Building2 className="w-[1rem] h-[1rem]" />
              </div>
              <span className="text-[0.9375rem] font-bold text-white">
                ระบบงานดิจิทัล กรมบังคับคดี
              </span>
            </div>
            <p className="text-[0.8125rem] text-slate-400 leading-relaxed">
              มุ่งมั่นพัฒนานวัตกรรมซอฟต์แวร์และแพลตฟอร์มดิจิทัล เพื่อความสะดวก รวดเร็ว และเป็นธรรมสำหรับประชาชนไทยทุกคน
            </p>
          </div>

          {/* Col 2: Featured Projects - Public links only, no demo or login */}
          <div>
            <h4 className="text-[0.875rem] font-bold text-white mb-[0.75rem] border-l-2 border-[#e7258a] pl-[0.375rem]">
              โครงการเด่น
            </h4>
            <ul className="space-y-[0.5rem] text-[0.8125rem] text-slate-400">
              <li>
                <Link href="#govt-queue" className="hover:text-white transition-colors flex items-center gap-[0.25rem]">
                  <ChevronRight className="w-[0.75rem] h-[0.75rem] text-[#e7258a]" />
                  ระบบสมาร์ทติว (govt-queue-system)
                </Link>
              </li>
              <li>
                <Link href="#property-valuation" className="hover:text-white transition-colors flex items-center gap-[0.25rem]">
                  <ChevronRight className="w-[0.75rem] h-[0.75rem] text-[#e7258a]" />
                  ระบบประเมินราคาทรัพย์ (GIS Valuation)
                </Link>
              </li>
              <li>
                <Link href="#standards" className="hover:text-white transition-colors flex items-center gap-[0.25rem]">
                  <ChevronRight className="w-[0.75rem] h-[0.75rem] text-[#e7258a]" />
                  มาตรฐานความมั่นคงปลอดภัยภาครัฐ
                </Link>
              </li>
              <li>
                <Link href="#overview" className="hover:text-white transition-colors flex items-center gap-[0.25rem]">
                  <ChevronRight className="w-[0.75rem] h-[0.75rem] text-[#e7258a]" />
                  ดัชนีชี้วัดผลสัมฤทธิ์งานบริการ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Guidelines & Policies */}
          <div>
            <h4 className="text-[0.875rem] font-bold text-white mb-[0.75rem] border-l-2 border-[#e7258a] pl-[0.375rem]">
              นโยบายและความปลอดภัย
            </h4>
            <ul className="space-y-[0.5rem] text-[0.8125rem] text-slate-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  นโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  นโยบายความมั่นคงปลอดภัยเว็บไซต์
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  มาตรฐานการเข้าถึงเว็บไซต์ภาครัฐ (Web Accessibility)
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  ข้อกำหนดและเงื่อนไขการใช้บริการ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-[0.875rem] font-bold text-white mb-[0.75rem] border-l-2 border-[#e7258a] pl-[0.375rem]">
              ติดต่อหน่วยงาน
            </h4>
            <div className="space-y-[0.375rem] text-[0.8125rem] text-slate-400">
              <p>ศูนย์ราชการเฉลิมพระเกียรติฯ อาคารรัฐประศาสนภักดี</p>
              <p>ถนนแจ้งวัฒนะ แขวงทุ่งสองห้อง เขตหลักสี่ กรุงเทพฯ</p>
              <p className="flex items-center gap-[0.25rem] text-white font-medium pt-[0.25rem]">
                <PhoneCall className="w-[0.8rem] h-[0.8rem] text-[#e7258a]" />
                สายด่วนข้อมูลภาครัฐ: 1111 ต่อ 5555
              </p>
              <p className="text-[0.75rem] text-slate-500">วันจันทร์ - ศุกร์ 08:30 - 16:30 น.</p>
            </div>
          </div>
        </div>

        <Separator className="my-[1.5%] bg-slate-800" />

        <div className="w-[100%] flex flex-col md:flex-row items-center justify-between text-[0.75rem] text-slate-500 gap-[0.5rem]">
          <p>© 2569 ระบบงานดิจิทัล กรมบังคับคดี. สงวนลิขสิทธิ์ตามกฎหมายไทย.</p>
          <div className="flex items-center gap-[1rem]">
            <span>มาตรฐานเว็บไซต์ภาครัฐ</span>
            <span>•</span>
            <span>Fluent Design (Light Theme)</span>
            <span>•</span>
            <span>Layout: 100% Percentage</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// -------------------------------------------------------------
// MAIN PAGE COMPONENT
// -------------------------------------------------------------
export default function Home() {
  return (
    <div className="w-[100%] min-h-screen bg-white dark:bg-[#0f0a12] text-slate-800 dark:text-slate-100 font-sans selection:bg-[#e7258a]/20 selection:text-[#e7258a]">
      <TopGovBar />
      <GovNavbar />
      <GovHero />
      <GovtQueueProject />
      <PropertyValuationProject />
      <GovStandardsSection />
      <GovFooter />
    </div>
  );
}
