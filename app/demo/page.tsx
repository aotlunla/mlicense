'use client';

import { useState } from 'react';

export default function DemoPage() {
    const [key, setKey] = useState('');
    const [url, setUrl] = useState('https://mysite.com');
    const [result, setResult] = useState<any>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);
        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, url }),
            });
            const data = await res.json();
            setResult(data);
        } catch (error) {
            console.error('Verification failed', error);
            setResult({ valid: false, message: 'Network error' });
        }
    };

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Client License Verification Demo</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">License Key</label>
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter License Key"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Simulated URL</label>
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="https://example.com"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
                    >
                        Verify License
                    </button>
                </form>

                {result && (
                    <div className={`mt-6 p-4 rounded ${result.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <h3 className="font-bold text-lg">{result.valid ? 'License Valid' : 'License Invalid'}</h3>
                        <p>{result.message}</p>
                    </div>
                )}
            </div>

            <div className="mt-8 text-sm text-gray-500">
                <p>Instructions:</p>
                <ol className="list-decimal ml-5 space-y-1">
                    <li>Get a license key from the <a href="/sys-admin" className="text-blue-600 underline">Admin Dashboard</a>.</li>
                    <li>Enter the key and a simulated URL (e.g., mysite.com).</li>
                    <li>Click Verify.</li>
                    <li>Try verifying with the same key but a different URL to test site limits.</li>
                </ol>
            </div>
        </div>
    );
}
