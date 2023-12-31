import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { IoIosCheckmarkCircle } from "react-icons/io";


type Pros={
  datalist:{id:number,name:string, iscomplete:boolean, duein: number}[];
  updatedata:any;
  set:any;
  count:number;
  

}
export function Assignment({datalist, updatedata, set, count}:Pros) {
  
  
  function aa(element:any,i:number) {
    console.log("in aa")
    
    let a=datalist[i].iscomplete
   
    if (a){
      const newData=[
        ...datalist.slice(0,i),{id: i, name: element.name, iscomplete:false, duein:element.duein},...datalist.slice(i+1)
      ]
      let tempcount = count-1;
      set(tempcount)
      updatedata(newData)
      
    }
    else{
      const newData=[
        ...datalist.slice(0,i),{id: i, name: element.name, iscomplete:true, duein:element.duein},...datalist.slice(i+1)
      ]
      let tempcount = count+1;
      set(tempcount)
      updatedata(newData)
    }
  }
  
  return (
    <>
    
    {datalist.map((element, i) => 
    
      <div key={i} className={styles.assignment}>

        <button className={styles.checkContainer} onClick={()=>{aa(element,i)}}>
          {element.iscomplete?<IoIosCheckmarkCircle size={30} /> :<div /> }
           
        </button>
        
        <p className={`${element.iscomplete?styles.textCompleted:""}`}>{element.name} 
        <span className={`${element.duein>1?styles.due:styles.duesoon}`}>{`${element.duein>=0?`${element.duein<2?`${element.duein==0?"Due: Today":"Due: Tommorow"}`:"Due In: " + element.duein+" Days"}`:"Past Due"}`}</span></p>

        <button className={styles.deleteButton} onClick={()=>{
          
          if(element.iscomplete){ let tempcount = count-1; set(tempcount)}
          updatedata(datalist.filter((a) => a.id !== element.id));
        }}>
          <TbTrash size={20} />
        </button>
      </div>
    )}
    </>
  );
}
