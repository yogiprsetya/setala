'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';
import { If } from '~/components/ui/if';
import { LoadingState } from '~/components/ui/loading-state';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel } from '~/components/ui/form';
import { FormInput } from '~/components/pattern/FormInput';
import { DatePicker } from '~/components/ui/date-picker';
import { FormSelectArea } from '~/components/pattern/FormSelectArea';
import { formResourceInputValidate } from '~/schema/resource';

export const AddResourceDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formResourceInputValidate>>({
    resolver: zodResolver(formResourceInputValidate),
  });

  const onSubmit = async (values: z.infer<typeof formResourceInputValidate>) => {
    setIsSubmitting(true);
    // const isSuccess = await createArea({ ...values, typeId: Number(values.type_id) });
    console.log(values);

    // if (isSuccess) {
    //   form.reset();
    //   setOpen(false);
    //   setIsSubmitting(false);
    // }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add new</Button>
      </DialogTrigger>

      <DialogContent className="lg:min-w-[768px]">
        <DialogHeader>Add new resource</DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="add-resource-form"
            className="grid grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormInput label="Title" placeholder="Resource title" {...field} />
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormInput
                    label="Resource URL"
                    placeholder="Provide a valid URL or leave empty"
                    {...field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="publish_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date</FormLabel>

                    <DatePicker selected={field.value} onSelect={field.onChange} />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormSelectArea disableFetch={!open} control={form.control} />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <Button form="add-resource-form" disabled={isSubmitting}>
            <If condition={isSubmitting}>
              <LoadingState className="mr-2 h-4 w-4" />
            </If>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
