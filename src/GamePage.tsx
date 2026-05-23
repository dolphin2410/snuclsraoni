import { useState, useEffect } from "react";
import { gameSchema } from "./util/game";
import styles from "./GamePage.module.css";

type GamePageProps = {
  index: number;
  setPageRef: React.Dispatch<React.SetStateAction<number>>; // 페이지 이동을 위한 함수 (옵션)
};

export default function GamePage({ index, setPageRef }: GamePageProps) {
  // 1. Array.from을 사용하여 각 페이지마다 서로 다른 '독립된 객체'를 생성 (fill 버그 수정)
  const [gameState, setGameState] = useState<
    { 1: number; 2: number; 3: number; 4: number; 5: number }[]
  >(() =>
    Array.from({ length: gameSchema.length }, () => ({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    })),
  );

  // 현재 페이지의 로컬 입력 상태
  const [currState, setCurrState] = useState(gameState[index]);

  // 🔥 중요: index(페이지)가 바뀔 때마다 로컬 상태를 해당 페이지의 데이터로 리셋해줍니다.
  useEffect(() => {
    setCurrState(gameState[index] || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  }, [index, gameState]);

  // 게임 종료 화면 (모든 페이지를 다 넘겼을 때)
  if (index === gameSchema.length) {
    const scores = [0, 0, 0, 0, 0];
    for (let i = 0; i < gameSchema.length; i++) {
      for (let j = 1; j <= 5; j++) {
        scores[j - 1] +=
          ((gameState[i] as any)?.[j] || 0) * gameSchema[i].unit;
      }
    }

    return (
      <div className={styles.container}>
        <h2>&lt;게임 종료&gt;</h2>
        <div>
          <p>1조: {scores[0]}</p>
          <p>2조: {scores[1]}</p>
          <p>3조: {scores[2]}</p>
          <p>4조: {scores[3]}</p>
          <p>5조: {scores[4]}</p>
        </div>        
        <div className={styles.btnContainer}>
            <button
              className={styles.btn}
              data-disabled={index === 0}
              onClick={() => {
                if (index === 0) return;
                setPageRef((prev) => prev - 1);
              }}
            >
              &lt;
            </button>
          <button
            className={styles.btn}
            data-disabled={true}
            onClick={() => {
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }

  const currPageData = gameSchema[index];
  if (!currPageData) return null;

  if (currPageData.qType === "sort") {
    return (
      <div className={styles.container}>
        <input
          type="text"
          placeholder="1조"
          className={styles.textInput}
          value={currState?.[1] || ""}
          onChange={(e) =>
            setCurrState({ ...currState, 1: parseInt(e.target.value) || 0 })
          }
        />
        <input
          type="text"
          placeholder="2조"
          className={styles.textInput}
          value={currState?.[2] || ""}
          onChange={(e) =>
            setCurrState({ ...currState, 2: parseInt(e.target.value) || 0 })
          }
        />
        <input
          type="text"
          placeholder="3조"
          className={styles.textInput}
          value={currState?.[3] || ""}
          onChange={(e) =>
            setCurrState({ ...currState, 3: parseInt(e.target.value) || 0 })
          }
        />
        <input
          type="text"
          placeholder="4조"
          className={styles.textInput}
          value={currState?.[4] || ""}
          onChange={(e) =>
            setCurrState({ ...currState, 4: parseInt(e.target.value) || 0 })
          }
        />
        <input
          type="text"
          placeholder="5조"
          className={styles.textInput}
          value={currState?.[5] || ""}
          onChange={(e) =>
            setCurrState({ ...currState, 5: parseInt(e.target.value) || 0 })
          }
        />
        <div className={styles.btnContainer}>
            <button
              className={styles.btn}
              data-disabled={index === 0}
              onClick={() => {
                if (index === 0) return;
                setPageRef((prev) => prev - 1);
              }}
            >
              &lt;
            </button>
          <button
            className={styles.btn}
            onClick={() => {
              setGameState((prev) => {
                const newState = [...prev];
                newState[index] = { ...currState }; // 로컬에 적어둔 점수를 전체 리스트에 안전하게 저장
                return newState;
              });
              setPageRef((prev) => prev + 1); // 저장 후 다음 페이지로 자동 이동s
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // 2. MULTISELECT 타입 (체크박스 다중 선택)
  // -------------------------------------------------------------------
  else if (currPageData.qType === "multiselect") {
    return (
      <div className={styles.container}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={currState?.[1] === 1}
          id="checkbox1"
          onChange={(e) =>
            setCurrState({ ...currState, 1: e.target.checked ? 1 : 0 })
          }
        />
        <label htmlFor="checkbox1" data-checked={currState?.[1] === 1}>
          1조
        </label>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={currState?.[2] === 1}
          id="checkbox2"
          onChange={(e) =>
            setCurrState({ ...currState, 2: e.target.checked ? 1 : 0 })
          }
        />
        <label htmlFor="checkbox2" data-checked={currState?.[2] === 1}>
          2조
        </label>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={currState?.[3] === 1}
          id="checkbox3"
          onChange={(e) =>
            setCurrState({ ...currState, 3: e.target.checked ? 1 : 0 })
          }
        />
        <label htmlFor="checkbox3" data-checked={currState?.[3] === 1}>
          3조
        </label>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={currState?.[4] === 1}
          id="checkbox4"
          onChange={(e) =>
            setCurrState({ ...currState, 4: e.target.checked ? 1 : 0 })
          }
        />
        <label htmlFor="checkbox4" data-checked={currState?.[4] === 1}>
          4조
        </label>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={currState?.[5] === 1}
          id="checkbox5"
          onChange={(e) =>
            setCurrState({ ...currState, 5: e.target.checked ? 1 : 0 })
          }
        />
        <label htmlFor="checkbox5" data-checked={currState?.[5] === 1}>
          5조
        </label>
        <div className={styles.btnContainer}>
            <button
              className={styles.btn}
              onClick={() => {
                if (index === 0) return;
                setPageRef((prev) => prev - 1);
              }}
              data-disabled={index === 0}
            >
              &lt;
            </button>
          <button
            className={styles.btn}
            onClick={() => {
              setGameState((prev) => {
                const newState = [...prev];
                newState[index] = { ...currState };
                return newState;
              });
              setPageRef((prev) => prev + 1);
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  } else if (currPageData.qType === "select") {
    return (
      <div className={styles.container}>
        <input
          type="radio"
          name={currPageData.name}
          className={styles.radio}
          checked={currState?.[1] === 1}
          id="radio1"
          onChange={(e) =>
            setCurrState({
              1: e.target.checked ? 1 : 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
            })
          }
        />
        <label htmlFor="radio1" data-checked={currState?.[1] === 1}>
          1조
        </label>
        <input
          type="radio"
          name={currPageData.name}
          className={styles.radio}
          checked={currState?.[2] === 1}
          id="radio2"
          onChange={(e) =>
            setCurrState({
              1: 0,
              2: e.target.checked ? 1 : 0,
              3: 0,
              4: 0,
              5: 0,
            })
          }
        />
        <label htmlFor="radio2" data-checked={currState?.[2] === 1}>
          2조
        </label>
        <input
          type="radio"
          name={currPageData.name}
          className={styles.radio}
          checked={currState?.[3] === 1}
          id="radio3"
          onChange={(e) =>
            setCurrState({
              1: 0,
              2: 0,
              3: e.target.checked ? 1 : 0,
              4: 0,
              5: 0,
            })
          }
        />
        <label htmlFor="radio3" data-checked={currState?.[3] === 1}>
          3조
        </label>
        <input
          type="radio"
          name={currPageData.name}
          className={styles.radio}
          checked={currState?.[4] === 1}
          id="radio4"
          onChange={(e) =>
            setCurrState({
              1: 0,
              2: 0,
              3: 0,
              4: e.target.checked ? 1 : 0,
              5: 0,
            })
          }
        />
        <label htmlFor="radio4" data-checked={currState?.[4] === 1}>
          4조
        </label>
        <input
          type="radio"
          name={currPageData.name}
          className={styles.radio}
          checked={currState?.[5] === 1}
          id="radio5"
          onChange={(e) =>
            setCurrState({
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: e.target.checked ? 1 : 0,
            })
          }
        />
        <label htmlFor="radio5" data-checked={currState?.[5] === 1}>
          5조
        </label>
        <div className={styles.btnContainer}>
            <button
              className={styles.btn}
              onClick={() => {
                if (index === 0) return;
                setPageRef((prev) => prev - 1);
              }}
                data-disabled={index === 0}
            >
              &lt;
            </button>
          <button
            className={styles.btn}
            onClick={() => {
              setGameState((prev) => {
                const newState = [...prev];
                newState[index] = { ...currState };
                return newState;
              });
              setPageRef((prev) => prev + 1);
            }}
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }

  return null;
}
