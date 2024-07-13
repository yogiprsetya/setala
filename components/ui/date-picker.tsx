'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { cn } from '~/utils/css';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import type { SelectSingleEventHandler } from 'react-day-picker';
import { CalendarDays } from 'lucide-react';
import { FormControl } from './form';

type Props = {
  selected?: Date;
  onSelect: SelectSingleEventHandler;
};

export const DatePicker = (props: Props) => (
  <Popover>
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant={'outline'}
          className={cn('w-[240px] justify-start text-left font-normal', {
            'text-muted-foreground': !props.selected,
          })}
        >
          {props.selected ? format(props.selected, 'PPP') : <span>Pick a date</span>}
          <CalendarDays className="ml-auto h-4 w-4" />
        </Button>
      </FormControl>
    </PopoverTrigger>

    <PopoverContent className="w-auto p-0" align="start">
      <Calendar mode="single" selected={props.selected} onSelect={props.onSelect} />
    </PopoverContent>
  </Popover>
);
