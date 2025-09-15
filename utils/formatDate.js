const { parse, isValid, format } = require('date-fns');


/**
* Parse various date inputs and return yyyy-MM-dd string or null
*/
function toYMD(input) {
// try parse with Date constructor first
let d;
if (!input) return null;
// Accept input like "2021-1-2" or "2021-01-02"
// Use date-fns parse with flexible format
const parsed = parse(String(input), 'yyyy-M-d', new Date());
if (isValid(parsed)) return format(parsed, 'yyyy-MM-dd');


// fallback: try Date
d = new Date(input);
if (isValid(d)) return format(d, 'yyyy-MM-dd');


return null;
}


module.exports = { toYMD };
