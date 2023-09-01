import React from "react";

const Form = () => {
  const generate = () => {
    console.log("generate");
  };

  return (
    <div>
      <label
        for="message"
        class="block mb-2 text-xl font-medium text-gray-20 text-left"
      >
        Breve descripción de tu producto
      </label>
      <textarea
        id="message"
        rows="4"
        class="block p-2.5 w-full text-sm text-gray-40 bg-gray-800 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Jabon de melocoton para las espinillas..."
      ></textarea>
      <button
        type="button"
        class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => generate()}
      >
        Generar descripción
      </button>
    </div>
  );
};

export default Form;
