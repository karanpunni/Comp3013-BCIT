import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { MdDateRange } from "react-icons/md";




// import React from 'react';
// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker';
// import 'react-day-picker/dist/style.css';

type Pros={
  value:string;
  updateValue:any;
  btnclicked:(e:React.SyntheticEvent)=>void
  

}
export function Header({updateValue,value,btnclicked}:Pros) {
//   const [selected, setSelected] = React.useState<Date>();
//   const [showDate, setShowDate] = React.useState(false)

//   let footer = <p>Please pick a day.</p>;
//   if (selected) {
//     footer = <p>You picked {format(selected, 'PP')}.</p>;
//   }

  const changeHandler = (e:any)=>{
    updateValue(e.target.value)
  }

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={(e)=>btnclicked(e)}>
        <input placeholder="Add a new assignment" onChange={changeHandler} type="text" value={value} />
        {/* <button onClick={(e)=>{ e.preventDefault(); setShowDate(true)}}>  <MdDateRange size={40} />{`${selected}`}</button>
    
        { showDate === true ? <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
        /> : null 
        } */}
       

        <button  disabled={!value} style={!value?{background:"grey",cursor:"not-allowed"}:{background:"#8284fa"}}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
