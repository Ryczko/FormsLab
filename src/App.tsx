import PageWrapper from './Layouts/PageWrapper';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <PageWrapper />
    </>
  );
}

export default App;
