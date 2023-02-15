import { useState } from "react";

export function Crud() {
  const [tableBollean, setTableBollean] = useState(true);
  const [inputDate, setInputDate] = useState({ soni: 0, like: false, id: "" });
  const [malumotlar, setMalumotlar] = useState([]);
  let handleTale = () => {
    setTableBollean(!tableBollean);
  };

  let handleInput = (e) => {
    setInputDate({
      ...inputDate,
      [e.target.name]: e.target.value,
    });
  };
  let handleRasm = (e) => {
    setInputDate({
      ...inputDate,
      rasm: URL.createObjectURL(e.target.files[0]),
    });
  };

  let sendFunc = () => {
    setMalumotlar([...malumotlar, { ...inputDate, id: new Date().getTime() }]);
    setTableBollean(false);
    console.log(malumotlar);
  };

  //------------------ plus minus func ------------------

  let plus = (item) => {
    if (item.soni < 10) {
      setMalumotlar(
        malumotlar.map((obj) =>
          obj.id === item.id && obj.soni < 10 ? { ...obj, soni: obj.soni + 1 } : obj
        )
      )
    }
    else {
      alert("10dan katta son bo'lmaydi")
    }
  }
  let minus = (item) => {
    if (item.soni > 0) {
      setMalumotlar(
        malumotlar.map((obj) =>
          obj.id === item.id ? { ...obj, soni: obj.soni - 1 } : obj
        )
      )
    }
    else {
      alert("0dan kichik son bo'lmaydi")
    }
  }

  // ---------------- remov func --------------
  function remove(id) {
    setMalumotlar(malumotlar.filter((val) => val.id !== id))
  }

  return (
    <>
      <div className="crud">
        <button
          onClick={handleTale}
          style={{ backgroundColor: tableBollean ? "red" : "blue" }}
        >
          {tableBollean ? "table" : "form"}
        </button>
        {tableBollean ? (
          <div className="form_oyna">
            <form>
              <input
                type="text"
                placeholder="nomi"
                name="nomi"
                onInput={handleInput}
              />
              <input
                type="text"
                placeholder="haqida"
                name="haqida"
                onInput={handleInput}
              />
              <input
                type="number"
                placeholder="narxi"
                name="narxi"
                onInput={handleInput}
              />
              <input
                type="number"
                placeholder="chegirma"
                name="chegirma"
                onInput={handleInput}
              />
              <input type="file" onInput={handleRasm} />
              <button className="sendBtn" type="button" onClick={sendFunc}>
                send
              </button>
            </form>
          </div>
        ) : (
          <table border={1}>
            <thead>
              <tr>
                <th>#</th>
                <td>nomi</td>
                <td>haqida</td>
                <td>narxi</td>
                <td>chegirma</td>
                <td>rasm</td>
                <td>soni</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              {malumotlar.length > 0 ? (
                malumotlar.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.nomi}</td>
                    <td>{item.haqida}</td>
                    <td>{item.narxi}$</td>
                    <td>{item.chegirma}%</td>
                    <td>
                      <img src={item.rasm} alt="nomi" />
                    </td>
                    <td>
                      <button onClick={() => plus(item)}>plus</button><br />
                      <span style={{ textAlign: "center", fontSize: "20px" }}>{item.soni}</span><br />
                      <button onClick={() => minus(item)}>minus</button>
                    </td>
                    <td>
                      <button className="remove" onClick={() => remove(item.id)}>Remove</button><br />
                      <button className="edit">Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="no" >no date...</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
