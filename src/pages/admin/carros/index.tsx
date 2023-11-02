import { Carro } from "@/@Types/Carro";
import { LoginRet } from "@/@Types/Login";
import { Content } from "@/@Types/Page";
import { CarTable } from "@/Component/Table/Cars";
import fetchApi from "@/utils/fetcher";
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Grid,
  Pagination,
  Paper,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

let lastPosition = { x: 0, y: 0 };

export default function Admin({
  response,
  marcas,
  marcasSelecionadas: selected,
  modelo: mod,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const viewport = React.useRef<HTMLDivElement>(null);
  const input = React.useRef<HTMLInputElement>(null);
  const [modelo, setModelo] = useDebouncedState<string | undefined>(mod, 200);
  const [marcasSelecionadas, setMarcasSelecionadas] = React.useState<string[]>(
    selected.length > 0 ? selected : []
  );

  const cars = React.useMemo(
    () => (response?.ok ? response?.content : []),
    [response]
  );

  React.useEffect(() => {
    viewport.current!.scrollTo({ top: lastPosition.y, behavior: "instant" });
    input.current?.focus();
  }, []);

  return (
    <Grid mt={"xl"}>
      <Head>
        <title>Carros | Administração</title>
        <meta name="description" content="Painel administrativo para carros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid.Col span={2}>
        <Paper ml={"xl"} mih={150}>
          <Checkbox.Group
            label="Marcas"
            autoFocus
            data-focus
            description="Filtro por marcas"
            onChange={(values) => {
              setMarcasSelecionadas(values);
              router.push(
                {
                  pathname: "/admin/carros",
                  query: { ...router.query, marcas: values, page: 0 },
                },
                undefined,
                { scroll: false }
              );
            }}
            value={marcasSelecionadas}
          >
            <ScrollArea
              h={200}
              onScrollPositionChange={(position) => {
                lastPosition = position;
              }}
              viewportRef={viewport}
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
            </ScrollArea>
          </Checkbox.Group>
        </Paper>
        <Paper ml={"xl"} mt={"xl"}>
          <TextInput
            placeholder="Modelo"
            mt={"sm"}
            defaultValue={modelo}
            ref={input}
            rightSection={
              <Button
                onClick={() => {
                  router.push(
                    {
                      pathname: "/admin/carros",
                      query: { ...router.query, modelo: modelo },
                    },
                    undefined,
                    { scroll: false }
                  );
                }}
              >
                Buscar
              </Button>
            }
            onChange={(e) => {
              setModelo(e.target.value);
            }}
          />
        </Paper>
      </Grid.Col>
      <Grid.Col span={9}>
        <Container mt={50}>
          <Flex justify={"space-between"}>
            <Pagination
              total={response.totalPages}
              defaultValue={response.page + 1}
              size="xs"
              onChange={(page) => {
                router.push({
                  pathname: "/admin/carros",
                  query: { page: page - 1 },
                });
              }}
            />
            <Button
              leftSection={<IconPlus />}
              color="green"
              size="xs"
              onClick={() => {
                router.push({
                  pathname: "/admin/carros/novo",
                });
              }}
            >
              Novo
            </Button>
          </Flex>
          <CarTable data={cars} />
        </Container>
      </Grid.Col>
    </Grid>
  );
}

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

const getMarcas = async () => {
  try {
    const response = await fetchApi("/cars/marcas");
    const data: string[] = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const getServerSideProps = (async (context) => {
  const { token } = JSON.parse(context.req.cookies["user"] || "{}") as LoginRet;
  const headers = new Headers();

  let page = context.query.page || 0;
  page = Math.abs(Number(page));

  let modelo = context.query.modelo;
  let marcasSelecionadas = context.query.marcas;

  const params = new URLSearchParams();

  params.append("page", String(page));

  if (modelo && typeof modelo == "string" && modelo.length > 0) {
    params.append("modelo", modelo);
  } else {
    modelo = "";
  }
  let value: string[] = [];
  if (Array.isArray(marcasSelecionadas)) {
    value = marcasSelecionadas;
  }

  if (typeof marcasSelecionadas == "string") value.push(marcasSelecionadas);

  marcasSelecionadas = value;
  marcasSelecionadas.forEach((marca) => {
    params.append("marca", marca);
  });

  params.append("all", "yes");

  const url = "/cars" + "?" + params;

  const marcas = await getMarcas();
  try {
    headers.append("Content-Type", "application/json");
    if (token) {
      headers.append("Authorization", "Bearer " + token);
    }
    const data: Content<Carro> = await (
      await fetchApi(url, {
        headers: headers,
      })
    ).json();

    const response: Response = {
      ok: true,
      message: "",
      ...data,
      page: data.number,
    };

    return {
      props: {
        response,
        marcas,
        marcasSelecionadas,
        modelo,
      },
    };
  } catch (error) {
    const response: Response = {
      ok: false,
      message: String(error),
      totalPages: 0,
      page: 0,
    };
    return {
      props: {
        response,
        marcas,
        marcasSelecionadas,
        modelo,
      },
    };
  }
}) satisfies GetServerSideProps<{
  response: Response;
  marcas: string[];
  marcasSelecionadas: string[];
  modelo: string | undefined;
}>;
