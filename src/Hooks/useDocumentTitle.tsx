import { useEffect, useState } from 'react';

const useDocumentTitle = (title: string) => {
  const [documentTitle, setDoucmentTitle] = useState<string>(title);
  useEffect(() => {
    document.title = `${documentTitle} - Employee Pulse`;
  }, [documentTitle]);

  return [documentTitle, setDoucmentTitle];
};

export { useDocumentTitle };
