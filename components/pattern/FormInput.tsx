import { forwardRef } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input, InputProps } from '~/components/ui/input';

interface Props extends InputProps {
  label: string;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(({ label, ...props }, ref) => (
  <FormItem ref={ref}>
    <FormLabel>{label}</FormLabel>

    <FormControl>
      <Input {...props} />
    </FormControl>

    <FormMessage />
  </FormItem>
));

FormInput.displayName = 'FormInput';
