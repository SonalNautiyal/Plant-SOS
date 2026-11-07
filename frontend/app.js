// Plant SOS frontend behavior: photo picking, preview, and sample analysis.
// Real analysis comes from the Flask API in a later step.

// Largest photo we accept: 10 MB in bytes.
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

// The photo the user has currently selected (or null).
let selectedPhotoFile = null;

// The local object URL behind the preview image (or null).
let previewObjectUrl = null;

// True while a sample analysis is running, so a second one cannot start.
let isAnalyzing = false;

// Shortcut to the elements we work with on the page.
const photoInput = document.getElementById("photo-input");
const previewImage = document.getElementById("preview-image");
const previewCaption = document.getElementById("preview-caption");
const removeButton = document.getElementById("remove-photo-button");
const statusMessage = document.getElementById("status-message");
const loadingSpinner = document.getElementById("loading-spinner");
const sampleBanner = document.getElementById("sample-banner");
const resultsArea = document.getElementById("results-area");
const resultCondition = document.getElementById("result-condition");
const resultConfidence = document.getElementById("result-confidence");
const confidenceBarFill = document.getElementById("confidence-bar-fill");
const careList = document.getElementById("result-care");
const analyzeButton = document.getElementById("analyze-button");
const analyzeHint = document.getElementById("analyze-hint");

// Writes a short friendly message into the status area on the page itself.
function showStatus(message) {
  statusMessage.textContent = message;
}

// Checks the file is a JPG or PNG by type and is not larger than 10 MB.
function isValidPhoto(file) {
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return false;
  }
  return file.size > 0 && file.size <= MAX_FILE_SIZE_BYTES;
}

// Converts a byte size into megabytes with one decimal place.
function getSizeInMb(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1);
}

// Shows the chosen photo in the preview area with its name and size.
function showPreview(file) {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
  }
  previewObjectUrl = URL.createObjectURL(file);
  previewImage.src = previewObjectUrl;
  previewImage.hidden = false;
  previewCaption.hidden = false;
  previewCaption.textContent = file.name + " (" + getSizeInMb(file.size) + " MB)";
  removeButton.hidden = false;
  selectedPhotoFile = file;
  updateAnalyzeButton();
}

// Clears the preview, any status message, and any shown results.
function clearPreview() {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
  }
  previewImage.removeAttribute("src");
  previewImage.hidden = true;
  previewCaption.textContent = "";
  previewCaption.hidden = true;
  removeButton.hidden = true;
  selectedPhotoFile = null;
  statusMessage.textContent = "";
  sampleBanner.hidden = true;
  resultsArea.hidden = true;
  confidenceBarFill.style.width = "0%";
  updateAnalyzeButton();
}

// Keeps the Analyze button and hint in step with the photo and loading state.
function updateAnalyzeButton() {
  analyzeButton.disabled = selectedPhotoFile === null || isAnalyzing;
  analyzeHint.hidden = selectedPhotoFile !== null;
}

// SAMPLE DATA FOR DEVELOPMENT - replaced by a call to the Flask API /analyze endpoint in a later step.
function analyzeLeaf(photoFile) {
  // photoFile is intentionally unused: the sample result is fixed no matter the photo.
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({
        condition: "Sample Leaf Condition (sample data)",
        confidence: 0.87,
        careSuggestions: [
          "Snip off badly damaged lower leaves with clean scissors.",
          "Water near the roots, not on the leaves.",
          "Keep the plant out of direct midday sun for two days."
        ]
      });
    }, 2000);
  });
}

// Shows the loading message and spinner and locks the controls during analysis.
function showLoadingState() {
  showStatus("Analyzing your leaf...");
  loadingSpinner.hidden = false;
  photoInput.disabled = true;
  removeButton.disabled = true;
  sampleBanner.hidden = true;
  resultsArea.hidden = true;
  updateAnalyzeButton();
}

// Restores the controls after an analysis round has finished or failed.
function finishAnalysis() {
  isAnalyzing = false;
  loadingSpinner.hidden = true;
  showStatus("");
  photoInput.disabled = false;
  removeButton.disabled = false;
  updateAnalyzeButton();
}

// Fills the results area with the given result and shows it with the sample banner.
function showResults(result) {
  sampleBanner.hidden = false;
  resultCondition.textContent = result.condition;
  const percent = Math.round(result.confidence * 100);
  resultConfidence.textContent = percent + "%";
  confidenceBarFill.style.width = percent + "%";
  careList.innerHTML = "";
  result.careSuggestions.forEach(function (tip) {
    const item = document.createElement("li");
    item.textContent = tip;
    careList.appendChild(item);
  });
  resultsArea.hidden = false;
}

// Runs one analysis round and prevents a second one while loading.
function handleAnalyzeClick() {
  if (isAnalyzing || !selectedPhotoFile) {
    return;
  }
  isAnalyzing = true;
  showLoadingState();
  analyzeLeaf(selectedPhotoFile)
    .then(function (result) {
      showResults(result);
    })
    .catch(function () {
      sampleBanner.hidden = true;
      resultsArea.hidden = true;
      showStatus("Something went wrong. Please try again.");
    })
    .finally(function () {
      // Always runs last, on success or error, so the loading state can never get stuck.
      finishAnalysis();
    });
}

// Handles a newly chosen file by showing its preview or a friendly error message.
function handlePhotoSelection(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  if (!isValidPhoto(file)) {
    clearPreview();
    showStatus("Please choose a JPG or PNG photo under 10 MB.");
    return;
  }
  showPreview(file);
  showStatus("");
  photoInput.value = "";
}

photoInput.addEventListener("change", handlePhotoSelection);
analyzeButton.addEventListener("click", handleAnalyzeClick);
removeButton.addEventListener("click", clearPreview);
