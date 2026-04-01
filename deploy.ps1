#!/usr/bin/env pwsh
# deploy.ps1 — Deploy EdgePhone V01 to Google Cloud Run
# Usage: .\deploy.ps1 [-ProjectId "your-project-id"]

param(
    [string]$ProjectId = ""
)

$ACCOUNT  = "et@edgephone.ai"
$REGION   = "europe-west1"
$SERVICE  = "edgephone-v01"
$REPO     = "edgephone"

# ─── 1. Set active account ──────────────────────────────────────────────────
Write-Host "`n[1/6] Setting active account to $ACCOUNT..." -ForegroundColor Cyan
gcloud config set account $ACCOUNT

# ─── 2. Resolve project ─────────────────────────────────────────────────────
if (-not $ProjectId) {
    $ProjectId = gcloud config get-value project 2>$null
    if (-not $ProjectId) {
        Write-Host "ERROR: No project set. Run: gcloud config set project YOUR_PROJECT_ID" -ForegroundColor Red
        exit 1
    }
}
Write-Host "[2/6] Using project: $ProjectId" -ForegroundColor Cyan
gcloud config set project $ProjectId

# ─── 3. Enable required APIs ────────────────────────────────────────────────
Write-Host "`n[3/6] Enabling APIs..." -ForegroundColor Cyan
gcloud services enable `
    run.googleapis.com `
    cloudbuild.googleapis.com `
    artifactregistry.googleapis.com `
    --project=$ProjectId

# ─── 4. Create Artifact Registry repo (idempotent) ──────────────────────────
Write-Host "`n[4/6] Creating Artifact Registry repo '$REPO'..." -ForegroundColor Cyan
$repoExists = gcloud artifacts repositories describe $REPO --location=$REGION --project=$ProjectId 2>$null
if (-not $repoExists) {
    gcloud artifacts repositories create $REPO `
        --repository-format=docker `
        --location=$REGION `
        --description="EdgePhone Docker images" `
        --project=$ProjectId
} else {
    Write-Host "  Repo already exists, skipping." -ForegroundColor DarkGray
}

# ─── 5. Configure Docker auth for Artifact Registry ─────────────────────────
Write-Host "`n[5/6] Configuring Docker auth..." -ForegroundColor Cyan
gcloud auth configure-docker "$REGION-docker.pkg.dev" --quiet

# ─── 6. Submit Cloud Build ───────────────────────────────────────────────────
Write-Host "`n[6/6] Submitting Cloud Build..." -ForegroundColor Cyan
gcloud builds submit . `
    --config=cloudbuild.yaml `
    --project=$ProjectId `
    --substitutions="_REGION=$REGION,_REPO=$REPO"

# ─── Done ────────────────────────────────────────────────────────────────────
Write-Host "`n✅ Deploy complete! Fetching Cloud Run URL..." -ForegroundColor Green
$url = gcloud run services describe $SERVICE --region=$REGION --project=$ProjectId --format="value(status.url)"
Write-Host "`n🌐 Live at: $url`n" -ForegroundColor Green
