import { useEffect, useState } from "react";
import DateTimePicker from 'react-datetime-picker';

interface DateSpan {
  dateFrom: Date;
  dateTo: Date;
}

interface TimeSpan {
  hoursFrom: number;
  hoursTo: number;
}

interface TimeSpanFilterProps {
  onChange: (filterByDate: boolean, dateSpan: DateSpan, filterByTime: boolean, TimeSpan: TimeSpan) => void;
  dateFrom: Date;
  dateTo: Date;
}


const TimeSpanFilter = (props: TimeSpanFilterProps) => {
  const [filterByDate, setFilterByDate] = useState(true);
  const [filterByTime, setFilterByTime] = useState(true);
  const [dateFrom, setDateFrom] = useState(props.dateFrom);
  const [dateTo, setDateTo] = useState(props.dateTo);
  const [hoursFrom, setHoursFrom] = useState(0);
  const [hoursTo, setHoursTo] = useState(24);
  const [disableSubmit, setDisableSubmit] = useState(true);


  useEffect(() => {
    setDisableSubmit(false);
  }, [filterByDate, filterByTime, dateFrom, dateTo, hoursFrom, hoursTo]);


  const onSubmit = () => {
    
  };

  return (
    <div>
      <input type="checkbox" checked={true} value="Filter by Date" onChange={(e) => setFilterByDate(e.target.checked)} />
      <DateTimePicker disabled={!filterByDate} />
      <DateTimePicker disabled={!filterByDate} />
      <input type="checkbox" checked={true} value="Filter by Time of the day" onChange={(e) => setFilterByTime(e.target.checked)} />
      <input type="date" />

      <input type="button" disabled={disableSubmit} onClick={() => onSubmit()} />

    </div>
  );
};

export default TimeSpanFilter;