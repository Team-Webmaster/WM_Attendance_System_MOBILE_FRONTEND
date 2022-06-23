import useFetch from "../hooks/useFetch"

export const currentStatus = (userId)=>{
    const {data} = useFetch(`https://localhost:5001/api/Attendance/today/${userId}`);
    const attended = data.filter(a=>a.type==="Attend"&&a.inTime!==null&&a.outTime===null);
    if(attended.length>0){
        const inBreak = data.filter(a=>a.type==="Break"&&a.inTime!==null&&a.outTime===null);
        if(inBreak.length>0){
            return {type:1,break:inBreak[0],attend:attended[0]};//to indicate user in a break
        }else{
            return {type:2,attend:attended[0]};//to indicate user attended but not in break
        }
    }else{
        return {type:0};//to indicate user not attended
    }
}