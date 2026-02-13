import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
    const { protocol, host } = new URL(req.url);
    const origin = `${protocol}//${host}`;
    const apiUrl = `${origin}/api/verify`;

    // Fetch System Config
    let contactUrl = 'mailto:support@example.com';
    try {
        const config = await prisma.systemConfig.findUnique({ where: { id: 'default' } });
        if (config?.contactUrl) {
            contactUrl = config.contactUrl;
        }
    } catch (e) {
        console.error('Failed to fetch system config', e);
    }

    const script = `
(function () {
    const API_URL = '${apiUrl}';
    const CONTACT_URL = '${contactUrl}';
    const LOCAL_STORAGE_KEY = 'mlicense_key_override';

    function getLicenseKey() {
        const storedKey = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedKey) return storedKey;

        const script = document.querySelector('script[data-key]');
        return script ? script.getAttribute('data-key') : null;
    }

    function showOverlay(message) {
        const existing = document.getElementById('mlicense-overlay');
        if (existing) existing.remove();

        // Create overlay container
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(248, 249, 250, 0.8)', // Light overlay
            backdropFilter: 'blur(8px)',
            webkitBackdropFilter: 'blur(8px)',
            color: '#1f2937',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            zIndex: '2147483647',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            opacity: '0', transition: 'opacity 0.3s ease'
        });

        // Glass Card
        const card = document.createElement('div');
        Object.assign(card.style, {
            maxWidth: '440px', width: '90%',
            padding: '40px',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            transform: 'scale(0.95)', transition: 'transform 0.3s ease'
        });

        // Icon
        const iconDiv = document.createElement('div');
        iconDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
        Object.assign(iconDiv.style, {
            width: '64px', height: '64px',
            borderRadius: '50%',
            backgroundColor: '#fef2f2', // Light red bg
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px auto'
        });

        // Title
        const title = document.createElement('h1');
        title.innerText = 'กรุณาตรวจสอบสิทธิ์';
        Object.assign(title.style, {
            fontSize: '24px', fontWeight: '700',
            marginBottom: '8px', color: '#111827', margin: '0 0 8px 0'
        });

        // Message
        const msg = document.createElement('p');
        msg.innerText = message || 'ใบอนุญาตของคุณหมดอายุหรือรหัสไม่ถูกต้อง';
        Object.assign(msg.style, {
            fontSize: '15px', color: '#6b7280',
            marginBottom: '32px', lineHeight: '1.5'
        });

        // Input
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'กรอกรหัส License Key';
        const storedKey = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedKey) input.value = storedKey;

        Object.assign(input.style, {
            width: '100%', padding: '14px',
            marginBottom: '16px',
            borderRadius: '10px',
            border: '1px solid #d1d5db',
            backgroundColor: '#f9fafb',
            color: '#111827', fontSize: '16px', outline: 'none',
            textAlign: 'center', letterSpacing: '1px',
            fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
            textTransform: 'uppercase',
            boxSizing: 'border-box',
            transition: 'all 0.2s'
        });
        
        input.maxLength = 19; // 16 chars + 3 dashes

        input.oninput = (e) => {
            let value = e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            let formatted = '';
            for(let i = 0; i < value.length; i++) {
                if(i > 0 && i % 4 === 0) formatted += '-';
                formatted += value[i];
            }
            e.target.value = formatted;
        };
        
        input.onfocus = () => {
             input.style.borderColor = '#3b82f6';
             input.style.backgroundColor = '#ffffff';
             input.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
        }
        input.onblur = () => {
             input.style.borderColor = '#d1d5db';
             input.style.backgroundColor = '#f9fafb';
             input.style.boxShadow = 'none';
        }

        // Action Button
        const button = document.createElement('button');
        button.innerText = 'เปิดใช้งาน';
        Object.assign(button.style, {
            width: '100%', padding: '14px',
            borderRadius: '10px', border: 'none',
            backgroundColor: '#2563eb', // Blue 600
            color: 'white', fontSize: '15px', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.2s',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        });

        button.onmouseover = () => {
            button.style.backgroundColor = '#1d4ed8'; // Blue 700
            button.style.transform = 'translateY(-1px)';
        };
        button.onmouseout = () => {
             button.style.backgroundColor = '#2563eb';
             button.style.transform = 'translateY(0)';
        };

        // Status Message
        const statusMsg = document.createElement('p');
        Object.assign(statusMsg.style, {
            fontSize: '14px', marginTop: '16px',
            height: '20px', color: '#ef4444'
        });

        // Contact Link
        const contactDiv = document.createElement('div');
        contactDiv.style.marginTop = '24px';
        contactDiv.style.paddingTop = '16px';
        contactDiv.style.borderTop = '1px solid #f3f4f6';
        
        const contactLink = document.createElement('a');
        contactLink.innerText = 'ติดต่อฝ่ายสนับสนุน';
        contactLink.href = CONTACT_URL;
        contactLink.target = '_blank';
        Object.assign(contactLink.style, {
            color: '#6b7280', fontSize: '13px',
            textDecoration: 'none', transition: 'color 0.2s', fontWeight: '500'
        });
        contactLink.onmouseover = () => contactLink.style.color = '#111827';
        contactLink.onmouseout = () => contactLink.style.color = '#6b7280';

        contactDiv.appendChild(contactLink);

        // Logic
        button.onclick = async () => {
            const newKey = input.value.trim();
            if (!newKey) {
                statusMsg.innerText = 'กรุณากรอกรหัส License Key';
                statusMsg.style.color = '#ef4444';
                return;
            }
            
            statusMsg.innerText = 'กำลังตรวจสอบ...';
            statusMsg.style.color = '#6b7280';
            button.disabled = true;
            button.style.opacity = '0.7';
            button.style.cursor = 'wait';

            await verify(newKey, (success, msg) => {
                button.disabled = false;
                button.style.opacity = '1';
                button.style.cursor = 'pointer';
                if (success) {
                    statusMsg.innerText = 'เปิดใช้งานสำเร็จ!';
                    statusMsg.style.color = '#059669'; // Emerald 600
                    button.style.backgroundColor = '#059669';
                    setTimeout(() => window.location.reload(), 1500);
                } else {
                    statusMsg.innerText = msg || 'รหัสใบอนุญาตไม่ถูกต้อง';
                    statusMsg.style.color = '#ef4444';
                }
            });
        };

        // Assemble
        card.appendChild(iconDiv);
        card.appendChild(title);
        card.appendChild(msg);
        card.appendChild(input);
        card.appendChild(button);
        card.appendChild(statusMsg);
        card.appendChild(contactDiv);
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Fade In
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            card.style.transform = 'scale(1)';
        });
        document.body.style.overflow = 'hidden';
    }

    async function verify(keyOverride = null, callback = null) {
        let key = keyOverride || getLicenseKey();

        // Helper to perform the fetch
        const doCheck = async (payload) => {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                cache: 'no-store'
            });
            if (!res.ok) throw new Error('Server error');
            return res.json();
        };

        try {
            // Attempt 1: Verify with Key (if available)
            let data = await doCheck(key ? { key, url: window.location.origin } : { url: window.location.origin });

            // Attempt 2: If failed AND we used a key, try recovering via Domain only
            if (!data.valid && key && !keyOverride) {
                console.log('Key invalid, attempting domain recovery...');
                const recoveryData = await doCheck({ url: window.location.origin });
                if (recoveryData.valid) {
                    data = recoveryData; // Use the recovered data
                    key = data.key; // Update local key var
                }
            }

            if (!data.valid) {
                 if (callback) {
                     callback(false, data.message);
                 } else {
                     // If we failed with a stored key, clear it
                     if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
                         localStorage.removeItem(LOCAL_STORAGE_KEY);
                     }
                     showOverlay(data.message);
                 }
            } else {
                // Success!
                if (data.key) localStorage.setItem(LOCAL_STORAGE_KEY, data.key);
                else if (keyOverride) localStorage.setItem(LOCAL_STORAGE_KEY, keyOverride);
                
                if (callback) callback(true, data.message);
                
                const existing = document.getElementById('mlicense-overlay');
                if (existing) existing.remove();
                document.body.style.overflow = '';
            }

        } catch (error) {
            console.error('License check failed:', error);
            if (callback) callback(false, 'Connection failed');
            else showOverlay('Unable to connect to license server');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => verify());
    } else {
        verify();
    }
})();
    `;

    return new NextResponse(script, {
        headers: {
            'Content-Type': 'application/javascript',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
    });
}
