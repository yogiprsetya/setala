'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AttributeIcon } from '~/constant/attribute-icon';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { useAreaService } from '~/services/use-area';
import { IAreaData } from '~/schema/area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { DataTable } from '~/components/pattern/DataTable';

const columns: ColumnDef<IAreaData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const IconLabel = AttributeIcon[row.original.icon];

      return (
        <div className="flex items-center gap-2 font-semibold text-base">
          <IconLabel />
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Badge style={{ background: row.original.type.color }}>{row.original.type.name}</Badge>
      </div>
    ),
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Edit</DropdownMenuLabel>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export const DataArea = () => {
  const { dataArea } = useAreaService();

  return <DataTable columns={columns} data={dataArea} />;
};
