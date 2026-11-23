'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Globe, Key, Shield, LogOut, CheckCircle, XCircle, Code, Trash2, Edit2, Eye, Settings } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from "@/components/mode-toggle";

// Shadcn Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

const AdminNavbar = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            MLicense
                        </Link>
                        <Badge variant="secondary" className="text-xs">Admin</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatars/01.png" alt="@admin" />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Admin</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            System Administrator
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={onOpenSettings} className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                    fetch('/api/auth/logout', { method: 'POST' }).then(() => window.location.href = '/sys-login');
                                }} className="cursor-pointer text-destructive focus:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
        <div className="min-h-screen bg-background text-foreground font-sans">
            <AdminNavbar onOpenSettings={() => setIsSettingsOpen(true)} />

            <div className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Background Blobs */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-purple-100/50 dark:bg-purple-900/20 rounded-full blur-[100px]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Create License & Instructions */}
                    <div className="space-y-8">
                        {/* Integration Guide */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center text-primary text-lg">
                                        <Code className="w-5 h-5 mr-2" />
                                        Integration
                                    </CardTitle>
                                    <CardDescription>
                                        Add this snippet to your client&apos;s website &lt;head&gt;.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-muted p-3 rounded-lg border font-mono text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">
                                        &lt;script src=&quot;{origin}/license.js&quot; data-key=&quot;LICENSE_KEY&quot;&gt;&lt;/script&gt;
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Create Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center text-primary text-lg">
                                        <Plus className="w-5 h-5 mr-2" />
                                        New License
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleCreate} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="licenseKey">License Key</Label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <Key className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="licenseKey"
                                                        value={formData.key}
                                                        onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                                                        className="pl-9"
                                                        placeholder="XXXX-XXXX-XXXX-XXXX"
                                                        required
                                                    />
                                                </div>
                                                <Button type="button" variant="outline" onClick={generateKey}>
                                                    Gen
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="maxSites">Max Sites</Label>
                                            <div className="relative">
                                                <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="maxSites"
                                                    type="number"
                                                    value={formData.maxSites}
                                                    onChange={(e) => setFormData({ ...formData, maxSites: parseInt(e.target.value) })}
                                                    className="pl-9"
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="validFrom">Valid From</Label>
                                                <Input
                                                    id="validFrom"
                                                    type="date"
                                                    value={formData.validFrom}
                                                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="validUntil">Valid Until</Label>
                                                <Input
                                                    id="validUntil"
                                                    type="date"
                                                    value={formData.validUntil}
                                                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <Button type="submit" className="w-full bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-opacity">
                                            Create License
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Column: License List */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="h-full flex flex-col">
                                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100/50 rounded-lg">
                                            <Shield className="w-5 h-5 text-green-700" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg font-bold">Active Licenses</CardTitle>
                                            <CardDescription>Manage your system licenses</CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="ml-2">
                                            {licenses.length}
                                        </Badge>
                                    </div>
                                    <div className="relative w-full sm:w-64">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search keys..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-9"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 flex-1">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-muted/50">
                                                    <TableHead className="w-[200px]">License Key</TableHead>
                                                    <TableHead>Usage</TableHead>
                                                    <TableHead className="hidden md:table-cell">Validity</TableHead>
                                                    <TableHead className="text-center">Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {loading ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-24 text-center">
                                                            Loading licenses...
                                                        </TableCell>
                                                    </TableRow>
                                                ) : filteredLicenses.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                            No licenses found.
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    filteredLicenses.map((license) => (
                                                        <TableRow key={license.id}>
                                                            <TableCell className="font-mono font-medium">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="p-1.5 bg-primary/10 rounded text-primary">
                                                                        <Key className="w-3.5 h-3.5" />
                                                                    </div>
                                                                    {license.key}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center gap-2">
                                                                    <Globe className="w-4 h-4 text-muted-foreground" />
                                                                    <span className={license._count.sites >= license.maxSites ? 'text-destructive font-bold' : ''}>
                                                                        {license._count.sites} / {license.maxSites}
                                                                    </span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <div className="text-xs space-y-1 text-muted-foreground">
                                                                    <div className="flex justify-between gap-4">
                                                                        <span>From:</span>
                                                                        <span className="font-medium text-foreground">{new Date(license.validFrom).toLocaleDateString()}</span>
                                                                    </div>
                                                                    <div className="flex justify-between gap-4">
                                                                        <span>Until:</span>
                                                                        <span className="font-medium text-foreground">{new Date(license.validUntil).toLocaleDateString()}</span>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Badge variant={license.isActive ? "default" : "destructive"} className={license.isActive ? "bg-green-600 hover:bg-green-700" : ""}>
                                                                    {license.isActive ? (
                                                                        <><CheckCircle className="w-3 h-3 mr-1" /> Active</>
                                                                    ) : (
                                                                        <><XCircle className="w-3 h-3 mr-1" /> Inactive</>
                                                                    )}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-1">
                                                                    <Button variant="ghost" size="icon" onClick={() => openSites(license)} title="View Sites">
                                                                        <Eye className="w-4 h-4 text-muted-foreground" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(license)} title="Edit License">
                                                                        <Edit2 className="w-4 h-4 text-amber-500" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(license.id)} title="Delete License">
                                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit License</DialogTitle>
                        <DialogDescription>Update license details and status.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-maxSites">Max Sites</Label>
                            <Input
                                id="edit-maxSites"
                                type="number"
                                value={editData.maxSites}
                                onChange={(e) => setEditData({ ...editData, maxSites: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-validUntil">Valid Until</Label>
                            <Input
                                id="edit-validUntil"
                                type="date"
                                value={editData.validUntil}
                                onChange={(e) => setEditData({ ...editData, validUntil: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                checked={editData.isActive}
                                onChange={(e) => setEditData({ ...editData, isActive: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="isActive" className="font-normal cursor-pointer">Active License</Label>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Sites Modal */}
            <Dialog open={isSitesOpen} onOpenChange={setIsSitesOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Connected Sites</DialogTitle>
                        <DialogDescription className="font-mono">{selectedLicense?.key}</DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto min-h-[300px]">
                        {sitesLoading ? (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4" />
                                <p>Loading sites...</p>
                            </div>
                        ) : sitesData.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">No sites registered yet.</div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>URL</TableHead>
                                        <TableHead>Registered</TableHead>
                                        <TableHead className="text-center">Last Active</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sitesData.map((site) => (
                                        <TableRow key={site.id}>
                                            <TableCell className="font-medium">{site.url}</TableCell>
                                            <TableCell className="text-muted-foreground">{new Date(site.registeredAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {site.lastCheckedAt ? new Date(site.lastCheckedAt).toLocaleString() : '-'}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleUpdateSite(site)} title="Edit Site URL">
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSite(site.id)} title="Remove Site">
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
            {/* Settings Modal */}
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto w-[95vw]">
                    <DialogHeader>
                        <DialogTitle>Admin Settings</DialogTitle>
                        <DialogDescription>Manage your account and system configurations.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleUpdateSettings} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-username">New Username (Optional)</Label>
                            <Input
                                id="new-username"
                                type="text"
                                value={settingsData.username}
                                onChange={(e) => setSettingsData({ ...settingsData, username: e.target.value })}
                                placeholder="Leave blank to keep current"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password (Optional)</Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={settingsData.password}
                                onChange={(e) => setSettingsData({ ...settingsData, password: e.target.value })}
                                placeholder="Leave blank to keep current"
                            />
                        </div>
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-xs text-yellow-600">
                                Changing your credentials will log you out immediately.
                            </p>
                        </div>
                        <Button type="submit" className="w-full">
                            Update Credentials
                        </Button>
                    </form>

                    <Separator className="my-4" />

                    {/* System Settings Form */}
                    <form onSubmit={handleSystemUpdate} className="space-y-4">
                        <h4 className="text-sm font-semibold text-foreground">System Configuration</h4>
                        <div className="space-y-2">
                            <Label htmlFor="contact-url">Contact Support URL</Label>
                            <Input
                                id="contact-url"
                                type="text"
                                value={systemSettings.contactUrl}
                                onChange={(e) => setSystemSettings({ ...systemSettings, contactUrl: e.target.value })}
                                placeholder="https://example.com/support"
                            />
                            <p className="text-[10px] text-muted-foreground">Used in the license expired overlay.</p>
                        </div>
                        <Button type="submit" variant="secondary" className="w-full text-green-700 bg-green-100 hover:bg-green-200 border-green-200">
                            Save System Settings
                        </Button>
                    </form>

                    <div className="mt-4 pt-4 border-t">
                        <h4 className="text-sm font-medium text-muted-foreground mb-4">Danger Zone</h4>
                        <Button variant="outline" className="w-full border-destructive/50 text-destructive hover:bg-destructive/10" asChild>
                            <Link href="/install">
                                <Shield className="w-4 h-4 mr-2" />
                                Re-Install System (Reset Admin)
                            </Link>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
