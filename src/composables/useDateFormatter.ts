export function useDateFormatter() {
  function formatDate(timestamp: number | string): string {
    if (!timestamp) return "";

    const ts = Number(timestamp);
    if (isNaN(ts)) return "";

    const date = new Date(ts * 1000);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function formatYMD(dateStr: string): string {
    if (!dateStr || typeof dateStr !== "string") return "";

    const parts = dateStr.split("-");
    if (parts.length !== 3) return "";

    const [year, month, day] = parts;

    if (!year || !month || !day) return "";

    return `${day}/${month}/${year}`;
  }

  return {
    formatDate,
    formatYMD,
  };
}
