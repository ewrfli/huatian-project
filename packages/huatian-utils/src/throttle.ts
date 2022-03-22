
// |----300ms --- | ---- 300ms --- |
type FN = (...args : any[]) => any

export function throttle<T extends FN>(fn :  T, limit : number = 300) 
  : (...args : Parameters<T>) => ReturnType<T>
{
  let inThrottle = false, lastResult : any
  return (...args) => {
    if(!inThrottle) {
      inThrottle = true
      setTimeout(() => inThrottle=false, limit)
      lastResult = fn(...args)
    }
    return lastResult
  }
} 


// function wait(ms : number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }

// async function run(){
//   const fn = throttle((msg : string) => {
//     console.log('running...', msg)
//   })

//   for(let i = 0; i < 10; i++) {
//     await wait(100)
//     fn(i + "")
//   }
// }

// run()