import { Input } from '~/components/ui/input';
import { TitlePage } from '../_components/TitlePage';
import { AddAreaDialog } from './_AddAreaDialog';

const AreaPage = () => (
  <div>
    <TitlePage
      title="Area Setup"
      description="Use Areas to manage continuous aspects of your life. They represent the different hats you
      wear and help you maintain balance across the"
    />

    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="search" />
      <AddAreaDialog />
    </div>
  </div>
);

export default AreaPage;