/* eslint-disable indent */
import { Hash, X } from 'lucide-react';
import { useTagsService } from '~/services/use-tags';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { KeyboardEvent, useCallback, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormControl, FormItem, FormFieldContext } from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { FormDataFallback } from './FormDataFallback';
import { LoadingState } from '../ui/loading-state';

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
  const [isCreating, setIsCreating] = useState(false);
  const [value, setValue] = useState('');
  const { dataTags, loadingTags, createTag } = useTagsService({ disabled: disableFetch });

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      setIsCreating(true);

      if (event.key === 'Enter') {
        event.preventDefault();
        const isSuccess = await createTag(value);

        if (isSuccess) {
          setValue('');
        }
      }

      setIsCreating(false);
    },
    [createTag, value],
  );

  return (
    <FormFieldContext.Provider value={{ name: 'tags_ids' }}>
      <FormDataFallback isReady={!loadingTags}>
        <div className="space-y-2 w-full">
          <Label htmlFor="hastag">Tags</Label>

          <div className="relative w-full">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              {isCreating ? <LoadingState className="w-4 h-4" /> : <Hash className="w-4 h-4" />}
            </div>

            <Input
              type="text"
              id="hastag"
              title="Press enter to add hastag!"
              className="w-full pl-10 h-10 pr-3"
              placeholder="Type new tag and press enter"
              disabled={isCreating}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <ScrollArea className="w-full">
            <Controller<TFieldValues, TName>
              {...props}
              name={'tags_ids' as TName}
              render={({ field }) => (
                <div className="flex gap-2 flex-wrap">
                  {dataTags.map((data) => (
                    <FormItem key={data.id} className="flex items-center gap-1 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>

                      <Badge className="group">
                        <span className="text-nowrap">{data.tag}</span>

                        <button type="button" className="opacity-0 group-hover:opacity-100">
                          <X className="w-4 h-4" />
                        </button>
                      </Badge>
                    </FormItem>
                  ))}
                </div>
              )}
            />
          </ScrollArea>
        </div>
      </FormDataFallback>
    </FormFieldContext.Provider>
  );
};
