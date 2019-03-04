/**
 * Created by jiachenpan on 16/11/18.
 */
import validator from 'validator'
export function isvalidUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return validator.isEmail(str)
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
