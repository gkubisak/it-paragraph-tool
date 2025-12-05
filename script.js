/**
 * =====================================================================
 * STEP 1: OUTLINE GENERATION AND COPYING
 * =====================================================================
 */

function generateOutline() {
  const t = document.getElementById("topic").value.trim();
  const s1 = document.getElementById("source1").value.trim();
  const e1 = document.getElementById("evidence1").value.trim();
  const w1 = document.getElementById("why1").value.trim();
  const s2 = document.getElementById("source2").value.trim();
  const e2 = document.getElementById("evidence2").value.trim();
  const w2 = document.getElementById("why2").value.trim();
  const c = document.getElementById("commentary").value.trim();

  // Compact HTML string
  const outlineHtml =
    `<div><strong>Topic Sentence</strong></div><div>${t}</div><br>` +
    `<div><strong>Evidence 1</strong></div><div><strong>Source Title:</strong> ${s1}</div><div><strong>Evidence:</strong> ${e1}</div><div><strong>Why it matters:</strong> ${w1}</div><br>` +
    `<div><strong>Evidence 2</strong></div><div><strong>Source Title:</strong> ${s2}</div><div><strong>Evidence:</strong> ${e2}</div><div><strong>Why it matters:</strong> ${w2}</div><br>` +
    `<div><strong>Commentary / Reasoning</strong></div><div>${c}</div>`;

  document.getElementById("outlineOutput").innerHTML = outlineHtml;
  document.getElementById("outlineOutputWrapper").style.display = "block";
}

function copyOutline() {
  let outlineHtml = document.getElementById("outlineOutput").innerHTML;

  // WRAP IN ARIAL FONT
  outlineHtml = `<div style="font-family: Arial, sans-serif;">${outlineHtml}</div>`;

  const blob = new Blob([outlineHtml], { type: "text/html" });
  const data = [new ClipboardItem({ [blob.type]: blob })];

  navigator.clipboard.write(data).then(
    () => {
      alert("Outline copied to clipboard!");
    },
    () => {
      alert("Failed to copy outline.");
    }
  );
}

/**
 * =====================================================================
 * STEP 2: PARAGRAPH GENERATION AND COPYING
 * =====================================================================
 */

function generateParagraph() {
  let text = document.getElementById("pastedOutline").value;

  // 1. Normalize whitespace
  text = text.replace(/\u00A0/g, " ");
  text = text
    .split("\n")
    .map((line) => line.trim())
    .join("\n");

  // 2. Robust Section Extractor
  const getSection = (fullText, startPhrase, endPhrase) => {
    const lowerText = fullText.toLowerCase();
    const startIdx = lowerText.indexOf(startPhrase.toLowerCase());

    if (startIdx === -1) return "";

    let contentStart = startIdx + startPhrase.length;
    let contentEnd = fullText.length;

    if (endPhrase) {
      const endIdx = lowerText.indexOf(endPhrase.toLowerCase(), contentStart);
      if (endIdx !== -1) {
        contentEnd = endIdx;
      }
    }

    let sectionContent = fullText.substring(contentStart, contentEnd);
    return sectionContent.replace(/^[:\s]+|[:\s]+$/g, "").trim();
  };

  // 3. Extract Top-Level Sections
  const topicChunk = getSection(text, "Topic Sentence", "Evidence 1");
  const evidence1Chunk = getSection(text, "Evidence 1", "Evidence 2");
  const evidence2Chunk = getSection(text, "Evidence 2", "Commentary");

  // 4. Commentary Cleanup
  let commentaryChunk = getSection(text, "Commentary", null);
  commentaryChunk = commentaryChunk.replace(/^[\/\s]*Reasoning[:\s]*/i, "");

  // 5. Extract Details from Evidence Chunks
  const s1 = getSection(evidence1Chunk, "Source Title", "Evidence");
  let e1 = getSection(evidence1Chunk, "Evidence", "Why it matters");
  const w1 = getSection(evidence1Chunk, "Why it matters", null);

  const s2 = getSection(evidence2Chunk, "Source Title", "Evidence");
  let e2 = getSection(evidence2Chunk, "Evidence", "Why it matters");
  const w2 = getSection(evidence2Chunk, "Why it matters", null);

  // 6. Helper to format Evidence with (Citation)
  const formatEvidence = (evText) => {
    if (!evText) return "";
    const trimmed = evText.trim();
    if (trimmed.endsWith(".")) {
      return trimmed.slice(0, -1) + " <strong>(Citation)</strong>.";
    } else {
      return trimmed + " <strong>(Citation)</strong>";
    }
  };

  e1 = formatEvidence(e1);
  e2 = formatEvidence(e2);

  // 7. Validation
  if (!topicChunk || !e1 || !commentaryChunk) {
    console.log("Parsing Debug:", { topicChunk, e1, commentaryChunk });
    const errorMsg = `
            <div style="color: #d32f2f; background: #ffebee; padding: 10px; border-radius: 4px; border: 1px solid #ffcdd2;">
                <strong>Parsing Error:</strong> Could not find all parts of the outline.<br><br>
                <em>Tip:</em> Ensure you copied the headers "Topic Sentence", "Evidence 1", and "Commentary" exactly.
            </div>
        `;
    document.getElementById("paragraphOutput").innerHTML = errorMsg;
    document.getElementById("paragraphOutputWrapper").style.display = "block";
    return;
  }

  // 8. Build Output
  const paragraphHtml =
    `<span style="color: blue; font-weight: bold;">${topicChunk}</span> ` +
    `<span style="color: #741b47; font-weight: bold;">${s1}</span> ` +
    `<span style="color: green;">${e1}</span> ` +
    `<span style="color: darkcyan;">${w1}</span> ` +
    `<span style="color: #741b47; font-weight: bold;">${s2}</span> ` +
    `<span style="color: green;">${e2}</span> ` +
    `<span style="color: darkcyan;">${w2}</span> ` +
    `<span style="color: orange;">${commentaryChunk}</span>`;

  document.getElementById("paragraphOutput").innerHTML = paragraphHtml;
  document.getElementById("paragraphOutputWrapper").style.display = "block";
}

function copyParagraph() {
  let paragraphHtml = document.getElementById("paragraphOutput").innerHTML;

  // WRAP IN ARIAL FONT
  paragraphHtml = `<div style="font-family: Arial, sans-serif;">${paragraphHtml}</div>`;

  const blob = new Blob([paragraphHtml], { type: "text/html" });
  const data = [new ClipboardItem({ [blob.type]: blob })];

  navigator.clipboard.write(data).then(
    () => {
      alert("Paragraph copied to clipboard!");
    },
    () => {
      alert("Failed to copy paragraph.");
    }
  );
}
