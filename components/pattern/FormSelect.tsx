import { SelectProps } from '@radix-ui/react-select';
import { cloneElement, forwardRef, ReactElement } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { If } from '../ui/if';

type Option = {
  value: string | number;
  label: string;
};

interface Props extends Omit<SelectProps, 'value' | 'defaultValue'> {
  label: string;
  placeholder?: string;
  option: Option[] | JSX.Element[];
  value: string | number | undefined;
  defaultValue?: string | number;
}

const typeofOption = (object: any): object is Option => {
  if (!object || !object.length) return false;
  return 'value' in object[0];
};

export const FormSelect = forwardRef<HTMLDivElement, Props>(
  ({ label, onValueChange, value, placeholder, option, ...props }, ref) => (
    <FormItem ref={ref} className="w-full">
      <FormLabel>{label}</FormLabel>

      <FormControl>
        <Select
          {...props}
          onValueChange={onValueChange}
          defaultValue={value?.toString()}
          value={value?.toString()}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>

          <SelectContent>
            <If condition={option}>
              {(selects) => {
                if (typeofOption(selects)) {
                  return (selects as Option[]).map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ));
                }

                return selects.map((v) => cloneElement(v as ReactElement, {}));
              }}
            </If>
          </SelectContent>
        </Select>
      </FormControl>

      <FormMessage />
    </FormItem>
  ),
);

FormSelect.displayName = 'FormSelect';
