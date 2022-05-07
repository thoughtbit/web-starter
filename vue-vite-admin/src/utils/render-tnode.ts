// 使用
// <t-node :content="prefixIconContent"></t-node>
// const suffixIconContent = computed(() => renderTNode(internalInstance, 'suffixIcon'));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TNodeComponent = (props: { content: any }) => props.content;
TNodeComponent.props = ["content"];
export default TNodeComponent;
