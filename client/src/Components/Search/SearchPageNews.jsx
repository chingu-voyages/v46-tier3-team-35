import { useState, useEffect } from "react";
import ImageNotFound from "../Search/istockphoto-1409329028-612x612.jpg";

function SearchPageNews(props) {
  const [searchName, setSearchName] = useState("");
  const [cryptoNews, setCryptoNews] = useState([]);
  const cryptoName = props.cryptoInfoName;
  useEffect(() => {
    setSearchName(cryptoName);
  }, [cryptoName]);
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?q=bitcoin&apikey=b1e741bd4be645978f82c93c49c2f549`
    )
      .then((res) => res.json())
      .then((data) => setCryptoNews(data.articles));
  }, [cryptoName]);
  return (
    <div>
      <div
        className="Search-page-news-div"
      >
        <h2 className="News-title">News</h2>
        <p className="Trending">Trending</p>
        {cryptoNews.length > 0
          ? cryptoNews.map((news,index) => {
              return (
                <div key={index}>
                  <a href={news.url ? news.url : ""}>
                    <div className="News-div">
                      {news.urlToImage ? (
                        <img src={news.urlToImage} className="News-image" />
                      ) : (
                        <img
                          src={<ImageNotFound />}
                          className="image-not-found"
                        />
                      )}
                      <span className="news-name">
                        {news.title && news.title}
                      </span>
                    </div>
                  </a>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default SearchPageNews;
