import axios from "axios";

// 获取用户列表
export async function GetUserList(): Promise<any> {
	// return axios.request({ url: "https://61303d0d5fc50700175f182e.mockapi.io/users", method: "get" })
	const res = await fetch("https://61303d0d5fc50700175f182e.mockapi.io/users");
    return await res.json();
}
