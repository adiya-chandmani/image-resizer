"use client";

import { ChangeEvent, useMemo, useState } from "react";

type Mode = "pixels" | "percent";
type OutputFormat = "image/png" | "image/jpeg";

type LoadedImage = {
  name: string;
  width: number;
  height: number;
  src: string;
  type: string;
};

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function ImageResizerTool() {
  const [image, setImage] = useState<LoadedImage | null>(null);
  const [mode, setMode] = useState<Mode>("pixels");
  const [width, setWidth] = useState("1200");
  const [height, setHeight] = useState("800");
  const [percent, setPercent] = useState("50");
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState("0.92");
  const [status, setStatus] = useState<string>("Add an image to get started.");
  const [outputInfo, setOutputInfo] = useState<{ width: number; height: number; bytes: number } | null>(null);

  const computedDimensions = useMemo(() => {
    if (!image) return { width: 0, height: 0 };

    if (mode === "percent") {
      const scale = Math.max(1, Number(percent) || 1) / 100;
      return {
        width: Math.max(1, Math.round(image.width * scale)),
        height: Math.max(1, Math.round(image.height * scale)),
      };
    }

    return {
      width: Math.max(1, Math.round(Number(width) || 1)),
      height: Math.max(1, Math.round(Number(height) || 1)),
    };
  }, [height, image, mode, percent, width]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const src = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const next = { name: file.name, width: img.width, height: img.height, src, type: file.type };
      setImage(next);
      setWidth(String(img.width));
      setHeight(String(img.height));
      setStatus(`Loaded ${file.name} (${img.width} × ${img.height}).`);
      setOutputInfo(null);
    };
    img.onerror = () => setStatus("Could not read that image. Try a JPG, PNG, or WebP file.");
    img.src = src;
  }

  function handleWidthChange(value: string) {
    setWidth(value);
    if (!image || !lockAspectRatio) return;
    const nextWidth = Math.max(1, Number(value) || 1);
    const ratio = image.height / image.width;
    setHeight(String(Math.max(1, Math.round(nextWidth * ratio))));
  }

  function handleHeightChange(value: string) {
    setHeight(value);
    if (!image || !lockAspectRatio) return;
    const nextHeight = Math.max(1, Number(value) || 1);
    const ratio = image.width / image.height;
    setWidth(String(Math.max(1, Math.round(nextHeight * ratio))));
  }

  async function resizeImage() {
    if (!image) {
      setStatus("Choose an image first.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = computedDimensions.width;
    canvas.height = computedDimensions.height;
    const context = canvas.getContext("2d");

    if (!context) {
      setStatus("Your browser could not create a canvas context.");
      return;
    }

    const source = new window.Image();
    source.src = image.src;
    await new Promise<void>((resolve, reject) => {
      source.onload = () => resolve();
      source.onerror = () => reject(new Error("Failed to load source image."));
    });

    context.drawImage(source, 0, 0, computedDimensions.width, computedDimensions.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, format, format === "image/jpeg" ? Number(quality) : undefined);
    });

    if (!blob) {
      setStatus("Resize failed. Please try another image or output format.");
      return;
    }

    const ext = format === "image/png" ? "png" : "jpg";
    const baseName = image.name.replace(/\.[^.]+$/, "") || "resized-image";
    downloadBlob(blob, `${baseName}-${computedDimensions.width}x${computedDimensions.height}.${ext}`);
    setOutputInfo({ width: computedDimensions.width, height: computedDimensions.height, bytes: blob.size });
    setStatus("Resized image downloaded successfully.");
  }

  const estimatedReduction = image
    ? Math.max(0, 100 - Math.round((computedDimensions.width * computedDimensions.height) / (image.width * image.height) * 100))
    : 0;

  return (
    <section className="tool-grid section" aria-labelledby="tool-title">
      <div className="panel">
        <div className="panel-stack">
          <div>
            <p className="label">Interactive tool</p>
            <h2 id="tool-title" className="section-title">Resize your image</h2>
            <p className="muted">Upload an image, choose new dimensions, and download the resized result instantly.</p>
          </div>

          <div className="field">
            <label htmlFor="image-upload">Image file</label>
            <input id="image-upload" className="input" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFileChange} />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="mode">Resize mode</label>
              <select id="mode" className="select" value={mode} onChange={(event) => setMode(event.target.value as Mode)}>
                <option value="pixels">Exact pixels</option>
                <option value="percent">Percentage</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="format">Download format</label>
              <select id="format" className="select" value={format} onChange={(event) => setFormat(event.target.value as OutputFormat)}>
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPEG</option>
              </select>
            </div>
          </div>

          {mode === "pixels" ? (
            <div className="form-grid">
              <div className="field">
                <label htmlFor="width">Width (px)</label>
                <input id="width" className="input" inputMode="numeric" value={width} onChange={(event) => handleWidthChange(event.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="height">Height (px)</label>
                <input id="height" className="input" inputMode="numeric" value={height} onChange={(event) => handleHeightChange(event.target.value)} />
              </div>
            </div>
          ) : (
            <div className="field">
              <label htmlFor="percent">Scale percentage</label>
              <input id="percent" className="input" inputMode="decimal" value={percent} onChange={(event) => setPercent(event.target.value)} />
            </div>
          )}

          <div className="form-grid">
            <label className="checkbox-row">
              <input type="checkbox" checked={lockAspectRatio} onChange={(event) => setLockAspectRatio(event.target.checked)} />
              <span>Lock aspect ratio in pixel mode</span>
            </label>
            <div className="field">
              <label htmlFor="quality">JPEG quality (0 to 1)</label>
              <input id="quality" className="input" inputMode="decimal" value={quality} onChange={(event) => setQuality(event.target.value)} disabled={format !== "image/jpeg"} />
            </div>
          </div>

          <button type="button" className="primary" onClick={resizeImage}>Resize and download</button>
          <p className="note" aria-live="polite">{status}</p>
        </div>
      </div>

      <div className="panel-stack">
        <article className="panel">
          <h2 className="section-title">Preview details</h2>
          <div className="split-grid compact-grid">
            <div className="split-row"><span>Original size</span><strong>{image ? `${image.width} × ${image.height}` : "—"}</strong></div>
            <div className="split-row"><span>New size</span><strong>{image ? `${computedDimensions.width} × ${computedDimensions.height}` : "—"}</strong></div>
            <div className="split-row"><span>Pixel reduction</span><strong>{image ? `${estimatedReduction}%` : "—"}</strong></div>
          </div>
        </article>

        <article className="panel">
          <h2 className="section-title">Output summary</h2>
          <div className="result-hero">
            <h3>{outputInfo ? `${outputInfo.width} × ${outputInfo.height}` : "Ready when you are"}</h3>
            <p>{outputInfo ? `Downloaded file size: ${Math.max(1, Math.round(outputInfo.bytes / 1024))} KB` : "Choose settings and export your resized image."}</p>
          </div>
          <div className="split-grid">
            <div className="split-row"><span>Accepted inputs</span><strong>JPG, PNG, WebP</strong></div>
            <div className="split-row"><span>Exports</span><strong>PNG, JPEG</strong></div>
            <div className="split-row"><span>Processing</span><strong>In browser</strong></div>
          </div>
        </article>
      </div>
    </section>
  );
}
