import { SelectProps } from '@radix-ui/react-select';
import { forwardRef } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

type Option = {
  value: string;
  label: string;
};

interface Props extends SelectProps {
  label: string;
  placeholder?: string;
  option: Option[];
}

export const FormSelect = forwardRef<HTMLDivElement, Props>(
  ({ label, onValueChange, value, placeholder, option, ...props }, ref) => (
    <FormItem ref={ref} className="w-full">
      <FormLabel>{label}</FormLabel>

      <FormControl>
        <Select onValueChange={onValueChange} defaultValue={value} {...props}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            {option.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>

      <FormMessage />
    </FormItem>
  ),
);

FormSelect.displayName = 'FormSelect';
