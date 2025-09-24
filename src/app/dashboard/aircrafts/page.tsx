import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

// Datos fake para los 4 aviones
const aircrafts = [
  {
    id: 1,
    model: 'Boeing 737-800',
    registration: 'N737BA',
    capacity: 189,
    status: 'Activo',
    lastMaintenance: '2024-09-15',
    flightHours: 12450,
    image: '/aircrafts/1.jpeg'
  },
  {
    id: 2,
    model: 'Airbus A320',
    registration: 'EC-A320',
    capacity: 180,
    status: 'En Mantenimiento',
    lastMaintenance: '2024-09-20',
    flightHours: 8920,
    image: '/aircrafts/2.jpeg'
  },
  {
    id: 3,
    model: 'Boeing 777-300ER',
    registration: 'N777ER',
    capacity: 396,
    status: 'Activo',
    lastMaintenance: '2024-09-10',
    flightHours: 15680,
    image: '/aircrafts/3.jpeg'
  },
  {
    id: 4,
    model: 'Airbus A350-900',
    registration: 'F-A359',
    capacity: 325,
    status: 'Activo',
    lastMaintenance: '2024-09-18',
    flightHours: 6750,
    image: '/aircrafts/4.jpeg'
  }
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Activo':
      return 'default';
    case 'En Mantenimiento':
      return 'secondary';
    default:
      return 'outline';
  }
};

export default function AircraftsPage() {
  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Flota de Aviones</PageTitle>
        </PagePrimaryBar>
      </PageHeader>

      <PageBody>
        <div className="p-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Imagen</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead className="text-center">Capacidad</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead>Último Mantenimiento</TableHead>
                    <TableHead className="text-right">Horas de Vuelo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aircrafts.map((aircraft) => (
                    <TableRow key={aircraft.id}>
                      <TableCell>
                        <div className="relative h-12 w-16 overflow-hidden rounded-md">
                          <Image
                            src={aircraft.image}
                            alt={`${aircraft.model} - ${aircraft.registration}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {aircraft.model}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {aircraft.registration}
                      </TableCell>
                      <TableCell className="text-center">
                        {aircraft.capacity}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getStatusBadgeVariant(aircraft.status)}>
                          {aircraft.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(aircraft.lastMaintenance).toLocaleDateString(
                          'es-ES'
                        )}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {aircraft.flightHours.toLocaleString()} h
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </PageBody>
    </Page>
  );
}
