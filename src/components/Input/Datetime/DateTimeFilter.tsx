import { useEffect, useState } from "react";
import "./DateTimeFilter.css";

const minDate = "2022-03-01";
const maxDate = "2023-05-24";
const minHours = 0;
const maxHours = 24;

export const defaultDateTimeFilterSettings: DateTimeFilterChangeEvent = {
  filterByDate: true,
  dateSpan: {
    dateFrom: "2022-03-01",
    dateTo: "2023-05-25"
  },
  filterByTime: false,
  timeSpan: {
    hoursFrom: minHours,
    hoursTo: maxHours
  }
}

interface DateSpan {
  dateFrom: string;
  dateTo: string;
}

interface TimeSpan {
  hoursFrom: number;
  hoursTo: number;
}

export interface DateTimeFilterChangeEvent {
  filterByDate: boolean;
  dateSpan: DateSpan;
  filterByTime: boolean;
  timeSpan: TimeSpan
}

interface DateTimeFilterProps {
  onChange: (e: DateTimeFilterChangeEvent) => void;
}

const DateTimeFilter = (props: DateTimeFilterProps) => {

  const [filterByDate, setFilterByDate] = useState(defaultDateTimeFilterSettings.filterByDate);
  const [filterByTime, setFilterByTime] = useState(defaultDateTimeFilterSettings.filterByTime);
  const [dateFrom, setDateFrom] = useState(defaultDateTimeFilterSettings.dateSpan.dateFrom);
  const [dateTo, setDateTo] = useState(defaultDateTimeFilterSettings.dateSpan.dateTo);
  const [hoursFrom, setHoursFrom] = useState(defaultDateTimeFilterSettings.timeSpan.hoursFrom);
  const [hoursTo, setHoursTo] = useState(defaultDateTimeFilterSettings.timeSpan.hoursTo);
  const [disableSubmit, setDisableSubmit] = useState(true);


  useEffect(() => {
    setDisableSubmit(false);
  }, [filterByDate, filterByTime, dateFrom, dateTo, hoursFrom, hoursTo]);

  const onSubmit = () => {
    const dateSpan: DateSpan = {
      dateFrom: dateFrom,
      dateTo: dateTo
    };

    const timeSpan: TimeSpan = {
      hoursFrom: hoursFrom,
      hoursTo: hoursTo
    };
    props.onChange({
      filterByDate,
      dateSpan,
      filterByTime,
      timeSpan
    });

    setDisableSubmit(true);
  };

  return (
    <div className="datetime datetime--wrapper">
      <div>
        <div className="datetime--row">
          <div className="datetime--row-item">
            <label htmlFor="filterByDate">Filter by date</label>
            <input type="checkbox" id="filterByDate" checked={filterByDate} value="Filter by Date" onChange={(e) => setFilterByDate(e.target.checked)} />
          </div>
        </div>
        
        <div className="datetime--row">
          <div className="datetime--row-item">
            <label htmlFor="dateFrom">Date from:</label>
            <input type="date" id="dateFrom" disabled={!filterByDate} min={minDate} max={maxDate} value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="datetime--row-item">
            <label htmlFor="dateTo">Date to:</label>
            <input type="date" id="dateTo" disabled={!filterByDate} min={minDate} max={maxDate} value={dateTo} onChange={(e) => setDateTo(e.target.value)}/>
          </div>
        </div>
        
        
        <div className="datetime--row">
          <div className="datetime--row-item">
            <label htmlFor="filterByTime">Filter by time</label>
            <input type="checkbox" id="filterByTime" checked={filterByTime} value="Filter by Time of the day" onChange={(e) => setFilterByTime(e.target.checked)} />
          </div>
        </div>
        
        <div className="datetime--row">
          <div className="datetime--row-item">
            <label htmlFor="hoursFrom">Time from:</label>
            <input type="number" id="hoursFrom" disabled={!filterByTime} min={minHours} max={maxHours} value={hoursFrom} onChange={(e) => setHoursFrom(parseInt(e.target.value))}/>
            <span>h</span>
          </div>
          <div className="datetime--row-item">
            <label htmlFor="hoursTo">Time to:</label>
            <input type="number" id="hoursTo" disabled={!filterByTime} min={minHours} max={maxHours} value={hoursTo} onChange={(e) => setHoursTo(parseInt(e.target.value))}/>
            <span>h</span>
          </div>
        </div>
      </div>
      <div className="datetime--submit-wrapper">
        <input type="button" disabled={disableSubmit} onClick={() => onSubmit()} value="Update" />
      </div>
      </div>
  );
};

export default DateTimeFilter;