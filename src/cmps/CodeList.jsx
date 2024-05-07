function CodeList({ codes }) {
  return (
    <ul>
      {codes.map((code) => (
        <li key={code._id}>
          {code.address} - {code.num}
        </li>
      ))}
    </ul>
  )
}

export default CodeList
