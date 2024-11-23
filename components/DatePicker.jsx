import DateTimePicker from '@react-native-community/datetimepicker';

export default function DatePicker({ date, onDateChange }) {
  const now = new Date();

  const onChange = (event, selectedDate) => {
    onDateChange(selectedDate);
  };

  return (
    <DateTimePicker
      value={date}
      display="spinner"
      onChange={onChange}
      minimumDate={now}
    />
  );
}
