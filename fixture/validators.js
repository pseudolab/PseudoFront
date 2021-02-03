/** 
* @param {Object.<string, callback>}
*/
const types = {
  str: (p) => (typeof p === "string") && p.length > 0,
  num: (p) => typeof p === "number",
  arr: (p) => Array.isArray(p),
  bool: (p) => typeof p === "boolean"
}

/** 
* @param {number | string} start
* @param {number | string} end
* @return {callback} validator
*/
const range = ({start, end, value}) => {
  if (types.str(start)) {
    start = Number(start)
  }
  if (types.str(end)) {
    end = Number(end)
  }  
  if (types.str(value)) {
    value = Number(value)
  }  
  let set = new Set()
  for (i = start; i < end + 1; ++i) {
    set.add(i)
  }
  return (val) => {set.has(val)}
}

export {types, range}