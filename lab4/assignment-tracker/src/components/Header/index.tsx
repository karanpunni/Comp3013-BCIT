import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { MdDateRange } from "react-icons/md";




import React from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Pros={
  value:string;
  updateValue:any;
  setDue:any;
  btnclicked:(e:React.SyntheticEvent)=>void
  

}
export function Header({updateValue,value,btnclicked, setDue}:Pros) {
  const [selected, setSelected] = React.useState<Date>();
  const [showDate, setShowDate] = React.useState(false)

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    
    footer = <p>You picked {format(selected, 'PP')}.</p>;
   
  }

  // const handleSelect = (d:any) => {
  //   setSelected(d);
  //   setShowDate(false);
  // }
  
  const changeHandler = (e:any)=>{
    updateValue(e.target.value)
  }

    if(selected){
      const date=new Date();
      var Difference_In_Time = selected.getTime() - date.getTime(); 
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
      setDue((Math.round(Difference_In_Days)+1))
      
      
    }

    function isallowed(){
      if(!value||!selected){
        return true
      }
      
      else{
        return false
      }
    }
 

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      {/* <form className={styles.newAssignmentForm} onSubmit={(e)=>{if(selected){btnclicked(e)}}}></form> */}
      <form className={styles.newAssignmentForm} onSubmit={(e)=>{if(selected){btnclicked(e);setSelected(undefined);setShowDate(false)}}}>
        <input placeholder="Add a new assignment" onChange={changeHandler} type="text" value={value} />
        {/* <button onClick={(e)=>{ e.preventDefault(); setShowDate(true)}}>  <MdDateRange size={40} />{`${selected}`}</button> */}


         <button type="button" onClick={(e)=>{ e.preventDefault(); if(showDate){setShowDate(false)}else{setShowDate(true)}}}>  <MdDateRange size={40} />{`${selected?(format(selected, 'PP')):""}`}</button>


        { showDate === true ? <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          footer={footer}
        /> : null 
        }
       

        <button  disabled={isallowed()} style={(isallowed())?{background:"grey",cursor:"not-allowed"}:{background:"#8284fa"}}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
