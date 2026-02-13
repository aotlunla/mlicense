const BASE_URL = 'http://127.0.0.1:5555';

async function test() {
    console.log('Starting Verification...');

    // 0. Test Connectivity
    console.log('\n[0] Testing Connectivity...');
    try {
        const testRes = await fetch(`${BASE_URL}/api/test`);
        if (testRes.ok) {
            console.log('Connectivity Test Passed:', await testRes.json());
        } else {
            console.error('Connectivity Test Failed:', testRes.status, await testRes.text());
            return;
        }
    } catch (e) {
        console.error('Connectivity Test Network Error:', e);
        return;
    }

    // 1. Create License
    console.log('\n[1] Creating License...');
    const createRes = await fetch(`${BASE_URL}/api/licenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            key: 'TEST-AUTO-' + Date.now(),
            maxSites: 2,
            validFrom: new Date().toISOString(),
            validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        }),
    });

    if (!createRes.ok) {
        console.error('Failed to create license', await createRes.text());
        return;
    }

    const license = await createRes.json();
    console.log('License Created:', license.key);

    // 2. Verify Site 1 (Should be Valid)
    console.log('\n[2] Verifying Site 1 (Expect Valid)...');
    const v1 = await verify(license.key, 'site1.com');
    console.log('Result:', v1);

    // 3. Verify Site 2 (Should be Valid)
    console.log('\n[3] Verifying Site 2 (Expect Valid)...');
    const v2 = await verify(license.key, 'site2.com');
    console.log('Result:', v2);

    // 4. Verify Site 3 (Expect Invalid - Max Sites)
    console.log('\n[4] Verifying Site 3 (Expect Invalid - Limit Reached)...');
    const v3 = await verify(license.key, 'site3.com');
    console.log('Result:', v3);

    // 5. Verify Site 1 Again (Should be Valid - Already Registered)
    console.log('\n[5] Verifying Site 1 Again (Expect Valid - Registered)...');
    const v1_again = await verify(license.key, 'site1.com');
    console.log('Result:', v1_again);
}

async function verify(key, url) {
    const res = await fetch(`${BASE_URL}/api/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, url }),
    });
    return await res.json();
}

test().catch(console.error);
