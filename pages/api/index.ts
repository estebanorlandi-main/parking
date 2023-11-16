import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { parseFile } from "@/utils/index";

/**
 * UBICACION DEL ARCHIVO
 * UTILIZAR PATH ABSOLUTO
 */
const FILE = ``;
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const buffer = fs.readFileSync(FILE, { encoding: "utf-16le" });
    const str = buffer.toString();

    return res.send(parseFile(str));
  }

  if (req.method === "PUT") {
    fs.writeFileSync(FILE, req.body);
    const buffer = fs.readFileSync(FILE);
    const str = buffer.toString();
    return res.send(str);
  }

  return res.send("Este metodo no es valido.");
}

export default handler;
