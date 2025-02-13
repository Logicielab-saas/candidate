/**
 * Downloads a CV file from the given URL
 * @param url The URL of the CV to download
 */
export async function handleDownloadCV(url: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;

    // Extract filename from url or use default
    const filename = url.split("/").pop() || "document.pdf";
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error downloading CV:", error);
  }
}
