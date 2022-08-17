import { notFoundImage } from "../assets";
import { useRoute } from "../hooks";

export default function NotFound() {
  const { history } = useRoute();
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>404 页面</h2>
      <img src={notFoundImage} />
      <button
        type="button"
        onClick={() => {
          history.replace("/");
        }}
      >
        返回上一页
      </button>
    </div>
  );
}
