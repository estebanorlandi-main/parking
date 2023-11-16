export function parseFile(str: string): { name: string; status: string }[] {
  const lines = str
    .split(/\r?\n|\r|\n/g)
    .map((l) => l.trim().toLowerCase())
    .filter((l) => l !== ", ," && l.includes("estado"))
    .reverse();

  const parsed = lines.map((l) => {
    const [name, status] = l.split(":");
    const parsedName = name.split(" ").slice(1).join(" ").trim();
    const id = parsedName.replaceAll(/\s/gi, "-");
    return { id, name: parsedName, status: status.trim() };
  });

  const obj: any = {};
  parsed.forEach((p) => {
    if (obj[p.id]) return;
    obj[p.id] = {
      name: p.name,
      status: p.status,
    };
  });

  return Object.values(obj);
}
