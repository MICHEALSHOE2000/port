document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  nav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
}, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const projectForm = document.querySelector("[data-project-form]");
const formStatus = document.querySelector("[data-form-status]");
const submitButton = document.querySelector("[data-submit]");

projectForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitButton?.setAttribute("disabled", "");
  formStatus?.classList.remove("is-success", "is-error");
  if (formStatus) formStatus.textContent = "Sending your project details…";

  try {
    const response = await fetch(projectForm.action, {
      method: "POST",
      body: new FormData(projectForm),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Form submission failed");

    projectForm.reset();
    formStatus?.classList.add("is-success");
    if (formStatus) formStatus.textContent = "Thanks—your project details were sent. I’ll reply by email.";
  } catch (error) {
    formStatus?.classList.add("is-error");
    if (formStatus) formStatus.textContent = "The form could not be sent. Please email me at michealderinto6@gmail.com.";
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});

const leadLab = document.querySelector("[data-lead-lab]");

if (leadLab) {
  const leadScenarios = {
    gutter: {
      initials: "JM",
      name: "Jordan Miles",
      service: "Gutter repair · Marietta, GA",
      business: "KR Gutters",
      sourceScore: 17,
      sourceReason: "High-intent Google Search click for “emergency gutter repair near me”.",
      timeline: "urgent",
      budget: "aligned",
      behavior: "high",
      message: "Storm damage is causing water to run behind the gutter near the garage. I need an inspection and quote this week.",
      need: "the storm damage and the leak near your garage",
      nextStep: "a quick photo review followed by an inspection slot",
      suggestedTime: "tomorrow at 10:30 AM",
      outcomeReason: "The CRM closed-won update links this lead back to its original Google Ads click.",
      report: {
        spend: "$1,240",
        spendNote: "Google Search",
        qualified: "26",
        qualityNote: "63% of enquiries",
        booked: "11",
        bookedNote: "$112.73 each",
        outcome: "$18,200",
        outcomeNote: "Closed revenue",
        summary: "Google Search generated 41 enquiries from $1,240 in spend. Twenty-six matched the service, location, budget, and timeline rules; 11 booked an inspection; and $18,200 in closed work was attributed in the CRM. The clearest next action is to move 15% of spend toward the emergency-repair search group, which produced the strongest booked-call rate.",
      },
    },
    property: {
      initials: "AO",
      name: "Amara Okafor",
      service: "3-bedroom home · Lekki",
      business: "Lightway Homes",
      sourceScore: 12,
      sourceReason: "Organic property-guide visit with a saved return session.",
      timeline: "months",
      budget: "flexible",
      behavior: "medium",
      message: "I am comparing three-bedroom homes around Lekki. I can stretch my budget for the right payment plan and want to inspect next month.",
      need: "a three-bedroom home around Lekki with a workable payment plan",
      nextStep: "a short requirements call before matching available properties",
      suggestedTime: "Thursday at 3:00 PM",
      outcomeReason: "The booked inspection and opportunity value are connected to the original organic session.",
      report: {
        spend: "$860",
        spendNote: "Search + remarketing",
        qualified: "18",
        qualityNote: "51% of enquiries",
        booked: "7",
        bookedNote: "$122.86 each",
        outcome: "$310k",
        outcomeNote: "Open pipeline",
        summary: "Search and remarketing generated 35 property enquiries from $860 in spend. Eighteen met the location, budget-flexibility, and timeline rules; seven booked an inspection; and $310,000 in open opportunity value is connected to those leads. The next action is to nurture research-stage buyers with payment-plan proof before asking them to book.",
      },
    },
    edge: {
      initials: "DT",
      name: "Daniel Turner",
      service: "Roof drainage replacement · Atlanta, GA",
      business: "KR Gutters",
      sourceScore: 17,
      sourceReason: "High-intent Google Search click followed by a repeat direct visit.",
      timeline: "urgent",
      budget: "below",
      behavior: "high",
      message: "I need the full drainage system replaced before next week, but my maximum budget is below the usual project minimum. Can someone confirm what is possible?",
      need: "a full drainage replacement before next week",
      nextStep: "a manual scope review before any price or promise is sent",
      suggestedTime: "today at 4:30 PM",
      outcomeReason: "No revenue is attached until a person resolves the scope and budget conflict.",
      report: {
        spend: "$1,060",
        spendNote: "Google Search",
        qualified: "19",
        qualityNote: "4 need review",
        booked: "6",
        bookedNote: "$176.67 each",
        outcome: "$9,400",
        outcomeNote: "Closed revenue",
        summary: "Google Search generated 30 enquiries from $1,060 in spend. Nineteen met the core fit rules, six booked, and $9,400 in closed work was attributed. Four urgent enquiries contained budget or scope conflicts and were held for human review. The next action is to clarify the minimum project range on the landing page before increasing spend.",
      },
    },
  };

  const stageNames = ["Acquire", "Convert", "Measure", "Operate", "Monetize"];
  const timelineScores = { urgent: 22, soon: 18, months: 11, exploring: 5 };
  const budgetScores = { aligned: 22, flexible: 14, unknown: 7, below: 2 };
  const behaviorScores = { high: 20, medium: 12, low: 4 };
  const timelineRationales = {
    urgent: "The stated timeline is within seven days, adding a strong urgency signal.",
    soon: "The requested start is within 30 days, indicating active evaluation.",
    months: "The one-to-three-month timeline is qualified but not immediate.",
    exploring: "The lead is researching without a near-term commitment.",
  };
  const budgetRationales = {
    aligned: "The supplied budget matches the typical service range.",
    flexible: "Budget is flexible, but the payment structure should be confirmed.",
    unknown: "No budget was supplied, so commercial fit remains uncertain.",
    below: "The stated budget appears below the likely project minimum.",
  };
  const behaviorRationales = {
    high: "Pricing, reviews, and a repeat visit show strong comparison behaviour.",
    medium: "Two relevant pages show interest, but limited buying evidence.",
    low: "A short single-page visit provides weak behavioural evidence.",
  };

  const elements = {
    scenario: leadLab.querySelector("[data-scenario]"),
    voice: leadLab.querySelector("[data-voice]"),
    leadCard: leadLab.querySelector("[data-lead-card]"),
    initials: leadLab.querySelector("[data-lead-initials]"),
    name: leadLab.querySelector("[data-lead-name]"),
    service: leadLab.querySelector("[data-lead-service]"),
    stageLabel: leadLab.querySelector("[data-stage-label]"),
    stageButtons: [...leadLab.querySelectorAll("[data-stage]")],
    progress: leadLab.querySelector("[data-progress]"),
    form: leadLab.querySelector("[data-signal-form]"),
    timeline: leadLab.querySelector("[data-timeline]"),
    budget: leadLab.querySelector("[data-budget]"),
    behavior: leadLab.querySelector("[data-behavior]"),
    message: leadLab.querySelector("[data-message]"),
    score: leadLab.querySelector("[data-score]"),
    scoreRing: leadLab.querySelector("[data-score-ring]"),
    verdict: leadLab.querySelector("[data-verdict]"),
    route: leadLab.querySelector("[data-route]"),
    priority: leadLab.querySelector("[data-priority]"),
    rationale: leadLab.querySelector("[data-rationale]"),
    reviewFlag: leadLab.querySelector("[data-review-flag]"),
    reviewReason: leadLab.querySelector("[data-review-reason]"),
    followup: leadLab.querySelector("[data-followup]"),
    copyFollowup: leadLab.querySelector("[data-copy-followup]"),
    copyStatus: leadLab.querySelector("[data-copy-status]"),
    copyReport: leadLab.querySelector("[data-copy-report]"),
    reportSummary: leadLab.querySelector("[data-report-summary]"),
    reportStatus: leadLab.querySelector("[data-report-status]"),
    metricSpend: leadLab.querySelector("[data-metric-spend]"),
    metricSpendNote: leadLab.querySelector("[data-metric-spend-note]"),
    metricQualified: leadLab.querySelector("[data-metric-qualified]"),
    metricQualityNote: leadLab.querySelector("[data-metric-quality-note]"),
    metricBooked: leadLab.querySelector("[data-metric-booked]"),
    metricBookedNote: leadLab.querySelector("[data-metric-booked-note]"),
    metricOutcome: leadLab.querySelector("[data-metric-outcome]"),
    metricOutcomeNote: leadLab.querySelector("[data-metric-outcome-note]"),
  };

  let activeStage = 0;

  const selectedText = (select) => select.options[select.selectedIndex]?.textContent || "";
  const getScenario = () => leadScenarios[elements.scenario.value] || leadScenarios.gutter;

  const getLeadDecision = () => {
    const scenario = getScenario();
    const messageScore = Math.min(12, Math.max(3, Math.round(elements.message.value.trim().length / 9)));
    let score = scenario.sourceScore;

    if (activeStage >= 1) {
      score += timelineScores[elements.timeline.value];
      score += budgetScores[elements.budget.value];
      score += messageScore;
    }
    if (activeStage >= 2) score += behaviorScores[elements.behavior.value];

    const budgetConflict = elements.budget.value === "below";
    const signalConflict = elements.behavior.value === "high" && elements.timeline.value === "exploring";
    const needsReview = activeStage >= 3 && (budgetConflict || signalConflict);
    const reviewReason = budgetConflict
      ? "Urgency and engagement are high, but the stated budget is below the likely minimum. Confirm scope manually before sending price or availability."
      : "Browsing behaviour looks high-intent, but the stated timeline says “just researching”. A person should clarify intent before priority routing.";

    return { score: Math.min(100, score), needsReview, reviewReason };
  };

  const getStatus = (decision) => {
    if (activeStage === 0) return { verdict: "New signal", route: "Match the click to its campaign and search intent.", priority: "New", level: "nurture" };
    if (activeStage === 1) return { verdict: "Form captured", route: "Validate the answers and join behavioural data.", priority: "Captured", level: "nurture" };
    if (decision.needsReview) return { verdict: "Conflicting signals", route: "Pause automation and assign a person to review.", priority: "Review", level: "warm" };
    if (activeStage === 4) return { verdict: "Outcome attributed", route: "The CRM outcome is connected to its acquisition source.", priority: decision.score >= 80 ? "Won" : "Pipeline", level: decision.score >= 80 ? "hot" : "warm" };
    if (decision.score >= 80) return { verdict: "High-intent lead", route: activeStage >= 3 ? "Assign now and prepare the approved follow-up." : "Ready for qualification and routing.", priority: "Priority", level: "hot" };
    if (decision.score >= 55) return { verdict: "Qualified · nurture", route: activeStage >= 3 ? "Assign a nurture task with a clear next step." : "Keep evaluating fit and timing.", priority: "Warm", level: "warm" };
    return { verdict: "Early-stage lead", route: "Nurture until stronger timing or fit evidence appears.", priority: "Nurture", level: "nurture" };
  };

  const buildRationale = (decision) => {
    const scenario = getScenario();
    const reasons = [scenario.sourceReason];

    if (activeStage >= 1) {
      reasons.push(timelineRationales[elements.timeline.value]);
      reasons.push(budgetRationales[elements.budget.value]);
      reasons.push(elements.message.value.trim().length > 55
        ? "The form answer contains enough detail to suggest a specific next step."
        : "The form answer is brief, reducing confidence in the recommendation.");
    } else {
      reasons.push("Form, budget, and timeline signals are not available yet.");
    }

    if (activeStage >= 2) reasons.push(behaviorRationales[elements.behavior.value]);
    if (activeStage >= 3 && !decision.needsReview) reasons.push("No conflicting rule was found, so the lead can enter the approved routing path.");
    if (activeStage >= 4) reasons.push(scenario.outcomeReason);
    return reasons;
  };

  const buildFollowup = (decision) => {
    if (activeStage < 3) return "Move this lead to Operate to generate a follow-up after the score, rationale, and guardrails have been checked.";

    const scenario = getScenario();
    const firstName = scenario.name.split(" ")[0];
    const timeline = selectedText(elements.timeline).toLowerCase();
    const reviewLine = decision.needsReview
      ? "I want to confirm the scope with you before suggesting a price or promising a slot."
      : `Based on the details you shared, the best next step is ${scenario.nextStep}.`;
    const question = decision.needsReview
      ? `Would a quick clarification call ${scenario.suggestedTime} work?`
      : `Would ${scenario.suggestedTime} work for you?`;

    const drafts = {
      direct: `Hi ${firstName}, thanks for reaching out to ${scenario.business} about ${scenario.need}. I noted that your timeline is ${timeline}. ${reviewLine} ${question}`,
      warm: `Hi ${firstName}, thank you for sharing those details. I understand you’re looking for ${scenario.need}, with a timeline of ${timeline}. ${reviewLine} If it suits you, ${question.charAt(0).toLowerCase()}${question.slice(1)}`,
      premium: `Hi ${firstName} — thank you for considering ${scenario.business}. I’ve reviewed your request for ${scenario.need} and your ${timeline} timeline. ${reviewLine} ${question}`,
    };

    return drafts[elements.voice.value] || drafts.direct;
  };

  const updateReport = () => {
    const report = getScenario().report;
    elements.metricSpend.textContent = report.spend;
    elements.metricSpendNote.textContent = report.spendNote;
    elements.metricQualified.textContent = report.qualified;
    elements.metricQualityNote.textContent = report.qualityNote;
    elements.metricBooked.textContent = report.booked;
    elements.metricBookedNote.textContent = report.bookedNote;
    elements.metricOutcome.textContent = report.outcome;
    elements.metricOutcomeNote.textContent = report.outcomeNote;
    elements.reportSummary.textContent = report.summary;
  };

  const renderLab = () => {
    const decision = getLeadDecision();
    const status = getStatus(decision);
    const reasons = buildRationale(decision);

    elements.stageButtons.forEach((button, index) => {
      const isActive = index === activeStage;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    elements.stageLabel.textContent = stageNames[activeStage];
    elements.progress.style.width = `${(activeStage / (stageNames.length - 1)) * 100}%`;
    elements.score.textContent = decision.score;
    elements.scoreRing.style.setProperty("--score", decision.score);
    elements.verdict.textContent = status.verdict;
    elements.route.textContent = status.route;
    elements.priority.textContent = status.priority;
    elements.priority.dataset.level = status.level;

    elements.rationale.replaceChildren();
    reasons.forEach((reason) => {
      const item = document.createElement("li");
      item.textContent = reason;
      elements.rationale.append(item);
    });

    elements.reviewFlag.hidden = !decision.needsReview;
    elements.reviewReason.textContent = decision.needsReview ? decision.reviewReason : "";
    elements.followup.value = buildFollowup(decision);
    elements.copyStatus.textContent = "";
    updateReport();
  };

  const loadScenario = () => {
    const scenario = getScenario();
    elements.initials.textContent = scenario.initials;
    elements.name.textContent = scenario.name;
    elements.service.textContent = scenario.service;
    elements.timeline.value = scenario.timeline;
    elements.budget.value = scenario.budget;
    elements.behavior.value = scenario.behavior;
    elements.message.value = scenario.message;
    activeStage = 0;
    renderLab();
  };

  const selectStage = (index) => {
    activeStage = Math.max(0, Math.min(stageNames.length - 1, index));
    renderLab();
  };

  const copyText = async (value, statusElement) => {
    try {
      await navigator.clipboard.writeText(value);
      statusElement.textContent = "Copied to clipboard.";
    } catch (error) {
      const temporaryField = document.createElement("textarea");
      temporaryField.value = value;
      temporaryField.setAttribute("readonly", "");
      temporaryField.style.position = "fixed";
      temporaryField.style.opacity = "0";
      document.body.append(temporaryField);
      temporaryField.select();
      const copied = document.execCommand("copy");
      temporaryField.remove();
      statusElement.textContent = copied ? "Copied to clipboard." : "Select the text and copy it manually.";
    }
  };

  elements.stageButtons.forEach((button) => {
    const stage = Number(button.dataset.stage);
    button.addEventListener("click", () => selectStage(stage));
    button.addEventListener("dragover", (event) => {
      event.preventDefault();
      button.classList.add("is-drop-target");
    });
    button.addEventListener("dragleave", () => button.classList.remove("is-drop-target"));
    button.addEventListener("drop", (event) => {
      event.preventDefault();
      button.classList.remove("is-drop-target");
      selectStage(stage);
    });
  });

  elements.leadCard.addEventListener("dragstart", (event) => {
    event.dataTransfer?.setData("text/plain", "lead");
    event.dataTransfer?.setDragImage(elements.leadCard, 22, 22);
    elements.leadCard.classList.add("is-dragging");
  });
  elements.leadCard.addEventListener("dragend", () => {
    elements.leadCard.classList.remove("is-dragging");
    elements.stageButtons.forEach((button) => button.classList.remove("is-drop-target"));
  });
  elements.leadCard.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    selectStage(activeStage + (event.key === "ArrowRight" ? 1 : -1));
  });

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderLab();
  });
  elements.scenario.addEventListener("change", loadScenario);
  elements.voice.addEventListener("change", renderLab);
  elements.copyFollowup.addEventListener("click", () => copyText(elements.followup.value, elements.copyStatus));
  elements.copyReport.addEventListener("click", () => copyText(elements.reportSummary.textContent, elements.reportStatus));

  loadScenario();
}
