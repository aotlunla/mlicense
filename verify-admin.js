const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Connecting to database...');
    try {
        const user = await prisma.admin.findUnique({
            where: { username: 'admin' },
        });

        if (user) {
            console.log('✅ Admin user found!');
            console.log('ID:', user.id);
            console.log('Username:', user.username);
            console.log('Password Hash (first 10 chars):', user.passwordHash.substring(0, 10) + '...');
            console.log('Created At:', user.createdAt);
        } else {
            console.error('❌ Admin user NOT found in the database.');
            console.log('Please run "npx prisma db seed" to create the admin user.');
        }
    } catch (error) {
        console.error('❌ Error connecting to database:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
