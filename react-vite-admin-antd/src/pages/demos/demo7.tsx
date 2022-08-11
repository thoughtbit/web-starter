import forwardRefWithStatics from "@/utils/forwardRefWithStatics";
import type { FC } from "react";

export type TextProps = {
  children?: React.ReactNode;
};
export type SpanProps = {
  children?: React.ReactNode;
};

const Span: FC<SpanProps> = (props) => {
  const { children, ...resetProps } = props;
  return <span {...resetProps}>{children}</span>;
};

const Mark: FC<SpanProps> = (props) => {
  const { children, ...resetProps } = props;
  return <mark {...resetProps}>{children}</mark>;
};

const Text = forwardRefWithStatics(
  (props: TextProps, ref) => {
    const { children, ...resetProps } = props;
    return (
      <div {...resetProps} ref={ref}>
        {children}
      </div>
    );
  },
  {
    Span,
    Mark,
  }
);

const Demo7 = () => {
  return (
    <>
      <Text>00000000000</Text>
      <Text>
        <Text.Span>1111</Text.Span>
        <Text.Span>2222</Text.Span>
        <Text.Mark>高亮</Text.Mark>
      </Text>
    </>
  );
};

export default Demo7;
