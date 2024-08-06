import { ComponentPropsWithoutRef, forwardRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Form, FormField } from '~/components/ui/form';
import { FormInput } from '~/components/pattern/FormInput';
import { FormColor } from '~/components/pattern/FormColor';
import { LoadingState } from '~/components/ui/loading-state';
import { If } from '~/components/ui/if';
import { useContentTypeService } from '~/services/use-content-type';
import { FormDataFallback } from '~/components/pattern/FormDataFallback';
import { SelectItem } from '~/components/ui/select';
import { Badge } from '~/components/ui/badge';
import { FormSelect } from '~/components/pattern/FormSelect';
import { PlusCircle } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(3).max(50),
  color: z.string(),
});

interface Props
  extends Omit<ComponentPropsWithoutRef<typeof FormSelect>, 'placeholder' | 'label' | 'option'> {
  onSuccess: (id: number) => void;
}

export const AddContentTypeDialog = forwardRef<HTMLDivElement, Props>(
  ({ ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { createContentType, dataContentTypes, loadingContentTypes } = useContentTypeService();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
      },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);

      const result = await createContentType(values);

      if (result.success) {
        props.onSuccess(result.data.id);
        setOpen(false);
        form.reset();
      }

      setIsLoading(false);
    };

    return (
      <FormDataFallback isReady={!loadingContentTypes}>
        <FormSelect
          {...props}
          ref={ref}
          option={
            dataContentTypes?.map((t) => (
              <SelectItem key={t.id} value={t.id.toString()}>
                <Badge style={{ background: t.color }}>{t.name}</Badge>
              </SelectItem>
            )) ?? []
          }
          disabled={!dataContentTypes.length}
          label="Content Type"
          placeholder={
            dataContentTypes.length ? 'Select content type' : 'Please add content type first'
          }
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" type="button">
              <PlusCircle className="w-4 h-4" />
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
                    <FormInput label="Name" placeholder="e.g: Article or Podcast" {...field} />
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
              <Button
                disabled={isLoading}
                // If we don't use form.handleSubmit, I dont know why
                // the submit button triggered another form
                type="button"
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                <If condition={isLoading}>
                  <LoadingState className="mr-2 h-4 w-4" />
                </If>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </FormDataFallback>
    );
  },
);

AddContentTypeDialog.displayName = 'AddContentTypeDialog';
