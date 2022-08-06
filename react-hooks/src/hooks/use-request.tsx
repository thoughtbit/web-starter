import { useEffect, useState } from "react";
import { useDebounceFn } from "ahooks";
import { message, notification } from "antd";

import type { BaseRes, ErrorWithResponse, RequestOptions, RequestType, ResPage } from "./types";

const defaultOptions = <R, P extends any[]>(): RequestOptions<R, P> => {
	return {
		deps: undefined,
		defaultLoading: false,
		loadingText: {
			loading: "正在加载",
			done: "加载成功",
		},
		params: [],
		debounceWait: 500,
	};
};

const convertHeaders = (h?: Headers) => {
	const ret: any[] = [];

	h?.forEach((val, key) => {
		ret.push({
			key,
			val,
		});
	});

	return ret;
};

function newError<T>(res: BaseRes<T>): ErrorWithResponse<T> {
	return {
		name: res.msg,
		message: res.msg,
		response: res,
	};
}

export function useRequest<R = any, P extends any[] = any>(
	service: (...args: P) => Promise<BaseRes<R>>,
	options?: RequestOptions<R, P>
): RequestType<R, P> {
	const {
		params,
		deps,
		defaultLoading,
		debounceWait,
		onError,
		onSuccess,
		loadingText,
	} = {
		...defaultOptions<R, P>(),
		...options,
	} as RequestOptions<R, P>;
	const [data, setData] = useState<R>();
	const [pagination, setPagination] = useState<ResPage>();
	const [loading, setLoading] = useState<boolean>(!!defaultLoading);

	const debounceService = useDebounceFn(
		async (...args: P) => {
			await handleReq(...args);
		},
		{ wait: debounceWait }
	);

	useEffect(() => {
		if (deps === undefined) {
			return;
		}

		//@ts-ignore
		debounceRun(...(params || []));
	}, deps);

	const debounceRun = (...args: P) => {
		setLoading(true);
		// @ts-ignore
		debounceService.run(...args);
	};

	const run = async (...args: P) => {
		setLoading(true);
		return await handleReq(...args);
	};

	const reset = () => setData(undefined);

	const handleReq = async (...args: P) => {
		let hideLoading = () => { };
		if (loadingText && loadingText?.loading) {
			hideLoading = message.loading(loadingText?.loading);
		}

		try {
			const res = await service(...args);
			handleRes(res);
			hideLoading();
			setLoading(false);
			return res;
		} catch (e) {
			handleError(e);

			hideLoading();
			setLoading(false);
			return;
		}

		// return await service(...args).then((res: any) => {
		// 	handleRes(res);
		// 	hideLoading();
		// 	setLoading(false);
		//   })
		//   .catch((e) => {

		// 	handleError(e);
		//   }).finally(() => {
		// 	hideLoading();
		// 	setLoading(false);
		//   });
	};

	const handleError = (e: any) => {
		console.error("useRequest: catch an error while call service", e);
		const skipMsg = onError && !onError(e);
		if (skipMsg) return;
		showError(e.data, e.response, e.request);
	};

	const showError = (data: BaseRes<R>, res?: Response, req?: Request) => {
		let resText = JSON.stringify({
			data,
			response: res && {
				headers: res?.headers ? convertHeaders(res?.headers) : undefined,
				ok: res?.ok,
				redirected: res?.redirected,
				status: res?.status,
				statusText: res?.statusText,
				type: res?.type,
				url: res?.url,
			},
			request: req && {
				url: req?.url,
				headers: req?.headers && convertHeaders(req?.headers),
				method: req?.method,
				referer: req?.referrer,
			},
		});

		notification.error({
			message: "请求失败",
			duration: 0,
			description: (
				<div>
					<div style={{ maxHeight: "400px", overflowY: "auto" }}>
						错误：{data?.msg || "未知错误"}
					</div>
					<div style={{ marginTop: "10px" }}>
						{resText}
					</div>
				</div>
			),
		});
	};

	const handleRes = (res: BaseRes<R>) => {
		setData(res?.data);
		setPagination(res?.pagination);
		// 错误提示
		// if (res?.code !== 0) {
		// 	const skipMsg = onError && onError(newError(res)) === false;
		// 	if (skipMsg) return;

		// 	showError(res);
		// 	return;
		// }

		if (loadingText && loadingText?.done) {
			message.success(loadingText.done);
		}

		if (onSuccess) onSuccess(res);
	};

	return {
		data,
		pagination,
		loading,
		reset,
		run,
		debounceRun,
	};
}

