'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IResource } from '~/schema/resource';
import { useResources } from '~/services/use-resources';
import { DataTable } from '~/components/pattern/DataTable';
import { format } from 'date-fns';
import { AttributeIcon } from '~/constant/attribute-icon';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { If } from '~/components/ui/if';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

const columns: ColumnDef<IResource>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className='flex gap-2 items-center'>
        <span>{row.original.title}</span>

        <If condition={row.original.url}>
          {(url) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={url} target='_blank'>
                  <SquareArrowOutUpRight className='w-4 h-4' />
                </a>
              </TooltipTrigger>

              <TooltipContent>URL: {url}</TooltipContent>
            </Tooltip>
          )}
        </If>
      </div>
    ),
  },
  {
    accessorKey: 'publishDate',
    header: 'Publish Date',
    cell: ({ row }) => row.original.publishDate && format(row.original.publishDate, 'MMMM dd, yyyy'),
  },
  {
    accessorKey: 'area',
    header: 'Area',
    cell: ({ row }) => {
      const IconLabel = AttributeIcon[row.original.areas.icon];

      return (
        <div className="flex items-center gap-1">
          <IconLabel className='w-4 h-4' />
          {row.original.areas.name}
        </div>
      );
    },
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => <div className='flex gap-1'>
      {row.original.tags.map((v) => <Badge variant='secondary' className='text-nowrap' key={v.id}>#{v.tag}</Badge>)}
    </div>,
  },
];

export const DataResources = () => {
  const { dataResource, loadingResource } = useResources();

  return <DataTable columns={columns} data={dataResource} isLoading={loadingResource} />;
};
