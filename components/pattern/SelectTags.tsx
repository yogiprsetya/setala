'use client';

import { Hash, X } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { If } from '../ui/if';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

type Props = ComponentPropsWithoutRef<typeof FormField>;

export const SelectTags = ({ ...props }: Omit<Props, 'render'>) => {
  return (
    <div className="flex flex-col">
      <Label htmlFor="hastag" className="mb-2">
        Tags
      </Label>

      <div className="relative w-full mb-4">
        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 w-4 h-4" />

        <Input
          type="text"
          id="hastag"
          className="w-full pl-10 pr-3"
          placeholder="Type new tag and press enter"
        />
      </div>

      <ScrollArea className="flex-1">
        <FormField<Props>
          {...props}
          render={({ field }) => (
            <FormItem className="flex items-center gap-1 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>

              <Badge className="group">
                Label
                <button type="button" className="opacity-0 group-hover:opacity-100">
                  <X className="w-4 h-4" />
                </button>
              </Badge>
            </FormItem>
          )}
        />
      </ScrollArea>
    </div>
  );
};
