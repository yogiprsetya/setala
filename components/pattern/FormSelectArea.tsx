/* eslint-disable indent */
import { useAreaService } from '~/services/use-area';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { AttributeIcon } from '~/constant/attribute-icon';
import { AddAreaDialog } from '~/app/(UserArea)/area/_add-area-dialog';
import { PlusCircle } from 'lucide-react';
import { FormFieldContext } from '../ui/form';
import { FormSelect } from './FormSelect';
import { SelectItem } from '../ui/select';
import { Button } from '../ui/button';
import { FormDataFallback } from './FormDataFallback';

type ApiProps = {
  disableFetch: boolean;
};

export const FormSelectArea = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  disableFetch,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'render' | 'name'> & ApiProps) => {
  const { dataArea, loadingArea } = useAreaService({ disabled: disableFetch });

  return (
    <FormFieldContext.Provider value={{ name: 'area_id' }}>
      <FormDataFallback isReady={!loadingArea}>
        <Controller<TFieldValues, TName>
          {...props}
          name={'area_id' as TName}
          render={({ field }) => (
            <FormSelect
              onValueChange={(d) => field.onChange(Number(d))}
              defaultValue={field.value}
              option={
                dataArea?.map((t) => {
                  const IconLabel = AttributeIcon[t.icon];

                  return (
                    <SelectItem key={t.id} value={t.id.toString()}>
                      <div className="flex gap-2 items-center">
                        <IconLabel className="w-4 h-4" />
                        {t.name}
                      </div>
                    </SelectItem>
                  );
                }) ?? []
              }
              disabled={!dataArea.length}
              label="Area"
              placeholder="Select section area"
              {...field}
            />
          )}
        />

        <AddAreaDialog
          trigger={
            <Button size="icon" variant="outline" className="aspect-square">
              <PlusCircle className="w-4 h-4" />
            </Button>
          }
        />
      </FormDataFallback>
    </FormFieldContext.Provider>
  );
};
