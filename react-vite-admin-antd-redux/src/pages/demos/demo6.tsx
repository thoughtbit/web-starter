import { type HTMLProps, memo, useEffect, useCallback, useRef } from "react";
import { connect, type ConnectedProps } from "react-redux";
import { type RootState, type AppDispatch } from "@/store";

import { changeFilter, changePage, changeQuery, fetchUsers } from "./state/demos";
import React from "react";
import useCombinedRefs from "@/hooks/useCombinedRefs";

const mapStateToProps = (state: RootState) => {
  return {
    users: state.demos.users,
    query: state.demos.query,
    showPaging: state.demos.showPaging,
    totalPages: state.demos.totalPages,
    page: state.demos.page,
    filters: state.demos.filters,
    isLoading: state.demos.isLoading,
  };
};

const mapDispatchToProps = {
  fetchUsers,
  changeQuery,
  changePage,
  changeFilter,
};

// const mapDispatchToProps = (dispatch: AppDispatch) => {
//   return {
//     changePage: (page: number) => dispatch(changePage(page)),
//   };
// };

const connector = connect(mapStateToProps, mapDispatchToProps);

interface OwnProps {}

type Props = OwnProps & ConnectedProps<typeof connector>;

export interface FilterProps {
  filters: any[];
  onChange: (filter: any) => void;
  className?: string;
}

type UserListItemProps = {
  user: any;
};

const UserListItem = memo(({ user }: UserListItemProps) => {
  return <li>{user.name}</li>;
});

export interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "onChange"> {
  value: string | undefined;
  onChange: (value: string) => void;
}
const FilterInput: React.FC<any> = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, ...restProps }, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(ref, innerRef) as React.Ref<HTMLInputElement>;

    const suffix =
      value !== "" ? (
        <button
          type="button"
          onClick={(e) => {
            innerRef.current?.focus();
            onChange("");
            e.stopPropagation();
          }}
        >
          清除
        </button>
      ) : null;

    return (
      <>
        <input
          style={{width: '100%', height: '36px'}}
          type="text"
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
          {...restProps}
          ref={combinedRef}
        />
        {suffix}
      </>
    );
  }
);

const RadioButtonGroup: React.FC<any> = ({ value, options, onChange, onClick, autoFocus = false }) => {

  const activeButtonRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (autoFocus && activeButtonRef.current) {
      activeButtonRef.current.focus();
    }
  }, [autoFocus]);

  const handleOnChange = useCallback(
    (option: any) => {
      return () => {
        if (onChange) {
          console.log("onChange:", option);
          onChange(option.value);
        }
      };
    },
    [onChange]
  );
  const handleOnClick = useCallback(
    (option: any) => {
      return () => {
        if (onClick) {
          console.log("onClick:", option);
          onClick(option.value);
        }
      };
    },
    [onClick]
  );

  return (
    <ul>
      {options.map((o: any, i: number) => {
        return (
          <li key={i}>
            <input
              type="radio"
              key={`o.label-${i}`}
  
              onChange={handleOnChange(o)}
              onClick={handleOnClick(o)}
              id={o.name}
              checked={value === o.value}
              name={o.name}
              ref={value === o.value ? activeButtonRef : undefined}
            />
            <label htmlFor={o.name}>
              {o.label} {o.component ? <o.component /> : null}
            </label>
          </li>
        );
      })}
    </ul>
  );
};

const Pagination: React.FC<any> = ({ currentPage, onNavigate }) => {
  console.log("======>", onNavigate)
  return (
    <div className="pagination">
      <ul>
        <li>
          <button type="button" onClick={()=> {onNavigate(currentPage - 1)}}>
            上一页
          </button>
        </li>
        <li>
          <button type="button" onClick={()=> {onNavigate(currentPage + 1)}}>
            下一页
          </button>
        </li>
      </ul>
    </div>
  );
};

const Demo6: React.FC<Props> = ({
  fetchUsers,
  query,
  changeQuery,
  users,
  showPaging,
  totalPages,
  page,
  changePage,
  changeFilter,
  filters,
  isLoading,
}) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // const showRoles = useMemo(() => users.some((user) => user.roles), [users]);

  return (
    <div>
      <div className="action-bar">
        <FilterInput
          placeholder="Search user by email, or name."
          autoFocus={true}
          value={query}
          onChange={changeQuery}
        />
        <RadioButtonGroup
          options={[
            { label: "All users", value: false, name: "allUsers" },
            { label: "Active last 30 days", value: true, name: "activeLast30Days" },
          ]}
          onChange={(value: any) => changeFilter({ name: "activeLast30Days", value })}
          value={filters.find((f) => f.name === "activeLast30Days")?.value}
        />
      </div>
      {isLoading ? (
        "加载中"
      ) : (
        <ul>
          {users.map((user: any) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </ul>
      )}
      {showPaging && <Pagination numberOfPages={totalPages} currentPage={page} onNavigate={changePage} />}
    </div>
  );
};

export default connector(Demo6);
