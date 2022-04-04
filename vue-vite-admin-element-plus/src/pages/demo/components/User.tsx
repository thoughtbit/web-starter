import { defineComponent } from "vue";
import { useStore, mapAction } from "@/context/UserProvider";

export default defineComponent({
  name: "User",

  setup() {
    const { state }: any = useStore();

    console.log("store:", state);

    const fetchUser = mapAction("fetchUser");

    return () => {
      return (
        <div class="md:container md:mx-auto">
          {state.name ? <p>{state.name}</p> : <p>Not Login</p>}
          <button
            class="px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
            onClick={fetchUser}
          >
            Fetch User
          </button>
        </div>
      );
    };
  },
});
