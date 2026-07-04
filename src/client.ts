import { createThirdwebClient } from "thirdweb";
// .env файл в корне проекта:
// VITE_THIRDWEB_CLIENT_ID=ваш_ключ

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

export const client = createThirdwebClient({
  clientId: clientId, // Передаем переменную, а не строку "clientid"
});

