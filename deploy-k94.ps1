# Kịch bản Tự động Đóng gói & Cập nhật Web HHD Tử Vi - Công ty Truyền thông K94 lên GitHub Pages
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== 1. Luu ma nguon len nhanh main (GitHub) ===" -ForegroundColor Cyan
git add -A
git commit -m "chore: cap nhat noi dung & tinh nang K94 Media" --allow-empty
git push origin main

Write-Host "=== 2. Dong goi tinh (Static Export) cho GitHub Pages ===" -ForegroundColor Cyan
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
if (Test-Path "src\app\api") { Move-Item "src\app\api" "..\hhd-tuvi-api-backup" -Force }
$env:GITHUB_PAGES = "true"
npm run build
if (Test-Path "..\hhd-tuvi-api-backup") { Move-Item "..\hhd-tuvi-api-backup" "src\app\api" -Force }
New-Item -ItemType File -Path "out\.nojekyll" -Force | Out-Null

Write-Host "=== 3. Day ban cap nhat len https://huynhhuude-bot.github.io/tuvi-hhd/ ===" -ForegroundColor Cyan
Set-Location "$PSScriptRoot\out"
git init
git config user.name "HHD"
git config user.email "huynhhuude-bot@users.noreply.github.com"
git config core.safecrlf false
git checkout -b gh-pages
git add -A
git commit -m "deploy: cap nhat giao dien HHD K94 Media"
git push -f https://github.com/huynhhuude-bot/tuvi-hhd.git gh-pages

Set-Location $PSScriptRoot
Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
Write-Host "=== HOAN TAT! Web da duoc cap nhat tai: https://huynhhuude-bot.github.io/tuvi-hhd/ ===" -ForegroundColor Green
