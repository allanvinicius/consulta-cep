import { ChangeEvent, useState } from "react";
import { useViaCep } from "../../hooks/useViaCep";
import { ContainerGrid } from "../Container";

export function CepSearch() {
  const {
    cepData,
    fetchCep,
    saveAddress,
    error,
    loading,
    savedAddresses,
    isCached,
  } = useViaCep();

  const [cep, setCep] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCepData, setShowCepData] = useState(false);
  const [inputError, setInputError] = useState("");

  function handleSearch() {
    if (cep.length !== 8) {
      setInputError("O CEP deve conter exatamente 8 dígitos.");
      return;
    }

    if (isCached || error) {
      setCep("");
    }

    setInputError("");
    fetchCep(cep);
    setShowCepData(true);
  }

  function handleSave() {
    saveAddress();
    setShowSuccessMessage(true);
    setCep("");

    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowCepData(false);
    }, 2000);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "");
    setCep(value);

    if (value.length === 8) {
      setInputError("");
    } else {
      setInputError("O CEP deve conter exatamente 8 dígitos.");
    }
  }

  return (
    <section className="py-14 max-[480px]:py-8">
      <ContainerGrid>
        <div className="flex flex-col w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 max-[480px]:p-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Buscar Endereço
          </h1>

          <input
            type="text"
            value={cep}
            onChange={handleInputChange}
            maxLength={8}
            placeholder="Digite o CEP"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {inputError && <p className="text-red-500">{inputError}</p>}

          <button
            onClick={handleSearch}
            disabled={loading || cep.length !== 8}
            className={`w-full py-2 rounded-lg transition ${
              loading || cep.length !== 8
                ? "bg-blue-600/50 text-white/50 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            }`}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>

          {error && <p className="text-red-500">{error}</p>}

          {isCached && (
            <p className="text-green-500">Dados carregados do cache ✅</p>
          )}

          {cepData && showCepData && (
            <div className="w-full flex flex-col mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-black text-[15px]">
                <strong>CEP:</strong> {cepData.cep}
              </p>

              <p className="text-black text-[15px]">
                <strong>Logradouro:</strong> {cepData.logradouro}
              </p>

              <p className="text-black text-[15px]">
                <strong>Bairro:</strong> {cepData.bairro}
              </p>

              <p className="text-black text-[15px]">
                <strong>Cidade:</strong> {cepData.localidade} - {cepData.uf}
              </p>

              {!isCached && (
                <button
                  onClick={handleSave}
                  className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                >
                  Salvar Endereço
                </button>
              )}
            </div>
          )}

          {showSuccessMessage && (
            <p className="text-green-500">Endereço salvo com sucesso! 🎉</p>
          )}

          {savedAddresses.length > 0 && (
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Endereços Salvos:</h2>

              <ul className="mt-2 space-y-2">
                {savedAddresses.map(
                  ({ cep, logradouro, bairro, localidade, uf }) => (
                    <li key={cep} className="p-3 bg-gray-200 rounded-md">
                      <p className="text-[15px]">
                        {logradouro}, {bairro}, {localidade} - {uf} ({cep})
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </ContainerGrid>
    </section>
  );
}
