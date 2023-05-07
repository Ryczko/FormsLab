import { useState } from 'react';
import toast from 'react-hot-toast';
import useTranslation from 'next-translate/useTranslation';

function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t } = useTranslation('sharedHooks');

  const copy = async (text: string, silient = false) => {
    if (!navigator?.clipboard) {
      if (!silient) {
        toast.error(t('copyingNotSupported'));
      }
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      if (!silient) {
        toast.success(t('copyingSucces'));
      }
      return true;
    } catch (error) {
      if (!silient) {
        toast.error(t('copyingError'));
      }
      setCopiedText(null);
      return false;
    }
  };

  return { copiedText, copy };
}

export default useCopyToClipboard;
