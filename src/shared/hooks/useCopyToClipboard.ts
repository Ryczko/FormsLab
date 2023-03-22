import { useState } from 'react';
import toast from 'react-hot-toast';

function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = async (text: string, silient = false) => {
    if (!navigator?.clipboard) {
      toast.error('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      if (!silient) {
        toast.success('Copied to clipboard');
      }
      return true;
    } catch (error) {
      toast.error('Copy failed');
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
}

export default useCopyToClipboard;
