/* eslint-disable indent */
import { Hash, X } from 'lucide-react';
import { useTagsService } from '~/services/use-tags';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormControl, FormItem, FormFieldContext } from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { FormDataFallback } from './FormDataFallback';

type ApiProps = {
  disableFetch: boolean;
};

export const SelectTags = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  disableFetch,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, 'render' | 'name'> & ApiProps) => {
  const { dataTags, loadingTags } = useTagsService({ disabled: disableFetch });

  return (
    <FormFieldContext.Provider value={{ name: 'tags_ids' }}>
      <FormDataFallback isReady={!loadingTags}>
        <div className="space-y-2 w-full">
          <Label htmlFor="hastag">Tags</Label>

          <div className="relative w-full mb-4">
            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 w-4 h-4" />

            <Input
              type="text"
              id="hastag"
              className="w-full pl-10 h-10 pr-3"
              placeholder="Type new tag and press enter"
            />
          </div>

          <ScrollArea className="flex-1">
            <Controller<TFieldValues, TName>
              {...props}
              name={'tags_ids' as TName}
              render={({ field }) => (
                <>
                  {dataTags.map((data) => (
                    <FormItem key={data.id} className="flex items-center gap-1 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>

                      <Badge className="group">
                        {data.tag}
                        <button type="button" className="opacity-0 group-hover:opacity-100">
                          <X className="w-4 h-4" />
                        </button>
                      </Badge>
                    </FormItem>
                  ))}
                </>
              )}
            />
          </ScrollArea>
        </div>
      </FormDataFallback>
    </FormFieldContext.Provider>
  );
};
