// Your code here

function createEmployeeRecord(array){
    const employeeRec = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRec
}
// createEmployeeRecord()

function createEmployeeRecords(array){
    const recordOne = array.map(record => {
        return createEmployeeRecord(record)
    })
    return recordOne
}
// createEmployeeRecords()

function createTimeInEvent(record, timestamp){
    const duration = {
        type: "TimeIn",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.slice(-4), 10)
    }
    record.timeInEvents.push(duration)
    return record
}
// createTimeinEvent()

function createTimeOutEvent(record, timestamp){
    const duration = {
        type: "TimeOut",
        date: timestamp.split(" ")[0],
        hour: parseInt(timestamp.slice(-4), 10)
    }
    record.timeOutEvents.push(duration)
    return record
}
// createTimeOutEvent()

function hoursWorkedOnDate(record, date){
    const timeIn = record.timeInEvents.find(e => {
        return e.date === date
    })

    const timeOut = record.timeOutEvents.find(e => {
        return e.date === date
    })

    return (timeOut.hour - timeIn.hour) / 100
}
// hoursWorkedOnDate()

function wagesEarnedOnDate(record, date){
    return hoursWorkedOnDate(record, date) * record.payPerHour
}
// wagesEarnedOnDate()

function allWagesFor(record){
    let pay = 0;
    for(let i = 0; i < record.timeInEvents.length; i++){
        let payDay = wagesEarnedOnDate(record, record.timeInEvents[i].date)
        pay += payDay
    }
    return pay
}

function calculatePayroll(arr){
   
    const totalPay = arr.reduce((acc, record) => {
        const totalPay = allWagesFor(record)
        return acc + totalPay
    }, 0)
    return totalPay
}
// calculatePayroll()
