import axios, { AxiosPromise } from "axios";
import * as user from "./query/user";

const CancelToken = axios.CancelToken;
const cancelToken = () =>
  new CancelToken(function executor(c) {
    const w = window as any;
    w.axiosCancel.push(c);
  });

const query: any = {
  ...user,
};

class Graph {
  private queryData: string = '';
  public query(queryData: string) {
    this.queryData = queryData;
    return this;
  }
  public params(variablesData: any): AxiosPromise<void> {
    return axios.post(
      '/graphql',
      {
        query: query[this.queryData],
        variables: variablesData,
      },
      { cancelToken: cancelToken() }
    );
  }
}

export default new Graph();


/*
 // 例子:
 graph
  .query('getUserList')
  .params(param)
  .then((res: AxiosResponse) => {
    if (!res.data) {
      return;
    }
    return res.data.getUserList;
  })
  .then((data: any) => {
    if (!data) {
       return;
    }
    context.dispatch('GET_USER_LIST', { userID: data[0].id });
  });

  axios
   .post(
     '/graphql',
     {
       query: queryVal,
       variables: variablesData,
     }
    ).then((res: AxiosResponse<any>) => {
        const data = res.data;
        if (!data) {
          return;
        }
        context.dispatch('GET_USER_LIST', { userID: data[0].id });
      });
*/
