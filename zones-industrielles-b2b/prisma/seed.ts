import { PrismaClient, UserRole, ZoneStatus, ParcelStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Nettoyer la base de données
  await prisma.activityLog.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.parcelAmenity.deleteMany()
  await prisma.zoneAmenity.deleteMany()
  await prisma.zoneActivity.deleteMany()
  await prisma.parcel.deleteMany()
  await prisma.zone.deleteMany()
  await prisma.region.deleteMany()
  await prisma.country.deleteMany()
  await prisma.amenity.deleteMany()
  await prisma.activity.deleteMany()
  await prisma.user.deleteMany()

  // 1. Créer les utilisateurs de démo
  const hashedPassword = await bcrypt.hash('password123', 10)

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@zonespro.ma',
      password: hashedPassword,
      name: 'Administrateur ZonesPro',
      company: 'ZonesPro Management',
      phone: '+212 5 37 57 20 00',
      role: UserRole.ADMIN,
    }
  })

  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@zonespro.ma',
      password: hashedPassword,
      name: 'Manager Commercial',
      company: 'ZonesPro Management',
      phone: '+212 5 37 57 20 01',
      role: UserRole.MANAGER,
    }
  })

  const demoUser = await prisma.user.create({
    data: {
      email: 'demo@entreprise.ma',
      password: hashedPassword,
      name: 'Utilisateur Démo',
      company: 'Entreprise Démo SA',
      phone: '+212 6 12 34 56 78',
      role: UserRole.USER,
    }
  })

  console.log('👤 Utilisateurs créés')

  // 2. Créer le pays Maroc
  const morocco = await prisma.country.create({
    data: {
      name: 'Maroc',
      code: 'MA',
    }
  })

  // 3. Créer les régions du Maroc
  const regions = await Promise.all([
    prisma.region.create({
      data: {
        name: 'Casablanca-Settat',
        code: 'CAS',
        countryId: morocco.id,
      }
    }),
    prisma.region.create({
      data: {
        name: 'Rabat-Salé-Kénitra',
        code: 'RAB',
        countryId: morocco.id,
      }
    }),
    prisma.region.create({
      data: {
        name: 'Fès-Meknès',
        code: 'FES',
        countryId: morocco.id,
      }
    }),
    prisma.region.create({
      data: {
        name: 'Marrakech-Safi',
        code: 'MAR',
        countryId: morocco.id,
      }
    }),
    prisma.region.create({
      data: {
        name: 'Tanger-Tétouan-Al Hoceïma',
        code: 'TAN',
        countryId: morocco.id,
      }
    }),
  ])

  console.log('🌍 Régions créées')

  // 4. Créer les activités industrielles
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        name: 'Automobile',
        description: 'Industrie automobile et équipementiers',
        icon: '🚗',
      }
    }),
    prisma.activity.create({
      data: {
        name: 'Textile',
        description: 'Textile et confection',
        icon: '👕',
      }
    }),
    prisma.activity.create({
      data: {
        name: 'Agroalimentaire',
        description: 'Industrie agroalimentaire',
        icon: '🍎',
      }
    }),
    prisma.activity.create({
      data: {
        name: 'Électronique',
        description: 'Composants électroniques',
        icon: '💻',
      }
    }),
    prisma.activity.create({
      data: {
        name: 'Logistique',
        description: 'Stockage et distribution',
        icon: '📦',
      }
    }),
  ])

  console.log('🏭 Activités créées')

  // 5. Créer les équipements
  const amenities = await Promise.all([
    prisma.amenity.create({
      data: {
        name: 'Électricité',
        description: 'Alimentation électrique haute tension',
        icon: '⚡',
        category: 'Infrastructure',
      }
    }),
    prisma.amenity.create({
      data: {
        name: 'Eau potable',
        description: 'Réseau d\'eau potable',
        icon: '💧',
        category: 'Infrastructure',
      }
    }),
    prisma.amenity.create({
      data: {
        name: 'Assainissement',
        description: 'Réseau d\'assainissement',
        icon: '🚰',
        category: 'Infrastructure',
      }
    }),
    prisma.amenity.create({
      data: {
        name: 'Télécommunications',
        description: 'Fibre optique et télécoms',
        icon: '📡',
        category: 'Infrastructure',
      }
    }),
    prisma.amenity.create({
      data: {
        name: 'Accès routier',
        description: 'Routes d\'accès et voiries',
        icon: '🛣️',
        category: 'Transport',
      }
    }),
    prisma.amenity.create({
      data: {
        name: 'Sécurité 24h/24',
        description: 'Surveillance et gardiennage',
        icon: '🛡️',
        category: 'Services',
      }
    }),
  ])

  console.log('🔧 Équipements créés')

  // 6. Créer les zones industrielles
  const zones = await Promise.all([
    prisma.zone.create({
      data: {
        name: 'Zone Industrielle Casablanca Nord',
        description: 'Zone industrielle stratégique au nord de Casablanca, idéale pour l\'industrie automobile et logistique',
        address: 'Route de Rabat, Casablanca',
        totalArea: 150000, // 15 hectares
        price: 2500,
        status: ZoneStatus.AVAILABLE,
        latitude: 33.6169,
        longitude: -7.6149,
        lambertX: 423456.78,
        lambertY: 372890.12,
        regionId: regions[0].id,
      }
    }),
    prisma.zone.create({
      data: {
        name: 'Parc Logistique Mohammedia',
        description: 'Infrastructure logistique moderne pour optimiser vos opérations de distribution',
        address: 'Zone Industrielle, Mohammedia',
        totalArea: 200000, // 20 hectares
        price: 1800,
        status: ZoneStatus.PARTIALLY_OCCUPIED,
        latitude: 33.6864,
        longitude: -7.3737,
        lambertX: 445123.45,
        lambertY: 380567.89,
        regionId: regions[0].id,
      }
    }),
    prisma.zone.create({
      data: {
        name: 'Zone Franche Tanger Automotive',
        description: 'Zone spécialisée pour l\'industrie automobile avec avantages fiscaux',
        address: 'Tanger Automotive City',
        totalArea: 500000, // 50 hectares
        price: 3200,
        status: ZoneStatus.AVAILABLE,
        latitude: 35.7595,
        longitude: -5.8340,
        lambertX: 512345.67,
        lambertY: 412789.34,
        regionId: regions[4].id,
      }
    }),
    prisma.zone.create({
      data: {
        name: 'Technopole Rabat Innovation',
        description: 'Écosystème technologique pour entreprises innovantes et startups',
        address: 'Technopolis, Salé',
        totalArea: 80000, // 8 hectares
        price: 4000,
        status: ZoneStatus.UNDER_DEVELOPMENT,
        latitude: 34.0209,
        longitude: -6.8416,
        lambertX: 467890.23,
        lambertY: 392456.78,
        regionId: regions[1].id,
      }
    }),
  ])

  console.log('🏭 Zones industrielles créées')

  // 7. Créer les parcelles pour chaque zone
  const parcels = []

  // Zone Casablanca Nord - 12 parcelles
  for (let i = 1; i <= 12; i++) {
    const parcel = await prisma.parcel.create({
      data: {
        reference: `CAS-${i.toString().padStart(3, '0')}`,
        area: 5000 + Math.random() * 10000, // 5000-15000 m²
        price: 2500,
        status: i <= 8 ? ParcelStatus.AVAILABLE : ParcelStatus.RESERVED,
        latitude: zones[0].latitude! + (Math.random() - 0.5) * 0.01,
        longitude: zones[0].longitude! + (Math.random() - 0.5) * 0.01,
        zoneId: zones[0].id,
      }
    })
    parcels.push(parcel)
  }

  // Zone Mohammedia - 15 parcelles
  for (let i = 1; i <= 15; i++) {
    const parcel = await prisma.parcel.create({
      data: {
        reference: `MOH-${i.toString().padStart(3, '0')}`,
        area: 8000 + Math.random() * 12000, // 8000-20000 m²
        price: 1800,
        status: i <= 10 ? ParcelStatus.AVAILABLE : ParcelStatus.OCCUPIED,
        latitude: zones[1].latitude! + (Math.random() - 0.5) * 0.01,
        longitude: zones[1].longitude! + (Math.random() - 0.5) * 0.01,
        zoneId: zones[1].id,
      }
    })
    parcels.push(parcel)
  }

  console.log('📍 Parcelles créées')

  // 8. Associer activités et équipements aux zones
  // Zone Casablanca - Automobile et Logistique
  await prisma.zoneActivity.createMany({
    data: [
      { zoneId: zones[0].id, activityId: activities[0].id }, // Automobile
      { zoneId: zones[0].id, activityId: activities[4].id }, // Logistique
    ]
  })

  // Zone Mohammedia - Logistique
  await prisma.zoneActivity.create({
    data: { zoneId: zones[1].id, activityId: activities[4].id }
  })

  // Zone Tanger - Automobile
  await prisma.zoneActivity.create({
    data: { zoneId: zones[2].id, activityId: activities[0].id }
  })

  // Ajouter tous les équipements de base aux zones
  for (const zone of zones) {
    for (const amenity of amenities) {
      await prisma.zoneAmenity.create({
        data: { zoneId: zone.id, amenityId: amenity.id }
      })
    }
  }

  console.log('🔗 Associations créées')

  // 9. Créer quelques rendez-vous de démo
  await prisma.appointment.createMany({
    data: [
      {
        contactName: 'Ahmed Benali',
        contactEmail: 'a.benali@entreprise.ma',
        contactPhone: '+212 6 12 34 56 78',
        companyName: 'Industries Benali',
        message: 'Intéressé par une parcelle pour production automobile',
        requestedDate: new Date('2024-02-15T10:00:00Z'),
        status: 'PENDING',
        parcelId: parcels[0].id,
        userId: demoUser.id,
      },
      {
        contactName: 'Fatima Alaoui',
        contactEmail: 'f.alaoui@logistique.ma',
        contactPhone: '+212 5 22 11 22 33',
        companyName: 'Logistique Moderne SA',
        message: 'Recherche entrepôt logistique 10000m²',
        requestedDate: new Date('2024-02-20T14:00:00Z'),
        confirmedDate: new Date('2024-02-20T14:00:00Z'),
        status: 'CONFIRMED',
        parcelId: parcels[15].id,
      },
    ]
  })

  console.log('📅 Rendez-vous créés')

  console.log('✅ Seeding terminé!')
  console.log('\n📊 Données créées:')
  console.log(`- ${await prisma.user.count()} utilisateurs`)
  console.log(`- ${await prisma.country.count()} pays`)
  console.log(`- ${await prisma.region.count()} régions`)
  console.log(`- ${await prisma.zone.count()} zones industrielles`)
  console.log(`- ${await prisma.parcel.count()} parcelles`)
  console.log(`- ${await prisma.activity.count()} activités`)
  console.log(`- ${await prisma.amenity.count()} équipements`)
  console.log(`- ${await prisma.appointment.count()} rendez-vous`)

  console.log('\n👤 Comptes de connexion:')
  console.log('Admin: admin@zonespro.ma / password123')
  console.log('Manager: manager@zonespro.ma / password123')
  console.log('User: demo@entreprise.ma / password123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
