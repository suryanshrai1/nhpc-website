import React, { useState } from "react";
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Copy } from "lucide-react";
import MediaPickerModal from "./MediaPickerModal";

export default function HeroEditor({ initialHero, onSave, saving }) {
  // Support slides array. If backend returns single hero keys, we map it into a default index 0 slide.
  const [slides, setSlides] = useState(
    initialHero?.slides || [
      {
        id: 1,
        title: initialHero?.title || "",
        subtitle: initialHero?.subtitle || "",
        description: initialHero?.description || "",
        badge: initialHero?.badge || "",
        heroImage: initialHero?.heroImage || "",
        heroVideo: initialHero?.heroVideo || "",
        buttons: initialHero?.buttons || [
          { id: 1, label: "Explore", url: "/projects", buttonStyle: "PRIMARY", isActive: true },
          { id: 2, label: "Contact Us", url: "/contact", buttonStyle: "OUTLINE", isActive: true }
        ]
      }
    ]
  );

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [pickerField, setPickerField] = useState(null); // { idx: number, type: 'image' | 'video' }

  const handleSave = () => {
    // If backend only supports single hero updates, we extract the active slide data.
    // Otherwise, we pass the full slides layout array.
    const activeSlide = slides[activeSlideIdx];
    onSave({
      title: activeSlide.title,
      subtitle: activeSlide.subtitle,
      description: activeSlide.description,
      badge: activeSlide.badge,
      heroImage: activeSlide.heroImage,
      heroVideo: activeSlide.heroVideo,
      buttons: activeSlide.buttons,
      slides: slides // Carry over slides structure for future CMS scalability
    });
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: "New Slide Headline",
      subtitle: "Subheading details",
      description: "Description sentence...",
      badge: "NEW ANNOUNCEMENT",
      heroImage: "",
      heroVideo: "",
      buttons: [
        { id: 1, label: "Explore", url: "/projects", buttonStyle: "PRIMARY", isActive: true },
        { id: 2, label: "Details", url: "/contact", buttonStyle: "OUTLINE", isActive: true }
      ]
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIdx(slides.length);
  };

  const handleDuplicateSlide = (idx) => {
    const target = slides[idx];
    const duplicated = {
      ...target,
      id: Date.now(),
      title: `${target.title} (Copy)`
    };
    const updated = [...slides];
    updated.splice(idx + 1, 0, duplicated);
    setSlides(updated);
    setActiveSlideIdx(idx + 1);
  };

  const handleDeleteSlide = (idx) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, i) => i !== idx);
    setSlides(updated);
    setActiveSlideIdx(Math.max(0, idx - 1));
  };

  const handleMoveSlide = (idx, direction) => {
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === slides.length - 1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    const updated = [...slides];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSlides(updated);
    setActiveSlideIdx(targetIdx);
  };

  const handleFieldChange = (field, value) => {
    const updated = [...slides];
    updated[activeSlideIdx] = { ...updated[activeSlideIdx], [field]: value };
    setSlides(updated);
  };

  const handleButtonChange = (btnIdx, field, value) => {
    const updated = [...slides];
    const slide = { ...updated[activeSlideIdx] };
    const btns = [...slide.buttons];
    btns[btnIdx] = { ...btns[btnIdx], [field]: value };
    slide.buttons = btns;
    updated[activeSlideIdx] = slide;
    setSlides(updated);
  };

  const currentSlide = slides[activeSlideIdx];
  const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5";
  const inputClass = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all";

  return (
    <div className="grid gap-6 lg:grid-cols-12 items-start">
      
      {/* LEFT: Slides Panel list */}
      <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Hero Slides</h3>
          <button
            onClick={handleAddSlide}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold transition-all"
          >
            <Plus size={14} />
            Add Slide
          </button>
        </div>

        <div className="space-y-2">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                idx === activeSlideIdx
                  ? "border-blue-500 bg-blue-50/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => setActiveSlideIdx(idx)}
                className="flex-1 text-left min-w-0"
              >
                <span className="block text-xs font-extrabold text-slate-400">Slide {idx + 1}</span>
                <span className="block text-sm font-bold text-slate-900 truncate mt-0.5">
                  {s.title || "Untitled headline"}
                </span>
              </button>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMoveSlide(idx, "up")}
                  className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  disabled={idx === slides.length - 1}
                  onClick={() => handleMoveSlide(idx, "down")}
                  className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded-lg"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  onClick={() => handleDuplicateSlide(idx)}
                  className="p-1 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg"
                  title="Duplicate Slide"
                >
                  <Copy size={13} />
                </button>
                <button
                  disabled={slides.length <= 1}
                  onClick={() => handleDeleteSlide(idx)}
                  className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-600 disabled:opacity-30 rounded-lg"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Slide Detail Editor */}
      <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Slide Editor</h2>
          <p className="text-xs text-slate-500">Configure parameters for the active Hero slide.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Hero Badge Text</label>
            <input
              type="text"
              value={currentSlide.badge || ""}
              onChange={(e) => handleFieldChange("badge", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Title Headline</label>
            <input
              type="text"
              value={currentSlide.title || ""}
              onChange={(e) => handleFieldChange("title", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Subtitle</label>
            <input
              type="text"
              value={currentSlide.subtitle || ""}
              onChange={(e) => handleFieldChange("subtitle", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description Paragraph</label>
            <textarea
              rows={3}
              value={currentSlide.description || ""}
              onChange={(e) => handleFieldChange("description", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Media Pickers */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Background Image</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentSlide.heroImage || ""}
                  placeholder="Choose image..."
                  className={`${inputClass} bg-slate-50`}
                />
                <button
                  type="button"
                  onClick={() => setPickerField({ idx: activeSlideIdx, type: "image" })}
                  className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Choose
                </button>
              </div>
            </div>
            <div>
              <label className={labelClass}>Background Video</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={currentSlide.heroVideo || ""}
                  placeholder="Choose video..."
                  className={`${inputClass} bg-slate-50`}
                />
                <button
                  type="button"
                  onClick={() => setPickerField({ idx: activeSlideIdx, type: "video" })}
                  className="px-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                >
                  Choose
                </button>
              </div>
            </div>
          </div>

          {/* Action CTA Buttons */}
          {currentSlide.buttons && currentSlide.buttons.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Slide Action Buttons</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {currentSlide.buttons.map((btn, btnIdx) => (
                  <div key={btn.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-blue-600">Button {btnIdx + 1} ({btn.buttonStyle})</span>
                      <label className="flex items-center gap-1.5 text-xs text-slate-500">
                        <input
                          type="checkbox"
                          checked={btn.isActive}
                          onChange={(e) => handleButtonChange(btnIdx, "isActive", e.target.checked)}
                        />
                        Active
                      </label>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Label text..."
                        value={btn.label}
                        onChange={(e) => handleButtonChange(btnIdx, "label", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Link URL..."
                        value={btn.url}
                        onChange={(e) => handleButtonChange(btnIdx, "url", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all focus-visible:outline-none disabled:opacity-50 mt-6"
          >
            <Save size={15} />
            {saving ? "Publishing Active Slide CMS Changes..." : "Save & Publish Slides"}
          </button>
        </div>
      </div>

      {/* Media Pickers Modals */}
      <MediaPickerModal
        isOpen={pickerField?.type === "image"}
        onClose={() => setPickerField(null)}
        selectedValue={currentSlide.heroImage}
        onSelect={(path) => handleFieldChange("heroImage", path)}
      />
      <MediaPickerModal
        isOpen={pickerField?.type === "video"}
        onClose={() => setPickerField(null)}
        selectedValue={currentSlide.heroVideo}
        onSelect={(path) => handleFieldChange("heroVideo", path)}
      />
    </div>
  );
}
