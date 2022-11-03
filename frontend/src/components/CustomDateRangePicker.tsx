import { useEffect, useRef, useState } from 'react'
import { DateRangePicker } from 'react-date-range-ts'

import format from 'date-fns/format'

import 'react-date-range-ts/dist/styles.css'
import 'react-date-range-ts/dist/theme/default.css'
import { BiChevronDown } from 'react-icons/bi'

interface CustomDateRangePickerProps {
    setStartDate: (date: Date) => void
    setEndDate: (date: Date) => void
}

export const CustomDateRangePicker = (props : CustomDateRangePickerProps) => {

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  ])

  const [selected, setSelected] = useState(false);

  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col bg-white w-full outline-none rounded-md">

        <div onClick={() => setOpen(!open)} 
            className="bg-white w-full p-2 flex items-center justify-between rounded-md">
            {   
              selected ? `${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`
              : "Select Date Range"
            }
            <BiChevronDown className="ml-2" />
        </div>
        {open && 
          <DateRangePicker
            onChange={item => {
              const startDate : Date = item.selection.startDate ?? range[0].startDate
              const endDate : Date = item.selection.endDate ?? range[0].endDate
              setRange([{ 
                startDate: startDate,
                endDate: endDate > new Date() ? new Date() : endDate,
                key: 'selection'
              }])
              props.setStartDate(startDate)
              props.setEndDate(endDate > new Date() ? new Date() : endDate)
              setSelected(true)
            }}
            disabledDay={(date) => date >= new Date()}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
          />
        }

    </div>
  )
};