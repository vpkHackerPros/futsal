import { useState, useEffect } from "react";

function useKeyPress(callback, targetKey) {
  function downHandler({ key }) {
    if (key === targetKey) {
    }
  }
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      callback
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
}

export default useKeyPress
