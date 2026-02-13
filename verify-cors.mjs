const BASE_URL = 'http://127.0.0.1:5555';

async function testCors() {
    console.log('Testing CORS Headers...');

    try {
        const res = await fetch(`${BASE_URL}/api/verify`, {
            method: 'OPTIONS',
            headers: {
                'Origin': 'http://external-site.com',
                'Access-Control-Request-Method': 'POST',
            },
        });

        console.log('OPTIONS Status:', res.status);
        console.log('Access-Control-Allow-Origin:', res.headers.get('access-control-allow-origin'));
        console.log('Access-Control-Allow-Methods:', res.headers.get('access-control-allow-methods'));

        if (res.headers.get('access-control-allow-origin') === '*') {
            console.log('✅ CORS Preflight Passed');
        } else {
            console.error('❌ CORS Preflight Failed');
        }

        const resPost = await fetch(`${BASE_URL}/api/verify`, {
            method: 'POST',
            headers: {
                'Origin': 'http://external-site.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ key: 'TEST', url: 'test.com' })
        });

        console.log('POST Status:', resPost.status);
        console.log('POST Access-Control-Allow-Origin:', resPost.headers.get('access-control-allow-origin'));

        if (resPost.headers.get('access-control-allow-origin') === '*') {
            console.log('✅ CORS POST Passed');
        } else {
            console.error('❌ CORS POST Failed');
        }

    } catch (error) {
        console.error('CORS Test Error:', error);
    }
}

testCors();
