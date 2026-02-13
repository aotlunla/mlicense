'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Globe, Key, Shield, LogOut, CheckCircle, XCircle, Code, Trash2, Edit2, Eye, X, Settings } from 'lucide-react';
import Link from 'next/link';

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

const AdminNavbar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            oatedit
                        </Link>
                        <span className="ml-2 px-2 py-0.5 rounded text-xs bg-blue-50 text-blue-600 font-medium border border-blue-100">Admin</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={onOpenSettings} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </button>
                        <button onClick={() => {
                            fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/sys-login');
                        }} className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm font-medium">
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default function AdminPage() {
    const [licenses, setLicenses] = useState<License[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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

    // Settings Modal
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [settingsData, setSettingsData] = useState({ username: '', password: '' });
    const [systemSettings, setSystemSettings] = useState({ contactUrl: '' });

    useEffect(() => {
        if (isSettingsOpen) {
            fetch('/api/settings').then(res => res.json()).then(data => {
                if (data.contactUrl) setSystemSettings({ contactUrl: data.contactUrl });
            });
        }
    }, [isSettingsOpen]);

    const handleUpdateSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settingsData),
            });
            if (res.ok) {
                alert('Settings updated. Please login again.');
                fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/login');
            } else {
                alert('Failed to update settings');
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
                alert('System settings updated successfully.');
            } else {
                alert('Failed to update system settings');
            }
        } catch (error) {
            console.error('Update system settings failed', error);
        }
    };

    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
        fetchLicenses();
    }, []);

    const fetchLicenses = async () => {
        try {
            const res = await fetch('/api/licenses');
            const data = await res.json();
            setLicenses(data);
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
                setFormData({ key: '', maxSites: 1, validFrom: new Date().toISOString().split('T')[0], validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] });
            } else {
                alert('Failed to create license');
            }
        } catch (error) {
            console.error('Error creating license', error);
        }
    };

    const generateKey = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const key = `${segment()}-${segment()}-${segment()}-${segment()}`;
        setFormData({ ...formData, key });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this license? This action cannot be undone.')) return;
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

    const handleDeleteSite = async (siteId: string) => {
        if (!confirm('Are you sure you want to remove this site?')) return;
        try {
            const res = await fetch(`/api/sites/${siteId}`, { method: 'DELETE' });
            if (res.ok) {
                if (selectedLicense) openSites(selectedLicense);
            }
        } catch (error) {
            console.error('Failed to delete site', error);
        }
    };

    const handleUpdateSite = async (site: RegisteredSite) => {
        const newUrl = prompt('Enter new URL:', site.url);
        if (newUrl === null || newUrl === site.url) return;

        try {
            const res = await fetch(`/api/sites/${site.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: newUrl }),
            });
            if (res.ok) {
                if (selectedLicense) openSites(selectedLicense);
            }
        } catch (error) {
            console.error('Failed to update site', error);
        }
    };

    const openSites = async (license: License) => {
        setSelectedLicense(license);
        setIsSitesOpen(true);
        setSitesLoading(true);
        try {
            const res = await fetch(`/api/licenses/${license.id}/sites`);
            const data = await res.json();
            setSitesData(data);
        } catch (error) {
            console.error('Failed to fetch sites', error);
        } finally {
            setSitesLoading(false);
        }
    };

    const filteredLicenses = licenses.filter(l => l.key.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700">
            <AdminNavbar onOpenSettings={() => setIsSettingsOpen(true)} />

            <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Background Blobs */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-purple-100/50 rounded-full blur-[100px]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Create License & Instructions */}
                    <div className="space-y-8">
                        {/* Integration Guide */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
                        >
                            <div className="flex items-center mb-4 text-blue-600">
                                <Code className="w-5 h-5 mr-2" />
                                <h2 className="text-lg font-semibold text-gray-900">Integration</h2>
                            </div>
                            <p className="text-sm text-gray-500 mb-4">Add this snippet to your client&apos;s website &lt;head&gt;.</p>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 font-mono text-xs text-gray-600 overflow-x-auto whitespace-nowrap">
                                &lt;script src=&quot;{origin}/license.js&quot; data-key=&quot;LICENSE_KEY&quot;&gt;&lt;/script&gt;
                            </div>
                        </motion.div>

                        {/* Create Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
                        >
                            <div className="flex items-center mb-6 text-purple-600">
                                <Plus className="w-5 h-5 mr-2" />
                                <h2 className="text-lg font-semibold text-gray-900">New License</h2>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">License Key</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={formData.key}
                                                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 placeholder-gray-400 text-sm"
                                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                                required
                                            />
                                            <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={generateKey}
                                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-600 text-xs transition-colors font-medium"
                                        >
                                            Gen
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Max Sites</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={formData.maxSites}
                                            onChange={(e) => setFormData({ ...formData, maxSites: parseInt(e.target.value) })}
                                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 text-sm"
                                            min="1"
                                            required
                                        />
                                        <Globe className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Valid From</label>
                                        <input
                                            type="date"
                                            value={formData.validFrom}
                                            onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 text-xs"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Valid Until</label>
                                        <input
                                            type="date"
                                            value={formData.validUntil}
                                            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 text-xs"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity mt-4"
                                >
                                    Create License
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right Column: License List */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full"
                        >
                            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center text-gray-900">
                                    <Shield className="w-5 h-5 mr-3 text-green-600" />
                                    <h2 className="text-lg font-semibold">Active Licenses</h2>
                                    <span className="ml-3 px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-600 font-medium">
                                        {licenses.length}
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search keys..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full sm:w-64 transition-all"
                                    />
                                    <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-gray-400" />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider bg-gray-50/50">
                                            <th className="p-4 font-medium">License Key</th>
                                            <th className="p-4 font-medium">Usage</th>
                                            <th className="p-4 font-medium hidden md:table-cell">Validity</th>
                                            <th className="p-4 font-medium text-center">Status</th>
                                            <th className="p-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {loading ? (
                                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading licenses...</td></tr>
                                        ) : filteredLicenses.length === 0 ? (
                                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No licenses found.</td></tr>
                                        ) : (
                                            filteredLicenses.map((license) => (
                                                <tr key={license.id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="p-4">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-3 text-blue-600 group-hover:bg-blue-100 transition-colors">
                                                                <Key className="w-4 h-4" />
                                                            </div>
                                                            <span className="font-mono text-sm text-gray-700 font-medium">{license.key}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Globe className="w-4 h-4 mr-2 text-gray-400" />
                                                            <span className={license._count.sites >= license.maxSites ? 'text-orange-600 font-medium' : ''}>
                                                                {license._count.sites} / {license.maxSites}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 hidden md:table-cell">
                                                        <div className="text-xs text-gray-500 space-y-1">
                                                            <div className="flex items-center">
                                                                <span className="w-12 text-gray-400">From:</span>
                                                                <span>{new Date(license.validFrom).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-12 text-gray-400">Until:</span>
                                                                <span>{new Date(license.validUntil).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        {license.isActive ? (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200">
                                                                <CheckCircle className="w-3 h-3 mr-1.5" /> Active
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-200">
                                                                <XCircle className="w-3 h-3 mr-1.5" /> Inactive
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button
                                                                onClick={() => openSites(license)}
                                                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-500 transition-colors"
                                                                title="View Sites"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => openEdit(license)}
                                                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-yellow-50 hover:text-yellow-600 text-gray-500 transition-colors"
                                                                title="Edit License"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(license.id)}
                                                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 transition-colors"
                                                                title="Delete License"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-md shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Edit License</h3>
                                <button onClick={() => setIsEditOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Max Sites</label>
                                    <input
                                        type="number"
                                        value={editData.maxSites}
                                        onChange={(e) => setEditData({ ...editData, maxSites: parseInt(e.target.value) })}
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Valid Until</label>
                                    <input
                                        type="date"
                                        value={editData.validUntil}
                                        onChange={(e) => setEditData({ ...editData, validUntil: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={editData.isActive}
                                        onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-white"
                                    />
                                    <label htmlFor="isActive" className="text-gray-700">Active License</label>
                                </div>
                                <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                    Save Changes
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Sites Modal */}
            <AnimatePresence>
                {isSitesOpen && selectedLicense && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl shadow-2xl h-[80vh] flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Connected Sites</h3>
                                    <p className="text-sm text-gray-500 font-mono mt-1">{selectedLicense.key}</p>
                                </div>
                                <button onClick={() => setIsSitesOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2">
                                {sitesLoading ? (
                                    <div className="text-center text-gray-500 py-8">Loading sites...</div>
                                ) : sitesData.length === 0 ? (
                                    <div className="text-center text-gray-500 py-8">No sites registered yet.</div>
                                ) : (
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase bg-gray-50/50">
                                                <th className="pb-3 pl-2 pt-3">URL</th>
                                                <th className="pb-3 pt-3">Registered</th>
                                                <th className="pb-3 pt-3 text-center">Last Active</th>
                                                <th className="pb-3 pt-3 text-right pr-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {sitesData.map((site) => (
                                                <tr key={site.id} className="text-sm group hover:bg-gray-50">
                                                    <td className="py-3 pl-2 text-gray-900 font-medium">{site.url}</td>
                                                    <td className="py-3 text-gray-500">{new Date(site.registeredAt).toLocaleDateString()}</td>
                                                    <td className="py-3 text-center text-gray-500">
                                                        {site.lastCheckedAt ? new Date(site.lastCheckedAt).toLocaleString() : '-'}
                                                    </td>
                                                    <td className="py-3 text-right pr-2">
                                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => handleUpdateSite(site)}
                                                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-500 transition-colors"
                                                                title="Edit Site URL"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteSite(site.id)}
                                                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-500 transition-colors"
                                                                title="Remove Site"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-lg shadow-2xl max-h-[85vh] overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Admin Settings</h3>
                                <button onClick={() => setIsSettingsOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleUpdateSettings} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">New Username (Optional)</label>
                                    <input
                                        type="text"
                                        value={settingsData.username}
                                        onChange={(e) => setSettingsData({ ...settingsData, username: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400"
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">New Password (Optional)</label>
                                    <input
                                        type="password"
                                        value={settingsData.password}
                                        onChange={(e) => setSettingsData({ ...settingsData, password: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400"
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>
                                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-xs text-yellow-700">
                                        Changing your credentials will log you out immediately.
                                    </p>
                                </div>
                                <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                    Update Credentials
                                </button>
                            </form>

                            <div className="my-6 border-t border-gray-200" />

                            {/* System Settings Form */}
                            <form onSubmit={handleSystemUpdate} className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-900">System Configuration</h4>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Contact Support URL</label>
                                    <input
                                        type="text"
                                        value={systemSettings.contactUrl}
                                        onChange={(e) => setSystemSettings({ ...systemSettings, contactUrl: e.target.value })}
                                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-gray-400"
                                        placeholder="https://example.com/support"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">Used in the license expired overlay.</p>
                                </div>
                                <button type="submit" className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm">
                                    Save System Settings
                                </button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-medium text-gray-500 mb-4">Danger Zone</h4>
                                <Link
                                    href="/install"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                                >
                                    <Shield className="w-4 h-4 mr-2" />
                                    Re-Install System (Reset Admin)
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
