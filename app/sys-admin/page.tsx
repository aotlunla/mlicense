'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Globe,
  Key,
  Shield,
  LogOut,
  CheckCircle2,
  XCircle,
  Code,
  Trash2,
  Edit2,
  Eye,
  Settings,
  Copy,
  Check,
  Building2,
  Clock,
  ExternalLink,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from "@/components/mode-toggle";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type RegisteredSite = {
  id: string;
  url: string;
  registeredAt: string;
  lastCheckedAt: string;
};

type License = {
  id: string;
  key: string;
  maxSites: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  _count: {
    sites: number;
  };
};

// -------------------------------------------------------------
// Admin Top Navigation Bar
// -------------------------------------------------------------
const AdminNavbar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  return (
    <nav className="w-[100%] sticky top-0 z-50 bg-white/95 dark:bg-[#18111d]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-[0.625rem] shadow-sm">
      <div className="w-[92%] max-w-[96%] mx-auto px-[1%]">
        <div className="w-[100%] flex items-center justify-between">
          {/* Logo & Agency Branding */}
          <div className="flex items-center gap-[0.75rem]">
            <div className="w-[2.25rem] h-[2.25rem] rounded-[0.5rem] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              <Building2 className="w-[1.25rem] h-[1.25rem] text-[#e7258a]" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-[0.375rem]">
                <span className="text-[0.9375rem] font-bold text-slate-900 dark:text-white tracking-tight">
                  ระบบงานดิจิทัล กรมบังคับคดี
                </span>
                <span className="px-[0.3125rem] py-[0.0625rem] bg-slate-100 dark:bg-slate-800 text-[#e7258a] border border-slate-200 dark:border-slate-700 rounded-[0.25rem] text-[0.625rem] font-bold">
                  Admin Console
                </span>
              </div>
              <span className="text-[0.6875rem] text-slate-500 dark:text-slate-400">
                ระบบบริหารจัดการใบอนุญาตดิจิทัล (MLicense Management)
              </span>
            </div>
          </div>

          {/* Action Tools & User Menu */}
          <div className="flex items-center gap-[0.75rem]">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex border-slate-200 text-slate-700 dark:text-slate-200 rounded-[0.375rem] text-[0.8125rem] h-[2.125rem] px-[0.75rem]"
            >
              <Link href="/" target="_blank" className="flex items-center gap-[0.25rem]">
                <ExternalLink className="w-[0.8125rem] h-[0.8125rem]" />
                ดูหน้าพอร์ทัลหลัก
              </Link>
            </Button>

            <ModeToggle />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-[2.125rem] w-[2.125rem] rounded-full p-0">
                  <Avatar className="h-[2.125rem] w-[2.125rem] border border-slate-200 dark:border-slate-700">
                    <AvatarImage src="/avatars/01.png" alt="@admin" />
                    <AvatarFallback className="text-[0.75rem] font-bold bg-[#e7258a] text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[14rem]" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-[0.75rem]">
                  <div className="flex flex-col space-y-[0.125rem]">
                    <p className="text-[0.875rem] font-bold text-slate-900 dark:text-white leading-none">
                      ผู้ดูแลระบบ (Admin)
                    </p>
                    <p className="text-[0.6875rem] text-slate-500 leading-none mt-[0.25rem]">
                      ศูนย์เทคโนโลยีสารสนเทศ กรมบังคับคดี
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onOpenSettings} className="cursor-pointer text-[0.8125rem]">
                  <Settings className="mr-[0.5rem] w-[0.9375rem] h-[0.9375rem]" />
                  <span>ตั้งค่าบัญชี & ระบบ</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
                      window.location.href = '/sys-login';
                    });
                  }}
                  className="cursor-pointer text-destructive focus:text-destructive text-[0.8125rem]"
                >
                  <LogOut className="mr-[0.5rem] w-[0.9375rem] h-[0.9375rem]" />
                  <span>ออกจากระบบ</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

// -------------------------------------------------------------
// Main Admin Page Component
// -------------------------------------------------------------
export default function AdminPage() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [origin, setOrigin] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Form State for creating new license
  const [formData, setFormData] = useState({
    key: '',
    maxSites: 1,
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  // Modals state
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSitesOpen, setIsSitesOpen] = useState(false);
  const [sitesData, setSitesData] = useState<RegisteredSite[]>([]);
  const [sitesLoading, setSitesLoading] = useState(false);

  // Edit Form Data
  const [editData, setEditData] = useState({
    maxSites: 1,
    validUntil: '',
    isActive: true
  });

  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsData, setSettingsData] = useState({ username: '', password: '' });
  const [systemSettings, setSystemSettings] = useState({ contactUrl: '' });

  useEffect(() => {
    setOrigin(window.location.origin);
    fetchLicenses();
  }, []);

  useEffect(() => {
    if (isSettingsOpen) {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data.contactUrl) setSystemSettings({ contactUrl: data.contactUrl });
        })
        .catch(err => console.error(err));
    }
  }, [isSettingsOpen]);

  const fetchLicenses = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/licenses');
      const data = await res.json();
      setLicenses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch licenses', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        validFrom: new Date(formData.validFrom + 'T00:00:00').toISOString(),
        validUntil: new Date(formData.validUntil + 'T23:59:59').toISOString(),
      };
      const res = await fetch('/api/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchLicenses();
        setFormData({
          key: '',
          maxSites: 1,
          validFrom: new Date().toISOString().split('T')[0],
          validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
      } else {
        alert('เกิดข้อผิดพลาดในการสร้างใบอนุญาต');
      }
    } catch (error) {
      console.error('Error creating license', error);
    }
  };

  const generateKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const key = `${segment()}-${segment()}-${segment()}-${segment()}`;
    setFormData(prev => ({ ...prev, key }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm('ยืนยันการลบใบอนุญาตนี้? การกระทำนี้ไม่สามารถย้อนกลับได้')) return;
    try {
      const res = await fetch(`/api/licenses/${id}`, { method: 'DELETE' });
      if (res.ok) fetchLicenses();
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const openEdit = (license: License) => {
    setSelectedLicense(license);
    setEditData({
      maxSites: license.maxSites,
      validUntil: new Date(license.validUntil).toISOString().split('T')[0],
      isActive: license.isActive
    });
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLicense) return;
    try {
      const payload = {
        ...editData,
        validUntil: new Date(editData.validUntil + 'T23:59:59').toISOString()
      };
      const res = await fetch(`/api/licenses/${selectedLicense.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsEditOpen(false);
        fetchLicenses();
      }
    } catch (error) {
      console.error('Failed to update', error);
    }
  };

  const openSites = async (license: License) => {
    setSelectedLicense(license);
    setIsSitesOpen(true);
    setSitesLoading(true);
    try {
      const res = await fetch(`/api/licenses/${license.id}/sites`);
      const data = await res.json();
      setSitesData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch sites', error);
    } finally {
      setSitesLoading(false);
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    if (!confirm('ต้องการลบการเชื่อมต่อเว็บไซต์นี้หรือไม่?')) return;
    try {
      const res = await fetch(`/api/sites/${siteId}`, { method: 'DELETE' });
      if (res.ok && selectedLicense) {
        openSites(selectedLicense);
        fetchLicenses();
      }
    } catch (error) {
      console.error('Failed to delete site', error);
    }
  };

  const handleUpdateSite = async (site: RegisteredSite) => {
    const newUrl = prompt('ระบุ URL โดเมนใหม่:', site.url);
    if (newUrl === null || newUrl.trim() === '' || newUrl === site.url) return;

    try {
      const res = await fetch(`/api/sites/${site.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newUrl.trim() }),
      });
      if (res.ok && selectedLicense) {
        openSites(selectedLicense);
      }
    } catch (error) {
      console.error('Failed to update site', error);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });
      if (res.ok) {
        alert('อัปเดตข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
        fetch('/api/auth/logout', { method: 'POST' }).then(() => {
          window.location.href = '/sys-login';
        });
      } else {
        alert('ไม่สามารถอัปเดตข้อมูลได้');
      }
    } catch (error) {
      console.error('Update settings failed', error);
    }
  };

  const handleSystemUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(systemSettings),
      });
      if (res.ok) {
        alert('บันทึกการตั้งค่าระบบเรียบร้อยแล้ว');
      } else {
        alert('ไม่สามารถบันทึกการตั้งค่าระบบได้');
      }
    } catch (error) {
      console.error('Update system settings failed', error);
    }
  };

  const handleCopySnippet = () => {
    const snippet = `<script src="${origin}/license.js" data-key="LICENSE_KEY"></script>`;
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  // Metrics calculations
  const totalLicenses = licenses.length;
  const activeLicenses = licenses.filter(l => l.isActive).length;
  const totalSites = licenses.reduce((sum, l) => sum + (l._count?.sites || 0), 0);
  const expiringSoon = licenses.filter(l => {
    const until = new Date(l.validUntil).getTime();
    const thirtyDays = Date.now() + 30 * 24 * 60 * 60 * 1000;
    return until > Date.now() && until <= thirtyDays;
  }).length;

  const filteredLicenses = licenses.filter(l =>
    l.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[100%] min-h-screen bg-slate-50/50 dark:bg-[#0f0a12] text-slate-900 dark:text-slate-100 font-sans">
      <AdminNavbar onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Container - Percentage Layout */}
      <div className="w-[92%] max-w-[96%] mx-auto py-[2.5%] px-[1%]">
        {/* Dashboard Title & Quick Header */}
        <div className="w-[100%] flex flex-col md:flex-row md:items-center justify-between gap-[1rem] mb-[2%]">
          <div>
            <h1 className="text-[1.5rem] sm:text-[1.75rem] font-bold text-slate-900 dark:text-white tracking-tight">
              ระบบบริหารจัดการใบอนุญาตดิจิทัล
            </h1>
            <p className="text-[0.8125rem] text-slate-500 dark:text-slate-400 mt-[0.125rem]">
              ศูนย์ควบคุมการออกและตรวจสอบใบอนุญาตการใช้งานระบบงานดิจิทัล กรมบังคับคดี
            </p>
          </div>

          <div className="flex items-center gap-[0.5rem]">
            <Button
              onClick={fetchLicenses}
              variant="outline"
              size="sm"
              className="text-[0.8125rem] h-[2.125rem] border-slate-200 text-slate-700 dark:text-slate-200"
            >
              <RefreshCw className={`w-[0.875rem] h-[0.875rem] mr-[0.375rem] ${loading ? 'animate-spin' : ''}`} />
              รีเฟรชข้อมูล
            </Button>
          </div>
        </div>

        {/* 4 Metric KPI Cards - Percentage Grid & Rem Fonts */}
        <div className="w-[100%] grid grid-cols-2 lg:grid-cols-4 gap-[1.5%] mb-[2.5%]">
          <div className="fluent-glass-card rounded-[0.75rem] p-[5%]">
            <div className="flex items-center justify-between">
              <span className="text-[0.75rem] font-medium text-slate-500 dark:text-slate-400">
                ใบอนุญาตทั้งหมด
              </span>
              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
                <Key className="w-[1rem] h-[1rem]" />
              </div>
            </div>
            <div className="text-[1.75rem] font-bold text-slate-900 dark:text-white mt-[0.5rem]">
              {totalLicenses}
            </div>
            <div className="text-[0.6875rem] text-slate-500 mt-[0.25rem]">
              รวมทุกประเภทในระบบ
            </div>
          </div>

          <div className="fluent-glass-card rounded-[0.75rem] p-[5%]">
            <div className="flex items-center justify-between">
              <span className="text-[0.75rem] font-medium text-slate-500 dark:text-slate-400">
                เปิดใช้งานอยู่ (Active)
              </span>
              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-[1rem] h-[1rem]" />
              </div>
            </div>
            <div className="text-[1.75rem] font-bold text-emerald-600 mt-[0.5rem]">
              {activeLicenses}
            </div>
            <div className="text-[0.6875rem] text-slate-500 mt-[0.25rem]">
              พร้อมให้บริการปกติ
            </div>
          </div>

          <div className="fluent-glass-card rounded-[0.75rem] p-[5%]">
            <div className="flex items-center justify-between">
              <span className="text-[0.75rem] font-medium text-slate-500 dark:text-slate-400">
                โดเมนที่เชื่อมต่อ
              </span>
              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600">
                <Globe className="w-[1rem] h-[1rem]" />
              </div>
            </div>
            <div className="text-[1.75rem] font-bold text-slate-900 dark:text-white mt-[0.5rem]">
              {totalSites}
            </div>
            <div className="text-[0.6875rem] text-slate-500 mt-[0.25rem]">
              Active Registered Sites
            </div>
          </div>

          <div className="fluent-glass-card rounded-[0.75rem] p-[5%]">
            <div className="flex items-center justify-between">
              <span className="text-[0.75rem] font-medium text-slate-500 dark:text-slate-400">
                ใกล้หมดอายุ (ใน 30 วัน)
              </span>
              <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-600">
                <Clock className="w-[1rem] h-[1rem]" />
              </div>
            </div>
            <div className={`text-[1.75rem] font-bold mt-[0.5rem] ${expiringSoon > 0 ? 'text-amber-600' : 'text-slate-900 dark:text-white'}`}>
              {expiringSoon}
            </div>
            <div className="text-[0.6875rem] text-slate-500 mt-[0.25rem]">
              ต้องติดตามต่ออายุ
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="w-[100%] grid grid-cols-1 lg:grid-cols-3 gap-[2.5%] items-start">
          {/* Left Column: Integration Guide & Create Form */}
          <div className="w-[100%] space-y-[1.5rem]">
            {/* Integration Snippet Card */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="fluent-glass-card rounded-[0.75rem] p-[6%]">
                <div className="flex items-center justify-between mb-[0.625rem]">
                  <div className="flex items-center gap-[0.375rem] text-slate-900 dark:text-white font-bold text-[0.9375rem]">
                    <Code className="w-[1rem] h-[1rem] text-[#e7258a]" />
                    <span>โค้ดเชื่อมต่อระบบ (Client SDK)</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleCopySnippet}
                    className="h-[1.75rem] px-[0.5rem] text-[0.75rem] text-slate-600 hover:text-[#e7258a]"
                  >
                    {copiedSnippet ? (
                      <>
                        <Check className="w-[0.75rem] h-[0.75rem] mr-[0.25rem] text-emerald-600" />
                        คัดลอกแล้ว
                      </>
                    ) : (
                      <>
                        <Copy className="w-[0.75rem] h-[0.75rem] mr-[0.25rem]" />
                        คัดลอก
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-[0.75rem] text-slate-500 mb-[0.75rem] leading-relaxed">
                  นำสคริปต์นี้ไปวางไว้ในแท็ก <code className="bg-slate-100 dark:bg-slate-800 px-[0.25rem] rounded text-[0.6875rem]">&lt;head&gt;</code> ของเว็บไซต์ลูกข่าย
                </p>
                <div className="bg-slate-900 text-slate-200 p-[4%] rounded-[0.5rem] font-mono text-[0.6875rem] overflow-x-auto whitespace-nowrap shadow-inner border border-slate-800">
                  &lt;script src=&quot;{origin}/license.js&quot; data-key=&quot;LICENSE_KEY&quot;&gt;&lt;/script&gt;
                </div>
              </div>
            </motion.div>

            {/* Create License Form Card */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
              <div className="fluent-glass-card rounded-[0.75rem] p-[6%]">
                <div className="flex items-center gap-[0.375rem] text-slate-900 dark:text-white font-bold text-[0.9375rem] mb-[1rem]">
                  <Plus className="w-[1rem] h-[1rem] text-[#e7258a]" />
                  <span>ออกใบอนุญาตใหม่ (New License)</span>
                </div>

                <form onSubmit={handleCreate} className="space-y-[1rem]">
                  <div className="space-y-[0.375rem]">
                    <Label htmlFor="licenseKey" className="text-[0.8125rem]">รหัสใบอนุญาต (License Key)</Label>
                    <div className="flex gap-[0.5rem]">
                      <div className="relative flex-1">
                        <Key className="absolute left-[0.625rem] top-[0.625rem] w-[0.875rem] h-[0.875rem] text-slate-400" />
                        <Input
                          id="licenseKey"
                          value={formData.key}
                          onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                          className="pl-[2rem] font-mono text-[0.8125rem] h-[2.25rem]"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateKey}
                        className="text-[0.75rem] h-[2.25rem] px-[0.75rem] border-slate-200"
                      >
                        สุ่ม Key
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-[0.375rem]">
                    <Label htmlFor="maxSites" className="text-[0.8125rem]">จำนวนโดเมนสูงสุดที่อนุญาต (Max Sites)</Label>
                    <div className="relative">
                      <Globe className="absolute left-[0.625rem] top-[0.625rem] w-[0.875rem] h-[0.875rem] text-slate-400" />
                      <Input
                        id="maxSites"
                        type="number"
                        value={formData.maxSites}
                        onChange={(e) => setFormData({ ...formData, maxSites: parseInt(e.target.value) || 1 })}
                        className="pl-[2rem] text-[0.8125rem] h-[2.25rem]"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-[3%]">
                    <div className="space-y-[0.375rem]">
                      <Label htmlFor="validFrom" className="text-[0.8125rem]">วันเริ่มต้น (From)</Label>
                      <Input
                        id="validFrom"
                        type="date"
                        value={formData.validFrom}
                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                        className="text-[0.8125rem] h-[2.25rem]"
                        required
                      />
                    </div>
                    <div className="space-y-[0.375rem]">
                      <Label htmlFor="validUntil" className="text-[0.8125rem]">วันหมดอายุ (Until)</Label>
                      <Input
                        id="validUntil"
                        type="date"
                        value={formData.validUntil}
                        onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                        className="text-[0.8125rem] h-[2.25rem]"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-[100%] bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.875rem] h-[2.5rem] rounded-[0.5rem] font-medium shadow-sm transition-all"
                  >
                    สร้างใบอนุญาต
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Right Column: License List Table */}
          <div className="w-[100%] lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
              <div className="fluent-glass-card rounded-[0.75rem] p-[4%]">
                {/* Table Header & Search Controls */}
                <div className="w-[100%] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[0.75rem] pb-[1rem] border-b border-slate-200 dark:border-slate-800 mb-[1rem]">
                  <div className="flex items-center gap-[0.5rem]">
                    <div className="w-[2rem] h-[2rem] rounded-[0.375rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#e7258a]">
                      <Shield className="w-[1rem] h-[1rem]" />
                    </div>
                    <div>
                      <h2 className="text-[1rem] font-bold text-slate-900 dark:text-white leading-tight">
                        รายการใบอนุญาตในระบบ
                      </h2>
                      <p className="text-[0.75rem] text-slate-500">
                        พบทั้งหมด {filteredLicenses.length} รายการ
                      </p>
                    </div>
                  </div>

                  <div className="relative w-[100%] sm:w-[15rem]">
                    <Search className="absolute left-[0.625rem] top-[0.55rem] w-[0.875rem] h-[0.875rem] text-slate-400" />
                    <Input
                      placeholder="ค้นหาตาม License Key..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-[1.875rem] text-[0.8125rem] h-[2rem]"
                    />
                  </div>
                </div>

                {/* Table Responsive Wrapper */}
                <div className="w-[100%] overflow-x-auto">
                  <Table className="w-[100%] text-[0.8125rem]">
                    <TableHeader>
                      <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                        <TableHead className="w-[35%] text-[0.75rem] font-semibold text-slate-700 dark:text-slate-300">
                          รหัสใบอนุญาต (License Key)
                        </TableHead>
                        <TableHead className="w-[20%] text-[0.75rem] font-semibold text-slate-700 dark:text-slate-300">
                          การใช้งานโดเมน
                        </TableHead>
                        <TableHead className="w-[20%] hidden md:table-cell text-[0.75rem] font-semibold text-slate-700 dark:text-slate-300">
                          อายุการใช้งาน
                        </TableHead>
                        <TableHead className="w-[12%] text-center text-[0.75rem] font-semibold text-slate-700 dark:text-slate-300">
                          สถานะ
                        </TableHead>
                        <TableHead className="w-[13%] text-right text-[0.75rem] font-semibold text-slate-700 dark:text-slate-300">
                          จัดการ
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-[6rem] text-center text-slate-500 text-[0.8125rem]">
                            <div className="flex items-center justify-center gap-[0.5rem]">
                              <RefreshCw className="w-[1rem] h-[1rem] animate-spin text-[#e7258a]" />
                              กำลังโหลดข้อมูลใบอนุญาต...
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : filteredLicenses.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-[6rem] text-center text-slate-500 text-[0.8125rem]">
                            ไม่พบรายการใบอนุญาตที่ตรงกับคำค้นหา
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLicenses.map((license) => (
                          <TableRow key={license.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                            {/* License Key */}
                            <TableCell className="font-mono font-medium text-slate-900 dark:text-slate-100">
                              <div className="flex items-center gap-[0.375rem]">
                                <div className="p-[0.25rem] bg-slate-100 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300">
                                  <Key className="w-[0.875rem] h-[0.875rem]" />
                                </div>
                                <span className="tracking-tight text-[0.8125rem]">{license.key}</span>
                              </div>
                            </TableCell>

                            {/* Sites Usage */}
                            <TableCell>
                              <div className="flex items-center gap-[0.375rem]">
                                <Globe className="w-[0.8125rem] h-[0.8125rem] text-slate-400" />
                                <span
                                  className={`font-semibold text-[0.8125rem] ${
                                    license._count.sites >= license.maxSites
                                      ? 'text-amber-600 dark:text-amber-400 font-bold'
                                      : 'text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  {license._count.sites} / {license.maxSites} โดเมน
                                </span>
                              </div>
                            </TableCell>

                            {/* Validity */}
                            <TableCell className="hidden md:table-cell">
                              <div className="text-[0.75rem] space-y-[0.125rem] text-slate-500">
                                <div>เริ่ม: {new Date(license.validFrom).toLocaleDateString('th-TH')}</div>
                                <div>ถึง: {new Date(license.validUntil).toLocaleDateString('th-TH')}</div>
                              </div>
                            </TableCell>

                            {/* Status */}
                            <TableCell className="text-center">
                              <Badge
                                variant={license.isActive ? "default" : "secondary"}
                                className={`text-[0.6875rem] font-medium px-[0.5rem] py-[0.125rem] ${
                                  license.isActive
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                {license.isActive ? (
                                  <span className="flex items-center gap-[0.25rem]">
                                    <CheckCircle2 className="w-[0.75rem] h-[0.75rem]" /> ปกติ
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-[0.25rem]">
                                    <XCircle className="w-[0.75rem] h-[0.75rem]" /> ปิดใช้งาน
                                  </span>
                                )}
                              </Badge>
                            </TableCell>

                            {/* Action Buttons */}
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-[0.25rem]">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-[1.75rem] w-[1.75rem] rounded-[0.25rem] text-slate-600 hover:text-[#e7258a]"
                                  onClick={() => openSites(license)}
                                  title="ดูโดเมนที่เชื่อมต่อ"
                                >
                                  <Eye className="w-[0.875rem] h-[0.875rem]" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-[1.75rem] w-[1.75rem] rounded-[0.25rem] text-slate-600 hover:text-amber-600"
                                  onClick={() => openEdit(license)}
                                  title="แก้ไขรายละเอียด"
                                >
                                  <Edit2 className="w-[0.875rem] h-[0.875rem]" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-[1.75rem] w-[1.75rem] rounded-[0.25rem] text-slate-600 hover:text-destructive"
                                  onClick={() => handleDelete(license.id)}
                                  title="ลบใบอนุญาต"
                                >
                                  <Trash2 className="w-[0.875rem] h-[0.875rem]" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Edit License Modal (Percentage Width & Rem Font) */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="w-[92%] sm:w-[80%] md:w-[50%] lg:w-[35%] max-w-[95%] rounded-[0.75rem] p-[5%]">
          <DialogHeader>
            <DialogTitle className="text-[1.125rem] font-bold text-slate-900 dark:text-white">
              แก้ไขข้อมูลใบอนุญาต
            </DialogTitle>
            <DialogDescription className="text-[0.75rem] font-mono text-slate-500 mt-[0.125rem]">
              {selectedLicense?.key}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-[1rem] mt-[0.75rem]">
            <div className="space-y-[0.375rem]">
              <Label htmlFor="edit-maxSites" className="text-[0.8125rem]">จำนวนโดเมนสูงสุด (Max Sites)</Label>
              <Input
                id="edit-maxSites"
                type="number"
                value={editData.maxSites}
                onChange={(e) => setEditData({ ...editData, maxSites: parseInt(e.target.value) || 1 })}
                className="text-[0.8125rem] h-[2.25rem]"
                min="1"
                required
              />
            </div>

            <div className="space-y-[0.375rem]">
              <Label htmlFor="edit-validUntil" className="text-[0.8125rem]">วันหมดอายุ (Valid Until)</Label>
              <Input
                id="edit-validUntil"
                type="date"
                value={editData.validUntil}
                onChange={(e) => setEditData({ ...editData, validUntil: e.target.value })}
                className="text-[0.8125rem] h-[2.25rem]"
                required
              />
            </div>

            <div className="flex items-center space-x-[0.5rem] pt-[0.25rem]">
              <input
                type="checkbox"
                id="isActive"
                checked={editData.isActive}
                onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })}
                className="h-[1rem] w-[1rem] rounded border-slate-300 text-[#e7258a] focus:ring-[#e7258a] accent-[#e7258a]"
              />
              <Label htmlFor="isActive" className="text-[0.8125rem] font-medium cursor-pointer">
                เปิดสถานะการใช้งานใบอนุญาต (Active Status)
              </Label>
            </div>

            <DialogFooter className="gap-[0.5rem] pt-[0.75rem]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="text-[0.8125rem] h-[2.25rem]"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.8125rem] h-[2.25rem]"
              >
                บันทึกการเปลี่ยนแปลง
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* Connected Sites Modal (Percentage Width & Rem Font) */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={isSitesOpen} onOpenChange={setIsSitesOpen}>
        <DialogContent className="w-[92%] sm:w-[85%] md:w-[70%] lg:w-[50%] max-w-[95%] max-h-[85vh] flex flex-col rounded-[0.75rem] p-[5%]">
          <DialogHeader>
            <DialogTitle className="text-[1.125rem] font-bold text-slate-900 dark:text-white flex items-center gap-[0.375rem]">
              <Globe className="w-[1.125rem] h-[1.125rem] text-[#e7258a]" />
              โดเมนที่เชื่อมต่อกับใบอนุญาต
            </DialogTitle>
            <DialogDescription className="font-mono text-[0.75rem] text-slate-500">
              {selectedLicense?.key} (จำกัด {selectedLicense?.maxSites} โดเมน)
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto min-h-[12rem] my-[0.75rem]">
            {sitesLoading ? (
              <div className="flex flex-col items-center justify-center py-[3rem] text-slate-400 text-[0.8125rem]">
                <RefreshCw className="w-[1.5rem] h-[1.5rem] animate-spin text-[#e7258a] mb-[0.5rem]" />
                <p>กำลังโหลดข้อมูลโดเมน...</p>
              </div>
            ) : sitesData.length === 0 ? (
              <div className="text-center py-[3rem] text-slate-400 text-[0.8125rem]">
                ยังไม่มีโดเมนหรือเว็บไซต์ใดลงทะเบียนใช้งานกับ License นี้
              </div>
            ) : (
              <Table className="w-[100%] text-[0.8125rem]">
                <TableHeader>
                  <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                    <TableHead className="text-[0.75rem]">URL เว็บไซต์ / โดเมน</TableHead>
                    <TableHead className="text-[0.75rem]">วันที่ลงทะเบียน</TableHead>
                    <TableHead className="text-center text-[0.75rem]">ใช้งานล่าสุด</TableHead>
                    <TableHead className="text-right text-[0.75rem]">จัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sitesData.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell className="font-medium font-mono text-[0.8125rem] text-slate-900 dark:text-slate-100">
                        {site.url}
                      </TableCell>
                      <TableCell className="text-slate-500 text-[0.75rem]">
                        {new Date(site.registeredAt).toLocaleDateString('th-TH')}
                      </TableCell>
                      <TableCell className="text-center text-slate-500 text-[0.75rem]">
                        {site.lastCheckedAt ? new Date(site.lastCheckedAt).toLocaleString('th-TH') : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-[0.25rem]">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-[1.75rem] w-[1.75rem] text-slate-600 hover:text-amber-600"
                            onClick={() => handleUpdateSite(site)}
                            title="แก้ไข URL"
                          >
                            <Edit2 className="w-[0.8125rem] h-[0.8125rem]" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-[1.75rem] w-[1.75rem] text-slate-600 hover:text-destructive"
                            onClick={() => handleDeleteSite(site.id)}
                            title="ลบโดเมนนี้"
                          >
                            <Trash2 className="w-[0.8125rem] h-[0.8125rem]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSitesOpen(false)}
              className="text-[0.8125rem] h-[2.125rem]"
            >
              ปิดหน้าต่าง
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------------------------------------------------- */}
      {/* Settings Modal (Percentage Width & Rem Font) */}
      {/* ------------------------------------------------------------- */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="w-[92%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-[95%] max-h-[85vh] overflow-y-auto rounded-[0.75rem] p-[5%]">
          <DialogHeader>
            <DialogTitle className="text-[1.125rem] font-bold text-slate-900 dark:text-white flex items-center gap-[0.375rem]">
              <Settings className="w-[1.125rem] h-[1.125rem] text-[#e7258a]" />
              การตั้งค่าระบบและบัญชีผู้ดูแล
            </DialogTitle>
            <DialogDescription className="text-[0.75rem] text-slate-500">
              กำหนดค่าความปลอดภัยและข้อมูลติดต่อของระบบ
            </DialogDescription>
          </DialogHeader>

          {/* Admin Credentials Form */}
          <form onSubmit={handleUpdateSettings} className="space-y-[1rem] mt-[0.5rem]">
            <h3 className="text-[0.875rem] font-bold text-slate-900 dark:text-white">
              เปลี่ยนรหัสผ่านหรือชื่อผู้ดูแลระบบ
            </h3>

            <div className="space-y-[0.375rem]">
              <Label htmlFor="new-username" className="text-[0.8125rem]">ชื่อผู้ใช้งานใหม่ (เว้นว่างหากไม่เปลี่ยน)</Label>
              <Input
                id="new-username"
                type="text"
                value={settingsData.username}
                onChange={(e) => setSettingsData({ ...settingsData, username: e.target.value })}
                placeholder="ระบุ Username ใหม่"
                className="text-[0.8125rem] h-[2.25rem]"
              />
            </div>

            <div className="space-y-[0.375rem]">
              <Label htmlFor="new-password" className="text-[0.8125rem]">รหัสผ่านใหม่ (เว้นว่างหากไม่เปลี่ยน)</Label>
              <Input
                id="new-password"
                type="password"
                value={settingsData.password}
                onChange={(e) => setSettingsData({ ...settingsData, password: e.target.value })}
                placeholder="ระบุ Password ใหม่"
                className="text-[0.8125rem] h-[2.25rem]"
              />
            </div>

            <div className="p-[0.75rem] bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-[0.5rem]">
              <p className="text-[0.75rem] text-amber-700 dark:text-amber-300 flex items-center gap-[0.25rem]">
                <AlertTriangle className="w-[0.875rem] h-[0.875rem] shrink-0" />
                เมื่อบันทึกข้อมูลเรียบร้อยแล้ว ระบบจะทำการออกจากระบบโดยอัตโนมัติ
              </p>
            </div>

            <Button
              type="submit"
              className="w-[100%] bg-[#e7258a] hover:bg-[#c81a73] text-white text-[0.8125rem] h-[2.25rem] rounded-[0.375rem]"
            >
              อัปเดตข้อมูลผู้ดูแลระบบ
            </Button>
          </form>

          <Separator className="my-[1.25rem]" />

          {/* System Settings Form */}
          <form onSubmit={handleSystemUpdate} className="space-y-[1rem]">
            <h3 className="text-[0.875rem] font-bold text-slate-900 dark:text-white">
              การตั้งค่าระบบ (System Configuration)
            </h3>

            <div className="space-y-[0.375rem]">
              <Label htmlFor="contact-url" className="text-[0.8125rem]">ลิงก์ติดต่อแจ้งเตือนกรณีสิทธิ์หมดอายุ (Contact URL)</Label>
              <Input
                id="contact-url"
                type="text"
                value={systemSettings.contactUrl}
                onChange={(e) => setSystemSettings({ ...systemSettings, contactUrl: e.target.value })}
                placeholder="mailto:support@example.com หรือ https://..."
                className="text-[0.8125rem] h-[2.25rem]"
              />
              <p className="text-[0.6875rem] text-slate-400">
                ลิงก์นี้จะปรากฏบนหน้าจอแจ้งเตือนเมื่อระบบของลูกข่ายหมดอายุหรือไม่ถูกต้อง
              </p>
            </div>

            <Button
              type="submit"
              variant="outline"
              className="w-[100%] border-slate-300 text-slate-700 dark:text-slate-200 text-[0.8125rem] h-[2.25rem]"
            >
              บันทึกการตั้งค่าระบบ
            </Button>
          </form>

          <div className="mt-[1.25rem] pt-[1rem] border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-[0.75rem] font-medium text-slate-500 mb-[0.5rem]">
              พื้นที่จัดการขั้นสูง (Advanced Zone)
            </h4>
            <Button
              variant="outline"
              className="w-[100%] border-destructive/40 text-destructive hover:bg-destructive/10 text-[0.8125rem] h-[2.25rem]"
              asChild
            >
              <Link href="/install">
                <Shield className="w-[0.875rem] h-[0.875rem] mr-[0.375rem]" />
                ติดตั้งระบบใหม่ (Reset Admin Account)
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
