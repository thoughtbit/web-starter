/**
 * 包裹Promise
 * @param cb 回掉方法
 * @param options 回掉方法参数
 */
export function withPromise(cb: Function, options = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    const obj = {
      success(res: any) {
        return resolve(res);
      },
      fail(err: any) {
        return reject(err);
      },
    };
    options = Object.assign(obj, options);
    typeof cb === "function" && cb(options);
  });
}

// // 例子
// withPromise(
//   (options: any) => {
//     console.log("options:", options);
//     api
//       .getUsers()
//       .then((res: any) => {
//         if (res.code === 0) {
//           options.success(res.data);
//         }
//       })
//       .catch((err) => {
//         options.fail(err);
//       });
//   },
//   {
//     time: new Date().getTime(),
//   }
// )
//   .then((result) => {
//     console.log("result:", result);
//   })
//   .catch((error) => {
//     console.log("error:", error);
//     Toast(error);
//   });