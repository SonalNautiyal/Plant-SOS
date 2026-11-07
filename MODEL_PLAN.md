# Plant SOS - Model Plan (Version 1)

Status: CONFIRMED (classes and framework approved by the project owner; dataset
source and license approved below). No dataset has been downloaded yet, and no
training has started.

---

## 1. Goal

A CPU-friendly image classifier that receives a cropped photo of a **tomato
leaf** and predicts one of four conditions, plus a confidence score. The
result is always presented to the user as an estimate, never a diagnosis.

## 2. Confirmed classes (4)

| Index in `labels.json` | Class name (human-facing) |
|---|---|
| 0 | Healthy |
| 1 | Early blight |
| 2 | Late blight |
| 3 | Septoria leaf spot |

The mapping above is the canonical class order. Training code must produce
`labels.json` from that order, and the Flask API must load `labels.json`
instead of hardcoding names, so the model and website can never disagree.

## 3. Confirmed dataset source and usage terms

- **Source (exact page, as confirmed by the project owner):**
  https://www.kaggle.com/datasets/naveedgull/tomato-leaf-disease
  ("Tomato Leaf Disease", Kaggle, uploader: naveedgull)
- **License stated by that uploader: CC0: Public Domain.** Under CC0 the data
  carries no attribution requirement and no usage restrictions.
- **Provenance caveat (recorded on purpose):** the upstream image provenance
  of this Kaggle upload has **not been verified**. It is PlantVillage-*style*
  tomato leaf data, but no documented connection proves which upstream
  collection the images came from, and the license text applies as stated by
  the uploader. Accordingly:
  - **Do not** cite Mohanty, Hughes & Salathe (2016) / the PlantVillage paper
    as the source of this dataset unless a documented connection is found.
  - Record the Kaggle page above as the source, and "CC0 (public domain), as
    stated by the uploader" as the terms.
- **Dataset scope:** the upload contains 10 tomato classes in `train`/`test`
  folders (80/20). Only the four folders matching the confirmed classes are
  used; the other six folders are ignored. Downloading the extra folders is
  unavoidable if they ship in one archive; they are simply not read in.

## 4. Confirmed model choice

- **Framework:** TensorFlow 2.21.0 with Keras (CPU-only on Windows native,
  Python 3.12; no native Windows GPU wheels are used or needed).
- **Approach:** transfer learning. Base = **MobileNetV2**, pretrained on
  ImageNet, with its top classification layer replaced by a new dense output
  for the 4 classes. Only the new head is trained in the first pass; fine
  tuning of some base layers is optional later if accuracy is poor.
- **Image size:** every image is resized to **224 x 224** at training time.
  The same 224 x 224 resizing (plus the same MobileNetV2 preprocessing) MUST
  also be applied inside the Flask API before prediction. Training-time and
  serving-time preprocessing must never differ.
- **Class balance is respected:** the uploader's class counts differ
  (e.g. Early blight is smaller than other classes). Training uses the
  existing 80/20 `train`/`test` folders, with a validation split carved from
  `train`. The much-larger test count in the dataset CSV is not used for
  this project.

## 5. How the model is saved and loaded later

- **Saved (training step, still to come):**
  - `models/model.keras` - the trained Keras model in the single-file
    `.keras` format (topology + weights + compile info) saved with
    `model.save()`.
  - `models/labels.json` - a JSON array of the 4 class names in exact output
    order (see section 2), written by the training script.
- **Loaded (Flask API step, still to come):** the API loads `models/model.keras`
  with `keras.models.load_model()`, reads `models/labels.json`, receives a
  photo from the website, resizes it to 224 x 224 with the same preprocessing
  as training, runs prediction, and converts the softmax output into
  (condition name, confidence) before returning JSON plus care tips.

## 6. Explicitly out of scope for this plan

- Downloading the dataset (a later step).
- Training, evaluation, tuning (later steps).
- Any use outside the local educational Plant SOS project.
