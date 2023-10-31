import { Carro } from "@/@Types/Carro";
import { LoginRet } from "@/@Types/Login";
import { faker } from "@faker-js/faker";
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';

export type Cars = Car[];

export interface Car {
  year: number;
  id: number;
  horsepower: number;
  make: string;
  model: string;
  price: number;
  img_url: string;
}

export default async function generateVehicles(
  user: LoginRet,
  qtd: number = 10
) {
  const data: Cars = await (
    await fetch("https://private-anon-8dc67d2bad-carsapi1.apiary-mock.com/cars")
  ).json();
  const cars: Carro[] = [];

  data.forEach((car) => {
    cars.push({
      anoFabricacao: `${car.year}-01-01`,
      anoModelo: `${car.year}-01-01`,
      descricao: faker.lorem.lines(),
      image: faker.image.urlLoremFlickr({ category: "transport" }),
      marca: car.make,
      modelo: car.model,
      valor: car.price,
    });
  });

  const requests = cars.map((car) => doPost(car, user.token));
  const all = await Promise.all(requests);
  const results = all.map(async (item) => ({
    code: item.status,
    body: await item.json(),
    ok: item.ok,
  }));
  return results;
}

const doPost = (carro: Carro, token: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(carro),
    redirect: "follow",
  };

  return fetch(process.env.NEXT_PUBLIC_API_PATH+"/cars", requestOptions);
};
