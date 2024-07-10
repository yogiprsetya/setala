/* eslint-disable indent */

'use client';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '~/components/ui/form';
import { FormInput } from '~/components/pattern/FormInput';
import { FormSelect } from '~/components/pattern/FormSelect';
import { FormIcon } from '~/components/pattern/FormIcon';
import { useAreaTypeService } from '~/services/use-area-type';
import { SelectItem } from '~/components/ui/select';
import { Badge } from '~/components/ui/badge';
import { useState } from 'react';
import { If } from '~/components/ui/if';
import { FormSkeleton } from '~/components/pattern/FormSkeleton';
import { useAreaService } from '~/services/use-area';
import { AddAreaTypeDialog } from './_add-area-type-dialog';

const formSchema = z.object({
  name: z.string().min(3).max(50),
  type_id: z.string(),
  icon: z.string(),
});

export const AddAreaDialog = () => {
  const [open, setOpen] = useState(false);

  const { dataAreaTypes, loadingAreaTypes } = useAreaTypeService({ disabled: !open });
  const { createArea } = useAreaService();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createArea({ ...values, typeId: Number(values.type_id) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add new</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Add new area</DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="add-area-form" className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput label="Name" placeholder="Your area name" {...field} />
              )}
            />

            <div className="flex gap-2 items-end">
              <If condition={!loadingAreaTypes} fallback={<FormSkeleton />}>
                <FormField
                  control={form.control}
                  name="type_id"
                  render={({ field }) => (
                    <FormSelect
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      option={
                        dataAreaTypes.length
                          ? dataAreaTypes.map((t) => (
                              <SelectItem key={t.id} value={t.id.toString()}>
                                <Badge style={{ background: t.color }}>{t.name}</Badge>
                              </SelectItem>
                            ))
                          : []
                      }
                      disabled={!dataAreaTypes.length}
                      label="Type"
                      placeholder={
                        dataAreaTypes.length ? 'Select section area' : 'Please add area type first'
                      }
                      {...field}
                    />
                  )}
                />
              </If>

              <AddAreaTypeDialog />
            </div>

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormIcon label="Icon" onValueChange={field.onChange} defaultValue={field.value} />
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button form="add-area-form">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
