"""
download_model.py
=================
Downloads the Gemma 4 E2B INT4 model (MediaPipe / LiteRT .bin format)
from Kaggle and places it in the correct location for edgephone_v02.

Requirements:
    pip install kagglehub

Kaggle credentials:
    Either set KAGGLE_USERNAME + KAGGLE_KEY environment variables,
    or ensure ~/.kaggle/kaggle.json exists.
    You must have accepted the Gemma 4 license on:
    https://www.kaggle.com/models/google/gemma-4
"""

import os
import sys
import shutil
import glob

# ── Target destination (relative to this script) ─────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEST_DIR   = os.path.join(SCRIPT_DIR, "public", "models")
DEST_FILE  = os.path.join(DEST_DIR, "gemma-4-e2b-it-gpu-int4.bin")

# ── Candidate Kaggle model paths (tried in order) ────────────────────────────
# MediaPipe / LiteRT .bin format lives under the "tfLite" or "litert" framework.
# The naming convention mirrors the old Gemma 2B path:
#   google/gemma/tfLite/gemma-2b-it-gpu-int4
CANDIDATE_PATHS = [
    "google/gemma-4/tfLite/gemma-4-e2b-it-gpu-int4",   # most likely
    "google/gemma-4/litert/gemma-4-e2b-it-gpu-int4",   # LiteRT rebrand
    "google/gemma-4/tfLite/gemma4-e2b-it-gpu-int4",    # alternate slug
    "google/gemma-4/tfLite/2b-it-gpu-int4",            # shortened slug
]

# ── Helpers ───────────────────────────────────────────────────────────────────

def find_bin(base_path: str) -> str | None:
    """Recursively find the first .bin file under base_path."""
    matches = glob.glob(os.path.join(base_path, "**", "*.bin"), recursive=True)
    return matches[0] if matches else None


def download_and_install() -> None:
    try:
        import kagglehub
    except ImportError:
        print("ERROR: kagglehub is not installed.")
        print("  Run:  pip install kagglehub")
        sys.exit(1)

    os.makedirs(DEST_DIR, exist_ok=True)

    # Already downloaded?
    if os.path.isfile(DEST_FILE):
        size_gb = os.path.getsize(DEST_FILE) / 1e9
        print(f"✅  Model already present ({size_gb:.1f} GB):")
        print(f"    {DEST_FILE}")
        print("\nNothing to do — start the app with:  npm run dev")
        return

    last_error = None
    for model_path in CANDIDATE_PATHS:
        print(f"\n🔍  Trying: {model_path}")
        try:
            downloaded_dir = kagglehub.model_download(model_path)
            print(f"    Downloaded to cache: {downloaded_dir}")

            bin_file = find_bin(downloaded_dir)
            if not bin_file:
                print("    ⚠️  No .bin file found in download — trying next candidate.")
                continue

            print(f"    Found model file:    {bin_file}")
            print(f"    Copying to:          {DEST_FILE}")
            shutil.copy2(bin_file, DEST_FILE)

            size_gb = os.path.getsize(DEST_FILE) / 1e9
            print(f"\n✅  Done!  Model installed ({size_gb:.1f} GB):")
            print(f"    {DEST_FILE}")
            print("\nStart the app with:  npm run dev")
            print("Then open the AI Assistant tab and switch to LOCAL mode.")
            return

        except Exception as e:
            last_error = e
            print(f"    ❌  Failed: {e}")

    # All candidates failed — give manual fallback instructions
    print("\n" + "="*60)
    print("❌  Could not download automatically.")
    print("="*60)
    print("""
MANUAL DOWNLOAD STEPS
─────────────────────
1. Open: https://www.kaggle.com/models/google/gemma-4
2. Accept the Gemma 4 license (one-time, requires a Kaggle account)
3. Go to the 'tfLite' or 'LiteRT' framework tab
4. Look for a variant named: gemma-4-e2b-it-gpu-int4
5. Download the .bin file
6. Rename / copy it to:
""")
    print(f"   {DEST_FILE}")
    print("""
Then start the app with:  npm run dev
""")
    if last_error:
        print(f"Last error: {last_error}")


if __name__ == "__main__":
    download_and_install()
