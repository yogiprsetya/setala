import { FormControl, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Root } from '@radix-ui/react-radio-group';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { AttributeIcon } from '~/constant/attribute-icon';
import { cn } from '~/utils/css';
import { ScrollArea } from '~/components/ui/scroll-area';
import { buttonVariants } from '../ui/button';

interface Props extends ComponentPropsWithoutRef<typeof Root> {
  label: string;
}

export const FormIcon = forwardRef<ElementRef<typeof Root>, Props>(({ label, ...props }, ref) => (
  <FormItem className="space-y-3" ref={ref}>
    <FormLabel>{label}</FormLabel>

    <FormControl>
      <ScrollArea className="h-40 w-full rounded-md border pb-2">
        <RadioGroup {...props} className="flex flex-wrap gap-1">
          {Object.entries(AttributeIcon).map(([key, value]) => {
            const IconLabel = value;

            return (
              <FormItem key={key}>
                <FormControl hidden>
                  <RadioGroupItem value={key} />
                </FormControl>

                <FormLabel
                  className={cn(
                    'cursor-pointer',
                    buttonVariants({
                      variant: props.defaultValue === key ? 'secondary' : 'ghost',
                      size: 'icon',
                    }),
                  )}
                >
                  <IconLabel className="w-6 h-6" />
                </FormLabel>
              </FormItem>
            );
          })}
        </RadioGroup>
      </ScrollArea>
    </FormControl>
    <FormMessage />
  </FormItem>
));

FormIcon.displayName = 'FormIcon';
