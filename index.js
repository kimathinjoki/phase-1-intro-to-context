// Your code here
const createEmployeeRecord = function(array){
    const eRecord = {
        firstName:`${array[0]}`,
        familyName:`${array[1]}`,
        title:`${array[2]}`,
        payPerHour:array[3],
        timeInEvents:[],
        timeOutEvents:[]

    }
    return eRecord
}

function createEmployeeRecords(data){
    const obj = []
    for(let i =0 ; i <data.length; i++){
        obj.push(createEmployeeRecord(data[i]))
    }
    return obj
}

function createTimeInEvent(employee, date){
    // const timeInObj = {
    //     type:"TimeIn",
    //     hour:+(date.split(" ")[1]),
    //     date:(date.split(" "))[0]
    // };

    const timeStamp = date.split(" ")

    const timeInObj = {
        type:"TimeIn",
        hour:+timeStamp[1],
        date:timeStamp[0]
    };

    employee.timeInEvents.push(timeInObj);
    return employee

}


function createTimeOutEvent(employe,date){


    const timeStamp = date.split(" ")

    const timeOutObj = {
        type: "TimeOut",
        hour: +timeStamp[1],
        date: timeStamp[0]
    };

    employe.timeOutEvents.push(timeOutObj);
    return employe



}



function hoursWorkedOnDate(employee,date){


    // const timeIn = employee.timeInEvents.hour
    // const timeOut = employee.timeOutEvents.hour
    // if(date === employee.timeInEvents.date && date === employee.timeOutEvents){
    //     return (timeOut-timeIn)/100
    // }

    const timeIn = employee.timeInEvents.find(obj => obj.date===date)
    const timeOut = employee.timeOutEvents.find(obj=> obj.date===date)

    return (timeOut.hour-timeIn.hour)/100



}

function wagesEarnedOnDate(employee,date){

    // const timeIn = employee.timeInEvents.find(obj => obj.date===date)
    // const timeOut = employee.timeOutEvents.find(obj=> obj.date===date)

    // const hoursWorked =(timeOut.hour-timeIn.hour)/100

    // return hoursWorked*(employee.payPerHour)

    return hoursWorkedOnDate(employee,date)*(employee.payPerHour)





}

function allWagesFor(employee){
    let wages = 0;
    wages = employee.timeOutEvents.reduce((acc,item)=>{
        const theDate = item.date;
        return (acc+ wagesEarnedOnDate(employee,theDate));
    },0)
    return wages;
}


function calculatePayroll(employees){
    return (employees.reduce((acc,item)=>{
        return (acc+allWagesFor(item))
    },0))
}






/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }
