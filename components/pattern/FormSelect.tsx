import { SelectProps } from '@radix-ui/react-select';
import { cloneElement, createElement, forwardRef, ReactElement } from 'react';
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

interface Props extends SelectProps {
  label: string;
  placeholder?: string;
  option: Option[] | JSX.Element[];
}

const typeofOption = (object: any): object is Option => {
  return 'value' in object[0];
};

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
