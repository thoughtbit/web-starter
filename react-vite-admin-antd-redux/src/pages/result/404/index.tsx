import { memo } from "react";
import Result from "@/components/Result";

const NotFound = () => <Result code={404} />;

export default memo(NotFound);
