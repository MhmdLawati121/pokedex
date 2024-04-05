function NextBtn({ offset, setOffset }) {
  function handleClick() {
    setOffset(offset + 20);
  }
  return <button onClick={handleClick}> Next </button>;
}

function BackBtn({ offset, setOffset }) {
  function handleClick() {
    if (offset > 20) setOffset(offset - 20);
  }
  return <button onClick={handleClick}> Back </button>;
}

export { NextBtn, BackBtn };
