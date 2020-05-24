import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Descriptions, Avatar, message } from "antd";

import axios from "axios";

import actions from "@/shared/actions";

function GetUserInfo(token) {
   return axios.get(
          "/user",
          {
            headers: {
              "Authorization": token,
            }
          }
        )
        .then((res) => {
          if (!res.data.data) {
            return;
          }
          return res.data.data;
        })
        .then((data) => {
          console.log("data:", data);
          if (!data) {
            return;
          }
          return data;
        });

}

const Status = () => {
  const history = useHistory();

  const [token, setToken] = useState();
  useEffect(() => {
    actions.onGlobalStateChange((state) => {
      const { token } = state;
      // 未登录 - 返回主页
      if (!token) {
        message.error("未检测到登录信息！");
        return history.push("/");
      }
      setToken(token);
    }, true);
  }, [history]);

  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    if (!token) return;

    (async () => {
      const result = await GetUserInfo(token);
      console.log("result:", result);
      setUserInfo(result);
    })();
  }, [token]);

  if (!userInfo) return null;

  return (
    <section>
      <Descriptions title={`欢迎你，${userInfo.nickname}`}>
        <Descriptions.Item label="Avatar">
          <Avatar src={userInfo.avatar_url} />
        </Descriptions.Item>
        <Descriptions.Item label="UserName">
          {userInfo.nickname}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {userInfo.gender ? "boy" : "girl"}
        </Descriptions.Item>
      </Descriptions>
      <style jsx>{`
        section {
          padding: 20px;
        }
      `}</style>
    </section>
  );
};

export default Status;
