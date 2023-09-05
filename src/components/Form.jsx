import React from "react";

import generateContent from "../openai";

const Form = () => {
  const [isReponse, setisReponse] = React.useState("");

  const [input, setInput] = React.useState("");
  const [isLoader, setisLoader] = React.useState(false);

  const [ipuser, setIpUser] = React.useState("");

  React.useEffect(() => {
    getIpUser();
  }, []);

  const getData = async (product) => {
    setisLoader(true);

    getIpUser();

    const data = await generateContent(
      `Redactame una descripción atractiva para obtener mas ventas y nuevos clientes para este prodcuto/servicio: ${product}`
    );

    setisLoader(false);

    return data;
  };

  // const generate = async () => {

  // };

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

  const maxRequestsPerHour = 5;
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

  // const response = await getData(input);
  // setisReponse("");
  // setisReponse(response);
  return (
    <div>
      <label className="block mb-2 text-xl font-medium text-gray-20 text-left">
        Breve descripción de tu producto
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-40 bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Jabon de melocoton para las espinillas..."
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      {/* {ipuser}IP USER */}
      {isLoader && <Loading />}
      {isReponse && (
        <div className="p-6 border border-gray-200 rounded-lg shadow mt-5">
          <p className="mb-3 font-normal text-gray-4">
            {isReponse || "No hay nada"}
          </p>
        </div>
      )}
      <button
        type="button"
        className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => makeRequest()}
      >
        Generar descripción
      </button>
    </div>
  );
};

const Loading = () => {
  return (
    <div role="status" className="text-center mx-auto w-10 mt-5">
      <svg
        aria-hidden="true"
        className="w-8 h-8 mr-2 text-gray-900 animate-spin  fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Form;
