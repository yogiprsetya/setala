/* eslint-disable comma-spacing */

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '~/components/ui/dialog';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from '~/components/ui/button';
import { Ellipsis } from 'lucide-react';
import { IAreaData } from '~/schema/area';
import { RowExtraMenuProps } from '~/@types/Table';
import { DialogClose } from '@radix-ui/react-dialog';
import { useAreaService } from '~/services/use-area';

export const RowExtraMenu = ({ row }: RowExtraMenuProps<IAreaData>) => {
  const [open, setOpen] = useState(false);
  const { deleteArea } = useAreaService();

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Delete area</DialogHeader>

          <DialogDescription>
            Are you sure you want to delete <span className="underline">{row.original.name}</span>{' '}
            area? This action will permanently.
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="button"
              variant="destructive"
              onClick={async () => {
                const success = await deleteArea(row.original.id);
                if (success) setOpen(false);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Ellipsis className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Edit</DropdownMenuLabel>

          <DropdownMenuItem className="text-destructive" onClick={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
