import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '~/components/ui/form';
import { FormInput } from '~/components/pattern/FormInput';
import { FormColor } from '~/components/pattern/FormColor';
import { useAreaType } from '~/services/useAreaType';
import { useState } from 'react';
import { LoadingState } from '~/components/ui/loading-state';
import { If } from '~/components/ui/if';

const formSchema = z.object({
  name: z.string().min(3).max(50),
  color: z.string(),
});

export const AddAreaTypeDialog = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { createAreaType } = useAreaType();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const success = await createAreaType(values);

    if (success) {
      setOpen(false);
      form.reset();
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" type="button">
          Add Type
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Add new type of area</DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput label="Name" placeholder="e.g: Personal or Professional" {...field} />
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormColor
                  label="Color"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                />
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button disabled={isLoading} type="button" onClick={() => form.handleSubmit(onSubmit)()}>
            <If condition={isLoading}>
              <LoadingState className="mr-2 h-4 w-4" />
            </If>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
