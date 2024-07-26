import { forwardRef } from 'react';
import { Input, type InputProps } from '~/components/ui/input';
import { Star } from 'lucide-react';
import { cn } from '~/utils/css';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './form';
import { If } from './if';

const values = [1, 2, 3, 4, 5];

interface Props extends InputProps {
  label: string;
  description?: string;
}

export const Rating = forwardRef<HTMLInputElement, Props>(
  ({ label, description, ...props }, ref) => {
    const { setValue, getValues } = useFormContext();

    return (
      <FormItem ref={ref}>
        <FormLabel>{label}</FormLabel>

        <FormControl>
          <Input {...props} className="hidden" />
        </FormControl>

        <div className={cn('flex gap-1 cursor-pointer')}>
          <TooltipProvider>
            {values.map((v) => (
              <Tooltip key={v}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    disabled={getValues('rating') === v.toString()}
                    onClick={() => setValue('rating', v)}
                  >
                    <Star className="text-gold" />
                  </button>
                </TooltipTrigger>

                <TooltipContent>Rate: {v}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <If condition={!!description}>
          <FormDescription>{description}</FormDescription>
        </If>

        <FormMessage />
      </FormItem>
    );
  },
);

Rating.displayName = 'Rating';
