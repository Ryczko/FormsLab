import Button, { ButtonVariant } from '../../Components/Button';
import IconButton, { IconButtonVariant } from '../../Components/IconButton';

function FormRaportPage() {
  const fakeData = [
    {
      id: 1,
      date: '2020-01-01',
      time: '13:54:00',
      question: 'How Do You Feel?',
    },
    {
      id: 2,
      date: '2020-01-01',

      time: '13:54:00',
      question: 'How Do You Feel?',
    },
    {
      id: 3,
      date: '2020-01-01',
      time: '13:54:00',
      question: 'How Do You Feel?',
    },
    {
      id: 4,
      date: '2020-01-11',
      time: '13:54:00',
      question: 'How Do You Feel?',
    },
    {
      id: 5,
      date: '2020-01-11',
      time: '13:54:00',
      question: 'How Do You Feel?',
    },
    {
      id: 6,
      date: '2020-01-11',
      time: '13:54:00',
      question: 'How Do You Feel?',
    },
  ];

  return (
    <div className="container mt-10 m-auto px-4 md:px-8 text-center">
      <h1 className="text-center font-bold text-4xl ">Surveys Raport</h1>
      <div className="flex flex-col items-center justify-center py-4">
        <table className="text-sm sm:text-base table-auto">
          <thead>
            <tr>
              <th className="sm:p-2" />
              <th className="sm:p-2">ID</th>
              <th className="sm:p-2">Time</th>
              <th className="sm:p-2">Question</th>
              <th className="sm:p-2" />
              <th className="sm:p-2" />
              <th className="sm:p-2" />
            </tr>
          </thead>
          <tbody>
            {fakeData.map((item) => (
              <tr key={item.id}>
                {
                  // todo: only dsplay one date for each day
                  item.id % 2 === 0 ? (
                    <td className="sm:p-2 font-medium">{item.date}</td>
                  ) : (
                    <td />
                  )
                }
                <td className="sm:p-2">{item.id}</td>
                <td className="sm:p-2">{item.time}</td>
                <td className="sm:p-2">{item.question}</td>
                <td className="sm:p-2">
                  <Button variant={ButtonVariant.FLAT} className="p-2">
                    More
                  </Button>
                </td>
                <td className="sm:p-2">
                  <IconButton
                    variant={IconButtonVariant.PRIMARY}
                    className="p-2"
                    title="Download"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    }
                  ></IconButton>
                </td>
                <td className="sm:p-2">
                  <IconButton
                    variant={IconButtonVariant.PRIMARY}
                    className="p-2"
                    title="Copy link"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    }
                  ></IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default FormRaportPage;
