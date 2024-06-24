import { FormControl, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Root } from '@radix-ui/react-radio-group';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { AttributeColor } from '~/constant/attribute-color';
import { cn } from '~/utils/css';
import { ScrollArea } from '~/components/ui/scroll-area';
import { buttonVariants } from '~/components/ui/button';

interface Props extends ComponentPropsWithoutRef<typeof Root> {
  label: string;
}

export const FormColor = forwardRef<ElementRef<typeof Root>, Props>(({ label, ...props }, ref) => (
  <FormItem className="space-y-3" ref={ref}>
    <FormLabel>{label}</FormLabel>

    <FormControl>
      <ScrollArea className="h-28 w-full rounded-md border p-2">
        <RadioGroup {...props} className="flex flex-wrap gap-1">
          {Object.values(AttributeColor).map((value) => (
            <FormItem key={value}>
              <FormControl hidden>
                <RadioGroupItem value={value} />
              </FormControl>

              <FormLabel
                className={cn(
                  'cursor-pointer',
                  buttonVariants({
                    variant: props.defaultValue === value ? 'secondary' : 'ghost',
                    size: 'sm',
                  }),
                )}
              >
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: value }} />
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </ScrollArea>
    </FormControl>

    <FormMessage />
  </FormItem>
));

FormColor.displayName = 'FormColor';
