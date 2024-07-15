import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { TitlePage } from '../_components/TitlePage';
import { AddAreaDialog } from './_add-area-dialog';
import { DataArea } from './_data-area';

const AreaPage = () => {
  return (
    <>
      <TitlePage
        title="Area Setup"
        description="Use Areas to manage continuous aspects of your life. They represent the different hats you
      wear and help you maintain balance across the"
      />

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input type="text" placeholder="search" />
        <AddAreaDialog trigger={<Button>Add new</Button>} />
      </div>

      <DataArea />
    </>
  );
};

export default AreaPage;
