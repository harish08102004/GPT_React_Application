import React from 'react';
import { useForm } from 'react-hook-form';gi 

function ReportGenerator() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    // Perform analysis on sentence here...
    console.log(data.sentence);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Sentence:
        {errors.sentence && <span>This field is required.</span>}
      </label>
      <button type="submit">Generate Report</button>
    </form>
  );
}

export default ReportGenerator;
