import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Currency() {
  const main_url = "https://api.freecurrencyapi.com/v1/latest";
  const api_key = "YOUR CURRENT freecurrencyapi KEY";

  const [takePiece, setTakePiece] = useState(1);
  const [takeUnit, setTakeUnit] = useState("USD");

  const [givePiece, setGivePiece] = useState(0);
  const [giveUnit, setGiveUnit] = useState("TRY");

  //console.log("girilen", takePiece, takeUnit, "\nverilen", givePiece, giveUnit);

  const hesapla = async () => {
    const res = await axios.get(
      `${main_url}?apikey=${api_key}&base_currency=${takeUnit}`
    );
    setGivePiece((res.data.data[giveUnit] * takePiece).toFixed(5));
  };

  useEffect(() => {
    hesapla();
  }, [takePiece, takeUnit, giveUnit]);

  return (
    <div className="currencys-div p-2">
      <div>
        <h3 className="text-white text-center mt-2">Döviz Appxing</h3>
      </div>
      <div
        style={{ height: "60px" }}
        className=" w-100 d-flex justify-content-center align-items-center my-4"
      >
        <input
          type="number"
          value={takePiece}
          onChange={(txt) => setTakePiece(txt.target.value)}
          className="form-control"
          style={{ fontWeight: "bold" }}
        ></input>
        <select
          style={{ fontWeight: "500" }}
          className="form-select mx-2"
          onChange={(slc) => setTakeUnit(slc.target.value)}
        >
          <option value="USD">USD</option>
          <option value="TRY">TRY</option>
          <option value="EUR">EUR</option>
        </select>
        <FaArrowRightLong
          className="me-2"
          style={{ color: "white", fontSize: "170px" }}
        />

        <select
          style={{ fontWeight: "500" }}
          className="form-select mx-2"
          onChange={(slc) => setGiveUnit(slc.target.value)}
        >
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="number"
          disabled
          value={givePiece}
          className="form-control"
          style={{ backgroundColor: "#cccccc", fontWeight: "bold" }}
        ></input>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success w-100"
          style={{ fontWeight: "bold" }}
          onClick={hesapla}
        >
          Çevir
        </button>
      </div>
    </div>
  );
}
