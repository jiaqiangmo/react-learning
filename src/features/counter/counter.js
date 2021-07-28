import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './Counter.module.css';

import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  fetchUserById,
} from "./counterSlice.js";
import { Input, Button } from "antd";

export function Counter() {
  const [incrementAmount, setIncrementAmount] = useState("2");
  const count = useSelector((state) => {
    return state.counter.value;
  });
  const dispatch = useDispatch();
  const handleOnClickIncrement = () => {
    if (count >= 30) return;
    dispatch(increment());
  };
  const handleOnClickDecrement = () => {
    if (count <= 0) return;
    dispatch(decrement());
  };
  const handleOnClickIncrementByAmount = () => {
    if (count >= 30) return;
    dispatch(incrementByAmount(5));
  };
  const handleOnClickIncrementAsync = () => {
    if (count >= 30) return;
    dispatch(incrementAsync(2));
  };
  const handleOnClickAync = () => {
    dispatch(
      fetchUserById({
        userId: 20,
      })
    );
  };
  return (
    <>
      <h1>边界判断：大于等于30加不了,小于等于0减不了</h1>
      <Button onClick={handleOnClickIncrement} type="primary">
        点击加1
      </Button>
      <Input placeholder="请输入" type="text" value={count} />
      <Button type="primary" onClick={handleOnClickDecrement}>
        点击减一
      </Button>
      <Button type="primary" onClick={handleOnClickIncrementByAmount}>
        点击加3
      </Button>
      <Button type="primary" onClick={handleOnClickIncrementAsync}>
        模拟异步加2
      </Button>
      <Button type="primary" onClick={handleOnClickAync}>
        Writing Async Logic with
        Thunks(https://redux.js.org/tutorials/essentials/part-2-app-structure)
      </Button>
      <hr/>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </>
  );
}
