// -----------------------------
// POPUP TEXT
// -----------------------------
const POPOVER_TEXT = {
  supportingIdea: `
This is the main idea your paragraph will prove. It should come from the pattern you identified in your Evidence Cluster. State the idea clearly and avoid mentioning any sources. Your supporting idea should show what the paragraph is about and how it connects to your thesis.
  `,
  evidence: `
Choose the two strongest pieces of evidence that support your idea. Each piece should be specific, accurate, and taken from your Source Notes. Make sure both pieces actually help prove the point you are making. Do not copy long sections or summary statements from your sources.
  `,
  reasoning: `
Explain how each piece of evidence helps prove your supporting idea. Do not repeat what the evidence says. Focus on the thinking: what the evidence shows, why it matters, and how it connects back to your point. This step turns information from your sources into your own argument.
  `,
  clarity: `
Review your outline to make sure the idea, evidence, and reasoning stay focused on the same point. Check that your evidence fits the idea and that your reasoning explains the connection. The outline should show a clear line of thinking from claim to evidence to explanation.
  `
};

// Create popovers
document.querySelectorAll(".popover").forEach(pop => {
  pop.addEventListener("click", e => {
    const key = e.target.dataset.pop;
    showPopover(e.target, POPOVER_TEXT[key]);
  });
});

function showPopover(target, text) {
  const existing = document.querySelector(".popover-text.show");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.className = "popover-text show";
  div.innerText = text;

  document.body.appendChild(div);

  const rect = target.getBoundingClientRect();
  div.style.left = rect.left + window.scrollX + "px";
  div.style.top = rect.bottom + window.scrollY + 4 + "px";

  document.addEventListener("click", function handler(e) {
    if (!div.contains(e.target) && e.target !== target) {
      div.remove();
      document.removeEventListener("click", handler);
    }
  });
}

// -----------------------------
// GENERATE OUTPUT
// -----------------------------
document.getElementById("generateBtn").addEventListener("click", () => {
  const si = document.getElementById("supportingIdea").value.trim();
  const st1 = document.getElementById("sourceTitle1").value.trim();
  const ev1 = document.getElementById("evidence1").value.trim();
  const why1 = document.getElementById("why1").value.trim();
  const st2 = document.getElementById("sourceTitle2").value.trim();
  const ev2 = document.getElementById("evidence2").value.trim();
  const why2 = document.getElementById("why2").value.trim();
  const com = document.getElementById("commentary").value.trim();
  const clar = document.getElementById("clarity").value.trim();

  // -------- Outline --------
  const outline = `
### Supporting Idea:
${si}

### Evidence 1:
• Source Title: ${st1}
• Evidence: ${ev1}
• Why it matters: ${why1}

### Evidence 2:
• Source Title: ${st2}
• Evidence: ${ev2}
• Why it matters: ${why2}

### Commentary / Reasoning:
${com}

### Clarity & Focus Check:
${clar}
  `;

  document.getElementById("outlineOutput").innerText = outline;

  // -------- Color-Coded Paragraph --------
  const paragraph = `
<span style="color: blue;">${si}</span> 
<span style="color: green;">${ev1}</span> 
<span style="color: darkcyan;">${why1}</span> 
<span style="color: green;">${ev2}</span> 
<span style="color: darkcyan;">${why2}</span> 
<span style="color: orange;">${com}</span>
  `;

  document.getElementById("paragraphOutput").innerHTML = paragraph;
});
