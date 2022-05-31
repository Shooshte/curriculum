import neo4j from "neo4j-driver";
import type { NextApiRequest, NextApiResponse } from "next";

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS)
);

const session = driver.session();

interface Color {
  hex: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<Color[]>) => {
  const hex = req.body.hex;
  const isValidHex = /^#([0-9A-F]{3}){1,2}$/i.test(hex);
  if (!isValidHex) {
    throw Error("Invalid color input!");
  }
  try {
    const writeQuery = `MERGE (c:Color {hex: $hex})
    ON CREATE SET c.hex = $hex`;
    await session.writeTransaction((tx) => tx.run(writeQuery, { hex }));

    const readQuery = `MATCH (c:Color)
    WHERE c.hex = $hex
    RETURN c.hex AS hex`;
    const readResult = await session.readTransaction((tx) =>
      tx.run(readQuery, { hex })
    );

    const colors = readResult.records.map((record) => {
      const hexValue = record.get("hex");
      return {
        hex: hexValue,
      };
    });
    res.status(200).json(colors);
  } catch (e) {
    res.status(500).json(e);
  }
};
