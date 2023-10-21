import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";

let Nxtid=0
function App() {

  const[assidata,setassidata]=useState<Array<{id: number, name: string, iscomplete:boolean, duein: number}>>([])
  const [value,setvalue]=useState("")
  const [due,setdue]=useState(0)

 

  function btnclicked(e:React.SyntheticEvent){
    e.preventDefault();
    setassidata([...assidata,{ id: (Nxtid++), name: value, iscomplete:false, duein:due }]);
   
    setvalue("")
  }
  return (
    <>
      <Header 
        updateValue={(i:any)=>{setvalue(i)}}
        value={value}
        setDue={(i:any)=>{setdue(i)}}
        btnclicked={btnclicked}/>
      <Assignments 
        data={assidata}
        updatedata={setassidata}/>
    </>
  );
}

export default App;
