import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";

type Pros={
  value:string;
  updateValue:any;
  btnclicked:()=>void

}
export function Header({updateValue,value,btnclicked}:Pros) {


  const changeHandler = (e:any)=>{
    updateValue(e.target.value)
  }

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <input placeholder="Add a new assignment" onChange={changeHandler} type="text" value={value} />
        <button type="button" disabled={!value} style={!value?{background:"grey",cursor:"not-allowed"}:{background:"#8284fa"}} onClick={()=>btnclicked()}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
