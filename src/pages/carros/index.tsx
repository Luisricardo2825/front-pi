"use client";
import { Content } from "@/@Types/Page";
import { Carro } from "@/@Types/Carro";
import React from "react";
import CardCarro from "@/Component/Card";
import {
  Button,
  Checkbox,
  Grid,
  Pagination,
  Paper,
  SimpleGrid,
  Spoiler,
  Title,
} from "@mantine/core";
import Head from "next/head";

import parseSearchParams from "@/utils/parseSearchParams";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import SearchParams from "@/utils/SearchParams";
import Cookies from "js-cookie";
import { LoginRet } from "@/@Types/Login";

const searchParams = new SearchParams();

const Page = () => {
  const [totalPages, setTotalPages] = React.useState(0);

  const [marcasSelecionadas, setMarcasSelecionadas] = React.useState<string[]>(
    []
  );
  const defaultPage = React.useMemo(() => {
    const searchParam = parseInt(searchParams.getSearchParam("page"));
    return searchParam > 0 ? searchParam : 1;
  }, []);

  const [page, setPage] = React.useState(defaultPage);

  const [data, setData] = React.useState<Response>();
  const content = React.useMemo(() => (data?.ok ? data?.content : []), [data]);

  const filteredContent = content.filter((item) => {
    if (marcasSelecionadas.length > 0)
      return marcasSelecionadas.includes(item.marca);
    else return true;
  });

  const marcas: string[] = React.useMemo(() => {
    const novasMarcas = content.map((item) => item.marca);
    return Array.from(new Set([...novasMarcas]));
  }, [content]);

  React.useEffect(() => {
    getInitialData(page - 1).then((data) => {
      setTotalPages(data.totalPages);
      setData(data);
      setMarcasSelecionadas([]);
    });
    searchParams.deleteSearchParam("marca");
    return () => {};
  }, [page]);

  React.useEffect(() => {
    setMarcasSelecionadas([
      ...JSON.parse(parseSearchParams()["marca"] || "[]"),
    ]);
    return () => {};
  }, [content]);

  return (
    <div>
      <Head>
        <title>Carros | Inicio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid mt={"xl"}>
        <Grid.Col span={2}>
          <Paper ml={"xl"}>
            <Checkbox.Group
              label="Marcas"
              description="Filtro por marcas"
              onChange={(value) => {
                if (value.length <= 0) {
                  searchParams.deleteSearchParam("marca");
                } else {
                  searchParams.setSearchParam("marca", JSON.stringify(value));
                }

                setMarcasSelecionadas(value);
              }}
              value={marcasSelecionadas}
            >
              <Spoiler
                maxHeight={120}
                showLabel={
                  <Button
                    component="a"
                    leftSection={<IconChevronDown />}
                    variant="transparent"
                  >
                    Ver mais
                  </Button>
                }
                hideLabel={
                  <Button
                    component="a"
                    leftSection={<IconChevronUp />}
                    variant="transparent"
                  >
                    Ver menos
                  </Button>
                }
              >
                {marcas?.map((marca) => {
                  return (
                    <Checkbox
                      value={marca}
                      label={marca}
                      key={marca}
                      my={10}
                      checked={marcasSelecionadas.includes(marca)}
                    />
                  );
                })}
              </Spoiler>
            </Checkbox.Group>
          </Paper>
        </Grid.Col>
        <Grid.Col
          span={9}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <Title order={1}>Carros</Title>
          <Title order={6} c={"gray.3"} fw={"lighter"} mb={"md"}>
            Clique em &quot;mais detalhes&quot; para mais informações
          </Title>

          <Pagination
            mb={"xl"}
            total={totalPages}
            siblings={3}
            value={page}
            onChange={(value) => {
              setPage(value);
            }}
          />
          <Title order={6} c="red">
            {data?.totalPages === 0 && !data?.ok ? data?.message : null}
          </Title>
          <SimpleGrid
            cols={{ base: 1, sm: 3, md: 3, xs: 1, lg: 4 }}
            w={"100%"}
            spacing={{ base: 10, sm: "xl" }}
            verticalSpacing={{ base: "md", sm: "xs" }}
          >
            {filteredContent.map((carro) => (
              <CardCarro key={carro.id} {...carro} />
            ))}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </div>
  );
};

type Fulfilled = {
  ok: true;
  message: string;
  page: number;
} & Content<Carro>;

type Rejected = {
  ok: false;
  message: string;
  totalPages: number;
  page: number;
};

type Response = Fulfilled | Rejected;

const getInitialData = async (page: number) => {
  const url = process.env.NEXT_PUBLIC_API_PATH + "/cars?page=" + Math.abs(page);
  try {
    const { token } = JSON.parse(Cookies.get("user") || "{}") as LoginRet;

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    // Adiciona o token somente se estiver logado,permitindo ao admin ver carros com interesse registrado
    if (token) {
      myHeaders.append("Authorization", `Bearer ${token}`);
    }

    const requestOptions: RequestInit = {
      headers: myHeaders,
      redirect: "follow",
    };

    const res = await fetch(url, requestOptions);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: Content<Carro> = await res.json();
    const response: Response = {
      ok: true,
      message: "",
      ...data,
      page: data.pageable.pageNumber,
    };

    return response;
  } catch (error) {
    const response: Response = {
      ok: false,
      message: String(error),
      totalPages: 0,
      page: 1,
    };
    return response;
  }
};

export default Page;
