import { useEffect } from "react";
import { useStore } from "@/store";

const Demo6 = () => {
  const { menuList, getMenuList } = useStore((store) => store);

  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <ul>
      {menuList.map((item: any, index) => (
        <li key={index}>
          {index+1}. {item.title} [{item.path}]
        </li>
      ))}
    </ul>
  );
};

export default Demo6;
