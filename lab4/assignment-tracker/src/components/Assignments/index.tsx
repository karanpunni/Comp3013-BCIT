import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { useState } from "react";

type Pros={
  data:{id:number,name:string, iscomplete:boolean}[];
  updatedata:any
}
export function Assignments({data, updatedata}:Pros) {
  const [count,setcount]=useState(0)

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{data.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{count} of {data.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        <Assignment 
          datalist={data}
          updatedata={updatedata}
          set={setcount}
          count={count}
         
          />
      </div>
    </section>
  );
}
