import { useState, useEffect, useRef } from 'react';
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isEqual,
  getDaysInMonth,
  getDay,
  isPast,
} from 'date-fns';
import { useCloseComponent } from '../../Hooks/useCloseComponent';

type DatepickerType = 'date' | 'month' | 'year';

type DatepickerProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const DatePicker = ({ selectedDate, setSelectedDate }: DatepickerProps) => {
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [type, setType] = useState<DatepickerType>('date');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useCloseComponent(wrapperRef, () => setShowDatepicker(false));

  const decrement = () => {
    switch (type) {
    case 'date':
      setDatepickerHeaderDate((prev) => subMonths(prev, 1));
      break;
    case 'month':
      setDatepickerHeaderDate((prev) => subYears(prev, 1));
      break;
    case 'year':
      setDatepickerHeaderDate((prev) => subMonths(prev, 1));
      break;
    }
  };

  const increment = () => {
    switch (type) {
    case 'date':
      setDatepickerHeaderDate((prev) => addMonths(prev, 1));
      break;
    case 'month':
      setDatepickerHeaderDate((prev) => addYears(prev, 1));
      break;
    case 'year':
      setDatepickerHeaderDate((prev) => subMonths(prev, 1));
      break;
    }
  };

  const isToday = (date: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate
    );

  const isPastDate = (date: number) =>(
    isPast(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date+1))
  );

  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date,
        new Date().getHours()
      )
    );
    setShowDatepicker(false);
  };

  const getDayCount = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);

    const dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    const blankdaysArray: Array<number> = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray: Array<number> = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

  // const isPastMont = (month: number) =>(
  //   isPast(new Date(selectedDate.getFullYear(), month, selectedDate.getDate()))
  // );

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    );
    setType('date');
  };

  const toggleDatepicker = () => {
    setShowDatepicker((prev) => !prev);
  };

  const showMonthPicker = () => setType('month');

  const showYearPicker = () => setType('date');

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  return (
    <div ref={wrapperRef} className="relative z-1 w-full md:w-[250px]">
      <input type="hidden" name="date" />
      <input
        type="text"
        readOnly
        className="w-full py-3 pl-4 pr-10 font-medium leading-none rounded-lg shadow-sm cursor-pointer focus:outline-none focus:shadow-outline text-zinc-600"
        placeholder="Select date"
        value={format(selectedDate, 'yyyy-MM-dd')}
        onClick={toggleDatepicker}
      />
      <div
        className="absolute top-0 right-0 px-3 py-2 cursor-pointer"
        onClick={toggleDatepicker}
      >
        <svg
          className="w-6 h-6 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      {showDatepicker && (
        <div
          className="absolute top-0 left-0 right-0 z-20 p-4 mx-auto mt-12 bg-white rounded-lg shadow"
          style={{ width: '17rem' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <button
                type="button"
                className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-zinc-200"
                onClick={decrement}
              >
                <svg
                  className="inline-flex w-6 h-6 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
            {type === 'date' && (
              <div
                onClick={showMonthPicker}
                className="flex-grow p-1 text-lg font-bold rounded-lg cursor-pointer text-zinc-800 hover:bg-zinc-200"
              >
                <p className="text-center">
                  {format(datepickerHeaderDate, 'MMMM')}
                </p>
              </div>
            )}
            <div
              onClick={showYearPicker}
              className="flex-grow p-1 text-lg font-bold rounded-lg cursor-pointer text-zinc-800 hover:bg-zinc-200"
            >
              <p className="text-center">
                {format(datepickerHeaderDate, 'yyyy')}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-zinc-200"
                onClick={increment}
              >
                <svg
                  className="inline-flex w-6 h-6 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          {type === 'date' && (
            <>
              <div className="flex flex-wrap mb-3 -mx-1">
                {DAYS.map((day, i) => (
                  <div key={i} style={{ width: '14.26%' }} className="px-1">
                    <div className="text-xs font-medium text-center text-zinc-800">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-1">
                {blankDays.map((_, i) => (
                  <div
                    key={i}
                    style={{ width: '14.26%' }}
                    className="p-1 text-sm text-center border border-transparent"
                  ></div>
                ))}
                {dayCount.map((d, i) => (
                  <div
                    key={i}
                    style={{ width: '14.26%' }}
                    className="px-1 mb-1"
                  >
                    <div
                      onClick={setDateValue(d)}
                      className={`cursor-pointer text-center text-sm rounded-full leading-loose transition ease-in-out duration-100 ${
                        isToday(d)
                          ? 'bg-indigo-500 text-white'
                          : 'text-zinc-700 hover:bg-indigo-200'
                      }
                      ${
                  isPastDate(d)
                    ? 'pointer-events-none opacity-40'
                    : null
                  }`
                      }
                    >
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {type === 'month' && (
            <div className="flex flex-wrap -mx-1">
              {Array(12)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    onClick={setMonthValue(i)}
                    style={{ width: '25%' }}
                  >
                    <div
                      className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-zinc-200 ${
                        isSelectedMonth(i)
                          ? 'bg-indigo-500 text-white'
                          : 'text-zinc-700 hover:bg-indigo-200'
                      }`}
                    >
                      {format(
                        new Date(
                          datepickerHeaderDate.getFullYear(),
                          i,
                          datepickerHeaderDate.getDate()
                        ),
                        'MMM'
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
