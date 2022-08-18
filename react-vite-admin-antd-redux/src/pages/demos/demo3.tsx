import { useMemo } from "react";
import { useRequest } from "ahooks";
import _debounce from "lodash/debounce";
import { useSearchParam } from "@/hooks";
import request from "@/services/request";

export default function Demo3() {
  const getUsers = async () => {
    return await request({
      url: "/api/users",
      method: "get",
    });
  };

  const { data, error, loading, run } = useRequest(getUsers, {
    manual: true,
    throttleWait: 1000,
    loadingDelay: 300,
  });

  const users = useMemo(() => data?.data.list, [data]);

  if (error) return <p> {error?.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2>Dashboard Index</h2>
      <p>
        <button type="button" onClick={run} className="btn">
          run
        </button>
      </p>

      <ul>
        {users &&
          users.map((user: any) => {
            return (
              <li key={user.id}>
                {user.name} -- {user.email}
              </li>
            );
          })}
      </ul>
      <Messages />
    </>
  );
}

function Messages() {
  const data = [
    {
      id: 1,
      title: "Mein Kampf",
    },
    {
      id: 2,
      title: "Tumannost Andromedy",
    },
    {
      id: 3,
      title: "Terumae romae (Thermae Romae)",
    },
    {
      id: 4,
      title: "White Banners",
    },
    {
      id: 5,
      title: "Train, The",
    },
    {
      id: 6,
      title: "Julia and Julia (Giulia e Giulia)",
    },
    {
      id: 7,
      title: "Can Go Through Skin (Kan door huid heen)",
    },
    {
      id: 8,
      title: "Two Moon Junction",
    },
    {
      id: 9,
      title: "Bill & Ted's Bogus Journey",
    },
    {
      id: 10,
      title: "iSteve",
    },
    {
      id: 11,
      title: "Pee-wee's Big Adventure",
    },
    {
      id: 12,
      title: "Celestial Wives of the Meadow Mari (Nebesnye zheny lugovykh mari)",
    },
    {
      id: 13,
      title: "Railroaded!",
    },
    {
      id: 14,
      title: "Devil Hides in Doubt (Sollbruchstelle)",
    },
    {
      id: 15,
      title: "Honeymoon Killers, The",
    },
    {
      id: 16,
      title: "Hurricane, The",
    },
    {
      id: 17,
      title: "Cheaper by the Dozen",
    },
    {
      id: 18,
      title: "New Wave (Nouvelle vague)",
    },
    {
      id: 19,
      title: "Keep Your Right Up",
    },
    {
      id: 20,
      title: "Deathsport",
    },
  ];
  return <SearchBox data={data} />;
}

function SearchBox({ data }: any) {
  const searchKey = useSearchParam("key") || "";
  const filtered = useMemo(() => {
    return data.filter((item: any) => item.title.toLowerCase().includes(searchKey.toLowerCase()));
  }, [searchKey, data]);

  const handleSearch = _debounce((e: any) => {
    window.history.pushState({}, "", `${window.location.pathname}?key=${e.target.value}`);
  }, 300);
  return (
    <div className="08-filter-list">
      <h2>Movies (Debounced Search)</h2>
      <input defaultValue={searchKey} placeholder="Search..." onChange={handleSearch} />
      <ul style={{ marginTop: 20 }}>
        {filtered.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
