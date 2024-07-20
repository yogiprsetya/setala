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
import { cn } from '~/utils/css';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FormControl, FormItem, FormFieldContext } from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { FormDataFallback } from './FormDataFallback';
import { LoadingState } from '../ui/loading-state';
import { toast } from '../ui/use-toast';

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
  const [isDeleting, setIsDeleting] = useState(0);
  const [value, setValue] = useState('');

  const state = useTagsService({ disabled: disableFetch });

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      setIsCreating(true);

      if (event.key === 'Enter') {
        event.preventDefault();
        const isSuccess = await state.createTag(value);

        if (isSuccess) {
          setValue('');
        }
      }

      setIsCreating(false);
    },
    [state.createTag, value],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      setIsDeleting(id);
      const success = await state.deleteTag(id).finally(() => setIsDeleting(0));

      if (!success) {
        toast({
          variant: 'destructive',
          value: 'Failed to delete tag',
        });
      }
    },
    [state.deleteTag],
  );

  return (
    <FormFieldContext.Provider value={{ name: 'tags' }}>
      <FormDataFallback isReady={!state.loadingTags}>
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

          <ScrollArea className="w-full h-16">
            <Controller<TFieldValues, TName>
              {...props}
              name={'tags' as TName}
              render={({ field }) => (
                <div className="flex gap-2 flex-wrap">
                  {state.dataTags.map((data) => (
                    <FormItem key={data.id} className="flex items-center gap-1 space-y-0">
                      <FormControl>
                        <Checkbox
                          {...field}
                          checked={field.value?.includes(data.id)}
                          value={data.id}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value?.map((n: number) => Number(n)) || []), data.id]
                              : field.value?.filter((v: number) => v !== data.id);

                            return field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>

                      <Badge className="group">
                        <span className="text-nowrap">{data.tag}</span>

                        <button
                          type="button"
                          className={cn(
                            'opacity-0 ',
                            isDeleting === data.id ? 'opacity-100' : 'group-hover:opacity-100',
                          )}
                          title={isDeleting ? 'Please wait until other detele done' : 'Delete tag'}
                          disabled={Boolean(isDeleting)}
                          onClick={() => handleDelete(data.id)}
                        >
                          {isDeleting === data.id ? (
                            <LoadingState className="w-4 h-4" />
                          ) : (
                            <X className="w-4 h-4" />
                          )}
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
