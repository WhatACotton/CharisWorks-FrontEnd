interface AddressData {
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
  zipcode: string;
}

interface APIResponse {
  message: null;
  results: AddressData[];
  status: number;
}
export const GetAddress = async (ZipCode: string) => {
  try {
    const response = await fetch(
      "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + ZipCode,
      {
        method: "GET",
      }
    );

    const data: APIResponse = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};
