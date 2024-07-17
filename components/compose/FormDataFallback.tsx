import { ReactNode } from 'react';
import { If } from '../ui/if';
import { FormSkeleton } from '../pattern/FormSkeleton';

type Props = {
  isReady: boolean;
  children: ReactNode;
};

export const FormDataFallback = (props: Props) => (
  <div className="flex gap-2 items-end">
    <If condition={props.isReady} fallback={<FormSkeleton />}>
      {props.children}
    </If>
  </div>
);
