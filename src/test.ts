import { BDate } from "./bdate";
import assert from "assert";

const sdate = (d: Date, sep: string) => {
  return ("0000" + d.getFullYear()).slice(-4) +
    sep +
    ("00" + (d.getMonth() + 1)).slice(-2) +
    sep +
    ("00" + d.getDate()).slice(-2);
};

const stime = (d: Date, sep: string, ms: boolean) => {
  return ("00" + d.getHours()).slice(-2) +
    sep +
    ("00" + d.getMinutes()).slice(-2) +
    sep + 
    ("00" + d.getSeconds()).slice(-2) +
    (ms ? ("." + ("000" + d.getMilliseconds()).slice(-3)) : "");
};


const d1 = new Date(2019, 9, 9);
const bd1 = new BDate(2019, 9, 9);

console.log(bd1.toString());  // 2019/10/09 00:00:00
assert.ok(bd1.toString() === `${sdate(d1, "/")} ${stime(d1, ":", false)}`);

const d2 = new Date(d1);
d2.setMinutes(d2.getMinutes() + 66);
d2.setSeconds(d2.getSeconds() + 123);
d2.setHours(d2.getHours() - 3);
d2.setDate(d2.getDate() - 10);
d2.setMonth(d2.getMonth() + 27);
d2.setFullYear(d2.getFullYear() + 1);
d2.setMilliseconds(d2.getMilliseconds() - 1)
const bd2 = bd1.addMinutes(66)
  .addSeconds(123)
  .addHours(-3)
  .addDate(-10)
  .addMonth(27)
  .addYear(1)
  .addMilliseconds(-1);

assert(bd1.time === d1.getTime()); // not modified d1

console.log(bd2.toString({withMilliseconds: true}));
assert(bd2.time === d2.getTime());

const bd22 = new BDate(d1);
bd22.minutes += 66;
bd22.seconds += 123;
bd22.hours -= 3;
bd22.date -= 10;
bd22.month += 27;
bd22.year += 1;
bd22.milliseconds -= 1;
assert(bd22.time === d2.getTime());

assert(bd2.utc.year === d2.getUTCFullYear());
assert(bd2.utc.month === d2.getUTCMonth());
assert(bd2.utc.date === d2.getUTCDate());
assert(bd2.utc.hours === d2.getUTCHours());
assert(bd2.utc.minutes === d2.getUTCMinutes());
assert(bd2.utc.seconds === d2.getUTCSeconds());
assert(bd2.utc.milliseconds === d2.getUTCMilliseconds());


const bd3 = new BDate(2019, 9, 9, 1, 2, 3, 4);
const bd3s = bd3.beginningOfDay();
const bd3e = bd3.endOfDay();
console.log(bd3.toString({withMilliseconds: true}));  // 2019/10/09 01:02:03.004
console.log(bd3s.toString({withMilliseconds: true})); // 2019/10/09 00:00:00.000
console.log(bd3e.toString({withMilliseconds: true})); // 2019/10/09 23:59:59.999

assert(bd3.toString({withMilliseconds: true}) === "2019/10/09 01:02:03.004");
assert(bd3s.toString({withMilliseconds: true}) === "2019/10/09 00:00:00.000");
assert(bd3e.toString({withMilliseconds: true}) === "2019/10/09 23:59:59.999");

const bd3ms = bd3.beginningOfMonth();
const bd3me = bd3.endOfMonth();
console.log(bd3.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}));  // 2019-10-09T01-02-03.004
console.log(bd3ms.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}));  // 2019-10-01T00-00-00.000
console.log(bd3me.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}));  // 2019-10-31T23-59-59.999



assert(bd3.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}) === "2019-10-09T01-02-03.004");
assert(bd3ms.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}) === "2019-10-01T00-00-00.000");
assert(bd3me.toString({
  withMilliseconds: true,
  dateSeparator: "-",
  timeSeparator: "-",
  dateTimeSeparator: "T"
}) === "2019-10-31T23-59-59.999");

console.log("finish");
debugger;

