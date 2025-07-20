'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Ruler, Factory, Calendar, Phone, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface IndustrialZone {
  id: string;
  name: string;
  description: string;
  location: string;
  area: string;
  price: string;
  type: string;
  status: 'Disponible' | 'Réservé' | 'En cours' | 'Nouveau';
  deliveryDate?: string;
  image: string;
  features: string[];
}

export default function ZoneGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const zones: IndustrialZone[] = [
    {
      id: '1',
      name: 'ZONE INDUSTRIELLE CASABLANCA NORD',
      description: 'Une opportunité unique d\'investissement au cœur du pôle économique de Casablanca',
      location: 'Casablanca',
      area: 'De 1 200 m² à 15 000 m²',
      price: 'À partir de 2 500 DH/m²',
      type: 'Zone Industrielle',
      status: 'Disponible',
      image: 'https://ext.same-assets.com/2441009851/2254470735.jpeg',
      features: ['Électricité', 'Eau', 'Assainissement', 'Routes', 'Télécommunications']
    },
    {
      id: '2',
      name: 'PARC LOGISTIQUE MOHAMMEDIA',
      description: 'Infrastructure logistique moderne pour optimiser vos opérations',
      location: 'Mohammedia',
      area: 'De 2 000 m² à 25 000 m²',
      price: 'À partir de 1 800 DH/m²',
      type: 'Parc Logistique',
      status: 'Nouveau',
      deliveryDate: '05 Juin 2025',
      image: 'https://ext.same-assets.com/2441009851/750331139.jpeg',
      features: ['Entrepôts', 'Quais de chargement', 'Parking poids lourds', 'Sécurité 24h/24']
    },
    {
      id: '3',
      name: 'ZONE FRANCHE TANGER AUTOMOTIVE',
      description: 'Zone spécialisée pour l\'industrie automobile avec tous les avantages fiscaux',
      location: 'Tanger',
      area: 'De 5 000 m² à 50 000 m²',
      price: 'À partir de 3 200 DH/m²',
      type: 'Zone Franche',
      status: 'Disponible',
      image: 'https://ext.same-assets.com/2441009851/2121535826.jpeg',
      features: ['Exonération fiscale', 'Douane intégrée', 'Formation spécialisée', 'Services aux entreprises']
    },
    {
      id: '4',
      name: 'TECHNOPOLE RABAT INNOVATION',
      description: 'Écosystème technologique moderne pour les entreprises innovantes',
      location: 'Rabat',
      area: 'De 500 m² à 8 000 m²',
      price: 'À partir de 4 000 DH/m²',
      type: 'Technopole',
      status: 'En cours',
      deliveryDate: '24 Juin 2025',
      image: 'https://ext.same-assets.com/2441009851/2545738160.jpeg',
      features: ['Fibre optique', 'Centres R&D', 'Incubateurs', 'Services numériques']
    },
    {
      id: '5',
      name: 'ZONE INDUSTRIELLE BERRECHID',
      description: 'Positionnement stratégique entre Casablanca et Marrakech',
      location: 'Berrechid',
      area: 'De 800 m² à 12 000 m²',
      price: 'À partir de 1 500 DH/m²',
      type: 'Zone Industrielle',
      status: 'Disponible',
      image: 'https://ext.same-assets.com/2441009851/4145191152.jpeg',
      features: ['Accès autoroutier', 'Transport ferroviaire', 'Main d\'œuvre qualifiée', 'Services de maintenance']
    },
    {
      id: '6',
      name: 'PARC AGRO-INDUSTRIEL MEKNES',
      description: 'Zone spécialisée dans l\'industrie agroalimentaire',
      location: 'Meknès',
      area: 'De 1 500 m² à 20 000 m²',
      price: 'À partir de 2 200 DH/m²',
      type: 'Zone Agroalimentaire',
      status: 'Nouveau',
      image: 'https://ext.same-assets.com/2441009851/2254470735.jpeg',
      features: ['Laboratoires qualité', 'Chambres froides', 'Certification HACCP', 'Transport frigorifique']
    }
  ];

  const totalPages = Math.ceil(zones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedZones = zones.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponible':
        return 'bg-green-100 text-green-800';
      case 'Nouveau':
        return 'bg-blue-100 text-blue-800';
      case 'En cours':
        return 'bg-orange-100 text-orange-800';
      case 'Réservé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {zones.length} zones industrielles disponibles
        </h2>
        <p className="text-gray-600">
          Il y a {zones.length} zones qui correspondent à votre recherche
        </p>
      </div>

      {/* Zone grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedZones.map((zone) => (
          <Card key={zone.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <img
                src={zone.image}
                alt={zone.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className={getStatusColor(zone.status)}>
                  {zone.status}
                </Badge>
              </div>
              {zone.deliveryDate && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    Livraison {zone.deliveryDate}
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <h3 className="font-bold text-lg leading-tight text-gray-900 hover:text-red-600 transition-colors">
                {zone.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {zone.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{zone.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Ruler className="w-4 h-4 text-red-600" />
                  <span>{zone.area}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Factory className="w-4 h-4 text-red-600" />
                  <span>{zone.type}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="font-semibold text-gray-900">{zone.price}</p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 header-red text-white hover:opacity-90">
                  <Eye className="w-4 h-4 mr-1" />
                  Voir
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Page précédente
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "header-red text-white" : ""}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Page suivante
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
