import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import { useToast } from '@/lib/components/ui/use-toast';

import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export const Share = () => {
  const [hideControls, setHideControls] = useState(false);
  const pageUrl = window.location.href;
  const [shareUrl, setShareUrl] = useState(`${pageUrl}`);
  const { toast } = useToast();

  useEffect(() => {
    const updateShareUrl = (controlsHidden: boolean) => {
      setShareUrl(`${pageUrl}${controlsHidden ? '&hide-controls' : ''}`);
    };

    updateShareUrl(hideControls);
  }, [hideControls, pageUrl]);

  const handleControlsChange = () => {
    setHideControls((prevHideControls) => !prevHideControls);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      description: 'Link coppied to clipboard!',
    });
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button className="w-full">
            <Icon width={24} icon="heroicons:share-16-solid" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <Input value={shareUrl} readOnly />
                <div className="flex h-12 items-center justify-between space-x-2">
                  <Label htmlFor="hide-controls">Hide controls</Label>
                  <Switch
                    id="hide-controls"
                    onCheckedChange={handleControlsChange}
                    checked={hideControls}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full flex-row items-center justify-end gap-2">
              <div className="w-full">
                <DialogClose className="w-full">
                  <Button variant="secondary" className="w-full">
                    <Icon width={24} icon="heroicons:x-mark-16-solid" />
                    Close
                  </Button>
                </DialogClose>
              </div>
              <div className="w-full">
                <DialogClose className="w-full">
                  <Button className="w-full" onClick={handleCopyClick}>
                    <Icon width={24} icon="heroicons:clipboard-16-solid" />
                    Copy
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
