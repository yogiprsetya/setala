'use client';

import { ColumnDef } from '@tanstack/react-table';
import { IResource } from '~/schema/resource';
import { useResources } from '~/services/use-resources';
import { DataTable } from '~/components/pattern/DataTable';
import { format } from 'date-fns';
import { AttributeIcon } from '~/constant/attribute-icon';
import { Badge } from '~/components/ui/badge';
import { If } from '~/components/ui/if';
import { SquareArrowOutUpRight, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

const columns: ColumnDef<IResource>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className='flex gap-4 flex-col'>
        <strong>{row.original.title}</strong>

        <div className='flex gap-2 items-center'>
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

          <If condition={row.original.publishDate}>
            {(date) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <time>{format(date, 'MMMM dd, yyyy')}</time>
                </TooltipTrigger>

                <TooltipContent>Published date</TooltipContent>
              </Tooltip>
            )}
          </If>

          <div className='flex items-center ml-auto text-gold'>
            {!row.original.rating
              ? <Star className='w-4 h-4' />
              : Array.from({ length: row.original.rating }, (_, i) => <Star key={i} className='fill-gold w-4 h-4' />)
            }
          </div>
        </div>
      </div>
    ),
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
  {
    accessorKey: 'contentType',
    header: 'Content',
    cell: ({ row }) => (
      <Badge style={{ background: row.original.contentType.color }}>
        {row.original.contentType.name}
      </Badge>
    ),
  },
];

export const DataResources = () => {
  const { dataResource, loadingResource } = useResources();

  return <DataTable columns={columns} data={dataResource} isLoading={loadingResource} />;
};
