/**
 * Component for "next" button
 *
 * @param {Object} props - Props object
 * @param {number} props.offset - Offset value
 * @param {function} props.setOffset - Function to set offset
 * @returns {JSX.Element} - JSX element representing next page button
 */

function NextBtn({ offset, setOffset }) {
  function handleClick() {
    setOffset(offset + 20);
  }
  return <button onClick={handleClick}> Next </button>;
}

/**
 * Component for "back" button
 *
 * @param {Object} props - Props object
 * @param {number} props.offset - Offset value
 * @param {function} props.setOffset - Function to set offset
 * @returns {JSX.Element} - JSX element representing back page button
 */
function BackBtn({ offset, setOffset }) {
  function handleClick() {
    if (offset > 20) setOffset(offset - 20);
  }
  return <button onClick={handleClick}> Back </button>;
}

export { NextBtn, BackBtn };
