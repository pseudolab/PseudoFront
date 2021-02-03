import {types, range} from '@/fixture/validators.js'


/**
 * @readonly
 * @param {Object.<cmd: string, validator: callback | null>}
 * https://developer.mozilla.org/ko/docs/Web/API/Document/execCommand
*/
const cmdDict = new Object.freeze(
  {
    backColor: types.str,
    contentReadOnly: types.bool,
    bold: null,
    // required Selection
    copy: null,
    fontSize: range(1, 7)
  }
)
  	 