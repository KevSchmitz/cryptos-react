import { useEffect, useState } from "react";
import Formulario from "./Components/Formulario";
import Resultado from "./Components/Resultado";
import Spinner from "./Components/Spinner";
import styled from "@emotion/styled";
import CryptoImage from "./img/imagen-criptos.png";

const Container = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

function App() {
  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const { moneda, cryptoMoneda } = monedas;

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCrypto = async () => {
        setCargando(true);
        setResultado({});

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoMoneda}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado.DISPLAY[cryptoMoneda][moneda]);
        setCargando(false);
      };

      cotizarCrypto();
    }
  }, [monedas]);
  return (
    <Container>
      <Image src={CryptoImage} alt={"Imágenes Crytomonedas"} />
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>
    </Container>
  );
}

export default App;
