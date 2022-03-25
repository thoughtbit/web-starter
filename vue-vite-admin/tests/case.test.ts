import { shallowMount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Case from "../src/components/hello/Case";

test("mount component", () => {
  const wrapper = shallowMount(Case, {
    props: {
      value: "test",
    },
    global: {
      stubs: ["select", "option"],
    },
  });

  expect(wrapper.html()).toMatchSnapshot();
});
