import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setdata] = useState([]);
  const [postPerPage, setpostPerPage] = useState(10);
  const [pagenumber, setpagenumber] = useState(1);
  const [pageArray, setPageArray] = useState([]);

  let end = pagenumber * postPerPage;
  let start = end - postPerPage;
  let sliceddata = data.slice(start, end);

  useEffect(() => {
    const getdata = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      const jsondata = await data.json();
      setdata(jsondata);
      let numberofpages = Math.ceil(jsondata.length / postPerPage);
      let newarray = [...Array(numberofpages + 1)].map((elem, index) => {
        return index;
      });
      setPageArray(newarray.slice(1));
    };
    getdata();
  }, []);

  return (
    <div className="App">
      <h1>My Posts</h1>
      {sliceddata.map((elem, index) => {
        return (
          <div key={index} style={{ margin: "20px" }}>
            {elem.title}
          </div>
        );
      })}

      <div style={{ marginBottom: "100px", marginTop: "50px" }}>
        {pageArray.map((page) => {
          return (
            <>
              <span
                style={{ margin: "10px", cursor: "pointer" }}
                onClick={() => {
                  setpagenumber(page);
                }}
              >
                {page}
              </span>
            </>
          );
        })}
      </div>
    </div>
  );
}
