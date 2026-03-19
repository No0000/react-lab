// const original = [1, 2, 3];
const original = [[1,2,3], [4,5,6]];
export default function Test() {
  const copy = [...original];
  copy[0][1] = "ZZZ";

  return (
    <>
      {original.map(o => (
        <>
        {o.map(i => (
          <p>oliginal : {i}</p> 
        ))}
        </>
      ))}
      {copy.map(o => (
        <>
        {o.map(i => (
          <p>copy : {i}</p> 
        ))}
        </>
      ))}
    </>
  );
}