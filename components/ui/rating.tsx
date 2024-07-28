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
    const { setValue, watch } = useFormContext();
    const currentValue = watch('rating');

    return (
      <FormItem ref={ref}>
        <FormLabel>{label}</FormLabel>

        <FormControl>
          <Input {...props} className="hidden" />
        </FormControl>

        <div className='flex gap-1 cursor-pointer'>
          <TooltipProvider>
            {values.map((v) => (
              <Tooltip key={v}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    disabled={currentValue === v.toString()}
                    onClick={() => setValue('rating', v)}
                  >
                    <Star className={cn('text-gold', { 'fill-gold': currentValue >= v })} />
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
      </FormItem >
    );
  },
);

Rating.displayName = 'Rating';
