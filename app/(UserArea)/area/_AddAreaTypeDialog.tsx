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

const formSchema = z.object({
  name: z.string().min(3).max(50),
  color: z.string(),
});

export const AddAreaTypeDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Add Type</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new type of area</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="add-type_area-form"
            className="space-y-4"
          >
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
          <Button form="add-type_area-form">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
