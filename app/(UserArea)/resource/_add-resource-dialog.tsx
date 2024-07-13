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
import { useAreaService } from '~/services/use-area';
import { FormSkeleton } from '~/components/pattern/FormSkeleton';
import { FormSelect } from '~/components/pattern/FormSelect';
import { SelectItem } from '~/components/ui/select';
import { AttributeIcon } from '~/constant/attribute-icon';

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string(),
  publish_date: z.date(),
  area_id: z.number(),
  project_ids: z.number(),
  topic_ids: z.number(),
  content_type_id: z.number(),
});

export const AddResourceDialog = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dataArea, loadingArea } = useAreaService({ disabled: !open });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
            className="grid grid-cols-2 gap-4"
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Publish Date</FormLabel>

                    <DatePicker selected={field.value} onSelect={field.onChange} />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <If condition={!loadingArea} fallback={<FormSkeleton />}>
                <FormField
                  control={form.control}
                  name="area_id"
                  render={({ field }) => (
                    <FormSelect
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      option={
                        dataArea?.map((t) => {
                          const IconLabel = AttributeIcon[t.icon];

                          return (
                            <SelectItem key={t.id} value={t.id.toString()}>
                              <div className="flex gap-2 items-center">
                                <IconLabel className="w-4 h-4" />
                                {t.name}
                              </div>
                            </SelectItem>
                          );
                        }) ?? []
                      }
                      disabled={!dataArea.length}
                      label="Area"
                      placeholder="Select section area"
                      {...field}
                    />
                  )}
                />
              </If>
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
