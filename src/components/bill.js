import 'date-fns';
import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Chart from "./chart";
import * as actions from "../actions/bill";
import { Grid, Radio, RadioGroup, FormControlLabel, FormControl } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import '../App.css';


const BillDatas = ({ classes, ...props }) => {

  const [fromDate, setFromDate] = useState(new Date('2010','01','01'));
  const [toDate, setToDate] = useState(new Date('2020','01','01'));
  const [value, setValue] = useState('gas');

  const handleTypeChange = (event) => {
    setValue(event.target.value);
    props.billList(event.target.value)
  };
  const handlFromDateChange = (date) => {
    setFromDate(date);
   // alert(`${date.getFullYear()}-${(date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)}-01`)
  };
  const handleToDateChange = (date) => {
    setToDate(date);
  };

  useEffect(() => {
    props.billList('gas')
  }, [])


  return (
    <Fragment>
      <div className="paper">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <FormControl component="fieldset">
              <RadioGroup name="billtype" row aria-label="Bill Type" value={value} onChange={handleTypeChange} defaultValue="Gas">
                <FormControlLabel value="Electricity" control={<Radio color="primary" />} label="Electricity" labelPlacement="top" />
                <FormControlLabel value="Gas" control={<Radio color="primary" />} label="Gas" labelPlacement="top" />
                <FormControlLabel value="Water" control={<Radio color="primary" />} label="Water" labelPlacement="top" />
              </RadioGroup>
            </FormControl>
            <KeyboardDatePicker
              disableToolbar
              views={["year", "month"]}
              variant="inline"
              format="yyyy-MM"
              margin="normal"
              id="date-picker-inline"
              label="From Date"
              value={fromDate}
              onChange={handlFromDateChange}
              KeyboardButtonProps={{ 'aria-label': 'change date' }}
            />
            <KeyboardDatePicker
              disableToolbar
              views={["year", "month"]}
              variant="inline"
              margin="normal"
              id="date-picker-dialog"
              label="To Date"
              format="yyyy-MM"
              value={toDate}
              onChange={handleToDateChange}
              KeyboardButtonProps={{ 'aria-label': 'change date' }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div className="paper">
        <Chart 
         billList={props.List} 
         fromDate={fromDate}
         toDate={toDate}
         title={value}
       />
      </div>
    </Fragment>
  );
}

//props.List.filter(x => x.datetime >= fromdDate && x.datetime <= toDate)

const mapStateToProps = state => ({
  List: state.billData.list
})

const mapActionToProps = {
  billList: actions.fetchData
}

export default connect(mapStateToProps, mapActionToProps)(BillDatas);