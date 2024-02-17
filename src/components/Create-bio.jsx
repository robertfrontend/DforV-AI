import React from "react";

import generateContent from "../openai";
import Loading from "./Loading";

const CreateBio = () => {
  const [isReponse, setisReponse] = React.useState("");

  const [input, setInput] = React.useState("");
  const [isLoader, setisLoader] = React.useState(false);

  const [typeDescription, setTypeDescription] = React.useState("profesional");

  const [ipuser, setIpUser] = React.useState("");

  React.useEffect(() => {
    getIpUser();
  }, []);

  const getData = async (product) => {
    setisLoader(true);

    getIpUser();

    const prompt = `Creame una biografia ${typeDescription} y atractiva para mi instagram, acá los detalles de que se trata mi instagram: ${product}`;

    const data = await generateContent(prompt);

    setisLoader(false);

    return data;
  };

  const getIpUser = async () => {
    try {
      const dtIp = await fetch("https://api.ipify.org?format=json");
      const response = await dtIp.json();

      setIpUser(response.ip);
    } catch (error) {
      alert("Ha ocurrido un error, intente mas tarde");
    }
  };

  // VALIDATE REQUEST

  const [requestCount, setRequestCount] = React.useState(
    parseInt(
      typeof window !== "undefined" && localStorage.getItem("requestCount")
    ) || 0
  );

  const maxRequestsPerHour = 30;

  const resetInterval = 3600000; // 1 hora en milisegundos

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      typeof window !== "undefined" &&
        localStorage.setItem("requestCount", "0"); // Reiniciar el contador cada hora
      setRequestCount(0);
    }, resetInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const makeRequest = async () => {
    if (requestCount < maxRequestsPerHour) {
      // Realiza aquí tu solicitud al servidor o acción deseada
      typeof window !== "undefined" &&
        localStorage.setItem("requestCount", (requestCount + 1).toString());

      const response = await getData(input);

      setisReponse("");

      setisReponse(response);
      setRequestCount(requestCount + 1);
    } else {
      alert("Excediste el numero de intentos permitido. Vuelve en 1 hora.");
    }
  };

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(isReponse);
    alert("Texto copiado!✨🎉");
  };

  const stylespan =
    "bg-red-500 text-xs font-medium mr-2 px-3 py-2 text-white rounded-full";

  return (
    <div>
      <div className="py-4 text-left">
        <label className="block mt-4  mb-4 text-lg font-medium text-white ">
          <span className={stylespan}>1</span>
          Selecciona tipo
        </label>
        <select
          id="countries"
          className=" bg-gray-800 border border-gray-800  text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-white dark:focus:ring-red-500 dark:focus:border-red-500"
          onChange={(e) => setTypeDescription(e.target.value)}
        >
          <option value="profesional" selected>
            Profesional
          </option>
          <option value="divertida">Informal</option>
          <option value="casual">Normal</option>
        </select>
      </div>

      <div className="py-4">
        <label className="block mb-4 text-lg font-medium text-gray-20 text-left">
          <span class={stylespan}>1</span>
          Breve descripción de tu perfil.
        </label>

        <textarea
          id="message"
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-40 bg-gray-800 rounded-lg border  focus:ring-red-500 focus:border-red-500 "
          placeholder="Example: Hago marketing digital para pequeños negocios..."
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>

      {isLoader && <Loading />}
      {isReponse && (
        <div className="text-left">
          <label className="block mt-4  mb-4 text-lg font-medium text-white ">
            <span className={stylespan}>2</span>
            Compartir en tus redes sociales
          </label>
          <div
            className="p-6 border border-gray-200 rounded-lg shadow mt-5 text-center"
            onClick={() => handleCopyText()}
          >
            <p className="mb-3 font-normal text-gray-4" id="card-text">
              {isReponse || "No hay nada"}
            </p>
            <div className="text-center">
              <button
                type="button"
                class="text-white-900 bg-dark border border-black-300 focus:outline-none  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Copiar texto ✨
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        className="text-white mt-5 bg-red-500 hover:bg-red-400 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        onClick={() => makeRequest()}
      >
        Generar descripción
      </button>
    </div>
  );
};

export default CreateBio;
