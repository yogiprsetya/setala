import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormColor } from '~/components/pattern/FormColor';
import { FormInput } from '~/components/pattern/FormInput';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Form, FormField } from '~/components/ui/form';
import { If } from '~/components/ui/if';
import { LoadingState } from '~/components/ui/loading-state';
import { topicReqSchema } from '~/schema/tags';
import { useTopicService } from '~/services/use-topic';

export const AddTopics = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const {  } = useTopicService();

  const form = useForm<z.infer<typeof topicReqSchema>>({
    resolver: zodResolver(topicReqSchema),
  });

  const onSubmit = async (values: z.infer<typeof topicReqSchema>) => {
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
        <Button type="button" size="icon" variant="outline">
          <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Add new topic</DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="add-resource-form"
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput label="Name" placeholder="Topic title" {...field} />
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
            disabled={isSubmitting}
            // If we don't use form.handleSubmit, I dont know why
            // the submit button triggered another form
            type="button"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
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
