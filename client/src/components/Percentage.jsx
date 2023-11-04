function Percentage({ num }) {
  // Check if num is a number and is not null or undefined
  if (typeof num === "number" && num !== null) {
    if (num <= 0) {
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#ff3131]">
          {num.toFixed(1)}%
        </td>
      );
    } else {
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-[#04A73E]">
          {num.toFixed(1)}%
        </td>
      );
    }
  } else {
    // Return a placeholder or a default value when num is not a valid number
    return (
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">N/A</td>
    );
  }
}

export default Percentage;
