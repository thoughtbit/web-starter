import { defineComponent } from "vue";
import { useStore } from "@/context/CountProvider";
export default defineComponent({
  name: "Counter",

  setup() {
    const { state, dispatch }: any = useStore();

    console.log("store:", state);
    const increment = () => {
      dispatch("increment");
    };
    const decrement = () => {
      dispatch("decrement");
    };


    return () => {
      return (
        <div class="md:container md:mx-auto">
          <p>
            <button class="px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
             onClick={increment}>+</button>
            {state.count}
            <button class="px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
             onClick={decrement}>-</button>
          </p>
        </div>
      );
    };
  },
});
