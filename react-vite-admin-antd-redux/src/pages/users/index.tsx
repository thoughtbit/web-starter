import { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectUserList, clearPageState, getUserList, changePage, reset } from "./state";

import styles from "./index.module.scss";

const Pagination: React.FC<any> = ({ pageSize, current, onNavigate }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="pagination">
      <ul>
        <li>
          <button
            type="button"
            onClick={() => {
              dispatch(onNavigate(pageSize, current - 1));
            }}
          >
            上一页
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              dispatch(onNavigate(pageSize, current + 1));
            }}
          >
            下一页
          </button>
        </li>
      </ul>
    </div>
  );
};

const UserListItem = memo(({ user }: any) => {
  return <li>{user.name}</li>;
});

export const Users = () => {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector(selectUserList);
  const { pageLoading, loading, current, pageSize, total, userList } = usersState;

  useEffect(() => {
    dispatch(
      getUserList({
        pageSize: pageSize,
        current: current,
      })
    );

    return () => {
      dispatch(reset());
      // dispatch(clearPageState());
    };
  }, []);

  return (
    <div className={styles["users-wrapper"]}>
      {loading ? (
        "加载中"
      ) : (
        <ul>
          {userList.map((user: any) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      )}

      {pageLoading && <Pagination current={current} pageSize={pageSize} onNavigate={changePage} />}
    </div>
  );
};

export default memo(Users);
