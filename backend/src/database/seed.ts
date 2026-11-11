import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding TRIPORA AI database...');

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // Seed Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tripora.ai' },
    update: {},
    create: {
      email: 'admin@tripora.ai',
      passwordHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      emailVerified: true,
      profile: {
        create: {
          fullName: 'Tripora Administrator',
          country: 'United States',
          city: 'San Francisco',
        },
      },
      preference: {
        create: {
          preferredCurrency: 'USD',
          preferredLanguage: 'en',
          travelPace: 'Balanced',
          budgetTier: 'Luxury',
        },
      },
    },
  });

  // Seed Demo User
  const demoUser = await prisma.user.upsert({
    where: { email: 'traveler@tripora.ai' },
    update: {},
    create: {
      email: 'traveler@tripora.ai',
      passwordHash,
      role: 'USER',
      status: 'ACTIVE',
      emailVerified: true,
      profile: {
        create: {
          fullName: 'Alex Vance',
          country: 'United States',
          city: 'New York',
        },
      },
      preference: {
        create: {
          preferredCurrency: 'USD',
          preferredLanguage: 'en',
          travelPace: 'Balanced',
          budgetTier: 'Moderate',
        },
      },
    },
  });

  // Seed Destination
  const bali = await prisma.destination.upsert({
    where: { id: 'dest-bali' },
    update: {},
    create: {
      id: 'dest-bali',
      name: 'Bali',
      country: 'Indonesia',
      region: 'Southeast Asia',
      city: 'Ubud',
      description: 'An Indonesian paradise known for forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.',
      heroImage: 'https://images.pexels.com/photos/39472103/pexels-photo-39472103.jpeg?auto=compress&cs=tinysrgb&h=800&w=1200',
      bestSeasons: 'April to October',
      averageDailyBudgetMinor: BigInt(9500),
      currency: 'USD',
      latitude: -8.3405,
      longitude: 115.092,
      isFeatured: true,
    },
  });

  console.log(`Seeded: Admin (${admin.email}), User (${demoUser.email}), Destination (${bali.name})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
