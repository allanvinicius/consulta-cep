import { useState, useEffect } from "react";
import { ViaCepResponse } from "../types";

export function useCep() {
  const [cepData, setCepData] = useState<null | ViaCepResponse>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [savedAddresses, setSavedAddresses] = useState<ViaCepResponse[]>([]);
  const [isCached, setIsCached] = useState<boolean>(false);

  useEffect(() => {
    const storedAddresses = localStorage.getItem("savedAddresses");
    if (storedAddresses) {
      setSavedAddresses(JSON.parse(storedAddresses));
    }
  }, []);

  async function fetchCep(cep: string) {
    setLoading(true);
    setError(null);
    setIsCached(false);

    const cachedData = localStorage.getItem(`cep_${cep}`);
    if (cachedData) {
      setCepData(JSON.parse(cachedData));
      setIsCached(true);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      localStorage.setItem(`cep_${cep}`, JSON.stringify(data));

      setCepData(data);
    } catch (err) {
      setError((err as Error).message);
      setCepData(null);
    } finally {
      setLoading(false);
    }
  }

  function saveAddress() {
    if (cepData && !savedAddresses.some((addr) => addr.cep === cepData.cep)) {
      const updatedAddresses = [...savedAddresses, cepData];
      setSavedAddresses(updatedAddresses);
      localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));
    }
  }

  return { cepData, fetchCep, saveAddress, error, loading, savedAddresses, isCached };
}
