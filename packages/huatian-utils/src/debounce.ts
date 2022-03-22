
type FN = (...args : any[]) => any
export function debounce<T extends FN>(fn : FN, limit : number = 300) 
 : (...args : Parameters<T>) => ReturnType<T>
{

  let I : any, lastResult : any 
  return (...args) => {
    clearInterval(I)
    I = setTimeout(() => {
      lastResult = fn(...args)
    }, limit)
    return lastResult
  }
}

// const fn = debounce((msg : string) => {
//   console.log(msg)
// })

// for(let i = 0; i < 10000; i++) {
//   fn(i)
// }