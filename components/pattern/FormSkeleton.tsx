import { Skeleton } from '../ui/skeleton';

export const FormSkeleton = () => (
  <div className="flex gap-2 w-full flex-col">
    <Skeleton className="w-6/12 h-4" />
    <Skeleton className="w-full h-10 rounded-md" />
  </div>
);
