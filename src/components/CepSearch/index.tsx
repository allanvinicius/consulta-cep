import { useState } from "react";
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

  function handleSearch() {
    if (cep.length === 8) {
      fetchCep(cep);
      setShowCepData(true);
    }
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

  return (
    <section className="py-14">
      <ContainerGrid>
        <div className="flex items-center justify-center flex-col w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Buscar Endereço</h2>

          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
            maxLength={8}
            placeholder="Digite o CEP"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>

          {error && <p className="text-red-500">{error}</p>}

          {isCached && (
            <p className="text-green-500">Dados carregados do cache ✅</p>
          )}

          {showSuccessMessage && (
            <p className="text-green-500">Endereço salvo com sucesso! 🎉</p>
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

              <button
                onClick={handleSave}
                className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
              >
                Salvar Endereço
              </button>
            </div>
          )}

          {savedAddresses.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Endereços Salvos:</h3>

              <ul className="mt-2 space-y-2">
                {savedAddresses.map((addr) => (
                  <li key={addr.cep} className="p-3 bg-gray-200 rounded-md">
                    <p className="text-[15px]">
                      {addr.logradouro}, {addr.bairro}, {addr.localidade} -{" "}
                      {addr.uf} ({addr.cep})
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ContainerGrid>
    </section>
  );
}
