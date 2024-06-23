import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

export const AddNewDialog = () => (
  <Dialog>
    <DialogTrigger>
      <Button>Add new</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add new</DialogTitle>
        <DialogClose />
      </DialogHeader>

      <DialogFooter>
        <Button>Cancel</Button>
        <Button>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
