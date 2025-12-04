function generate() {
    const t = document.getElementById("topic").value.trim();
    const s1 = document.getElementById("source1").value.trim();
    const e1 = document.getElementById("evidence1").value.trim();
    const w1 = document.getElementById("why1").value.trim();
    const s2 = document.getElementById("source2").value.trim();
    const e2 = document.getElementById("evidence2").value.trim();
    const w2 = document.getElementById("why2").value.trim();
    const c  = document.getElementById("commentary").value.trim();

    // ---------- OUTLINE ----------
    let outline = `
<h3><strong>Topic Sentence</strong></h3>
${t}

<h3><strong>Evidence 1</strong></h3>
<strong>Source Title:</strong> ${s1}<br>
<strong>Evidence:</strong> ${e1}<br>
<strong>Why it matters:</strong> ${w1}<br>

<h3><strong>Evidence 2</strong></h3>
<strong>Source Title:</strong> ${s2}<br>
<strong>Evidence:</strong> ${e2}<br>
<strong>Why it matters:</strong> ${w2}<br>

<h3><strong>Commentary / Reasoning</strong></h3>
${c}
`;

    document.getElementById("outlineOutput").innerHTML = outline;

    // ---------- COLOR PARAGRAPH ----------
    let finalPara = `
<span style="color: blue;"><strong>${t}</strong></span> 
<span style="color: green;">${e1}</span> 
<span style="color: darkcyan;">${w1}</span> 
<span style="color: green;">${e2}</span> 
<span style="color: darkcyan;">${w2}</span> 
<span style="color: orange;">${c}</span>
`;

    document.getElementById("output").innerHTML = finalPara;
}
