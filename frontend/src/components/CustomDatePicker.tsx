import {  useState } from 'react'
import { Calendar } from 'react-date-range-ts'
import format from 'date-fns/format'
import { BiChevronDown } from "react-icons/bi";

import 'react-date-range-ts/dist/styles.css'
import 'react-date-range-ts/dist/theme/default.css'

interface CustomDateRangePickerProps {
  setSingleDate: (date: Date) => void
  setSelectSingleDate: (selectSingleDate: boolean) => void
}  

export const CustomDatePicker = (props : CustomDateRangePickerProps) => {

  const [calendar, setCalendar] = useState(format(new Date(), 'MM/dd/yyyy'))

  const [date, setDate] = useState(new Date())

  const [open, setOpen] = useState(false)

  const [selected, setSelected] = useState(false)

  const handleSelect = (date : Date) => {
    setCalendar(format(date, 'MM/dd/yyyy'))
    setDate(date)
    setSelected(true)
    props.setSingleDate(date)
    props.setSelectSingleDate(true)
  }
  
  return (

      <div>
      <div onClick={() => setOpen(!open)} 
            className="bg-white w-full font-inter p-2 flex transform transition duration-500 hover:scale-110 items-center justify-between rounded-md">
            {    
              selected ? calendar
              : "Select Date"
            }
            <BiChevronDown className="ml-2" />
        </div>
        <div className="bg-white font-inter w-full transform mt-2 transition duration-500 hover:scale-110 display:block calendarWrap flex items-center justify-between rounded-md">
        {open && 
          <Calendar
            date={ date }
            onChange = { handleSelect }
            disabledDay={(date) => date >= new Date()}
            rangeColors={['#3f51b5']}
          />
        }
        </div>
      </div>
  )
}