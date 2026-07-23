import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import toast from "react-hot-toast";
import removeMarkdown from "remove-markdown";

function DownloadButtons({ title = "Study Material", content = "" }) {
  const plainText = removeMarkdown(content)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(plainText);

      toast.success("Copied to clipboard!", {
        duration: 2000,
        icon: "🐰",
      });
    } catch {
      toast.error("Couldn't copy to clipboard.", {
        duration: 2000,
        icon: "❌",
      });
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([plainText], {
      type: "text/plain;charset=utf-8",
    });

    saveAs(blob, `${title}.txt`);

    toast.success("TXT downloaded!", {
      duration: 2000,
      icon: "📄",
    });
  };

  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.text(title, 14, 20);

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(plainText, 180);
    doc.text(lines, 14, 35);

    doc.save(`${title}.pdf`);

    toast.success("PDF downloaded!", {
      duration: 2000,
      icon: "📕",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "20px",
        flexWrap: "wrap",
      }}
    >
      <button className="action-btn" onClick={copyToClipboard}>
        📋 Copy
      </button>

      <button className="action-btn" onClick={downloadTxt}>
        📄 TXT
      </button>

      <button className="action-btn" onClick={downloadPdf}>
        📕 PDF
      </button>
    </div>
  );
}

export default DownloadButtons;