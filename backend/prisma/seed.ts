import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tripuraHospitals = [
    {
        name: 'ILSS Hospitals',
        slug: 'ils-hospitals-agartala',
        city: 'Agartala',
        state: 'Tripura',
        address: 'Capital Complex Extension, Agartala',
        pincode: '799006',
        phone: '0381-241-5000',
        email: 'info@ilshospitals.com',
        rating: 4.5,
        isVerified: true,
        packages: [
            { name: 'Knee Replacement', priceMin: 150000, priceMax: 250000, inclusions: ['Surgery', '3 days stay', 'Meds'] },
            { name: 'Full Body Checkup', priceMin: 3000, priceMax: 5000, inclusions: ['Blood Tests', 'X-Ray', 'ECG'] }
        ],
        doctors: [
            { name: 'Dr. A. Roy', specialty: 'Cardiology', qualification: 'MD, DM', experience: 15 },
            { name: 'Dr. S. Das', specialty: 'Orthopedics', qualification: 'MS', experience: 10 }
        ]
    },
    {
        name: 'Tripura Medical College',
        slug: 'tripura-medical-college',
        city: 'Agartala',
        state: 'Tripura',
        address: 'Hapania, Agartala',
        pincode: '799014',
        phone: '0381-237-6657',
        email: 'tmc@example.com',
        rating: 4.0,
        isVerified: true,
        packages: [
            { name: 'Normal Delivery', priceMin: 10000, priceMax: 20000, inclusions: ['Bed charges', 'Doctor fee'] }
        ],
        doctors: [
            { name: 'Dr. B. Debbarma', specialty: 'Gynecology', qualification: 'MD', experience: 12 }
        ]
    },
    {
        name: 'GBP Hospital',
        slug: 'gbp-hospital',
        city: 'Agartala',
        state: 'Tripura',
        address: 'Kunjaban, Agartala',
        pincode: '799006',
        phone: '0381-235-0131',
        email: 'gbp@govt.in',
        rating: 3.8,
        isVerified: true,
        description: 'Government specialized hospital.',
        packages: [],
        doctors: []
    }
];

// Generate more dummy data
for (let i = 1; i <= 17; i++) {
    tripuraHospitals.push({
        name: `Tripura Care Centre ${i}`,
        slug: `tripura-care-centre-${i}`,
        city: i % 2 === 0 ? 'Agartala' : 'Udaipur',
        state: 'Tripura',
        address: `Street ${i}, ${i % 2 === 0 ? 'Agartala' : 'Udaipur'}`,
        pincode: '799001',
        phone: `98765432${i.toString().padStart(2, '0')}`,
        email: `care${i}@example.com`,
        rating: 3.5 + (i % 15) / 10,
        isVerified: i % 3 === 0,
        packages: [
            { name: 'General Consultation', priceMin: 200, priceMax: 500, inclusions: ['Doctor Fee'] }
        ],
        doctors: [
            { name: `Dr. Generic ${i}`, specialty: 'General Medicine', qualification: 'MBBS', experience: 5 }
        ]
    });
}

async function main() {
    console.log('Seeding data...');

    for (const h of tripuraHospitals) {
        const { packages, doctors, ...hospitalData } = h;
        const hospital = await prisma.hospital.upsert({
            where: { slug: hospitalData.slug },
            update: {},
            create: {
                ...hospitalData,
                packages: {
                    create: packages
                },
                doctors: {
                    create: doctors
                }
            }
        });
        console.log(`Created hospital: ${hospital.name}`);
    }

    // Create Admin User
    await prisma.user.upsert({
        where: { email: 'admin@healthease.com' },
        update: {},
        create: {
            email: 'admin@healthease.com',
            name: 'Super Admin',
            role: 'ADMIN',
            password: 'hashed_password_placeholder'
        }
    });

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
