import PageWrapper from './Layouts/PageWrapper';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <BrowserRouter>
        <PageWrapper />
      </BrowserRouter>
    </>
  );
}

export default App;
