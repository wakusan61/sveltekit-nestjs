/**
 * TODO:nodenvなどによる切り替えをする。
 */
const DOMAIN = "http://localhost:3000"

export const createRequestURL = (path:string):string => {
  return new URL(path,DOMAIN).toString()
}
