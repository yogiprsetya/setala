import { Loader } from 'lucide-react';
import { cn } from '~/utils/css';

type Props = {
  className?: string;
};

export const LoadingState = ({ className }: Props) => {
  return <Loader className={cn('animate-spin', className)} />;
};
