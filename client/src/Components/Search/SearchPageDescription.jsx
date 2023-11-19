import "../Search/SearchPage.css";
function Description(props) {
  const cryptoInfo = props.cryptoInfo;

  return (
    <div>
      <div
        className="Search-page-description-div"
      >
         {cryptoInfo.length === undefined ? (
           <div>
           <h2 className="Description-Header">What is {cryptoInfo.name}?</h2>
           <p className="description"> {cryptoInfo.description.en}</p>
         </div>
          ) : (
            ""
          )}
      </div>
    </div>
  );
}

export default Description;
