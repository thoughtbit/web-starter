import { memo, useState } from "react";
import useCallbackList from "@/hooks/useCallbackList";

interface ChildProp {
	onClick: (a: number) => void;
	base: number;
	children?: any;
	index: number;
}
const Child = memo((props: ChildProp) => {
	console.log('children render at ' + props.index);
	function childClick() {
		props.onClick(props.base);
	}
	return <button onClick={childClick}>{props.children}</button>;
});


const Demo8 = () => {
	console.log('father render');
	const [noUseState, setNoUseState] = useState(Math.random());
	const [array, setArray] = useState(new Array(5).fill(1).map((v, i) => i + 1));

	const clickHandlers = useCallbackList(
		array,
		(item, index) => {
			return (fromChild: number) => {
				console.log(array[0] + fromChild);
				setArray((prevState) => {
					const newArr = [...prevState];
					newArr[index] = fromChild + array[0];
					return newArr;
				});
			};
		},
		[array[0]]
	);
	function changeLoopData() {
		setNoUseState(Math.random());
	}
	function addData() {
		setArray([...array, 1]);
	}

	function removeData() {
		setArray([...array.slice(0, -1)]);
	}
	function removeFromMiddle() {
		setArray([array[0], array[1], ...array.slice(3)]);
	}

	return (
		<div className='cb-list page'>
			<div>子渲染=子组件渲染，父渲染=父组件渲染</div>
			<div>-------------------------------</div>
			<div>无关依赖: {noUseState}</div>
			<button onClick={changeLoopData}> 改变无关依赖(1次父渲染) </button>
			<div>-------------------------------</div>
			<div>打印每个数+第一个数并纳入下次计算</div>
			<div>-------------------------------</div>
			<div>
				{array.map((item, index) => (
					<Child key={index} index={index} base={item} onClick={clickHandlers[index]}>{`${item} + ${
						array[0]
					} = ? (${index == 0 ? '所有子渲染和1次父渲染' : '1次子渲染和1次父渲染'})`}</Child>
				))}
			</div>
			<button onClick={addData}> 添加一个数(新的子渲染和1次父渲染)</button>
			<button onClick={removeData}> 删除最后一个数(1次父渲染)</button>
			{array.length > 2 && (
				<div>
					<button onClick={removeFromMiddle}>
						删除第三个数(最多{array.length - 3}次子渲染和1次父渲染){' '}
					</button>
				</div>
			)}
			<div>渲染浣柒</div>
		</div>
	);
};

export default Demo8;
