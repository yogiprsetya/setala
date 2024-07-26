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
import { SelectTags } from '~/components/pattern/SelectTags';
import { Rating } from '~/components/ui/rating';
import { AddContentTypeDialog } from './_add-content-type-dialog';

export const AddResourceDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formResourceInputValidate>>({
    resolver: zodResolver(formResourceInputValidate),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formResourceInputValidate>) => {
    setIsSubmitting(true);
    // const isSuccess = await createArea({ ...values, typeId: Number(values.type_id) });
    console.log(values);

    // if (isSuccess) {
    //   form.reset();
    //   setOpen(false);
    setIsSubmitting(false);
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
                  <FormInput {...field} label="Title" placeholder="Resource title" />
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormInput
                    {...field}
                    label="Resource URL"
                    placeholder="Provide a valid URL or leave empty"
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

              <FormField
                control={form.control}
                name="content_type_id"
                render={({ field }) => (
                  <AddContentTypeDialog
                    onSuccess={(id) => form.setValue('content_type_id', id)}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="space-y-4">
              <FormSelectArea disableFetch={!open} control={form.control} />

              <SelectTags disableFetch={!open} control={form.control} />

              <Rating label="Rating" description="(Optional) you can rate the resource later." />
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
