"use client";

import { useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";

type Props = {
  id?: string;
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export default function AdminImageUploadField({ id, label, value, onChange, hint }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr("");
    if (file.size > 4 * 1024 * 1024) {
      setErr("File too large (max 4 MB). Please compress or resize the image first.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("filename", file.name);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Upload failed");
      }
      if (typeof data.url !== "string") {
        throw new Error("Upload did not return a URL");
      }
      onChange(data.url);
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-field">
      <label className="admin-label" htmlFor={id}>
        {label}
      </label>
      {hint ? <p className="admin-hint">{hint}</p> : null}
      <div className="admin-image-field__row">
        <input
          id={id}
          className="admin-input admin-image-field__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Optional: paste a URL, or use Upload"
          autoComplete="off"
        />
        <input ref={fileRef} type="file" accept="image/*" className="admin-image-field__file" onChange={onPick} />
        <button type="button" className="admin-btn admin-btn--primary" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden /> : <Upload className="w-4 h-4" aria-hidden />}
          {uploading ? "Uploading…" : "Upload image"}
        </button>
      </div>
      {value ? (
        <div className="admin-image-field__preview">
          <img src={value} alt="" className="admin-image-field__thumb" />
        </div>
      ) : null}
      {err ? (
        <p className="admin-msg--err" style={{ marginTop: "0.5rem" }}>
          {err}
        </p>
      ) : null}
    </div>
  );
}
