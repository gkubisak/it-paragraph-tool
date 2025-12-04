function generate() {
    const t = document.getElementById("topic").value.trim();
    const s1 = document.getElementById("source1").value.trim();
    const e1 = document.getElementById("evidence1").value.trim();
    const w1 = document.getElementById("why1").value.trim();
    const s2 = document.getElementById("source2").value.trim();
    const e2 = document.getElementById("evidence2").value.trim();
    const w2 = document.getElementById("why2").value.trim();
    const c  = document.getElementById("commentary").value.trim();

    // OUTLINE
    document.getElementById("outlineOutput").innerHTML = `
        <h3>Topic Sentence</h3>
        ${t}

        <h3>Evidence 1</h3>
        <strong>Source Title:</strong> ${s1}<br>
        <strong>Evidence:</strong> ${e1}<br>
        <strong>Why it matters:</strong> ${w1}<br>

        <h3>Evidence 2</h3>
        <strong>Source Title:</strong> ${s2}<br>
        <strong>Evidence:</strong> ${e2}<br>
        <strong>Why it matters:</strong> ${w2}<br>

        <h3>Commentary / Reasoning</h3>
        ${c}
    `;

    // PARAGRAPH
    document.getElementById("output").innerHTML = `
        <span style="color: blue; font-weight: bold;">${t}</span> 
        <span style="color: green;">${e1}</span> 
        <span style="color: darkcyan;">${w1}</span> 
        <span style="color: green;">${e2}</span> 
        <span style="color: darkcyan;">${w2}</span> 
        <span style="color: orange;">${c}</span>
    `;
}
