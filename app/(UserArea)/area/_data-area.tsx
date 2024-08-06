'use client';

import { ColumnDef } from '@tanstack/react-table';
import { AttributeIcon } from '~/constant/attribute-icon';
import { Badge } from '~/components/ui/badge';
import { useAreaService } from '~/services/use-area';
import { IAreaData } from '~/schema/area';
import { DataTable } from '~/components/pattern/DataTable';
import { RowExtraMenu } from './_row-extra-menu';

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
      <Badge style={{ background: row.original.type.color }}>{row.original.type.name}</Badge>
    ),
  },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => <RowExtraMenu row={row} />,
  },
];

export const DataArea = () => {
  const { dataArea, loadingArea } = useAreaService();

  return <DataTable columns={columns} data={dataArea} isLoading={loadingArea} />;
};
