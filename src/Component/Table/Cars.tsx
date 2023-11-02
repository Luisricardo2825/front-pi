import cx from "clsx";
import { useState } from "react";
import {
  Table,
  ScrollArea,
  Image,
  HoverCard,
  Anchor,
  ActionIcon,
  Flex,
} from "@mantine/core";
import classes from "./TableScrollArea.module.css";
import { Carro } from "@/@Types/Carro";
import { BRlFormat, BrDateFormat } from "@/utils/Formatter";
import { IconAdjustments, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import fetchApi from "@/utils/fetcher";
import { notifications } from "@mantine/notifications";

export function CarTable({ data }: { data: Carro[] }) {
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>
        <HoverCard
          shadow="md"
          position="left"
          styles={{ dropdown: { border: "none", padding: 0 } }}
        >
          <HoverCard.Target>
            <Anchor>{row.marca + "-" + row.modelo}</Anchor>
          </HoverCard.Target>
          <HoverCard.Dropdown bg={"transparent"}>
            <Image
              src={row.image}
              alt={row.modelo}
              width={"auto"}
              height={300}
            />
          </HoverCard.Dropdown>
        </HoverCard>
      </Table.Td>
      <Table.Td>{row.marca}</Table.Td>
      <Table.Td>{row.modelo}</Table.Td>
      <Table.Td>{BRlFormat.format(row.valor)}</Table.Td>
      <Table.Td>{BrDateFormat.format(new Date(row.anoModelo))}</Table.Td>
      <Table.Td>{BrDateFormat.format(new Date(row.anoFabricacao))}</Table.Td>
      <Table.Td>
        <Flex justify={"space-between"}>
          <ActionIcon>
            <IconAdjustments />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              modals.openConfirmModal({
                title: "Por favor, confirme sua ação",
                children: <>Confirma a deleção?</>,
                confirmProps: {
                  color: "red",
                },
                labels: { confirm: "Deletar", cancel: "Cancelar" },
                onCancel: () => console.log("Cancelado"),
                onConfirm: () =>
                  fetchApi(`/cars/${row.id}`, { method: "DELETE" })
                    .then(async (res) => {
                      if (!res.ok) {
                        throw await res.json();
                      }
                    })
                    .catch(async (err) => {
                      if (err instanceof Error) {
                        notifications.show({
                          title: "Erro",
                          color: "red",
                          message: err + "",
                        });
                        return false;
                      }
                      const data = await (err as Response).json();
                      notifications.show({
                        title: "Erro",
                        color: "red",
                        message: data.message,
                      });
                    }),
              });
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table miw={800}>
        <Table.Thead
          className={cx(classes.header, { [classes.scrolled]: scrolled })}
          style={{ zIndex: 2 }}
        >
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Imagem</Table.Th>
            <Table.Th>Marca</Table.Th>
            <Table.Th>Modelo</Table.Th>
            <Table.Th>Valor</Table.Th>
            <Table.Th>Ano modelo</Table.Th>
            <Table.Th>Ano Fabricação</Table.Th>
            <Table.Th>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
