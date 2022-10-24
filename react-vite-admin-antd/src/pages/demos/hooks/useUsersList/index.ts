import { useEffect, useReducer } from "react";
import { get } from "lodash-es";
import init from "./init";
import reducer, { initialState } from "./reducer";
import { api, request } from "@/services";

const useUsersList = (shouldFetchData = true) => {
  // const [{ users, error, isLoading }, dispatch] = useReducer(reducer, initialState);
  const [{ data, error, isLoading }, dispatch] = useReducer(reducer, initialState, () => init(initialState, shouldFetchData));

  useEffect(() => {
    if (shouldFetchData) {
      fetchUsersList();
    }
  }, [shouldFetchData]);

  const fetchUsersList = async () => {
    dispatch({
      type: "GET_DATA",
    });

    // await Promise.all(["roles", "users"].map((endPoint, index) => {
    //   request({
    //     url: endPoint,
    //     method: "get",
    //     params: {},
    //   });
    // }));

    await api
      .getUsers({})
      .then((response) => {
        dispatch({
          type: "GET_DATA_SUCCEEDED",
          data: response.data,
        });
      })
      .catch((error) => {
        const message = get(error, ["response", "payload", "message"], "An error occured");

        dispatch({
          type: "GET_DATA_ERROR",
        });

        if (message !== "Forbidden") {
          alert(message);
        }
      });
  };

  return { data, isLoading, error, getData: fetchUsersList };
};

export default useUsersList;
